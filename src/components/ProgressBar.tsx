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
        {pct > 0 && !isComplete && (
          <div
            className="absolute top-0 h-full w-8 rounded-full"
            style={{
              left: `calc(${pct}% - 16px)`,
              background:
                "radial-gradient(circle, rgba(162,155,254,0.6) 0%, transparent 70%)",
              filter: "blur(4px)",
            }}
          />
        )}
      </div>
      {isComplete && (
        <p className="text-xs text-[#00cec9] text-center mt-2 font-medium animate-fade-in">
          全問回答完了！
        </p>
      )}
    </div>
  );
}
