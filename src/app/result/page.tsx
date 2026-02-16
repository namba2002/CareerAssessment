"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Answer, MbtiInput } from "@/types";
import { calcRanking, getMbtiType } from "@/lib/scoring";
import { mbtiData } from "@/data/mbti";
import { RankingCard } from "@/components/RankingCard";
import { MbtiSection } from "@/components/MbtiSection";

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // クエリパラメータから回答データを復元
  const answersRaw = searchParams.get("a");
  const mbtiRaw = searchParams.get("m");

  if (!answersRaw) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">診断データがありません</p>
          <button
            onClick={() => router.push("/")}
            className="text-blue-600 underline"
          >
            診断ページに戻る
          </button>
        </div>
      </div>
    );
  }

  const answers: Record<number, Answer> = JSON.parse(answersRaw);
  const mbtiInput: MbtiInput = mbtiRaw
    ? JSON.parse(mbtiRaw)
    : { EI: null, SN: null, TF: null, JP: null };

  const ranking = calcRanking(answers, mbtiInput);
  const top3 = ranking.slice(0, 3);

  const mbtiType = getMbtiType(mbtiInput);
  const mbtiInfo = mbtiType ? mbtiData[mbtiType] : null;

  // X共有テキスト
  const shareText = mbtiType
    ? `おすすめ業界：${top3[0].industry.name} / MBTI：${mbtiType} #就活 #業界診断 #MBTI`
    : `おすすめ業界：${top3[0].industry.name} #就活 #業界診断`;

  const handleShare = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleRetry = () => {
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black mb-2">診断結果</h1>
          <p className="text-sm text-gray-500">
            あなたにおすすめの業界 TOP 3
          </p>
        </div>

        {/* ランキング TOP3 */}
        <section className="mb-8">
          {top3.map((result, i) => (
            <RankingCard key={result.industry.id} result={result} rank={i} />
          ))}
        </section>

        {/* MBTI セクション */}
        {mbtiInfo && (
          <section className="mb-8">
            <MbtiSection data={mbtiInfo} />
          </section>
        )}

        {/* アクションボタン */}
        <div className="flex flex-col gap-3 pb-12">
          <button
            onClick={handleShare}
            className="w-full py-3 rounded-xl bg-black text-white font-medium text-sm hover:bg-gray-800 transition"
          >
            X（Twitter）でシェアする
          </button>
          <button
            onClick={handleRetry}
            className="w-full py-3 rounded-xl border border-gray-300 bg-white text-gray-700 font-medium text-sm hover:bg-gray-50 transition"
          >
            もう一度診断する
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400">読み込み中...</p>
        </div>
      }
    >
      <ResultContent />
    </Suspense>
  );
}
