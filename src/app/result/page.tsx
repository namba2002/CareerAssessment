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
  const [showContent, setShowContent] = useState(false);

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

    // Delay content reveal for dramatic effect
    const timer = setTimeout(() => setShowContent(true), 600);
    return () => clearTimeout(timer);
  }, [router]);

  if (!industryRanking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
        <div className="spinner mb-4" />
        <p className="text-white/40 text-sm">結果を分析中...</p>
      </div>
    );
  }

  const top3 = industryRanking.slice(0, 3);

  const shareText = `MBTI職業診断の結果！\nおすすめ職種：${topJobs[0]?.job.name}（${topJobs[0]?.industryName}）\nMBTI：${mbtiType}\n#MBTI職業診断 #就活`;

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
    <main className="min-h-screen relative z-10">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Result Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00cec9]/10 border border-[#00cec9]/20 text-xs text-[#00cec9] font-medium mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00cec9]" />
            診断完了
          </div>
          <h1 className="text-3xl font-black mb-2">
            <span className="gradient-text">診断結果</span>
          </h1>
          <p className="text-sm text-white/40">
            5つの軸 + MBTIタイプの統合分析
          </p>
        </div>

        {showContent && (
          <>
            {/* MBTI Type Card */}
            {mbtiInfo && (
              <div className="glass rounded-2xl p-6 mb-8 border-[#6c5ce7]/20 animate-scale-in">
                <div className="flex items-center gap-5 mb-4">
                  <div className="shrink-0">
                    <p className="text-xs text-[#a29bfe] font-medium tracking-wider uppercase mb-1">
                      Your Type
                    </p>
                    <p className="text-3xl font-black tracking-[0.15em] gradient-text">
                      {mbtiType}
                    </p>
                    <p className="text-sm font-bold text-[#a29bfe] mt-0.5">
                      {mbtiInfo.label}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-1.5">
                      {mbtiInfo.strengths.map((s, i) => (
                        <span
                          key={i}
                          className="chip bg-[#00cec9]/10 text-[#00cec9] border-[#00cec9]/20 text-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-gradient-to-r from-[#6c5ce7]/10 to-[#a29bfe]/5 border border-[#6c5ce7]/15">
                  <p className="text-sm text-white/60">
                    <span className="font-bold text-[#a29bfe]">Tip：</span>
                    {mbtiInfo.tip}
                  </p>
                </div>
              </div>
            )}

            {/* Top 5 Jobs */}
            <section className="mb-8 animate-fade-in-up delay-200">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#ffeaa7] to-[#fdcb6e]" />
                <h2 className="text-lg font-bold text-white">
                  おすすめ職種 TOP 5
                </h2>
              </div>
              {topJobs.map((result, i) => (
                <JobRankingCard key={result.job.id} result={result} rank={i} />
              ))}
            </section>

            {/* Top 3 Industries */}
            <section className="mb-8 animate-fade-in-up delay-400">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-[#a29bfe] to-[#6c5ce7]" />
                <h2 className="text-lg font-bold text-white">
                  おすすめ業界 TOP 3
                </h2>
              </div>
              {top3.map((result, i) => (
                <RankingCard key={result.industry.id} result={result} rank={i} />
              ))}
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pb-12 animate-fade-in-up delay-600">
              <button
                onClick={handleShare}
                className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 bg-gradient-to-r from-white/10 to-white/5 border border-white/15 text-white hover:from-white/15 hover:to-white/10 hover:border-white/25"
              >
                X（Twitter）でシェアする
              </button>
              <button
                onClick={handleRetry}
                className="w-full py-3.5 rounded-2xl font-medium text-sm transition-all duration-300 bg-transparent border border-white/10 text-white/50 hover:text-white/80 hover:border-white/20"
              >
                もう一度診断する
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
