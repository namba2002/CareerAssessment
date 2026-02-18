import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MBTI職業診断 - あなたの天職を見つけよう",
  description:
    "MBTIタイプと20問の質問から、あなたにおすすめの職種・業界ランキングを表示します。就活生のための本格キャリア診断。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
