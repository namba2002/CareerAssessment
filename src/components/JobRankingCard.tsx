"use client";

import { JobResult } from "@/types";

const RANK_STYLES = [
  {
    gradient: "from-[#ffeaa7] to-[#fdcb6e]",
    glow: "shadow-[#ffeaa7]/25",
    scoreColor: "text-[#ffeaa7]",
    bg: "bg-[#ffeaa7]/5",
    border: "border-[#ffeaa7]/20",
  },
  {
    gradient: "from-[#b2bec3] to-[#636e72]",
    glow: "shadow-[#b2bec3]/15",
    scoreColor: "text-[#b2bec3]",
    bg: "bg-[#b2bec3]/5",
    border: "border-[#b2bec3]/15",
  },
  {
    gradient: "from-[#fd79a8] to-[#e84393]",
    glow: "shadow-[#fd79a8]/15",
    scoreColor: "text-[#fd79a8]",
    bg: "bg-[#fd79a8]/5",
    border: "border-[#fd79a8]/15",
  },
  {
    gradient: "from-[#00cec9] to-[#0984e3]",
    glow: "shadow-[#00cec9]/15",
    scoreColor: "text-[#00cec9]",
    bg: "bg-[#00cec9]/5",
    border: "border-[#00cec9]/15",
  },
  {
    gradient: "from-[#a29bfe] to-[#6c5ce7]",
    glow: "shadow-[#a29bfe]/15",
    scoreColor: "text-[#a29bfe]",
    bg: "bg-[#a29bfe]/5",
    border: "border-[#a29bfe]/15",
  },
];

interface JobRankingCardProps {
  result: JobResult;
  rank: number;
}

export function JobRankingCard({ result, rank }: JobRankingCardProps) {
  const style = RANK_STYLES[rank] ?? {
    gradient: "from-white/20 to-white/10",
    glow: "",
    scoreColor: "text-white/50",
    bg: "bg-white/3",
    border: "border-white/8",
  };

  return (
    <div
      className={`flex items-center gap-4 glass-card rounded-2xl p-4 mb-3 ${style.border} animate-fade-in-up`}
      style={{ animationDelay: `${rank * 100}ms` }}
    >
      {/* Rank Badge */}
      <span
        className={`rank-badge text-white text-sm font-black w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${style.gradient} shadow-lg ${style.glow}`}
      >
        {rank + 1}
      </span>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-bold text-white truncate">
          {result.job.name}
        </p>
        <p className="text-xs text-white/35">{result.industryName}</p>
      </div>

      {/* Score */}
      <div className="text-right shrink-0">
        <span className={`text-xl font-black ${style.scoreColor}`}>
          {result.score}
        </span>
        <span className="text-xs text-white/25 ml-0.5">pt</span>
      </div>
    </div>
  );
}
