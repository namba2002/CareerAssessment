import { JobProfile } from "@/types";

/**
 * 特徴が明確な30職種（プール）
 * motivation=価値観, workStyle=働き方の自由度, tolerance=プレッシャー耐性, interest=好奇心, aptitude=スキル活用
 *
 * 選定基準:
 * - 5軸のプロファイルが互いに十分異なること
 * - 就活生が実際に検討しうる幅広い選択肢をカバー
 * - 似た特性の職種は統合（例: イラストレーター/フォトグラファー → Webデザイナーに統合）
 */
export const jobs: JobProfile[] = [
  // ── IT・テクノロジー ──────────────────────
  {
    id: "software-engineer",
    name: "ソフトウェアエンジニア",
    industryId: "it",
    ideal: { motivation: 65, workStyle: 85, tolerance: 60, interest: 95, aptitude: 75 },
    tagline: "コードで世界を動かす。論理とクリエイティビティが交差する仕事です。",
  },
  {
    id: "data-scientist",
    name: "データサイエンティスト",
    industryId: "it",
    ideal: { motivation: 70, workStyle: 80, tolerance: 55, interest: 95, aptitude: 90 },
    tagline: "膨大なデータの中からビジネスの答えを見つけ出す、現代の探偵役です。",
  },
  {
    id: "product-manager",
    name: "プロダクトマネージャー",
    industryId: "it",
    ideal: { motivation: 80, workStyle: 80, tolerance: 75, interest: 85, aptitude: 80 },
    tagline: "ユーザーの課題とビジネスの成長を繋ぐ、プロダクトの司令塔です。",
  },

  // ── コンサル ───────────────────────────
  {
    id: "strategy-consultant",
    name: "経営コンサルタント",
    industryId: "consulting",
    ideal: { motivation: 90, workStyle: 85, tolerance: 90, interest: 75, aptitude: 90 },
    tagline: "企業の経営課題に切り込み、短期間で解決策を導き出すプロフェッショナルです。",
  },

  // ── 金融 ────────────────────────────
  {
    id: "financial-analyst",
    name: "金融アナリスト",
    industryId: "finance",
    ideal: { motivation: 80, workStyle: 60, tolerance: 75, interest: 75, aptitude: 95 },
    tagline: "市場の動きを数字で読み解き、投資判断を支える分析のスペシャリストです。",
  },

  // ── 商社 ────────────────────────────
  {
    id: "trading-sales",
    name: "商社営業",
    industryId: "trading",
    ideal: { motivation: 85, workStyle: 70, tolerance: 90, interest: 60, aptitude: 75 },
    tagline: "世界中を相手に商売を仕掛ける。交渉力とタフさが武器になる仕事です。",
  },

  // ── 広告・メディア ──────────────────────
  {
    id: "marketer",
    name: "マーケター",
    industryId: "advertising",
    ideal: { motivation: 75, workStyle: 80, tolerance: 70, interest: 85, aptitude: 75 },
    tagline: "消費者の心理を読み解き、ブランドと人を繋ぐ仕掛けを設計する仕事です。",
  },
  {
    id: "copywriter",
    name: "コピーライター",
    industryId: "advertising",
    ideal: { motivation: 70, workStyle: 85, tolerance: 55, interest: 90, aptitude: 80 },
    tagline: "たった一行の言葉で人の心を動かす。言語センスを武器にする表現者です。",
  },

  // ── 人材 ────────────────────────────
  {
    id: "career-advisor",
    name: "キャリアアドバイザー",
    industryId: "hr",
    ideal: { motivation: 90, workStyle: 65, tolerance: 70, interest: 55, aptitude: 80 },
    tagline: "一人ひとりの人生の転機に寄り添い、最適なキャリアへ導く伴走者です。",
  },

  // ── メーカー ───────────────────────────
  {
    id: "product-planning",
    name: "商品企画",
    industryId: "manufacturer",
    ideal: { motivation: 75, workStyle: 65, tolerance: 60, interest: 85, aptitude: 70 },
    tagline: "市場のニーズを形にして、ヒット商品を生み出す企画の中核です。",
  },

  // ── 医療 ────────────────────────────
  {
    id: "nurse",
    name: "看護師",
    industryId: "healthcare",
    ideal: { motivation: 95, workStyle: 30, tolerance: 85, interest: 55, aptitude: 65 },
    tagline: "患者の命と健康を最前線で守る。使命感と共感力が求められる仕事です。",
  },

  // ── 公務員 ──────────────────────────
  {
    id: "admin-officer",
    name: "行政職（公務員）",
    industryId: "public-service",
    ideal: { motivation: 75, workStyle: 25, tolerance: 55, interest: 55, aptitude: 70 },
    tagline: "法律と制度の枠組みの中で、地域や国民の暮らしを支える安定した仕事です。",
  },
  {
    id: "firefighter",
    name: "消防士",
    industryId: "public-service",
    ideal: { motivation: 95, workStyle: 20, tolerance: 95, interest: 45, aptitude: 60 },
    tagline: "人の命を救うために体を張る。強い使命感と体力が不可欠な現場の仕事です。",
  },

  // ── 教育 ────────────────────────────
  {
    id: "teacher",
    name: "教師",
    industryId: "education",
    ideal: { motivation: 95, workStyle: 35, tolerance: 75, interest: 60, aptitude: 75 },
    tagline: "次の世代を育てる責任とやりがい。知識を伝え、成長を見守る仕事です。",
  },

  // ── フリーランス ─────────────────────────
  {
    id: "freelance-engineer",
    name: "フリーランスエンジニア",
    industryId: "freelance-it",
    ideal: { motivation: 70, workStyle: 95, tolerance: 70, interest: 90, aptitude: 80 },
    tagline: "技術力一本で自由に働く。案件も働き方もすべて自分で選べるエンジニアです。",
  },

  // ── クリエイティブ ────────────────────────
  {
    id: "web-designer",
    name: "Webデザイナー",
    industryId: "creative-independent",
    ideal: { motivation: 75, workStyle: 90, tolerance: 55, interest: 95, aptitude: 80 },
    tagline: "美しさと使いやすさを両立させ、デジタル上の体験をデザインする仕事です。",
  },
  {
    id: "video-creator",
    name: "動画クリエイター",
    industryId: "creative-independent",
    ideal: { motivation: 80, workStyle: 90, tolerance: 60, interest: 95, aptitude: 70 },
    tagline: "映像と音で人の感情を揺さぶる。企画から編集まで一気通貫で作り上げます。",
  },

  // ── スタートアップ ────────────────────────
  {
    id: "ceo",
    name: "起業家・経営者",
    industryId: "startup",
    ideal: { motivation: 95, workStyle: 95, tolerance: 95, interest: 75, aptitude: 85 },
    tagline: "ゼロからビジネスを立ち上げ、自分のビジョンで世の中を変える挑戦者です。",
  },

  // ── サービス・接客 ────────────────────────
  {
    id: "wedding-planner",
    name: "ウェディングプランナー",
    industryId: "service",
    ideal: { motivation: 90, workStyle: 45, tolerance: 75, interest: 70, aptitude: 75 },
    tagline: "人生最高の一日を演出する。細やかな気配りとプロデュース力が光る仕事です。",
  },
  {
    id: "cabin-attendant",
    name: "客室乗務員（CA）",
    industryId: "service",
    ideal: { motivation: 85, workStyle: 25, tolerance: 80, interest: 60, aptitude: 70 },
    tagline: "空の上でおもてなしと安全を両立する。語学力とホスピタリティが武器です。",
  },

  // ── 法律・士業 ──────────────────────────
  {
    id: "lawyer",
    name: "弁護士",
    industryId: "legal",
    ideal: { motivation: 85, workStyle: 60, tolerance: 80, interest: 70, aptitude: 95 },
    tagline: "法の力で人や企業を守る。論理的思考と正義感を武器にした専門職です。",
  },
  {
    id: "accountant",
    name: "公認会計士",
    industryId: "legal",
    ideal: { motivation: 70, workStyle: 55, tolerance: 65, interest: 60, aptitude: 95 },
    tagline: "企業の財務を正確に読み解く。数字の信頼性を担保する社会の番人です。",
  },

  // ── 第一次産業 ──────────────────────────
  {
    id: "farmer",
    name: "農業経営者",
    industryId: "primary",
    ideal: { motivation: 90, workStyle: 55, tolerance: 80, interest: 60, aptitude: 50 },
    tagline: "自然と向き合い、自分の手で食を生み出す。経営センスも問われる仕事です。",
  },

  // ── 不動産 ──────────────────────────
  {
    id: "real-estate-sales",
    name: "不動産営業",
    industryId: "real-estate",
    ideal: { motivation: 80, workStyle: 60, tolerance: 90, interest: 55, aptitude: 70 },
    tagline: "人生最大の買い物をサポートする。成果がダイレクトに報酬に反映されます。",
  },

  // ── 研究 ────────────────────────────
  {
    id: "researcher",
    name: "研究者（大学・研究機関）",
    industryId: "research",
    ideal: { motivation: 80, workStyle: 70, tolerance: 50, interest: 95, aptitude: 95 },
    tagline: "未知の領域を切り拓く知の探求者。深い専門性と粘り強さが求められます。",
  },

  // ── 飲食 ────────────────────────────
  {
    id: "chef",
    name: "シェフ・料理人",
    industryId: "food",
    ideal: { motivation: 85, workStyle: 35, tolerance: 80, interest: 75, aptitude: 60 },
    tagline: "五感で人を幸せにする職人。技術の追求と創造性が両立する仕事です。",
  },

  // ── スポーツ ───────────────────────────
  {
    id: "personal-trainer",
    name: "パーソナルトレーナー",
    industryId: "sports",
    ideal: { motivation: 90, workStyle: 70, tolerance: 65, interest: 65, aptitude: 60 },
    tagline: "一人ひとりの体と目標に向き合い、理想の姿へ導くフィットネスの専門家です。",
  },

  // ── NPO ────────────────────────────
  {
    id: "npo-staff",
    name: "NPO職員",
    industryId: "npo",
    ideal: { motivation: 95, workStyle: 55, tolerance: 65, interest: 65, aptitude: 65 },
    tagline: "利益ではなく社会的インパクトを追求する。志で繋がる仲間と課題に挑みます。",
  },

  // ── エンタメ ───────────────────────────
  {
    id: "game-creator",
    name: "ゲームクリエイター",
    industryId: "entertainment",
    ideal: { motivation: 75, workStyle: 70, tolerance: 70, interest: 95, aptitude: 80 },
    tagline: "遊びを本気で設計する。技術とエンタメ精神を融合させるクリエイターです。",
  },

  // ── 建築 ────────────────────────────
  {
    id: "architect",
    name: "建築士",
    industryId: "architecture",
    ideal: { motivation: 80, workStyle: 55, tolerance: 65, interest: 85, aptitude: 85 },
    tagline: "街の風景を作る。美的感覚と工学的知識を掛け合わせて空間を設計します。",
  },
];
