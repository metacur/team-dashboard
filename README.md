# チームタスク管理ダッシュボード  

## Overview
チームのタスクを視覚的に管理するための Web アプリです。  
タスクの進捗状況をドラッグ＆ドロップで整理し、グラフや統計情報でチームの生産性を可視化します。  
また、メンバー管理機能により、担当者を柔軟に追加・削除できます。

TaskBoard is a clean, modern dashboard for managing team tasks visually.  
You can drag & drop tasks across columns, view progress with charts, and manage team members easily.

## Key Features

**ドラッグ＆ドロップ式タスク管理**  
**タスク進捗の円グラフ・統計表示（Recharts）**  
**担当者のプルダウン選択・メンバー管理**  


## Tech Stack
- フレームワーク　Next.js
- 言語　TypeScript 
- スタイリング　Tailwind CSS
- コンポーネント/UI　shadcn/ui
- グラフ　Recharts


## Setup Instructions

### Requirements
- Node.js 18 以上  
- npm または yarn または pnpm  

### 📦 2. 依存モジュールのインストール | Install Dependencies

```bash
# npm を使用する場合
npm install

# または yarn
yarn install

# または pnpm
pnpm install


## Core Packages
npm install next react react-dom
npm install tailwindcss postcss autoprefixer
npm install recharts
npm install @radix-ui/react-dialog
npm install lucide-react
npm install react-beautiful-dnd
npm install class-variance-authority clsx tailwind-merge


## Initialize Tailwind (if not already done)
npx tailwindcss init -p
## tailwind.config.js に以下を追加：
content: [
  "./src/**/*.{js,ts,jsx,tsx}",
],
## globals.css に以下を追加：
@tailwind base;
@tailwind components;
@tailwind utilities;


# Run Development Server
npm run dev

## ブラウザで以下にアクセス：
http://localhost:3000

