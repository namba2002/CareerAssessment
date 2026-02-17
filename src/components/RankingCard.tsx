"use client";

import { IndustryResult } from "@/types";

const RANK_STYLES = [
  {
    gradient: "from-[#ffeaa7] to-[#fdcb6e]",
    label: "1st",
    glow: "shadow-[#ffeaa7]/20",
    border: "border-[#ffeaa7]/30",
    textColor: "text-[#ffeaa7]",
  },
  {
    gradient: "from-[#b2bec3] to-[#636e72]",
    label: "2nd",
    glow: "shadow-[#b2bec3]/15",
    border: "border-[#b2bec3]/20",
    textColor: "text-[#b2bec3]",
  },
  {
    gradient: "from-[#fd79a8] to-[#e84393]",
    label: "3rd",
    glow: "shadow-[#fd79a8]/15",
    border: "border-[#fd79a8]/20",
    textColor: "text-[#fd79a8]",
  },
];

interface RankingCardProps {
  result: IndustryResult;
  rank: number;
}

export function RankingCard({ result, rank }: RankingCardProps) {
  const style = RANK_STYLES[rank] ?? {
    gradient: "from-white/20 to-white/10",
    label: `${rank + 1}th`,
    glow: "",
    border: "border-white/10",
    textColor: "text-white/60",
  };

  return (
    <div
      className={`glass-card rounded-2xl p-5 mb-4 ${style.border} animate-fade-in-up`}
      style={{ animationDelay: `${rank * 150}ms` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={`rank-badge text-white text-xs font-black px-3.5 py-1.5 rounded-full bg-gradient-to-r ${style.gradient} shadow-lg ${style.glow}`}
        >
          {style.label}
        </span>
        <h3 className="text-lg font-bold text-white flex-1">
          {result.industry.name}
        </h3>
        <div className="text-right">
          <span className={`text-2xl font-black ${style.textColor}`}>
            {result.score}
          </span>
          <span className="text-xs text-white/30 ml-0.5">pt</span>
        </div>
      </div>

      {/* Match Reasons */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-white/30 mb-2 uppercase tracking-wider">
          Match Points
        </p>
        <ul className="space-y-1.5">
          {result.matchedReasons.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-[#00cec9] mt-0.5 shrink-0">&#x2713;</span>
              <span className="text-white/70">{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Caution */}
      <div className="mb-4 p-3 rounded-xl bg-[#fd79a8]/5 border border-[#fd79a8]/15">
        <p className="text-xs font-semibold text-[#fd79a8]/60 mb-1 uppercase tracking-wider">
          Caution
        </p>
        <p className="text-sm text-[#fd79a8]/80">{result.caution}</p>
      </div>

      {/* Top Jobs */}
      <div>
        <p className="text-xs font-semibold text-white/30 mb-2 uppercase tracking-wider">
          Top Jobs
        </p>
        <div className="flex flex-wrap gap-2">
          {result.topJobs.map((jr) => (
            <span
              key={jr.job.id}
              className="chip bg-[#6c5ce7]/10 text-[#a29bfe] border-[#6c5ce7]/20"
            >
              {jr.job.name}
              <span className="text-white/25 ml-1.5">{jr.score}pt</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
