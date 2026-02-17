"use client";

import { Answer, Question } from "@/types";

const LIKERT_OPTIONS: { value: Answer; label: string; emoji: string }[] = [
  { value: 5, label: "とても当てはまる", emoji: "◎" },
  { value: 4, label: "やや当てはまる", emoji: "○" },
  { value: 3, label: "どちらでもない", emoji: "△" },
  { value: 2, label: "あまり当てはまらない", emoji: "▽" },
  { value: 1, label: "全く当てはまらない", emoji: "×" },
];

interface LikertQuestionProps {
  question: Question;
  selected: Answer | undefined;
  onSelect: (questionId: number, answer: Answer) => void;
}

export function LikertQuestion({
  question,
  selected,
  onSelect,
}: LikertQuestionProps) {
  const isAnswered = selected !== undefined;

  return (
    <div
      className={`mb-6 glass-card rounded-2xl p-5 transition-all duration-300 ${
        isAnswered
          ? "border-[#6c5ce7]/30 bg-[#6c5ce7]/5"
          : ""
      }`}
    >
      <div className="flex items-start gap-3 mb-4">
        <span
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
            isAnswered
              ? "bg-[#6c5ce7] text-white"
              : "bg-white/10 text-white/50"
          }`}
        >
          {question.id}
        </span>
        <p className="text-base font-medium text-white/90 leading-relaxed pt-1">
          {question.text}
        </p>
      </div>
      <div className="flex flex-col gap-2 pl-11">
        {LIKERT_OPTIONS.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onSelect(question.id, opt.value)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 text-sm flex items-center gap-3 ${
                isSelected
                  ? "bg-gradient-to-r from-[#6c5ce7]/30 to-[#a29bfe]/20 border border-[#a29bfe]/50 text-white font-medium shadow-lg shadow-[#6c5ce7]/10"
                  : "bg-white/[0.03] border border-white/[0.06] text-white/60 hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white/80"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? "border-[#a29bfe] bg-[#6c5ce7]"
                    : "border-white/20"
                }`}
              >
                {isSelected && (
                  <span className="w-2 h-2 bg-white rounded-full" />
                )}
              </span>
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
