"use client";

import { MbtiInput as MbtiInputType } from "@/types";

const AXES: {
  axis: keyof MbtiInputType;
  label: string;
  options: [
    { value: string; label: string; desc: string },
    { value: string; label: string; desc: string }
  ];
}[] = [
  {
    axis: "EI",
    label: "エネルギーの方向",
    options: [
      { value: "E", label: "E（外向）", desc: "人といるとエネルギーが湧く" },
      { value: "I", label: "I（内向）", desc: "一人の時間でリチャージする" },
    ],
  },
  {
    axis: "SN",
    label: "情報の受け取り方",
    options: [
      { value: "S", label: "S（感覚）", desc: "事実やデータを重視する" },
      { value: "N", label: "N（直感）", desc: "可能性やアイデアに惹かれる" },
    ],
  },
  {
    axis: "TF",
    label: "判断のしかた",
    options: [
      { value: "T", label: "T（思考）", desc: "論理的に判断したい" },
      { value: "F", label: "F（感情）", desc: "人の気持ちを大切にしたい" },
    ],
  },
  {
    axis: "JP",
    label: "生活スタイル",
    options: [
      { value: "J", label: "J（判断）", desc: "計画を立てて進めたい" },
      { value: "P", label: "P（知覚）", desc: "柔軟にその場で対応したい" },
    ],
  },
];

interface MbtiInputProps {
  value: MbtiInputType;
  onChange: (value: MbtiInputType) => void;
}

export function MbtiInputComponent({ value, onChange }: MbtiInputProps) {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-bold mb-2">MBTI（任意）</h2>
      <p className="text-sm text-gray-500 mb-4">
        知っている方だけ。分からない場合はスキップしてOKです。
      </p>
      <div className="flex flex-col gap-4">
        {AXES.map(({ axis, label, options }) => (
          <div key={axis}>
            <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
            <div className="grid grid-cols-2 gap-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    onChange({
                      ...value,
                      [axis]: value[axis] === opt.value ? null : opt.value,
                    })
                  }
                  className={`px-3 py-3 rounded-lg border text-sm transition-all ${
                    value[axis] === opt.value
                      ? "border-purple-500 bg-purple-50 text-purple-700 font-medium"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="font-bold">{opt.label}</span>
                  <br />
                  <span className="text-xs text-gray-500">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
