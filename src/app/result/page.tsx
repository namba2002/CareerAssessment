"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Answer, MbtiInput, IndustryResult } from "@/types";
import { calcRanking, getMbtiType } from "@/lib/scoring";
import { mbtiData } from "@/data/mbti";
import { MbtiTypeData } from "@/types";
import { RankingCard } from "@/components/RankingCard";
import { MbtiSection } from "@/components/MbtiSection";

export default function ResultPage() {
  const router = useRouter();
  const [ranking, setRanking] = useState<IndustryResult[] | null>(null);
  const [mbtiInfo, setMbtiInfo] = useState<MbtiTypeData | null>(null);
  const [mbtiType, setMbtiType] = useState<string | null>(null);

  useEffect(() => {
    const answersRaw = sessionStorage.getItem("diagnosis_answers");
    const mbtiRaw = sessionStorage.getItem("diagnosis_mbti");

    if (!answersRaw) {
      router.replace("/");
      return;
    }

    const answers: Record<number, Answer> = JSON.parse(answersRaw);
    const mbtiInput: MbtiInput = mbtiRaw
      ? JSON.parse(mbtiRaw)
      : { EI: null, SN: null, TF: null, JP: null };

    const results = calcRanking(answers, mbtiInput);
    setRanking(results);

    const type = getMbtiType(mbtiInput);
    setMbtiType(type);
    if (type && mbtiData[type]) {
      setMbtiInfo(mbtiData[type]);
    }
  }, [router]);

  if (!ranking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">読み込み中...</p>
      </div>
    );
  }

  const top3 = ranking.slice(0, 3);

  const shareText = mbtiType
    ? `おすすめ業界：${top3[0].industry.name} / MBTI：${mbtiType} #就活 #業界診断 #MBTI`
    : `おすすめ業界：${top3[0].industry.name} #就活 #業界診断`;

  const handleShare = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleRetry = () => {
    sessionStorage.removeItem("diagnosis_answers");
    sessionStorage.removeItem("diagnosis_mbti");
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
