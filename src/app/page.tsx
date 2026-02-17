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

  // 説明画面
  if (!started) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black mb-4">MBTI職業診断</h1>
            <p className="text-base text-gray-600 leading-relaxed">
              この診断では、あなたの<span className="font-bold text-purple-600">MBTIタイプ</span>と
              <span className="font-bold text-blue-600">5つの軸</span>を組み合わせて、
              あなたに適した職種と業界を提案します。
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
            <h2 className="text-sm font-bold text-gray-700 mb-3">診断で測定する5つの軸</h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold shrink-0">1.</span>
                <span><span className="font-medium">価値観</span> ─ 仕事に何を求めるか</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold shrink-0">2.</span>
                <span><span className="font-medium">働き方志向</span> ─ どんなスタイルで働きたいか</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold shrink-0">3.</span>
                <span><span className="font-medium">耐性</span> ─ プレッシャーや変化への適応力</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold shrink-0">4.</span>
                <span><span className="font-medium">興味</span> ─ どんな分野に惹かれるか</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 font-bold shrink-0">5.</span>
                <span><span className="font-medium">能力感覚</span> ─ 自分が得意だと感じること</span>
              </li>
            </ul>
          </div>

          <div className="bg-purple-50 rounded-xl border border-purple-200 p-5 mb-8 shadow-sm">
            <h2 className="text-sm font-bold text-purple-700 mb-2">MBTIとの統合</h2>
            <p className="text-sm text-purple-600 leading-relaxed">
              5つの軸のスコアに加えて、MBTIの性格タイプから読み取れる特性を統合的に分析し、
              あなたに最もフィットする職種と業界をランキング形式で提示します。
            </p>
          </div>

          <button
            onClick={() => setStarted(true)}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
          >
            診断を始める
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            所要時間：約3〜5分 / 全20問 + MBTIタイプ入力
          </p>
        </div>
      </main>
    );
  }

  // 診断画面
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black mb-2">MBTI職業診断</h1>
          <p className="text-sm text-gray-500">
            20問の質問とMBTIタイプから、あなたに合う職種を見つけよう
          </p>
        </div>

        {/* MBTI セクション（最初に表示） */}
        <div className="mb-8">
          <MbtiInputComponent
            value={state.mbti}
            onChange={handleMbtiChange}
          />
          {!mbtiComplete && (
            <p className="text-xs text-orange-500 text-center">
              4つの軸すべてを選択してください
            </p>
          )}
        </div>

        {/* 進捗バー */}
        <ProgressBar current={answeredCount} total={questions.length} />

        {/* 質問一覧 */}
        <div>
          {questions.map((q) => (
            <LikertQuestion
              key={q.id}
              question={q}
              selected={state.answers[q.id]}
              onSelect={handleAnswer}
            />
          ))}
        </div>

        {/* 結果を見るボタン */}
        <div className="mt-8 pb-12">
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              canSubmit
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {canSubmit
              ? "結果を見る"
              : !mbtiComplete
                ? "MBTIタイプを選択してください"
                : `あと ${questions.length - answeredCount} 問`}
          </button>
          {!canSubmit && allAnswered && !mbtiComplete && (
            <p className="text-xs text-orange-500 text-center mt-2">
              MBTIタイプの選択が必要です
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
