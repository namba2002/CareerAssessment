import { IndustryProfile } from "@/types";

/**
 * 15業界の理想プロファイル
 * 各要素 0〜100 でどの程度その要素が求められるかを定義
 */
export const industries: IndustryProfile[] = [
  {
    id: "it",
    name: "IT・ソフトウェア",
    ideal: {
      motivation: 70,
      workStyle: 80,
      tolerance: 65,
      interest: 90,
      aptitude: 70,
    },
    reasons: [
      "新しい技術への好奇心が活かせる環境",
      "自分の裁量で働き方を設計しやすい",
      "論理的に問題を解く力が求められる",
    ],
    caution: "技術の変化が速く、継続的な学習が必要になる",
  },
  {
    id: "manufacturer",
    name: "メーカー（製造）",
    ideal: {
      motivation: 65,
      workStyle: 50,
      tolerance: 60,
      interest: 70,
      aptitude: 65,
    },
    reasons: [
      "ものづくりへの情熱を形にできる",
      "チームで一つの製品を作り上げる達成感",
      "安定した環境で腰を据えて働ける",
    ],
    caution: "意思決定のスピードがゆっくりな組織もある",
  },
  {
    id: "consulting",
    name: "コンサル",
    ideal: {
      motivation: 85,
      workStyle: 85,
      tolerance: 80,
      interest: 75,
      aptitude: 85,
    },
    reasons: [
      "幅広い業界の課題に触れられる",
      "短期間で多様なスキルが身につく",
      "論理的思考力を最大限に活かせる",
    ],
    caution: "成果主義が強く、プレッシャーは大きい傾向がある",
  },
  {
    id: "finance",
    name: "金融",
    ideal: {
      motivation: 75,
      workStyle: 55,
      tolerance: 75,
      interest: 65,
      aptitude: 80,
    },
    reasons: [
      "数字やデータ分析力を直接活かせる",
      "社会インフラを支えるやりがいがある",
      "専門知識が積み上がるキャリアパス",
    ],
    caution: "規制やコンプライアンスが厳しい環境がある",
  },
  {
    id: "trading",
    name: "商社",
    ideal: {
      motivation: 80,
      workStyle: 75,
      tolerance: 85,
      interest: 70,
      aptitude: 75,
    },
    reasons: [
      "グローバルなビジネスに携われる",
      "対人スキルとタフさが武器になる",
      "幅広い事業領域に関われる",
    ],
    caution: "転勤や海外赴任の可能性がある",
  },
  {
    id: "advertising",
    name: "広告・メディア",
    ideal: {
      motivation: 75,
      workStyle: 80,
      tolerance: 70,
      interest: 85,
      aptitude: 70,
    },
    reasons: [
      "クリエイティブなアイデアを形にできる",
      "トレンドに敏感な環境で刺激がある",
      "多くの人に届くものを作れる実感",
    ],
    caution: "納期に追われるスピード感がある",
  },
  {
    id: "hr",
    name: "人材",
    ideal: {
      motivation: 80,
      workStyle: 70,
      tolerance: 70,
      interest: 60,
      aptitude: 75,
    },
    reasons: [
      "人の人生に関わるやりがいがある",
      "コミュニケーション力を最大限に活かせる",
      "多くの企業・業界の知見が広がる",
    ],
    caution: "成果が数字で評価されやすい面がある",
  },
  {
    id: "healthcare",
    name: "医療・ヘルスケア",
    ideal: {
      motivation: 85,
      workStyle: 50,
      tolerance: 75,
      interest: 70,
      aptitude: 65,
    },
    reasons: [
      "人の健康や命に直接貢献できる",
      "社会的意義が大きくやりがいを感じやすい",
      "専門性が高く長期的にキャリアを築ける",
    ],
    caution: "責任が重く、精神的な負荷を感じる場面がある",
  },
  {
    id: "infrastructure",
    name: "インフラ・公共",
    ideal: {
      motivation: 70,
      workStyle: 40,
      tolerance: 60,
      interest: 55,
      aptitude: 60,
    },
    reasons: [
      "社会の基盤を支える安定感がある",
      "長期的な視点で大きなプロジェクトに関われる",
      "ワークライフバランスを重視しやすい",
    ],
    caution: "変化のスピードはゆっくりな傾向がある",
  },
  {
    id: "education",
    name: "教育",
    ideal: {
      motivation: 85,
      workStyle: 55,
      tolerance: 65,
      interest: 65,
      aptitude: 80,
    },
    reasons: [
      "人の成長を直接支えるやりがいがある",
      "教える力・伝える力を活かせる",
      "社会的意義の高い仕事に就ける",
    ],
    caution: "収益モデルの面で給与水準に限りがある場合も",
  },
  // ===== 新規追加 =====
  {
    id: "public-service",
    name: "公務員・官公庁",
    ideal: {
      motivation: 75,
      workStyle: 35,
      tolerance: 60,
      interest: 60,
      aptitude: 70,
    },
    reasons: [
      "社会全体に貢献する使命感がある",
      "安定した雇用と福利厚生が充実",
      "政策を通じて社会を変えられる",
    ],
    caution: "異動が多く、希望の部署に配属されるとは限らない",
  },
  {
    id: "freelance-it",
    name: "ITフリーランス",
    ideal: {
      motivation: 75,
      workStyle: 95,
      tolerance: 75,
      interest: 90,
      aptitude: 75,
    },
    reasons: [
      "働く場所・時間を自分で選べる自由度",
      "スキル次第で収入を大きく伸ばせる",
      "多様なプロジェクトで技術力が磨かれる",
    ],
    caution: "収入が不安定で、営業・事務も自分でこなす必要がある",
  },
  {
    id: "creative-independent",
    name: "クリエイティブ独立",
    ideal: {
      motivation: 80,
      workStyle: 90,
      tolerance: 65,
      interest: 95,
      aptitude: 75,
    },
    reasons: [
      "自分のセンスやスキルで勝負できる",
      "ポートフォリオが資産として積み上がる",
      "好きなことを仕事にできる実感がある",
    ],
    caution: "単価交渉やクライアント対応も自分で行う必要がある",
  },
  {
    id: "startup",
    name: "起業・スタートアップ",
    ideal: {
      motivation: 90,
      workStyle: 90,
      tolerance: 90,
      interest: 80,
      aptitude: 85,
    },
    reasons: [
      "自分のビジョンで事業を作れる",
      "成長スピードが圧倒的に速い環境",
      "裁量が大きく、あらゆるスキルが身につく",
    ],
    caution: "失敗リスクが高く、長時間労働になりやすい",
  },
  {
    id: "side-work",
    name: "副業・パラレルワーク",
    ideal: {
      motivation: 70,
      workStyle: 85,
      tolerance: 60,
      interest: 80,
      aptitude: 70,
    },
    reasons: [
      "本業の安定を保ちつつ新しい挑戦ができる",
      "複数の収入源でリスク分散できる",
      "自分の興味を仕事として試せる",
    ],
    caution: "時間管理が難しく、本業との両立が課題になる",
  },
];
