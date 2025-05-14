# Vue Todo App (TypeScript)

A simple Vue.js TODO application built with TypeScript.

## Project Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run serve
```

## TypeScript Integration

This project uses TypeScript instead of JavaScript for better type safety and developer experience. The key TypeScript features used in this project:

- Strong typing for Vue components
- Interface definitions for data structures (like the Todo interface)
- Type annotations for methods and return values
- Type checking during the build process

## Project Structure

- `src/main.ts` - The entry point of the application
- `src/App.vue` - The main Vue component with TypeScript
- `src/shims-vue.d.ts` - TypeScript declaration for Vue files
- `tsconfig.json` and `tsconfig.node.json` - TypeScript configuration

## Features

- Add new todo items
- Mark items as completed
- Delete todo items
- Responsive design

## 機能

- タスクの追加
- タスクの完了/未完了の切り替え
- タスクの削除

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# ビルドしたものをプレビュー
npm run serve
```

## 技術スタック

- Vue 3
- Vite
- JavaScript

## プロジェクト構造

- `src/App.vue` - メインのTODOアプリケーションコンポーネント
- `src/main.js` - Vueアプリケーションのエントリーポイント
- `src/style.css` - スタイリング
- `index.html` - メインのHTMLファイル


```
src/
└── store/
    ├── index.ts            # メインストアファイル
    ├── types.ts            # 共通の型定義
    └── modules/
        ├── user/
        │   ├── index.ts    # ユーザーモジュールのエントリーポイント
        │   ├── types.ts    # ユーザーモジュールの型定義
        │   ├── state.ts
        │   ├── getters.ts
        │   ├── mutations.ts
        │   └── actions.ts
        └── products/
            ├── index.ts
            ├── types.ts
            ├── state.ts
            ├── getters.ts
            ├── mutations.ts
            └── actions.ts

```