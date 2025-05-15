# Vue + Vuexアプリケーションにおける状態管理の作り方

## Vuex状態管理システムの構築方法

Vueアプリケーションで効率的な状態管理を実装するには、Vuexを使用するのが効果的です。以下の手順で状態管理システムを構築できます：

```
Store構造の設計
├── RootState（ルート状態の定義）
├── User Module（名前空間付きモジュール）
│   ├── State（初期状態の定義）
│   ├── Getters（状態取得メソッドの定義）
│   ├── Mutations（状態変更メソッドの定義）
│   └── Actions（非同期処理や複雑なロジックの定義）
└── Todo Module（名前空間付きモジュール）
    ├── State（初期状態の定義）
    ├── Getters（状態取得メソッドの定義）
    ├── Mutations（状態変更メソッドの定義）
    └── Actions（非同期処理や複雑なロジックの定義）
```

## 各モジュールの実装方法

### ルートストアの設定方法

1. ルートストアを作成し、各モジュールを統合します
2. `src/store/index.ts`に以下のように実装します：

```typescript
import { createStore } from 'vuex';
import { RootState } from './types';
import userModule from './modules/user';
import todoModule from './modules/products';

export default createStore<RootState>({
  state: {}, // ルートステートの初期値
  modules: {
    user: userModule,
    todo: todoModule
  }
}); 
```

### ユーザーモジュールの実装方法

1. ユーザー情報を管理するモジュールを作成します
2. 認証状態や読み込み状態、エラー情報などを管理します
3. `src/store/modules/user/`ディレクトリに必要なファイルを作成します

### TODOモジュールの実装方法

1. TODOアイテムを管理するモジュールを作成します
2. アイテムの追加、削除、状態変更などの操作を定義します
3. `src/store/modules/products/`（または適切な名称）ディレクトリに必要なファイルを作成します

## 状態管理のデータフロー実装手順

1. **コンポーネントからActionを呼び出す方法**:
   ```typescript
   // Vueコンポーネント内で
   store.dispatch('todo/addTodo', newTodo.value);
   ```

2. **Actionの実装方法**:
   ```typescript
   // actions.ts内で
   export const actions = {
     addTodo({ commit }, todoText) {
       // 必要な処理...
       commit('ADD_TODO', { text: todoText });
     }
   };
   ```

3. **Mutationの実装方法**:
   ```typescript
   // mutations.ts内で
   export const mutations = {
     ADD_TODO(state, payload) {
       state.todos.push({ 
         id: Date.now(), 
         text: payload.text, 
         completed: false 
       });
     }
   };
   ```

4. **Getterの実装と利用方法**:
   ```typescript
   // getters.ts内で
   export const getters = {
     allTodos(state) {
       return state.todos;
     }
   };
   
   // コンポーネント内での使用法
   const todos = computed(() => store.getters['todo/allTodos']);
   ```

## サイドエフェクト（副作用）の管理方法

Vuexにおけるサイドエフェクトとは、状態変更以外の外部との相互作用（APIリクエスト、ローカルストレージ操作など）を指します。効果的なエフェクト管理は高品質なアプリケーション開発に不可欠です。

### APIリクエストの処理

```typescript
// actions.ts内での実装例
export const actions = {
  async fetchTodos({ commit }) {
    // ローディング状態を開始
    commit('SET_LOADING', true);
    
    try {
      // APIリクエストの実行
      const response = await axios.get('/api/todos');
      // 成功時の処理
      commit('SET_TODOS', response.data);
      return response.data;
    } catch (error) {
      // エラー処理
      commit('SET_ERROR', error.message);
      console.error('Todo取得エラー:', error);
      throw error; // 必要に応じてエラーを上位に伝播
    } finally {
      // 処理完了時の共通処理
      commit('SET_LOADING', false);
    }
  }
};
```

### ローディング状態と読み込みエフェクトの管理

ユーザー体験を向上させるために、データ取得中のローディング状態を適切に管理します：

```typescript
// state.ts
export const state = {
  todos: [],
  loading: false,
  error: null
};

// mutations.ts
export const mutations = {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_ERROR(state, errorMessage) {
    state.error = errorMessage;
  }
};

// コンポーネント内での実装
setup() {
  const store = useStore();
  
  // ローディング状態を監視
  const isLoading = computed(() => store.state.todo.loading);
  const error = computed(() => store.state.todo.error);
  
  // データ取得と同時にローディング状態を表示
  const fetchData = async () => {
    try {
      await store.dispatch('todo/fetchTodos');
    } catch (e) {
      // コンポーネントレベルでの追加エラー処理
    }
  };
  
  return { isLoading, error, fetchData };
}
```

### ローカルストレージとの連携

ユーザー設定や一時データを永続化する場合のエフェクト処理：

```typescript
// actions.ts
export const actions = {
  // ローカルストレージから状態を復元
  initializeFromStorage({ commit }) {
    try {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        commit('SET_TODOS', JSON.parse(savedTodos));
      }
    } catch (e) {
      console.error('ストレージからの読み込みエラー:', e);
      // 必要に応じてフォールバック処理
    }
  },
  
  // 状態変更時にストレージも更新
  saveTodo({ commit, state }, todo) {
    commit('ADD_TODO', todo);
    
    // サイドエフェクト: ローカルストレージへの保存
    try {
      localStorage.setItem('todos', JSON.stringify(state.todos));
    } catch (e) {
      console.error('ストレージへの保存エラー:', e);
    }
  }
};
```

### デバウンスとスロットルの実装

ユーザー入力処理や頻繁なAPIリクエストを最適化するためのエフェクト：

```typescript
// actions.ts
import debounce from 'lodash/debounce';

// ストア外でデバウンス関数を作成
const debouncedSearch = debounce(async (searchTerm, commit) => {
  commit('SET_LOADING', true);
  try {
    const result = await api.searchTodos(searchTerm);
    commit('SET_SEARCH_RESULTS', result);
  } catch (e) {
    commit('SET_ERROR', e.message);
  } finally {
    commit('SET_LOADING', false);
  }
}, 300); // 300ms待機

export const actions = {
  // デバウンスされた検索アクション
  searchTodos({ commit }, searchTerm) {
    commit('SET_SEARCH_TERM', searchTerm);
    debouncedSearch(searchTerm, commit);
  }
};
```

### エフェクト管理のベストプラクティス

1. **エラー処理の一元化**: すべてのエフェクトでエラー処理を統一的に実装する
2. **ローディング状態の可視化**: ユーザーに処理状態を明示的に伝える
3. **キャンセル可能な操作**: 長時間の処理は必要に応じてキャンセル可能にする
4. **リトライメカニズム**: 一時的なネットワークエラーに対応するためのリトライ処理を実装

```typescript
// 高度なAPIリクエスト処理の例
export const actions = {
  async fetchTodosWithRetry({ commit }, { retryCount = 3, delay = 1000 } = {}) {
    commit('SET_LOADING', true);
    
    let currentTry = 0;
    
    while (currentTry < retryCount) {
      try {
        const response = await axios.get('/api/todos');
        commit('SET_TODOS', response.data);
        commit('SET_LOADING', false);
        return response.data;
      } catch (error) {
        currentTry++;
        if (currentTry >= retryCount) {
          commit('SET_ERROR', `リクエスト失敗（${retryCount}回試行）: ${error.message}`);
          commit('SET_LOADING', false);
          throw error;
        }
        // 待機してから再試行
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
};
```

## Vue Composition APIでのストア利用方法

```typescript
// コンポーネント内での実装
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    // ストアの初期化
    const store = useStore();
    const newTodo = ref('');

    // ストアからデータを取得（computed経由）
    const todos = computed(() => store.getters['todo/allTodos']);

    // アクションのディスパッチ
    const addTodo = () => {
      if (newTodo.value.trim()) {
        store.dispatch('todo/addTodo', newTodo.value);
        newTodo.value = '';
      }
    };
    
    // 他のメソッドも同様に実装...
    
    return {
      newTodo,
      todos,
      addTodo
      // 他の公開メソッド...
    };
  }
});
```

## 効率的なストア設計のポイント

- **名前空間の活用**: `namespaced: true`を設定し、モジュールごとに名前空間を分けて管理しましょう
- **型定義の活用**: TypeScriptを使って型安全なストア構造を設計しましょう
- **モジュラー設計**: 機能ごとにモジュールを分割し、保守性を高めましょう

## 推奨ファイル構造

```
src/store/
├── index.ts            # ルートストアの定義
├── types.ts            # グローバル型定義
└── modules/            # 各機能別モジュール
    ├── user/           # ユーザー関連の状態管理
    │   ├── index.ts     # モジュール定義
    │   ├── state.ts     # 初期状態
    │   ├── getters.ts   # ゲッター
    │   ├── mutations.ts # ミューテーション
    │   ├── actions.ts   # アクション
    │   └── types.ts     # 型定義
    └── products/       # TODO関連の状態管理
        ├── index.ts     # モジュール定義
        ├── state.ts     # 初期状態
        ├── getters.ts   # ゲッター
        ├── mutations.ts # ミューテーション
        ├── actions.ts   # アクション
        └── types.ts     # 型定義
```

この構造に従うことで、大規模なアプリケーションでも状態管理が容易になります。 