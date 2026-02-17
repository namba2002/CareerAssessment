import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MBTI職業診断 - あなたに合う職業を見つけよう",
  description:
    "MBTIタイプと20問の質問から、あなたにおすすめの職種・業界ランキングを表示します。",
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
