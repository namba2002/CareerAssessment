"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Answer, DiagnosisState, MbtiInput } from "@/types";
import { questions } from "@/data/questions";
import { ProgressBar } from "@/components/ProgressBar";
import { LikertQuestion } from "@/components/LikertQuestion";
import { MbtiInputComponent } from "@/components/MbtiInput";

const INITIAL_MBTI: MbtiInput = { EI: null, SN: null, TF: null, JP: null };

export default function DiagnosisPage() {
  const router = useRouter();
  const [state, setState] = useState<DiagnosisState>({
    answers: {},
    mbti: INITIAL_MBTI,
  });
  const [showMbti, setShowMbti] = useState(false);

  const answeredCount = Object.keys(state.answers).length;
  const allAnswered = answeredCount === questions.length;

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
    if (!allAnswered) return;
    sessionStorage.setItem("diagnosis_answers", JSON.stringify(state.answers));
    sessionStorage.setItem("diagnosis_mbti", JSON.stringify(state.mbti));
    router.push("/result");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black mb-2">業界診断</h1>
          <p className="text-sm text-gray-500">
            20問の質問に答えて、あなたに合う業界を見つけよう
          </p>
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

        {/* MBTI セクション */}
        <div className="mt-8 border-t border-gray-200 pt-8">
          {!showMbti ? (
            <button
              onClick={() => setShowMbti(true)}
              className="w-full py-3 px-4 border border-purple-300 text-purple-600 rounded-xl bg-purple-50 hover:bg-purple-100 transition text-sm font-medium"
            >
              MBTIを入力する（任意・知っている方のみ）
            </button>
          ) : (
            <MbtiInputComponent
              value={state.mbti}
              onChange={handleMbtiChange}
            />
          )}
        </div>

        {/* 結果を見るボタン */}
        <div className="mt-8 pb-12">
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
              allAnswered
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {allAnswered
              ? "結果を見る"
              : `あと ${questions.length - answeredCount} 問`}
          </button>
          {!allAnswered && (
            <p className="text-xs text-gray-400 text-center mt-2">
              全ての質問に回答すると結果が見られます
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
