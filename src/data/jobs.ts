import { JobProfile } from "@/types";

/**
 * 全業界の職種プロファイル
 * 各職種に固有の理想スコア（0〜100）を設定
 */
export const jobs: JobProfile[] = [
  // ===== IT・ソフトウェア =====
  {
    id: "software-engineer",
    name: "ソフトウェアエンジニア",
    industryId: "it",
    ideal: { motivation: 65, workStyle: 85, tolerance: 60, interest: 95, aptitude: 75 },
  },
  {
    id: "product-manager",
    name: "プロダクトマネージャー",
    industryId: "it",
    ideal: { motivation: 80, workStyle: 80, tolerance: 75, interest: 85, aptitude: 80 },
  },
  {
    id: "data-scientist",
    name: "データサイエンティスト",
    industryId: "it",
    ideal: { motivation: 70, workStyle: 80, tolerance: 55, interest: 95, aptitude: 85 },
  },

  // ===== メーカー（製造） =====
  {
    id: "production-engineer",
    name: "生産技術",
    industryId: "manufacturer",
    ideal: { motivation: 60, workStyle: 40, tolerance: 65, interest: 75, aptitude: 70 },
  },
  {
    id: "product-planning",
    name: "商品企画",
    industryId: "manufacturer",
    ideal: { motivation: 75, workStyle: 65, tolerance: 60, interest: 80, aptitude: 70 },
  },
  {
    id: "quality-control",
    name: "品質管理",
    industryId: "manufacturer",
    ideal: { motivation: 60, workStyle: 40, tolerance: 55, interest: 60, aptitude: 75 },
  },

  // ===== コンサル =====
  {
    id: "strategy-consultant",
    name: "経営コンサルタント",
    industryId: "consulting",
    ideal: { motivation: 90, workStyle: 85, tolerance: 85, interest: 75, aptitude: 90 },
  },
  {
    id: "it-consultant",
    name: "ITコンサルタント",
    industryId: "consulting",
    ideal: { motivation: 80, workStyle: 85, tolerance: 75, interest: 85, aptitude: 80 },
  },
  {
    id: "hr-consultant",
    name: "人事コンサルタント",
    industryId: "consulting",
    ideal: { motivation: 85, workStyle: 80, tolerance: 75, interest: 65, aptitude: 85 },
  },

  // ===== 金融 =====
  {
    id: "financial-analyst",
    name: "アナリスト",
    industryId: "finance",
    ideal: { motivation: 80, workStyle: 60, tolerance: 75, interest: 75, aptitude: 90 },
  },
  {
    id: "risk-manager",
    name: "リスク管理",
    industryId: "finance",
    ideal: { motivation: 70, workStyle: 45, tolerance: 70, interest: 65, aptitude: 85 },
  },
  {
    id: "bank-sales",
    name: "リテール営業",
    industryId: "finance",
    ideal: { motivation: 75, workStyle: 50, tolerance: 80, interest: 55, aptitude: 70 },
  },

  // ===== 商社 =====
  {
    id: "trading-sales",
    name: "営業（トレーディング）",
    industryId: "trading",
    ideal: { motivation: 85, workStyle: 70, tolerance: 90, interest: 65, aptitude: 75 },
  },
  {
    id: "business-development",
    name: "事業開発",
    industryId: "trading",
    ideal: { motivation: 80, workStyle: 80, tolerance: 80, interest: 75, aptitude: 80 },
  },
  {
    id: "overseas-operations",
    name: "海外事業",
    industryId: "trading",
    ideal: { motivation: 80, workStyle: 75, tolerance: 90, interest: 70, aptitude: 70 },
  },

  // ===== 広告・メディア =====
  {
    id: "ad-planner",
    name: "プランナー",
    industryId: "advertising",
    ideal: { motivation: 80, workStyle: 80, tolerance: 75, interest: 90, aptitude: 75 },
  },
  {
    id: "marketer",
    name: "マーケター",
    industryId: "advertising",
    ideal: { motivation: 75, workStyle: 80, tolerance: 70, interest: 85, aptitude: 75 },
  },
  {
    id: "copywriter",
    name: "コピーライター",
    industryId: "advertising",
    ideal: { motivation: 70, workStyle: 85, tolerance: 60, interest: 90, aptitude: 80 },
  },

  // ===== 人材 =====
  {
    id: "career-advisor",
    name: "キャリアアドバイザー",
    industryId: "hr",
    ideal: { motivation: 85, workStyle: 65, tolerance: 75, interest: 55, aptitude: 80 },
  },
  {
    id: "hr-sales",
    name: "法人営業",
    industryId: "hr",
    ideal: { motivation: 80, workStyle: 70, tolerance: 80, interest: 55, aptitude: 70 },
  },
  {
    id: "recruiter",
    name: "リクルーター",
    industryId: "hr",
    ideal: { motivation: 80, workStyle: 75, tolerance: 70, interest: 60, aptitude: 75 },
  },

  // ===== 医療・ヘルスケア =====
  {
    id: "mr",
    name: "MR（医薬情報担当）",
    industryId: "healthcare",
    ideal: { motivation: 85, workStyle: 55, tolerance: 80, interest: 70, aptitude: 70 },
  },
  {
    id: "medical-device-sales",
    name: "医療機器営業",
    industryId: "healthcare",
    ideal: { motivation: 80, workStyle: 55, tolerance: 80, interest: 65, aptitude: 65 },
  },
  {
    id: "clinical-research",
    name: "臨床開発",
    industryId: "healthcare",
    ideal: { motivation: 85, workStyle: 45, tolerance: 65, interest: 80, aptitude: 80 },
  },

  // ===== インフラ・公共 =====
  {
    id: "facility-manager",
    name: "施設管理",
    industryId: "infrastructure",
    ideal: { motivation: 65, workStyle: 35, tolerance: 55, interest: 50, aptitude: 60 },
  },
  {
    id: "public-policy",
    name: "公共政策企画",
    industryId: "infrastructure",
    ideal: { motivation: 80, workStyle: 45, tolerance: 60, interest: 65, aptitude: 75 },
  },
  {
    id: "civil-engineer",
    name: "土木・建設技術",
    industryId: "infrastructure",
    ideal: { motivation: 65, workStyle: 40, tolerance: 65, interest: 60, aptitude: 55 },
  },

  // ===== 教育 =====
  {
    id: "curriculum-developer",
    name: "教材開発",
    industryId: "education",
    ideal: { motivation: 85, workStyle: 60, tolerance: 55, interest: 75, aptitude: 85 },
  },
  {
    id: "school-operator",
    name: "スクール運営",
    industryId: "education",
    ideal: { motivation: 85, workStyle: 55, tolerance: 70, interest: 60, aptitude: 75 },
  },
  {
    id: "edtech-engineer",
    name: "EdTechエンジニア",
    industryId: "education",
    ideal: { motivation: 80, workStyle: 75, tolerance: 60, interest: 85, aptitude: 80 },
  },

  // ===== 公務員・官公庁 =====
  {
    id: "admin-officer",
    name: "行政職",
    industryId: "public-service",
    ideal: { motivation: 75, workStyle: 30, tolerance: 60, interest: 55, aptitude: 70 },
  },
  {
    id: "policy-planner",
    name: "政策立案",
    industryId: "public-service",
    ideal: { motivation: 80, workStyle: 40, tolerance: 65, interest: 70, aptitude: 80 },
  },
  {
    id: "public-welfare",
    name: "福祉職",
    industryId: "public-service",
    ideal: { motivation: 85, workStyle: 35, tolerance: 65, interest: 55, aptitude: 65 },
  },

  // ===== ITフリーランス =====
  {
    id: "freelance-engineer",
    name: "フリーランスエンジニア",
    industryId: "freelance-it",
    ideal: { motivation: 70, workStyle: 95, tolerance: 70, interest: 95, aptitude: 80 },
  },
  {
    id: "freelance-data",
    name: "データ分析フリーランス",
    industryId: "freelance-it",
    ideal: { motivation: 70, workStyle: 90, tolerance: 65, interest: 90, aptitude: 85 },
  },
  {
    id: "freelance-pm",
    name: "フリーランスPM",
    industryId: "freelance-it",
    ideal: { motivation: 80, workStyle: 90, tolerance: 80, interest: 80, aptitude: 80 },
  },

  // ===== クリエイティブ独立 =====
  {
    id: "web-designer",
    name: "Webデザイナー",
    industryId: "creative-independent",
    ideal: { motivation: 75, workStyle: 90, tolerance: 60, interest: 95, aptitude: 80 },
  },
  {
    id: "video-creator",
    name: "動画クリエイター",
    industryId: "creative-independent",
    ideal: { motivation: 80, workStyle: 90, tolerance: 65, interest: 95, aptitude: 70 },
  },
  {
    id: "illustrator",
    name: "イラストレーター",
    industryId: "creative-independent",
    ideal: { motivation: 80, workStyle: 90, tolerance: 55, interest: 95, aptitude: 75 },
  },

  // ===== 起業・スタートアップ =====
  {
    id: "ceo",
    name: "CEO・経営者",
    industryId: "startup",
    ideal: { motivation: 95, workStyle: 90, tolerance: 95, interest: 75, aptitude: 85 },
  },
  {
    id: "cto",
    name: "CTO",
    industryId: "startup",
    ideal: { motivation: 85, workStyle: 90, tolerance: 85, interest: 95, aptitude: 90 },
  },
  {
    id: "startup-bizdev",
    name: "事業開発（スタートアップ）",
    industryId: "startup",
    ideal: { motivation: 90, workStyle: 85, tolerance: 90, interest: 75, aptitude: 80 },
  },

  // ===== 副業・パラレルワーク =====
  {
    id: "sns-marketer",
    name: "SNSマーケター",
    industryId: "side-work",
    ideal: { motivation: 70, workStyle: 90, tolerance: 55, interest: 85, aptitude: 70 },
  },
  {
    id: "content-seller",
    name: "コンテンツ販売",
    industryId: "side-work",
    ideal: { motivation: 75, workStyle: 85, tolerance: 55, interest: 80, aptitude: 75 },
  },
  {
    id: "side-engineer",
    name: "副業エンジニア",
    industryId: "side-work",
    ideal: { motivation: 65, workStyle: 85, tolerance: 60, interest: 85, aptitude: 70 },
  },
];
