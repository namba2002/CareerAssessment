"use client";

import { JobResult } from "@/types";

const RANK_COLORS = [
  "from-yellow-400 to-amber-500",
  "from-gray-300 to-gray-400",
  "from-orange-300 to-orange-400",
  "from-blue-300 to-blue-400",
  "from-green-300 to-green-400",
];

interface JobRankingCardProps {
  result: JobResult;
  rank: number;
}

export function JobRankingCard({ result, rank }: JobRankingCardProps) {
  return (
    <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 mb-3 bg-white shadow-sm">
      <span
        className={`text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r ${
          RANK_COLORS[rank] ?? "from-gray-200 to-gray-300"
        }`}
      >
        {rank + 1}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold truncate">{result.job.name}</p>
        <p className="text-xs text-gray-500">{result.industryName}</p>
      </div>
      <span className="text-xl font-bold text-blue-600 shrink-0">
        {result.score}
        <span className="text-sm font-normal text-gray-400">pt</span>
      </span>
    </div>
  );
}
