# ルーティング設定

このアプリケーションは `vue-router` を使用してSPA（シングルページアプリケーション）のルーティングを実現しています。

## ルート構成

アプリケーションは以下の主要なルートで構成されています。

| パス | 名前 | コンポーネント | 説明 |
|------|------|----------------|------|
| `/` | Home | HomePage.vue | アプリケーションのホームページ |
| `/todo` | Todo | TodoPage.vue | TODOリストの管理ページ |
| `/mypage` | MyPage | MyPage.vue | ユーザー情報や設定の管理ページ |

## ルーター設定 (router/index.ts)

```typescript
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('../views/TodoPage.vue')
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: () => import('../views/MyPage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
```

## 実装の詳細

### 遅延ローディング

各ルートコンポーネントは `() => import('../views/XXX.vue')` の形式で定義されています。これにより、そのルートが実際にアクセスされるまでコンポーネントはロードされません（遅延ローディング/コード分割）。この方法により、初期ロード時間を短縮し、アプリケーションのパフォーマンスを向上させています。

### History モード

```typescript
history: createWebHistory()
```

この設定により、`/#/` のようなハッシュを使用せず、通常の URL パス（`/todo` など）を使用します。この方式はより美しい URL を提供しますが、サーバー側の設定が必要な場合があります。

## ナビゲーション

### テンプレート内でのリンク

```html
<router-link to="/">ホーム</router-link>
<router-link to="/todo">TODOリスト</router-link>
<router-link to="/mypage">マイページ</router-link>
```

`<router-link>` コンポーネントは Vue Router が提供する特別なコンポーネントで、ユーザーがクリックするとページを再読み込みせずにルートを変更します。

### プログラム的なナビゲーション

コンポーネント内でのプログラム的なナビゲーションは以下のように行います：

```typescript
// Option API
this.$router.push('/todo');

// Composition API
import { useRouter } from 'vue-router';
const router = useRouter();
router.push('/todo');
```

## アクティブリンクのスタイリング

`router-link-active` クラスは現在のルートがリンクと一致する場合に自動的に適用されます。App.vueでは以下のようにスタイリングしています：

```css
.nav-links a.router-link-active {
  border-bottom: 2px solid white;
}
``` 