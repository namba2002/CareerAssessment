"use client";

import { MbtiTypeData } from "@/types";

interface MbtiSectionProps {
  data: MbtiTypeData;
}

export function MbtiSection({ data }: MbtiSectionProps) {
  return (
    <div className="border border-purple-200 rounded-xl p-5 bg-gradient-to-b from-purple-50 to-white shadow-sm">
      <div className="text-center mb-4">
        <p className="text-sm text-purple-500 font-medium mb-1">
          あなたのMBTI
        </p>
        <p className="text-3xl font-black tracking-widest text-purple-700">
          {data.type}
        </p>
        <p className="text-base font-bold text-purple-600 mt-1">
          {data.label}
        </p>
      </div>

      {/* あるある傾向 */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-700 mb-2">
          こんな傾向ありませんか？
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {data.traits.map((t, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-purple-400 shrink-0">&#9679;</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 強み */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-700 mb-2">強み</h4>
        <div className="flex flex-wrap gap-2">
          {data.strengths.map((s, i) => (
            <span
              key={i}
              className="text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full border border-green-200"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* つまずきやすい点 */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-700 mb-2">
          つまずきやすい点
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {data.pitfalls.map((p, i) => (
            <li key={i} className="flex items-start gap-1.5">
              <span className="text-orange-400 shrink-0">&#9650;</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 合いそうな環境 */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-700 mb-2">
          合いそうな環境
        </h4>
        <div className="flex flex-wrap gap-2">
          {data.goodEnvironments.map((e, i) => (
            <span
              key={i}
              className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200"
            >
              {e}
            </span>
          ))}
        </div>
      </div>

      {/* 相性が良い職種タグ */}
      <div className="mb-4">
        <h4 className="text-sm font-bold text-gray-700 mb-2">
          相性が良さそうな職種
        </h4>
        <div className="flex flex-wrap gap-2">
          {data.jobTags.map((j, i) => (
            <span
              key={i}
              className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium"
            >
              #{j}
            </span>
          ))}
        </div>
      </div>

      {/* ワンポイント */}
      <div className="bg-purple-50 border border-purple-100 rounded-lg p-3">
        <p className="text-sm text-purple-700">
          <span className="font-bold">仕事選びのワンポイント：</span>
          {data.tip}
        </p>
      </div>

      <p className="text-xs text-gray-400 mt-3 text-center">
        ※ MBTIは自己申告に基づくため、あくまで傾向の参考としてご覧ください
      </p>
    </div>
  );
}
