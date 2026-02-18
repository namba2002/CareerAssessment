"use client";

import { Answer, Question } from "@/types";

const LIKERT_OPTIONS: { value: Answer; label: string }[] = [
  { value: 1, label: "全く当てはまらない" },
  { value: 2, label: "あまり当てはまらない" },
  { value: 3, label: "どちらでもない" },
  { value: 4, label: "やや当てはまる" },
  { value: 5, label: "とても当てはまる" },
];

const CIRCLE_COLORS = [
  "bg-peach",
  "bg-peach/60",
  "bg-text-light/30",
  "bg-lavender/60",
  "bg-lavender",
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
    <div className="mb-8 card-soft p-5">
      <p className="text-sm font-bold mb-4 leading-relaxed">
        <span className="text-lavender mr-1.5">Q{question.id}.</span>
        {question.text}
      </p>

      {/* Horizontal scale */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-text-light w-10 text-center leading-tight shrink-0">
          全く
          <br />
          そう思わない
        </span>
        <div className="flex items-center gap-2.5 flex-1 justify-center">
          {LIKERT_OPTIONS.map((opt, idx) => {
            const isSelected = selected === opt.value;
            const size = opt.value === 3 ? "w-8 h-8" : "w-10 h-10";
            return (
              <button
                key={opt.value}
                onClick={() => onSelect(question.id, opt.value)}
                className={`${size} rounded-full transition-all duration-200 flex items-center justify-center text-xs font-bold ${
                  isSelected
                    ? `${CIRCLE_COLORS[idx]} text-white scale-110 shadow-md`
                    : "bg-bg text-text-light hover:bg-lavender-light"
                }`}
                title={opt.label}
              >
                {opt.value}
              </button>
            );
          })}
        </div>
        <span className="text-[10px] text-text-light w-10 text-center leading-tight shrink-0">
          とても
          <br />
          そう思う
        </span>
      </div>
    </div>
  );
}
