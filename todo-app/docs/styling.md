# スタイリング

このアプリケーションでは、ネイティブCSSを使用してスタイリングを行っています。グローバルスタイルとコンポーネント固有のスタイルを組み合わせて、一貫性のあるデザインを実現しています。

## スタイリングの概要

- **グローバルスタイル**: `App.vue`と`style.css`に定義されたアプリケーション全体に適用されるスタイル
- **コンポーネントスコープスタイル**: 各Vueコンポーネント内で`<style scoped>`タグ内に定義された、そのコンポーネントにのみ適用されるスタイル
- **レスポンシブデザイン**: モバイルからデスクトップまで様々な画面サイズに対応するメディアクエリの使用

## App.vueのグローバルスタイル

`App.vue`ファイルには、アプリケーション全体のレイアウトやナビゲーション、フッターなどの基本的なスタイルが定義されています。

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
  color: #333;
  line-height: 1.6;
}

/* ナビゲーションバーのスタイル */
.navbar {
  background-color: #4caf50;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

/* ロゴのスタイル */
.logo a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

/* ナビゲーションリンクのスタイル */
.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #e6e6e6;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid white;
}

/* メインコンテンツエリアのスタイル */
main {
  min-height: calc(100vh - 120px);
  padding: 2rem 0;
}

/* フッターのスタイル */
.footer {
  background-color: #333;
  color: white;
  padding: 1rem 0;
  margin-top: 2rem;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
  
  .logo {
    margin-bottom: 1rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: space-around;
  }
  
  .nav-links li {
    margin: 0;
  }
}
```

## コンポーネントのスタイル

### TodoPage.vue

TODOリストページのスタイリング例：

```css
<style scoped>
.todo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.todo-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-item.completed {
  text-decoration: line-through;
  color: #888;
}

/* 他の要素のスタイル */
</style>
```

### ユーザーインターフェース要素のスタイル

ボタン、フォーム、入力要素など、再利用可能なUIコンポーネントのスタイル例：

```css
/* ボタンのスタイル */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-primary:hover {
  background-color: #45a049;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.btn-danger:hover {
  background-color: #d32f2f;
}

/* フォーム要素のスタイル */
.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.25);
}
```

## カラーパレット

アプリケーション全体で使用される一貫したカラーパレット：

| 色の役割 | HEX値 | 使用箇所 |
|---------|-------|---------|
| プライマリカラー | #4caf50 | ナビゲーションバー、ボタン、強調要素 |
| セカンダリカラー | #f5f5f5 | 背景、二次的なボタン |
| アクセントカラー | #2196f3 | リンク、特別な強調 |
| 警告カラー | #f44336 | 削除ボタン、エラーメッセージ |
| テキストカラー | #333333 | 通常テキスト |
| 背景カラー | #f8f8f8 | ページ背景 |

## レスポンシブデザイン

このアプリケーションは、以下のブレークポイントを使用して様々な画面サイズに対応しています：

| ブレークポイント | 画面サイズ | ターゲットデバイス |
|-----------------|-----------|------------------|
| モバイル | 576px未満 | スマートフォン（縦向き） |
| タブレット | 576px〜768px | スマートフォン（横向き）、小型タブレット |
| 中型 | 768px〜992px | タブレット、小型ノートPC |
| 大型 | 992px以上 | デスクトップ、大型ノートPC |

例えば、ナビゲーションバーの表示はモバイル画面サイズで以下のように変更されます：

```css
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }
  
  .logo {
    margin-bottom: 1rem;
  }
  
  .nav-links {
    width: 100%;
    justify-content: space-around;
  }
  
  .nav-links li {
    margin: 0;
  }
}
```

## CSSの命名規則

このプロジェクトでは、BEM（Block, Element, Modifier）命名規則の簡略化バージョンを採用しています：

- **ブロック**: 独立したコンポーネント（例: `.todo-list`）
- **要素**: ブロックの子要素（例: `.todo-list__item`）
- **修飾子**: 状態やバリエーション（例: `.todo-list__item--completed`）

ただし、単純なケースでは、よりシンプルな命名（例: `.todo-item.completed`）も使用しています。 