"use client";

import { JobResult } from "@/types";

const RANK_STYLES = [
  { gradient: "from-lavender to-pink", badge: "bg-lavender", emoji: "🥇", label: "No.1" },
  { gradient: "from-mint to-sky", badge: "bg-mint", emoji: "🥈", label: "No.2" },
  { gradient: "from-peach to-yellow", badge: "bg-peach", emoji: "🥉", label: "No.3" },
  { gradient: "from-sky to-mint", badge: "bg-sky", emoji: "✦", label: "No.4" },
  { gradient: "from-pink to-lavender", badge: "bg-pink", emoji: "✦", label: "No.5" },
];

interface JobRankingCardProps {
  result: JobResult;
  rank: number;
}

export function JobRankingCard({ result, rank }: JobRankingCardProps) {
  const style = RANK_STYLES[rank] ?? RANK_STYLES[4];
  const delay = `stagger-${rank + 1}`;

  return (
    <div className={`card-soft mb-4 overflow-hidden anim-float-up ${delay}`}>
      {/* Top gradient bar */}
      <div className={`h-1.5 bg-gradient-to-r ${style.gradient}`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`${style.badge} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
          >
            {style.emoji} {style.label}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-black truncate">{result.job.name}</h3>
            <p className="text-xs text-text-light">{result.industryName}</p>
          </div>
          <span className="text-2xl font-black text-lavender shrink-0">
            {result.score}
            <span className="text-xs font-normal text-text-light ml-0.5">pt</span>
          </span>
        </div>

        {/* Description */}
        <div className="mb-3 bg-lavender-light/50 rounded-xl p-3">
          <p className="text-sm leading-relaxed">{result.description}</p>
        </div>

        {/* Match reasons */}
        <div className="mb-3">
          <p className="text-xs font-bold text-text-light mb-1.5">
            あなたと合うポイント
          </p>
          <ul className="text-sm space-y-1">
            {result.matchReasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-mint shrink-0">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Caution */}
        <div>
          <p className="text-xs font-bold text-text-light mb-1">注意点</p>
          <p className="text-sm text-peach font-bold">{result.caution}</p>
        </div>
      </div>
    </div>
  );
}
