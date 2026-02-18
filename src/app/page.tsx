"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Answer, DiagnosisState, MbtiInput } from "@/types";
import { questions } from "@/data/questions";
import { ProgressBar } from "@/components/ProgressBar";
import { LikertQuestion } from "@/components/LikertQuestion";
import { MbtiInputComponent } from "@/components/MbtiInput";

const INITIAL_MBTI: MbtiInput = { EI: null, SN: null, TF: null, JP: null };

const AXES_INFO = [
  { emoji: "🎯", name: "価値観", desc: "仕事に何を求めるか" },
  { emoji: "💼", name: "働き方志向", desc: "どんなスタイルで働きたいか" },
  { emoji: "🛡️", name: "耐性", desc: "プレッシャーへの適応力" },
  { emoji: "🔍", name: "興味", desc: "どんな分野に惹かれるか" },
  { emoji: "✨", name: "能力感覚", desc: "自分が得意だと感じること" },
];

const QUESTIONS_PER_PAGE = 4;
const QUESTION_PAGES = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
const TOTAL_STEPS = 1 + QUESTION_PAGES; // MBTI + 質問ページ数

/** Fisher-Yates シャッフル（非破壊） */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function isMbtiComplete(mbti: MbtiInput): boolean {
  return (
    mbti.EI !== null && mbti.SN !== null && mbti.TF !== null && mbti.JP !== null
  );
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
  const [step, setStep] = useState(0);
  const [state, setState] = useState<DiagnosisState>({
    answers: {},
    mbti: INITIAL_MBTI,
  });

  // 初回マウント時にシャッフルした質問を生成（再レンダーでは変わらない）
  const shuffledQuestions = useMemo(() => shuffle(questions), []);

  // ページごとに4問ずつスライス
  const questionPages = useMemo(() => {
    const pages: (typeof questions)[] = [];
    for (let i = 0; i < shuffledQuestions.length; i += QUESTIONS_PER_PAGE) {
      pages.push(shuffledQuestions.slice(i, i + QUESTIONS_PER_PAGE));
    }
    return pages;
  }, [shuffledQuestions]);

  const answeredCount = Object.keys(state.answers).length;
  const mbtiComplete = isMbtiComplete(state.mbti);

  // 現在のステップの質問（ステップ1〜）
  const currentQuestions = step >= 1 ? questionPages[step - 1] ?? [] : [];

  // 現在のステップの全質問が回答済みか
  const isCurrentStepComplete =
    step === 0
      ? mbtiComplete
      : currentQuestions.every((q) => state.answers[q.id] != null);

  const handleAnswer = useCallback((questionId: number, answer: Answer) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: answer },
    }));
  }, []);

  const handleMbtiChange = useCallback((mbti: MbtiInput) => {
    setState((prev) => ({ ...prev, mbti }));
  }, []);

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // 最終ステップ → 結果へ
      sessionStorage.setItem("diagnosis_answers", JSON.stringify(state.answers));
      sessionStorage.setItem("diagnosis_mbti", JSON.stringify(state.mbti));
      router.push("/result");
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* =================== Landing Screen =================== */
  if (!started) {
    return (
      <main className="min-h-screen bg-gradient-pastel">
        <div className="max-w-lg mx-auto px-5 py-14">
          {/* Title */}
          <div className="text-center mb-10 anim-float-up">
            <p className="text-5xl mb-3">🔮</p>
            <h1 className="text-3xl font-black mb-2">MBTI職業診断</h1>
            <p className="text-sm text-text-light leading-relaxed">
              あなたの<span className="font-bold text-lavender">MBTIタイプ</span>と
              <span className="font-bold text-mint">5つの軸</span>を組み合わせて
              <br />
              ぴったりの職種と業界を見つけよう
            </p>
          </div>

          {/* 5 Axes */}
          <div className="card-soft p-5 mb-6 anim-float-up stagger-2">
            <h2 className="text-sm font-bold mb-3">診断で測定する5つの軸</h2>
            <div className="flex flex-col gap-2">
              {AXES_INFO.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl bg-bg"
                >
                  <span className="text-lg">{a.emoji}</span>
                  <span className="font-bold text-sm">{a.name}</span>
                  <span className="text-xs text-text-light ml-auto">
                    {a.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MBTI Integration */}
          <div className="card-soft p-5 mb-8 anim-float-up stagger-3 border-2 border-lavender/20">
            <h2 className="text-sm font-bold text-lavender mb-2">
              💫 MBTIとの統合分析
            </h2>
            <p className="text-sm text-text-light leading-relaxed">
              5つの軸のスコアに加えて、MBTIの性格タイプから読み取れる特性を統合的に分析し、
              あなたに最もフィットする職種と業界をランキングで提示します。
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => setStarted(true)}
            className="btn-soft w-full py-4 text-lg anim-pulse"
          >
            診断を始める ✨
          </button>

          <p className="text-xs text-text-light text-center mt-5">
            所要時間：約3〜5分 / 全{questions.length}問 + MBTIタイプ入力
          </p>
        </div>
      </main>
    );
  }

  /* =================== Quiz Screen (Paginated + Shuffled) =================== */
  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-lg mx-auto px-5 py-8">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-black">🔮 MBTI職業診断</h1>
        </div>

        {/* Step indicator */}
        <ProgressBar current={step + 1} total={TOTAL_STEPS} />

        {/* Step title */}
        <div className="text-center mb-6 anim-float-up">
          <p className="text-xs text-text-light mb-1">
            STEP {step + 1} / {TOTAL_STEPS}
          </p>
          {step === 0 ? (
            <>
              <h2 className="text-lg font-black">💫 MBTIタイプ</h2>
              <p className="text-xs text-text-light mt-0.5">
                あなたのMBTIタイプを入力してください
              </p>
            </>
          ) : (
            <>
              <h2 className="text-lg font-black">📝 質問</h2>
              <p className="text-xs text-text-light mt-0.5">
                {answeredCount} / {questions.length} 問回答済み
              </p>
            </>
          )}
        </div>

        {/* Step content */}
        {step === 0 ? (
          /* MBTI Input */
          <div className="card-soft p-5 mb-6 anim-float-up">
            <MbtiInputComponent value={state.mbti} onChange={handleMbtiChange} />
            {!mbtiComplete && (
              <p className="text-xs text-pink text-center font-bold mt-3">
                4つの軸すべてを選択してください
              </p>
            )}
          </div>
        ) : (
          /* Shuffled questions */
          <div className="anim-float-up">
            {currentQuestions.map((q) => (
              <LikertQuestion
                key={q.id}
                question={q}
                selected={state.answers[q.id]}
                onSelect={handleAnswer}
              />
            ))}
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-6 pb-12">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-4 rounded-full bg-white text-text font-bold text-base border-2 border-lavender/30 hover:border-lavender hover:bg-lavender-light transition-all duration-200"
            >
              戻る
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isCurrentStepComplete}
            className="flex-1 btn-soft py-4 text-base"
          >
            {isLastStep ? "結果を見る ✨" : "次へ →"}
          </button>
        </div>
      </div>
    </main>
  );
}
