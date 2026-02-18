"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="w-full mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm font-bold text-text-light">
          {current} / {total} 問
        </span>
        <span className="text-lg font-bold text-lavender">{pct}%</span>
      </div>
      <div className="w-full h-3 bg-lavender-light rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #C4B0FF, #FF8FAB)",
          }}
        />
      </div>
    </div>
  );
}
