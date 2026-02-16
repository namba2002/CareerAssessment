"use client";

import { IndustryResult } from "@/types";

const RANK_COLORS = [
  "from-yellow-400 to-amber-500", // 1st
  "from-gray-300 to-gray-400",    // 2nd
  "from-orange-300 to-orange-400", // 3rd
];

const RANK_LABELS = ["1st", "2nd", "3rd"];

interface RankingCardProps {
  result: IndustryResult;
  rank: number; // 0-indexed
}

export function RankingCard({ result, rank }: RankingCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 mb-4 bg-white shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <span
          className={`text-white text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${
            RANK_COLORS[rank] ?? "from-gray-200 to-gray-300"
          }`}
        >
          {RANK_LABELS[rank] ?? `${rank + 1}th`}
        </span>
        <h3 className="text-lg font-bold">{result.industry.name}</h3>
        <span className="ml-auto text-2xl font-bold text-blue-600">
          {result.score}
          <span className="text-sm font-normal text-gray-400">pt</span>
        </span>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-500 mb-1">
          あなたと合うポイント
        </p>
        <ul className="text-sm text-gray-700 space-y-1">
          {result.matchedReasons.map((r, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-blue-500 mt-0.5">&#x2713;</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-gray-500 mb-1">注意点</p>
        <p className="text-sm text-orange-600">{result.caution}</p>
      </div>

      <div>
        <p className="text-xs font-semibold text-gray-500 mb-1">
          見るべき職種例
        </p>
        <div className="flex gap-2">
          {result.exampleJobs.map((job, i) => (
            <span
              key={i}
              className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
            >
              {job}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
