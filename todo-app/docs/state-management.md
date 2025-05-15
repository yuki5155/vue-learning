# 状態管理（Vuex）

このアプリケーションでは、状態管理に Vuex を使用しています。Vuexは、Vue.js アプリケーションのための状態管理パターン + ライブラリであり、予測可能な方法でアプリケーション状態を管理するためのツールを提供します。

## ストア構造

状態管理は機能ごとにモジュール化されており、以下のような構成になっています。

```
store/
├── index.ts              # ストアのルート設定
├── types.ts              # 型定義
└── modules/              # ストアモジュール
    ├── todo/             # TODOに関する状態管理
    │   ├── index.ts      # TODOモジュールのエントリーポイント
    │   ├── actions.ts    # TODOに関するアクション
    │   ├── mutations.ts  # TODOに関するミューテーション
    │   ├── getters.ts    # TODOに関するゲッター
    │   └── state.ts      # TODOの状態定義
    ├── products/         # 商品に関する状態管理
    └── user/             # ユーザーに関する状態管理
```

## ルートストア設定 (store/index.ts)

このファイルでは、Vuexストアを作成し、各モジュールを登録しています。

```typescript
import { createStore } from 'vuex';
import todoModule from './modules/todo';
import productsModule from './modules/products';
import userModule from './modules/user';
import { RootState } from './types';

export default createStore<RootState>({
  modules: {
    todo: todoModule,
    products: productsModule,
    user: userModule
  }
});
```

## 型定義 (store/types.ts)

TypeScriptを使用して、ストアの型を定義しています。

```typescript
export interface RootState {
  // ルートレベルの状態があれば定義
}

// 各モジュールの状態の型はそれぞれのモジュールディレクトリ内で定義されています
```

## TODOモジュール

### 状態 (state)

TODOアイテムのリストや、フィルター設定などの状態を管理します。

```typescript
export interface TodoItem {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

export interface TodoState {
  items: TodoItem[];
  filter: {
    status: 'all' | 'completed' | 'active';
    priority: 'all' | 'low' | 'medium' | 'high';
    searchText: string;
  };
}

export default (): TodoState => ({
  items: [],
  filter: {
    status: 'all',
    priority: 'all',
    searchText: ''
  }
});
```

### ゲッター (getters)

状態から派生したデータを取得するためのゲッターを定義しています。

```typescript
export default {
  // フィルタリングされたTODOアイテムを取得
  filteredTodos: (state: TodoState) => {
    return state.items.filter(item => {
      // ステータスフィルター
      if (state.filter.status === 'completed' && !item.completed) return false;
      if (state.filter.status === 'active' && item.completed) return false;
      
      // 優先度フィルター
      if (state.filter.priority !== 'all' && item.priority !== state.filter.priority) return false;
      
      // テキスト検索
      if (state.filter.searchText && !item.title.toLowerCase().includes(state.filter.searchText.toLowerCase())) return false;
      
      return true;
    });
  },
  
  // 完了済みTODOの数
  completedCount: (state: TodoState) => {
    return state.items.filter(item => item.completed).length;
  },
  
  // 未完了TODOの数
  activeCount: (state: TodoState) => {
    return state.items.filter(item => !item.completed).length;
  }
};
```

### ミューテーション (mutations)

状態を変更するための操作を定義しています。

```typescript
export default {
  // 新しいTODOを追加
  ADD_TODO(state: TodoState, todo: Omit<TodoItem, 'id'>) {
    const newId = state.items.length > 0 
      ? Math.max(...state.items.map(t => t.id)) + 1 
      : 1;
      
    state.items.push({
      ...todo,
      id: newId
    });
  },
  
  // TODOを更新
  UPDATE_TODO(state: TodoState, { id, updates }: { id: number, updates: Partial<TodoItem> }) {
    const index = state.items.findIndex(item => item.id === id);
    if (index !== -1) {
      state.items[index] = { ...state.items[index], ...updates };
    }
  },
  
  // TODOを削除
  DELETE_TODO(state: TodoState, id: number) {
    state.items = state.items.filter(item => item.id !== id);
  },
  
  // フィルター設定を更新
  SET_FILTER(state: TodoState, filter: Partial<TodoState['filter']>) {
    state.filter = { ...state.filter, ...filter };
  }
};
```

### アクション (actions)

非同期操作や複雑なロジックを含む操作を定義しています。

```typescript
export default {
  // 新しいTODOをローカルストレージに保存して追加
  async addTodo({ commit }, todo) {
    commit('ADD_TODO', todo);
    // ローカルストレージに保存
    await saveToLocalStorage();
  },
  
  // TODOを更新
  async updateTodo({ commit }, payload) {
    commit('UPDATE_TODO', payload);
    // ローカルストレージに保存
    await saveToLocalStorage();
  },
  
  // TODOを削除
  async deleteTodo({ commit }, id) {
    commit('DELETE_TODO', id);
    // ローカルストレージに保存
    await saveToLocalStorage();
  },
  
  // フィルター設定を更新
  setFilter({ commit }, filter) {
    commit('SET_FILTER', filter);
  }
};

// ヘルパー関数：ローカルストレージにTODOを保存
async function saveToLocalStorage() {
  // 実装省略...
}
```

## ストアの使用方法

### Option API での使用

```typescript
export default {
  computed: {
    // マップヘルパーを使用
    ...mapState('todo', ['items']),
    ...mapGetters('todo', ['filteredTodos', 'completedCount', 'activeCount'])
  },
  methods: {
    ...mapActions('todo', ['addTodo', 'updateTodo', 'deleteTodo', 'setFilter'])
  }
}
```

### Composition API での使用

```typescript
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  setup() {
    const store = useStore();
    
    // 状態とゲッターへのアクセス
    const todos = computed(() => store.getters['todo/filteredTodos']);
    const completedCount = computed(() => store.getters['todo/completedCount']);
    
    // アクションの呼び出し
    function addNewTodo(todo) {
      store.dispatch('todo/addTodo', todo);
    }
    
    return {
      todos,
      completedCount,
      addNewTodo
    };
  }
}
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