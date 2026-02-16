import { Question } from "@/types";

/**
 * 20問の診断質問
 * 各要素に4問ずつ（うち1問は逆転項目）
 * 行動ベース・実態寄り・業界ワードなし
 */
export const questions: Question[] = [
  // ===== Motivation (価値観) × 4 =====
  {
    id: 1,
    text: "誰かの役に立っていると感じられるとき、大きなやりがいを覚える",
    dimension: "motivation",
    positive: true,
  },
  {
    id: 2,
    text: "成果が数字やランキングで見えると、もっと頑張ろうと思う",
    dimension: "motivation",
    positive: true,
  },
  {
    id: 3,
    text: "給料や待遇よりも、自分の好きなことに時間を使いたい",
    dimension: "motivation",
    positive: true,
  },
  {
    id: 4,
    text: "正直、仕事にやりがいがなくても生活が安定していれば満足だ",
    dimension: "motivation",
    positive: false,
  },

  // ===== WorkStyle (働き方志向) × 4 =====
  {
    id: 5,
    text: "一人で黙々と作業するよりも、チームで議論しながら進めたい",
    dimension: "workStyle",
    positive: true,
  },
  {
    id: 6,
    text: "マニュアルや手順書があるほうが安心して仕事できる",
    dimension: "workStyle",
    positive: false,
  },
  {
    id: 7,
    text: "自分で段取りを決めて進められる環境のほうが力を発揮できる",
    dimension: "workStyle",
    positive: true,
  },
  {
    id: 8,
    text: "複数のプロジェクトを同時に進めるのは苦にならない",
    dimension: "workStyle",
    positive: true,
  },

  // ===== Tolerance (耐性) × 4 =====
  {
    id: 9,
    text: "急な予定変更があっても、わりと柔軟に対応できるほうだ",
    dimension: "tolerance",
    positive: true,
  },
  {
    id: 10,
    text: "プレッシャーのかかる場面でも、冷静に判断できることが多い",
    dimension: "tolerance",
    positive: true,
  },
  {
    id: 11,
    text: "長時間の作業が続くと、集中力が切れてつらくなる",
    dimension: "tolerance",
    positive: false,
  },
  {
    id: 12,
    text: "知らない人と話すことに抵抗が少なく、初対面でもわりと平気だ",
    dimension: "tolerance",
    positive: true,
  },

  // ===== Interest (興味) × 4 =====
  {
    id: 13,
    text: "新しい技術やサービスが出ると、つい調べてしまう",
    dimension: "interest",
    positive: true,
  },
  {
    id: 14,
    text: "社会の仕組みや制度について考えることが好きだ",
    dimension: "interest",
    positive: true,
  },
  {
    id: 15,
    text: "ものを作ったり、形にする作業にワクワクする",
    dimension: "interest",
    positive: true,
  },
  {
    id: 16,
    text: "データや数字を分析して、傾向を見つけるのが面白い",
    dimension: "interest",
    positive: true,
  },

  // ===== Aptitude (能力感覚) × 4 =====
  {
    id: 17,
    text: "人に何かを教えたり説明したりするのが得意だと思う",
    dimension: "aptitude",
    positive: true,
  },
  {
    id: 18,
    text: "文章を書いたり、資料をまとめるのはあまり得意ではない",
    dimension: "aptitude",
    positive: false,
  },
  {
    id: 19,
    text: "計画を立てて、その通りに実行するのが得意だ",
    dimension: "aptitude",
    positive: true,
  },
  {
    id: 20,
    text: "相手の気持ちや空気を読むのは得意なほうだ",
    dimension: "aptitude",
    positive: true,
  },
];
