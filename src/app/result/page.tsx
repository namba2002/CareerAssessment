"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Answer, MbtiInput, JobResult, DimensionScores } from "@/types";
import { calcRanking } from "@/lib/scoring";
import { mbtiData } from "@/data/mbti";
import { MbtiTypeData } from "@/types";
import { JobRankingCard } from "@/components/JobRankingCard";
import { RadarChart } from "@/components/RadarChart";

export default function ResultPage() {
  const router = useRouter();
  const [topJobs, setTopJobs] = useState<JobResult[] | null>(null);
  const [mbtiInfo, setMbtiInfo] = useState<MbtiTypeData | null>(null);
  const [mbtiType, setMbtiType] = useState<string | null>(null);
  const [dimScores, setDimScores] = useState<DimensionScores | null>(null);

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
    setTopJobs(result.topJobs);
    setMbtiType(result.mbtiType);
    setDimScores(result.dimensionScores);
    if (result.mbtiType && mbtiData[result.mbtiType]) {
      setMbtiInfo(mbtiData[result.mbtiType]);
    }

  }, [router]);

  /* =================== Loading State =================== */
  if (!topJobs) {
    return (
      <div className="min-h-screen bg-gradient-pastel flex items-center justify-center">
        <div className="w-full max-w-lg px-5 space-y-4">
          <div className="shimmer h-40 rounded-2xl" />
          <div className="shimmer h-20 rounded-2xl" />
          <div className="shimmer h-20 rounded-2xl" />
          <p className="text-sm text-text-light text-center anim-gentle-pulse">
            結果を計算中...✨
          </p>
        </div>
      </div>
    );
  }

  const shareText = `MBTI診断やってみた！\n\nタイプ：${mbtiType}${mbtiInfo ? `（${mbtiInfo.label}）` : ""}\nおすすめ職種No.1：${topJobs[0]?.job.name}\n\n#MBTI職業診断 #就活`;

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
    <main className="min-h-screen bg-gradient-pastel">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* Header */}
        <div className="text-center mb-6 anim-float-up">
          <p className="text-4xl mb-2">🎉</p>
          <h1 className="text-2xl font-black">診断結果</h1>
          <p className="text-xs text-text-light mt-1">
            あなたにマッチする職種ランキング
          </p>
        </div>

        {/* =================== MBTI Hero Section =================== */}
        {mbtiInfo && (
          <div className="card-soft overflow-hidden mb-8 anim-float-up stagger-1">
            {/* Gradient header band */}
            <div
              className="p-6 text-center"
              style={{
                background:
                  "linear-gradient(135deg, #C4B0FF 0%, #FF8FAB 50%, #FFB5A7 100%)",
              }}
            >
              <p className="text-xs font-bold text-white/80 tracking-widest uppercase mb-1">
                YOUR TYPE
              </p>
              <p className="text-6xl font-black text-white leading-none tracking-[0.15em] drop-shadow-sm">
                {mbtiType}
              </p>
              <p className="text-lg font-black text-white mt-2">
                {mbtiInfo.label}
              </p>
            </div>

            <div className="p-5">
              {/* Strengths */}
              <div className="mb-4">
                <p className="text-xs font-bold text-text-light mb-2">
                  ✨ あなたの強み
                </p>
                <div className="flex flex-wrap gap-2">
                  {mbtiInfo.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="text-xs bg-lavender-light text-lavender px-3 py-1.5 rounded-full font-bold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tip */}
              <div className="bg-mint-light rounded-xl p-4">
                <p className="text-sm leading-relaxed">
                  <span className="font-bold text-mint">💡 Tip：</span>
                  {mbtiInfo.tip}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =================== Radar Chart =================== */}
        {dimScores && (
          <div className="card-soft p-5 mb-8 anim-float-up stagger-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📊</span>
              <h2 className="text-base font-black">あなたの5軸プロフィール</h2>
            </div>
            <RadarChart scores={dimScores} />
          </div>
        )}

        {/* =================== Job Ranking TOP 5 =================== */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-4 anim-float-up stagger-3">
            <span className="text-xl">💼</span>
            <h2 className="text-base font-black flex-1">
              あなたにおすすめの職種
            </h2>
            <span className="text-sm font-black text-lavender bg-lavender-light px-3 py-1 rounded-full">
              TOP 5
            </span>
          </div>
          {topJobs.map((result, i) => (
            <JobRankingCard key={result.job.id} result={result} rank={i} />
          ))}
        </section>

        {/* =================== Action Buttons =================== */}
        <div className="flex flex-col gap-3 pb-12 anim-float-up">
          <button
            onClick={handleShare}
            className="btn-soft w-full py-4 text-base"
          >
            X でシェアする 🐦
          </button>
          <button
            onClick={handleRetry}
            className="w-full py-4 rounded-full bg-white text-text font-bold text-base border-2 border-lavender/30 hover:border-lavender hover:bg-lavender-light transition-all duration-200"
          >
            もう一度診断する 🔄
          </button>
        </div>
      </div>
    </main>
  );
}
