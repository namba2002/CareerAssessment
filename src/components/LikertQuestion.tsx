"use client";

import { Answer, Question } from "@/types";

const LIKERT_OPTIONS: { value: Answer; label: string }[] = [
  { value: 5, label: "とても当てはまる" },
  { value: 4, label: "やや当てはまる" },
  { value: 3, label: "どちらでもない" },
  { value: 2, label: "あまり当てはまらない" },
  { value: 1, label: "全く当てはまらない" },
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
  return (
    <div className="mb-8">
      <p className="text-base font-medium mb-4 leading-relaxed">
        Q{question.id}. {question.text}
      </p>
      <div className="flex flex-col gap-2">
        {LIKERT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(question.id, opt.value)}
            className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
              selected === opt.value
                ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
