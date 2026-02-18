"use client";

import { DimensionScores, DIMENSIONS, Dimension } from "@/types";

const SPECTRUM_LABELS: Record<Dimension, { left: string; right: string }> = {
  motivation: { left: "安定・着実", right: "挑戦・やりがい" },
  workStyle: { left: "チーム・組織型", right: "自由・裁量型" },
  tolerance: { left: "穏やか・マイペース", right: "高プレッシャー対応" },
  interest: { left: "専門特化", right: "幅広い好奇心" },
  aptitude: { left: "専門スキル深堀り", right: "マルチスキル活用" },
};

const BAR_COLORS: string[] = [
  "bg-lavender",
  "bg-mint",
  "bg-peach",
  "bg-pink",
  "bg-sky",
];

interface SpectrumChartProps {
  scores: DimensionScores;
}

/**
 * 5軸スペクトラムバー — MBTI風の両極表示
 * 50が中央、左寄り/右寄りで志向の方向性を表現
 */
export function RadarChart({ scores }: SpectrumChartProps) {
  return (
    <div className="space-y-4">
      {DIMENSIONS.map((dim, i) => {
        const value = Math.round(scores[dim]);
        const labels = SPECTRUM_LABELS[dim];
        const color = BAR_COLORS[i];

        return (
          <div key={dim}>
            {/* 左右ラベル */}
            <div className="flex justify-between text-[11px] font-bold text-text-light mb-1.5">
              <span>{labels.left}</span>
              <span>{labels.right}</span>
            </div>

            {/* バー */}
            <div className="relative h-3 bg-bg rounded-full overflow-hidden border border-lavender/20">
              {/* 中央線 */}
              <div className="absolute left-1/2 top-0 w-px h-full bg-text-light/30 z-10" />

              {/* 値バー: 50%を起点に左右に伸びる（最低2%幅を確保） */}
              {value >= 50 ? (
                <div
                  className={`absolute top-0 h-full ${color} rounded-r-full transition-all duration-700`}
                  style={{
                    left: "50%",
                    width: `${Math.max(2, value - 50)}%`,
                  }}
                />
              ) : (
                <div
                  className={`absolute top-0 h-full ${color} rounded-l-full transition-all duration-700`}
                  style={{
                    right: "50%",
                    width: `${Math.max(2, 50 - value)}%`,
                  }}
                />
              )}

              {/* マーカー */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full border-2 border-white ${color} shadow-sm z-20 transition-all duration-700`}
                style={{ left: `calc(${value}% - 7px)` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
