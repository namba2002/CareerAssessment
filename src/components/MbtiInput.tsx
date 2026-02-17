"use client";

import { MbtiInput as MbtiInputType } from "@/types";

const AXES: {
  axis: keyof MbtiInputType;
  label: string;
  icon: string;
  options: [
    { value: string; label: string; letter: string; desc: string; color: string },
    { value: string; label: string; letter: string; desc: string; color: string }
  ];
}[] = [
  {
    axis: "EI",
    label: "エネルギーの方向",
    icon: "⚡",
    options: [
      {
        value: "E",
        label: "外向型",
        letter: "E",
        desc: "人といるとエネルギーが湧く",
        color: "#fd79a8",
      },
      {
        value: "I",
        label: "内向型",
        letter: "I",
        desc: "一人の時間でリチャージする",
        color: "#6c5ce7",
      },
    ],
  },
  {
    axis: "SN",
    label: "情報の受け取り方",
    icon: "👁",
    options: [
      {
        value: "S",
        label: "感覚型",
        letter: "S",
        desc: "事実やデータを重視する",
        color: "#00cec9",
      },
      {
        value: "N",
        label: "直感型",
        letter: "N",
        desc: "可能性やアイデアに惹かれる",
        color: "#a29bfe",
      },
    ],
  },
  {
    axis: "TF",
    label: "判断のしかた",
    icon: "🧠",
    options: [
      {
        value: "T",
        label: "思考型",
        letter: "T",
        desc: "論理的に判断したい",
        color: "#0984e3",
      },
      {
        value: "F",
        label: "感情型",
        letter: "F",
        desc: "人の気持ちを大切にしたい",
        color: "#e84393",
      },
    ],
  },
  {
    axis: "JP",
    label: "生活スタイル",
    icon: "🎯",
    options: [
      {
        value: "J",
        label: "判断型",
        letter: "J",
        desc: "計画を立てて進めたい",
        color: "#fdcb6e",
      },
      {
        value: "P",
        label: "知覚型",
        letter: "P",
        desc: "柔軟にその場で対応したい",
        color: "#00b894",
      },
    ],
  },
];

interface MbtiInputProps {
  value: MbtiInputType;
  onChange: (value: MbtiInputType) => void;
}

export function MbtiInputComponent({ value, onChange }: MbtiInputProps) {
  const selectedType = `${value.EI || "?"}${value.SN || "?"}${value.TF || "?"}${value.JP || "?"}`;
  const completedAxes = [value.EI, value.SN, value.TF, value.JP].filter(Boolean).length;

  return (
    <div className="glass rounded-2xl p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">あなたのMBTIタイプ</h2>
          <p className="text-sm text-white/50 mt-1">
            4つの軸で自分に近いほうを選択
          </p>
        </div>
        <div className="text-right">
          <p
            className={`text-2xl font-black tracking-[0.15em] ${
              completedAxes === 4 ? "gradient-text" : "text-white/30"
            }`}
          >
            {selectedType}
          </p>
          <p className="text-xs text-white/30 mt-0.5">{completedAxes}/4 選択済み</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {AXES.map(({ axis, label, icon, options }) => (
          <div key={axis}>
            <p className="text-xs font-medium text-white/40 mb-2 flex items-center gap-1.5">
              <span>{icon}</span>
              {label}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => {
                const isSelected = value[axis] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() =>
                      onChange({
                        ...value,
                        [axis]: opt.value,
                      })
                    }
                    className={`relative px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
                      isSelected
                        ? "border-2 shadow-lg"
                        : "border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/[0.15]"
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: opt.color,
                            background: `linear-gradient(135deg, ${opt.color}15, ${opt.color}08)`,
                            boxShadow: `0 4px 20px ${opt.color}25`,
                          }
                        : undefined
                    }
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-lg font-black"
                        style={{ color: isSelected ? opt.color : "rgba(255,255,255,0.5)" }}
                      >
                        {opt.letter}
                      </span>
                      <span
                        className={`text-sm font-bold ${
                          isSelected ? "text-white" : "text-white/60"
                        }`}
                      >
                        {opt.label}
                      </span>
                    </div>
                    <span
                      className={`text-xs ${
                        isSelected ? "text-white/70" : "text-white/35"
                      }`}
                    >
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
