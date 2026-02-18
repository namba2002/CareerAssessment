"use client";

import { IndustryResult } from "@/types";

const RANK_STYLES = [
  { gradient: "from-lavender to-pink", badge: "bg-lavender", emoji: "🥇" },
  { gradient: "from-mint to-sky", badge: "bg-mint", emoji: "🥈" },
  { gradient: "from-peach to-yellow", badge: "bg-peach", emoji: "🥉" },
];

interface RankingCardProps {
  result: IndustryResult;
  rank: number;
}

export function RankingCard({ result, rank }: RankingCardProps) {
  const style = RANK_STYLES[rank] ?? RANK_STYLES[2];
  const delay = `stagger-${rank + 1}`;

  return (
    <div className={`card-soft mb-4 overflow-hidden anim-float-up ${delay}`}>
      {/* Top gradient bar */}
      <div
        className="h-1.5"
        style={{
          background:
            rank === 0
              ? "linear-gradient(90deg, #C4B0FF, #FF8FAB)"
              : rank === 1
                ? "linear-gradient(90deg, #7EDDB8, #93D3F5)"
                : "linear-gradient(90deg, #FFB5A7, #FFE066)",
        }}
      />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`${style.badge} text-white text-xs font-bold px-2.5 py-1 rounded-full`}
          >
            {style.emoji} {RANK_LABELS[rank] ?? `${rank + 1}th`}
          </span>
          <h3 className="text-base font-black flex-1">{result.industry.name}</h3>
          <span className="text-2xl font-black text-lavender">
            {result.score}
            <span className="text-xs font-normal text-text-light ml-0.5">
              pt
            </span>
          </span>
        </div>

        {/* Match reasons */}
        <div className="mb-3">
          <p className="text-xs font-bold text-text-light mb-1.5">
            あなたと合うポイント
          </p>
          <ul className="text-sm space-y-1">
            {result.matchedReasons.map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-mint shrink-0">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Caution */}
        <div className="mb-3">
          <p className="text-xs font-bold text-text-light mb-1">注意点</p>
          <p className="text-sm text-peach font-bold">{result.caution}</p>
        </div>

        {/* Top matching jobs */}
        <div>
          <p className="text-xs font-bold text-text-light mb-1.5">
            マッチする職種
          </p>
          <div className="flex flex-wrap gap-2">
            {result.topJobs.map((jr) => (
              <span
                key={jr.job.id}
                className="text-xs bg-lavender-light text-lavender px-3 py-1 rounded-full font-bold"
              >
                {jr.job.name}（{jr.score}pt）
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
