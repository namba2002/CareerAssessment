import {
  Answer,
  Dimension,
  DimensionScores,
  DIMENSIONS,
  MbtiInput,
  IndustryResult,
  JobResult,
} from "@/types";
import { questions } from "@/data/questions";
import { industries } from "@/data/industries";
import { jobs } from "@/data/jobs";
import { mbtiData } from "@/data/mbti";

// ===== 重み定義 =====
// 5軸の合計が1.0（内部配分）、最終スコアでは 5軸:MBTI = 0.8:0.2
const DIMENSION_WEIGHTS: Record<Dimension, number> = {
  motivation: 0.3,
  workStyle: 0.25,
  tolerance: 0.2,
  interest: 0.15,
  aptitude: 0.1,
};

const WEIGHT_DIMENSIONS = 0.8;
const WEIGHT_MBTI = 0.2;
const MBTI_BONUS_MAX = 5; // industryBonus の最大値

/**
 * Likert回答(1〜5)から要素別スコア(0〜100)を算出
 */
export function calcDimensionScores(
  answers: Record<number, Answer>
): DimensionScores {
  const sums: Record<Dimension, number> = {
    motivation: 0,
    workStyle: 0,
    tolerance: 0,
    interest: 0,
    aptitude: 0,
  };
  const counts: Record<Dimension, number> = {
    motivation: 0,
    workStyle: 0,
    tolerance: 0,
    interest: 0,
    aptitude: 0,
  };

  for (const q of questions) {
    const raw = answers[q.id];
    if (raw == null) continue;
    const val = q.positive ? raw : 6 - raw;
    sums[q.dimension] += val;
    counts[q.dimension] += 1;
  }

  const scores = {} as DimensionScores;
  for (const dim of DIMENSIONS) {
    if (counts[dim] === 0) {
      scores[dim] = 50;
    } else {
      const min = counts[dim];
      const max = counts[dim] * 5;
      scores[dim] = ((sums[dim] - min) / (max - min)) * 100;
    }
  }
  return scores;
}

/**
 * MBTI 4軸入力から16タイプ文字列を生成
 */
export function getMbtiType(input: MbtiInput): string | null {
  const { EI, SN, TF, JP } = input;
  if (!EI || !SN || !TF || !JP) return null;
  return `${EI}${SN}${TF}${JP}`;
}

/**
 * 5軸スコアの一致度を算出（0〜100）
 */
function calcDimensionMatchScore(
  userScores: DimensionScores,
  idealScores: DimensionScores
): number {
  let totalScore = 0;
  for (const dim of DIMENSIONS) {
    const diff = Math.abs(userScores[dim] - idealScores[dim]);
    const match = 100 - diff;
    totalScore += match * DIMENSION_WEIGHTS[dim];
  }
  return totalScore;
}

/**
 * MBTIボーナスを0〜100スケールに正規化
 * bonus: 0〜5 → 0〜100
 */
function calcMbtiScore(bonus: number): number {
  return (bonus / MBTI_BONUS_MAX) * 100;
}

/**
 * 5軸スコアとMBTIスコアを統合（0.8:0.2）
 */
function calcCombinedScore(dimensionScore: number, mbtiBonus: number): number {
  const mbtiScore = calcMbtiScore(mbtiBonus);
  const combined = dimensionScore * WEIGHT_DIMENSIONS + mbtiScore * WEIGHT_MBTI;
  return Math.min(100, Math.max(0, Math.round(combined)));
}

/**
 * ユーザースコアに基づいてマッチ理由を選定
 */
function selectReasons(
  userScores: DimensionScores,
  industry: (typeof industries)[number]
): string[] {
  return industry.reasons;
}

/**
 * ランキング算出（メイン関数）
 * 5軸スコア(80%) + MBTI適性(20%) の統合スコアで算出
 */
export function calcRanking(
  answers: Record<number, Answer>,
  mbtiInput: MbtiInput
): { industryResults: IndustryResult[]; topJobs: JobResult[]; mbtiType: string | null } {
  const userScores = calcDimensionScores(answers);
  const mbtiType = getMbtiType(mbtiInput);
  const mbtiInfo = mbtiType ? mbtiData[mbtiType] : null;

  // 全職種をスコアリング
  const allJobResults: JobResult[] = jobs.map((job) => {
    const dimScore = calcDimensionMatchScore(userScores, job.ideal);
    const bonus = mbtiInfo?.industryBonus[job.industryId] ?? 0;
    const score = calcCombinedScore(dimScore, bonus);

    const industry = industries.find((ind) => ind.id === job.industryId);
    return {
      job,
      industryName: industry?.name ?? "",
      score,
    };
  });

  allJobResults.sort((a, b) => b.score - a.score);

  // 業界ごとにジョブをグループ化
  const jobsByIndustry = new Map<string, JobResult[]>();
  for (const jr of allJobResults) {
    const list = jobsByIndustry.get(jr.job.industryId) ?? [];
    list.push(jr);
    jobsByIndustry.set(jr.job.industryId, list);
  }

  // 業界スコアリング
  const industryResults: IndustryResult[] = industries.map((industry) => {
    const dimScore = calcDimensionMatchScore(userScores, industry.ideal);
    const bonus = mbtiInfo?.industryBonus[industry.id] ?? 0;
    const score = calcCombinedScore(dimScore, bonus);

    return {
      industry,
      score,
      matchedReasons: selectReasons(userScores, industry),
      caution: industry.caution,
      topJobs: (jobsByIndustry.get(industry.id) ?? []).slice(0, 2),
    };
  });

  industryResults.sort((a, b) => b.score - a.score);

  return {
    industryResults,
    topJobs: allJobResults.slice(0, 5),
    mbtiType,
  };
}
