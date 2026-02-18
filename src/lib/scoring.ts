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
 * 業界のマッチ理由を返す
 */
function selectReasons(
  industry: (typeof industries)[number]
): string[] {
  return industry.reasons;
}

// ===== 職種マッチ理由生成 =====
const DIMENSION_REASON_MAP: Record<Dimension, { good: string; bad: string }> = {
  motivation: {
    good: "仕事に求める価値観がこの職種と合っています",
    bad: "仕事に対する動機付けの方向性がやや異なります",
  },
  workStyle: {
    good: "理想の働き方スタイルにフィットしています",
    bad: "働き方の自由度や環境が希望と少し異なるかもしれません",
  },
  tolerance: {
    good: "プレッシャーへの耐性がこの職種に向いています",
    bad: "ストレス耐性の面で少しチャレンジになるかもしれません",
  },
  interest: {
    good: "興味・関心の方向性がぴったりです",
    bad: "興味の方向が少し異なる可能性があります",
  },
  aptitude: {
    good: "あなたの得意スキルが活かせる職種です",
    bad: "求められるスキルセットに少しギャップがあるかもしれません",
  },
};

// ===== 寄り添い型の詳細文テンプレート =====
const DIMENSION_TRAIT_PHRASES: Record<Dimension, { high: string; low: string }> = {
  motivation: {
    high: "仕事にやりがいや社会的意義を強く求める",
    low: "安定した環境で着実にキャリアを積みたい",
  },
  workStyle: {
    high: "自分の裁量で自由に働き方を設計したい",
    low: "決まった枠組みの中で着実に成果を出すのが得意",
  },
  tolerance: {
    high: "プレッシャーのある環境でこそ力を発揮できる",
    low: "穏やかな環境で落ち着いて実力を出せる",
  },
  interest: {
    high: "新しいことへの好奇心が旺盛で学ぶことが好き",
    low: "ひとつの分野を深く掘り下げて極めるのが好き",
  },
  aptitude: {
    high: "幅広いスキルを柔軟に組み合わせて活かせる",
    low: "専門性をじっくり磨いて武器にできる",
  },
};


/**
 * ユーザーの特性に基づいた寄り添い型の詳細文を生成（2〜3文）
 */
function generateDescription(
  userScores: DimensionScores,
  jobIdeal: DimensionScores,
  jobName: string,
  tagline: string
): string {
  const dimMatches = DIMENSIONS.map((dim) => ({
    dim,
    match: 100 - Math.abs(userScores[dim] - jobIdeal[dim]),
    userScore: userScores[dim],
  }));
  dimMatches.sort((a, b) => b.match - a.match);

  const top1 = dimMatches[0];
  const top2 = dimMatches[1];

  const trait1 = top1.userScore >= 50
    ? DIMENSION_TRAIT_PHRASES[top1.dim].high
    : DIMENSION_TRAIT_PHRASES[top1.dim].low;
  const trait2 = top2.userScore >= 50
    ? DIMENSION_TRAIT_PHRASES[top2.dim].high
    : DIMENSION_TRAIT_PHRASES[top2.dim].low;

  return `${tagline}あなたは「${trait1}」タイプで、さらに「${trait2}」という強みも持っています。こうした特性は${jobName}で自然に活かすことができます。`;
}

/**
 * 各軸の一致度を計算し、上位3つをマッチ理由、最も低いものを注意点として返す
 */
function generateJobMatchInfo(
  userScores: DimensionScores,
  jobIdeal: DimensionScores,
  jobName: string,
  tagline: string
): { matchReasons: string[]; caution: string; description: string } {
  const dimMatches = DIMENSIONS.map((dim) => ({
    dim,
    match: 100 - Math.abs(userScores[dim] - jobIdeal[dim]),
  }));
  dimMatches.sort((a, b) => b.match - a.match);

  const matchReasons = dimMatches
    .slice(0, 3)
    .map((d) => DIMENSION_REASON_MAP[d.dim].good);

  const worst = dimMatches[dimMatches.length - 1];
  const caution = DIMENSION_REASON_MAP[worst.dim].bad;

  const description = generateDescription(userScores, jobIdeal, jobName, tagline);

  return { matchReasons, caution, description };
}

/**
 * ランキング算出（メイン関数）
 * 5軸スコア(80%) + MBTI適性(20%) の統合スコアで算出
 */
export function calcRanking(
  answers: Record<number, Answer>,
  mbtiInput: MbtiInput
): { industryResults: IndustryResult[]; topJobs: JobResult[]; mbtiType: string | null; dimensionScores: DimensionScores } {
  const userScores = calcDimensionScores(answers);
  const mbtiType = getMbtiType(mbtiInput);
  const mbtiInfo = mbtiType ? mbtiData[mbtiType] : null;

  // 全職種をスコアリング
  const allJobResults: JobResult[] = jobs.map((job) => {
    const dimScore = calcDimensionMatchScore(userScores, job.ideal);
    const bonus = mbtiInfo?.industryBonus[job.industryId] ?? 0;
    const score = calcCombinedScore(dimScore, bonus);
    const { matchReasons, caution, description } = generateJobMatchInfo(userScores, job.ideal, job.name, job.tagline);

    const industry = industries.find((ind) => ind.id === job.industryId);
    return {
      job,
      industryName: industry?.name ?? "",
      score,
      matchReasons,
      caution,
      description,
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
      matchedReasons: selectReasons(industry),
      caution: industry.caution,
      topJobs: (jobsByIndustry.get(industry.id) ?? []).slice(0, 2),
    };
  });

  industryResults.sort((a, b) => b.score - a.score);

  return {
    industryResults,
    topJobs: allJobResults.slice(0, 5),
    mbtiType,
    dimensionScores: userScores,
  };
}
