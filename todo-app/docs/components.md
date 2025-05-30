# コンポーネント説明

このアプリケーションは以下の主要コンポーネントで構成されています。

## ルートコンポーネント

### App.vue
アプリケーションのルートコンポーネントで、全体のレイアウトを定義しています。

**主な機能**:
- ナビゲーションバー
- ルーターによる表示領域 (`<router-view>`)
- フッター

**コード構成**:
- `<template>`: HTMLテンプレート
- `<script lang="ts">`: TypeScriptでのコンポーネント定義
- `<style>`: グローバルおよびコンポーネント固有のスタイル

## ページコンポーネント

### HomePage.vue
アプリケーションのホームページを表示するコンポーネントです。

**主な機能**:
- アプリケーションの概要説明
- TODOリストへの誘導
- 最新情報の表示

### TodoPage.vue
TODOリストを管理するためのメインページです。

**主な機能**:
- TODOアイテムの一覧表示
- 新規TODOの追加
- TODOの編集・削除
- 完了/未完了のステータス切り替え
- フィルタリング機能

### MyPage.vue
ユーザー情報や設定を管理するページです。

**主な機能**:
- ユーザープロフィールの表示・編集
- アプリケーション設定の管理
- 統計情報の表示

## 再利用可能なコンポーネント

以下のコンポーネントは、複数のページやコンテキストで再利用されます。

### FeatureCard.vue
機能や特徴を紹介するためのカードコンポーネントです。主にホームページで使用されています。

**主な機能**:
- アイコン表示
- タイトル表示
- 説明文表示
- リンクボタン提供

**プロパティ**:
- `icon`: 表示するアイコン（文字列）
- `title`: カードのタイトル
- `description`: 機能の説明
- `linkTo`: リンク先のパス
- `linkText`: リンクボタンのテキスト

**スタイル特徴**:
- ホバー時のアニメーション効果
- レスポンシブデザイン
- 一貫したカラースキーム

### TodoItem.vue
個々のTODOアイテムを表示・操作するためのコンポーネントです。

**主な機能**:
- TODOアイテムの表示
- 完了/未完了の切り替え
- 削除ボタン
- 編集機能の提供

### TodoForm.vue
新規TODOの作成や既存TODOの編集に使用されるフォームコンポーネントです。

**主な機能**:
- タイトル入力
- 説明入力
- 期限日設定
- 優先度選択
- 保存/キャンセル操作

### TodoFilter.vue
TODOリストをフィルタリングするためのコンポーネントです。

**主な機能**:
- 完了/未完了によるフィルタリング
- 優先度によるフィルタリング
- テキスト検索
- 並び替え

### UserProfile.vue
ユーザープロフィール情報を表示・編集するコンポーネントです。

**主な機能**:
- ユーザー情報の表示
- プロフィール画像のアップロード
- 個人情報の編集 