import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "業界診断 - あなたに合う業界を見つけよう",
  description:
    "20問の質問とMBTI（任意）から、あなたにおすすめの業界ランキングを表示します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">{children}</body>
    </html>
  );
}
