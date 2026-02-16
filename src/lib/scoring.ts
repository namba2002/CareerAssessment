import {
  Answer,
  Dimension,
  DimensionScores,
  DIMENSIONS,
  MbtiInput,
  IndustryResult,
} from "@/types";
import { questions } from "@/data/questions";
import { industries } from "@/data/industries";
import { mbtiData } from "@/data/mbti";

// ===== 重み定義 =====
const DIMENSION_WEIGHTS: Record<Dimension, number> = {
  motivation: 0.3,
  workStyle: 0.25,
  tolerance: 0.2,
  interest: 0.15,
  aptitude: 0.1,
};

/**
 * Likert回答(1〜5)から要素別スコア(0〜100)を算出
 * 各要素に4問 → 合計ポイント最小4最大20 → 0〜100に正規化
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
    // 逆転項目は反転 (1↔5, 2↔4, 3=3)
    const val = q.positive ? raw : 6 - raw;
    sums[q.dimension] += val;
    counts[q.dimension] += 1;
  }

  const scores = {} as DimensionScores;
  for (const dim of DIMENSIONS) {
    if (counts[dim] === 0) {
      scores[dim] = 50; // 未回答はニュートラル
    } else {
      // 各問 1〜5 → 合計を [count, count*5] → 0〜100
      const min = counts[dim];
      const max = counts[dim] * 5;
      scores[dim] = ((sums[dim] - min) / (max - min)) * 100;
    }
  }
  return scores;
}

/**
 * MBTI 4軸入力から16タイプ文字列を生成
 * 一つでも null がある場合は null を返す
 */
export function getMbtiType(input: MbtiInput): string | null {
  const { EI, SN, TF, JP } = input;
  if (!EI || !SN || !TF || !JP) return null;
  return `${EI}${SN}${TF}${JP}`;
}

/**
 * 業界スコアの算出
 * ユーザーの5要素スコアと業界の理想プロファイルの一致度を
 * 重み付きで算出 (距離ベースではなく一致度ベース)
 */
function calcIndustryBaseScore(
  userScores: DimensionScores,
  idealScores: DimensionScores
): number {
  let totalScore = 0;
  for (const dim of DIMENSIONS) {
    const diff = Math.abs(userScores[dim] - idealScores[dim]);
    // 差が0なら100, 差が100なら0
    const match = 100 - diff;
    totalScore += match * DIMENSION_WEIGHTS[dim];
  }
  return totalScore;
}

/**
 * ユーザースコアに基づいてマッチ理由を選定
 * 上位スコアの要素に関連する理由を優先
 */
function selectReasons(
  userScores: DimensionScores,
  industry: typeof industries[number]
): string[] {
  return industry.reasons;
}

/**
 * ランキング算出（メイン関数）
 * MBTI による補正は ±0〜5 に制限
 */
export function calcRanking(
  answers: Record<number, Answer>,
  mbtiInput: MbtiInput
): IndustryResult[] {
  const userScores = calcDimensionScores(answers);
  const mbtiType = getMbtiType(mbtiInput);

  const results: IndustryResult[] = industries.map((industry) => {
    // ベーススコア (0〜100)
    let score = calcIndustryBaseScore(userScores, industry.ideal);

    // MBTI 補正 (±0〜5)
    if (mbtiType && mbtiData[mbtiType]) {
      const bonus = mbtiData[mbtiType].industryBonus[industry.id] ?? 0;
      score += bonus;
    }

    // 0〜100 に収める
    score = Math.min(100, Math.max(0, Math.round(score)));

    return {
      industry,
      score,
      matchedReasons: selectReasons(userScores, industry),
      caution: industry.caution,
      exampleJobs: industry.exampleJobs,
    };
  });

  // スコア降順でソート → 同点の場合は安定ソート
  results.sort((a, b) => b.score - a.score);

  return results;
}
