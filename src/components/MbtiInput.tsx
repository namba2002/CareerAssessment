"use client";

import { MbtiInput as MbtiInputType } from "@/types";

const AXES: {
  axis: keyof MbtiInputType;
  label: string;
  emoji: string;
  color: string;
  selectedBg: string;
  options: [
    { value: string; letter: string; desc: string },
    { value: string; letter: string; desc: string }
  ];
}[] = [
  {
    axis: "EI",
    label: "エネルギーの方向",
    emoji: "💫",
    color: "border-lavender",
    selectedBg: "bg-lavender-light",
    options: [
      { value: "E", letter: "E 外向", desc: "人といるとエネルギーが湧く" },
      { value: "I", letter: "I 内向", desc: "一人の時間でリチャージする" },
    ],
  },
  {
    axis: "SN",
    label: "情報の受け取り方",
    emoji: "🔮",
    color: "border-mint",
    selectedBg: "bg-mint-light",
    options: [
      { value: "S", letter: "S 感覚", desc: "事実やデータを重視する" },
      { value: "N", letter: "N 直感", desc: "可能性やアイデアに惹かれる" },
    ],
  },
  {
    axis: "TF",
    label: "判断のしかた",
    emoji: "💝",
    color: "border-peach",
    selectedBg: "bg-peach-light",
    options: [
      { value: "T", letter: "T 思考", desc: "論理的に判断したい" },
      { value: "F", letter: "F 感情", desc: "人の気持ちを大切にしたい" },
    ],
  },
  {
    axis: "JP",
    label: "生活スタイル",
    emoji: "🌸",
    color: "border-pink",
    selectedBg: "bg-pink-light",
    options: [
      { value: "J", letter: "J 判断", desc: "計画を立てて進めたい" },
      { value: "P", letter: "P 知覚", desc: "柔軟にその場で対応したい" },
    ],
  },
];

interface MbtiInputProps {
  value: MbtiInputType;
  onChange: (value: MbtiInputType) => void;
}

export function MbtiInputComponent({ value, onChange }: MbtiInputProps) {
  const preview = [
    value.EI || "?",
    value.SN || "?",
    value.TF || "?",
    value.JP || "?",
  ].join("");

  const allSelected =
    value.EI && value.SN && value.TF && value.JP;

  return (
    <div className="mb-6">
      {/* Live preview */}
      <div className="text-center mb-6">
        <p className="text-xs font-bold text-text-light mb-1">あなたのタイプ</p>
        <p
          className={`text-4xl font-black tracking-[0.2em] transition-colors duration-300 ${
            allSelected ? "text-lavender" : "text-text-light/40"
          }`}
        >
          {preview}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {AXES.map(({ axis, label, emoji, color, selectedBg, options }) => (
          <div key={axis}>
            <p className="text-sm font-bold text-text mb-2">
              {emoji} {label}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => {
                const isSelected = value[axis] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => onChange({ ...value, [axis]: opt.value })}
                    className={`px-4 py-3 rounded-2xl text-left text-sm transition-all duration-200 border-2 ${
                      isSelected
                        ? `${color} ${selectedBg} font-bold shadow-md`
                        : "border-transparent bg-bg hover:border-lavender/30 hover:bg-lavender-light/30"
                    }`}
                  >
                    <span className="font-bold text-base block">{opt.letter}</span>
                    <span className="text-xs text-text-light">{opt.desc}</span>
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
