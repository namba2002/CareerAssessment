"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Answer, MbtiInput, IndustryResult, JobResult } from "@/types";
import { calcRanking } from "@/lib/scoring";
import { mbtiData } from "@/data/mbti";
import { MbtiTypeData } from "@/types";
import { RankingCard } from "@/components/RankingCard";
import { JobRankingCard } from "@/components/JobRankingCard";

export default function ResultPage() {
  const router = useRouter();
  const [industryRanking, setIndustryRanking] = useState<IndustryResult[] | null>(null);
  const [topJobs, setTopJobs] = useState<JobResult[]>([]);
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

    const result = calcRanking(answers, mbtiInput);
    setIndustryRanking(result.industryResults);
    setTopJobs(result.topJobs);
    setMbtiType(result.mbtiType);
    if (result.mbtiType && mbtiData[result.mbtiType]) {
      setMbtiInfo(mbtiData[result.mbtiType]);
    }
  }, [router]);

  if (!industryRanking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">読み込み中...</p>
      </div>
    );
  }

  const top3 = industryRanking.slice(0, 3);

  const shareText = `MBTI職業診断の結果！おすすめ職種：${topJobs[0]?.job.name}（${topJobs[0]?.industryName}） / MBTI：${mbtiType} #MBTI職業診断 #就活`;

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
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black mb-2">診断結果</h1>
          <p className="text-sm text-gray-500">
            5つの軸 + MBTIタイプの統合分析
          </p>
        </div>

        {/* MBTIタイプ + 特性サマリー（統合表示） */}
        {mbtiInfo && (
          <div className="border border-purple-200 rounded-xl p-5 mb-6 bg-gradient-to-b from-purple-50 to-white shadow-sm">
            <div className="flex items-center gap-4 mb-3">
              <div>
                <p className="text-xs text-purple-500 font-medium">あなたのタイプ</p>
                <p className="text-2xl font-black tracking-widest text-purple-700">
                  {mbtiType}
                </p>
                <p className="text-sm font-bold text-purple-600">{mbtiInfo.label}</p>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-1.5">
                  {mbtiInfo.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm text-purple-700 bg-purple-50 border border-purple-100 rounded-lg p-2.5">
              <span className="font-bold">Tip：</span>{mbtiInfo.tip}
            </p>
          </div>
        )}

        {/* おすすめ職種 TOP 5 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3">
            あなたにおすすめの職種 TOP 5
          </h2>
          {topJobs.map((result, i) => (
            <JobRankingCard key={result.job.id} result={result} rank={i} />
          ))}
        </section>

        {/* おすすめ業界 TOP 3 */}
        <section className="mb-8">
          <h2 className="text-lg font-bold mb-3">おすすめ業界 TOP 3</h2>
          {top3.map((result, i) => (
            <RankingCard key={result.industry.id} result={result} rank={i} />
          ))}
        </section>

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
