// ===== 診断要素 =====
export const DIMENSIONS = [
  "motivation",
  "workStyle",
  "tolerance",
  "interest",
  "aptitude",
] as const;
export type Dimension = (typeof DIMENSIONS)[number];

// ===== 質問 =====
export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  /** true = 高スコア＝当てはまる方がプラス, false = 逆転項目 */
  positive: boolean;
}

// ===== 回答 (1〜5 の Likert) =====
export type Answer = 1 | 2 | 3 | 4 | 5;

// ===== 5要素スコア (0〜100) =====
export type DimensionScores = Record<Dimension, number>;

// ===== 業界プロファイル =====
export interface IndustryProfile {
  id: string;
  name: string;
  /** 理想プロファイル (0〜100) */
  ideal: DimensionScores;
  reasons: string[];
  caution: string;
}

// ===== 職種プロファイル =====
export interface JobProfile {
  id: string;
  name: string;
  industryId: string;
  /** 職種固有の理想プロファイル (0〜100) */
  ideal: DimensionScores;
  /** この職種ならではの一言説明 */
  tagline: string;
}

// ===== 職種マッチ結果 =====
export interface JobResult {
  job: JobProfile;
  industryName: string;
  score: number;
  matchReasons: string[];
  caution: string;
  description: string;
}

// ===== 業界ランキング結果 =====
export interface IndustryResult {
  industry: IndustryProfile;
  score: number;
  matchedReasons: string[];
  caution: string;
  topJobs: JobResult[];
}

// ===== MBTI =====
export type MbtiAxis = "EI" | "SN" | "TF" | "JP";
export type MbtiPole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface MbtiInput {
  EI: "E" | "I" | null;
  SN: "S" | "N" | null;
  TF: "T" | "F" | null;
  JP: "J" | "P" | null;
}

export interface MbtiTypeData {
  type: string;
  label: string;
  traits: [string, string, string];
  strengths: [string, string, string];
  pitfalls: [string, string];
  goodEnvironments: string[];
  jobTags: [string, string, string];
  tip: string;
  /** 業界ごとの微調整値 (±0〜5) */
  industryBonus: Partial<Record<string, number>>;
}

// ===== 診断全体の回答状態 =====
export interface DiagnosisState {
  answers: Record<number, Answer>;
  mbti: MbtiInput;
}
