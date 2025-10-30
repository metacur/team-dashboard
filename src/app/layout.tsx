// ------------------------------
// 全ページ共通のレイアウト
// Next.js App Router で自動的に適用される
// ------------------------------

import "./globals.css";


// import type { Metadata } from "next";

// SEOなどで使用するメタ情報
// export const metadata: Metadata = {
//   title: "Team Task Dashboard",
//   description: "Next.js + Zustand で作るチームタスク管理ツール",
// };


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}

/*
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
*/