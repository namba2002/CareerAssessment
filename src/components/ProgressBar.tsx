"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = Math.round((current / total) * 100);
  const isComplete = current === total;

  return (
    <div className="w-full mb-8 glass rounded-2xl p-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white/90">
            {current}
            <span className="text-white/40 font-normal"> / {total} 問</span>
          </span>
        </div>
        <span
          className={`text-sm font-bold ${
            isComplete ? "text-[#00cec9]" : "text-[#a29bfe]"
          }`}
        >
          {pct}%
        </span>
      </div>
      <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete ? "bg-[#00cec9]" : "progress-gradient"
          }`}
          style={{ width: `${pct}%` }}
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
