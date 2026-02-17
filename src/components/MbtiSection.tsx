"use client";

import { MbtiTypeData } from "@/types";

interface MbtiSectionProps {
  data: MbtiTypeData;
}

export function MbtiSection({ data }: MbtiSectionProps) {
  return (
    <div className="glass rounded-2xl p-6 border-[#6c5ce7]/20 animate-scale-in">
      {/* Type Header */}
      <div className="text-center mb-6">
        <p className="text-xs text-[#a29bfe] font-medium tracking-wider uppercase mb-2">
          Your MBTI Type
        </p>
        <p className="text-4xl font-black tracking-[0.2em] gradient-text mb-1">
          {data.type}
        </p>
        <p className="text-lg font-bold text-[#a29bfe]">{data.label}</p>
      </div>

      {/* Traits */}
      <div className="mb-5">
        <h4 className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">
          Tendencies
        </h4>
        <ul className="space-y-2">
          {data.traits.map((t, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-white/70"
            >
              <span className="text-[#a29bfe] shrink-0 mt-0.5">&#9679;</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Strengths */}
      <div className="mb-5">
        <h4 className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">
          Strengths
        </h4>
        <div className="flex flex-wrap gap-2">
          {data.strengths.map((s, i) => (
            <span
              key={i}
              className="chip bg-[#00cec9]/10 text-[#00cec9] border-[#00cec9]/20"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Pitfalls */}
      <div className="mb-5">
        <h4 className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">
          Pitfalls
        </h4>
        <ul className="space-y-2">
          {data.pitfalls.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-white/60"
            >
              <span className="text-[#fd79a8] shrink-0 mt-0.5">&#9650;</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Good Environments */}
      <div className="mb-5">
        <h4 className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">
          Best Environments
        </h4>
        <div className="flex flex-wrap gap-2">
          {data.goodEnvironments.map((e, i) => (
            <span
              key={i}
              className="chip bg-[#0984e3]/10 text-[#74b9ff] border-[#0984e3]/20"
            >
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* Job Tags */}
      <div className="mb-5">
        <h4 className="text-xs font-bold text-white/40 mb-2 uppercase tracking-wider">
          Compatible Jobs
        </h4>
        <div className="flex flex-wrap gap-2">
          {data.jobTags.map((j, i) => (
            <span
              key={i}
              className="chip bg-[#6c5ce7]/15 text-[#a29bfe] border-[#6c5ce7]/25 font-medium"
            >
              #{j}
            </span>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#6c5ce7]/10 to-[#a29bfe]/5 border border-[#6c5ce7]/15">
        <p className="text-sm text-white/70">
          <span className="font-bold text-[#a29bfe]">Tip：</span>
          {data.tip}
        </p>
      </div>

      <p className="text-xs text-white/20 mt-4 text-center">
        ※ MBTIは自己申告に基づくため、あくまで傾向の参考としてご覧ください
      </p>
    </div>
  );
}
