"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Answer, DiagnosisState, MbtiInput } from "@/types";
import { questions } from "@/data/questions";
import { ProgressBar } from "@/components/ProgressBar";
import { LikertQuestion } from "@/components/LikertQuestion";
import { MbtiInputComponent } from "@/components/MbtiInput";

const INITIAL_MBTI: MbtiInput = { EI: null, SN: null, TF: null, JP: null };

function isMbtiComplete(mbti: MbtiInput): boolean {
  return mbti.EI !== null && mbti.SN !== null && mbti.TF !== null && mbti.JP !== null;
}

const DIMENSION_ITEMS = [
  {
    icon: "💎",
    title: "価値観",
    desc: "仕事に何を求めるか",
    color: "#6c5ce7",
  },
  {
    icon: "🚀",
    title: "働き方志向",
    desc: "どんなスタイルで働きたいか",
    color: "#a29bfe",
  },
  {
    icon: "🔥",
    title: "耐性",
    desc: "プレッシャーや変化への適応力",
    color: "#fd79a8",
  },
  {
    icon: "🔍",
    title: "興味",
    desc: "どんな分野に惹かれるか",
    color: "#00cec9",
  },
  {
    icon: "⚡",
    title: "能力感覚",
    desc: "自分が得意だと感じること",
    color: "#ffeaa7",
  },
];

export default function DiagnosisPage() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [state, setState] = useState<DiagnosisState>({
    answers: {},
    mbti: INITIAL_MBTI,
  });

  const answeredCount = Object.keys(state.answers).length;
  const allAnswered = answeredCount === questions.length;
  const mbtiComplete = isMbtiComplete(state.mbti);
  const canSubmit = allAnswered && mbtiComplete;

  const handleAnswer = useCallback((questionId: number, answer: Answer) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  }, []);

  const handleMbtiChange = useCallback((mbti: MbtiInput) => {
    setState((prev) => ({ ...prev, mbti }));
  }, []);

  const handleSubmit = () => {
    if (!canSubmit) return;
    sessionStorage.setItem("diagnosis_answers", JSON.stringify(state.answers));
    sessionStorage.setItem("diagnosis_mbti", JSON.stringify(state.mbti));
    router.push("/result");
  };

  // ===== Intro / Landing Screen =====
  if (!started) {
    return (
      <main className="min-h-screen relative z-10">
        <div className="max-w-lg mx-auto px-4 py-12 flex flex-col items-center">
          {/* Hero */}
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs text-white/60 font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#00cec9] animate-pulse" />
              就活生のための本格キャリア診断
            </div>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-4">
              <span className="gradient-text">MBTI</span>
              <br />
              <span className="text-white">職業診断</span>
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-sm mx-auto">
              あなたの<span className="text-[#a29bfe] font-semibold">MBTIタイプ</span>と
              <span className="text-[#00cec9] font-semibold">5つの軸</span>を
              組み合わせて、最適な職種と業界を提案します
            </p>
          </div>

          {/* 5 Dimensions */}
          <div className="w-full glass rounded-2xl p-6 mb-6 animate-fade-in-up delay-200">
            <h2 className="text-sm font-bold text-white/70 mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-[#6c5ce7] to-[#00cec9]" />
              診断で測定する5つの軸
            </h2>
            <div className="flex flex-col gap-3">
              {DIMENSION_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-all"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <span
                      className="text-sm font-bold"
                      style={{ color: item.color }}
                    >
                      {item.title}
                    </span>
                    <span className="text-sm text-white/40 ml-2">
                      ─ {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MBTI Integration Note */}
          <div className="w-full glass rounded-2xl p-5 mb-8 animate-fade-in-up delay-300 border-[#6c5ce7]/20">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6c5ce7] to-[#a29bfe] flex items-center justify-center shrink-0">
                <span className="text-white font-black text-sm">MB</span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#a29bfe] mb-1">
                  MBTIとの統合分析
                </h2>
                <p className="text-sm text-white/45 leading-relaxed">
                  5つの軸のスコアに加えて、MBTIの性格タイプから読み取れる特性を統合的に分析し、
                  あなたに最もフィットする職種と業界をランキング形式で提示します。
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setStarted(true)}
            className="w-full btn-primary text-lg animate-fade-in-up delay-400 animate-pulse-glow rounded-2xl"
          >
            <span>診断を始める</span>
          </button>

          <p className="text-xs text-white/25 text-center mt-5 animate-fade-in delay-500">
            全20問 + MBTIタイプ入力 ─ 約3〜5分で完了
          </p>
        </div>
      </main>
    );
  }

  // ===== Quiz Screen =====
  return (
    <main className="min-h-screen relative z-10">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-2xl font-black mb-2">
            <span className="gradient-text">MBTI職業診断</span>
          </h1>
          <p className="text-sm text-white/40">
            20問の質問とMBTIタイプから、あなたに合う職種を見つけよう
          </p>
        </div>

        {/* MBTI Section */}
        <div className="animate-fade-in-up delay-100">
          <MbtiInputComponent
            value={state.mbti}
            onChange={handleMbtiChange}
          />
          {!mbtiComplete && (
            <p className="text-xs text-[#fd79a8] text-center -mt-4 mb-6">
              4つの軸すべてを選択してください
            </p>
          )}
        </div>

        {/* Progress */}
        <div className="animate-fade-in-up delay-200">
          <ProgressBar current={answeredCount} total={questions.length} />
        </div>

        {/* Questions */}
        <div className="animate-fade-in-up delay-300">
          {questions.map((q) => (
            <LikertQuestion
              key={q.id}
              question={q}
              selected={state.answers[q.id]}
              onSelect={handleAnswer}
            />
          ))}
        </div>

        {/* Submit */}
        <div className="mt-8 pb-12">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
              canSubmit
                ? "btn-primary animate-pulse-glow"
                : "bg-white/5 text-white/20 border border-white/5 cursor-not-allowed"
            }`}
          >
            <span>
              {canSubmit
                ? "結果を見る"
                : !mbtiComplete
                  ? "MBTIタイプを選択してください"
                  : `あと ${questions.length - answeredCount} 問`}
            </span>
          </button>
          {!canSubmit && allAnswered && !mbtiComplete && (
            <p className="text-xs text-[#fd79a8] text-center mt-3">
              MBTIタイプの選択が必要です
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
