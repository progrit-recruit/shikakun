import { Textbook, ProgressEntry, Quiz, PasserReview } from "@/types"

export const QUALIFICATIONS = [
  { id: "boki2",       label: "日商簿記検定",      icon: "📊", level: "2級" },
  { id: "toeic",       label: "TOEIC",             icon: "🌍", level: "L&R" },
  { id: "it_passport", label: "ITパスポート",       icon: "💻", level: "国家資格" },
  { id: "takken",      label: "宅建士",             icon: "🏠", level: "国家資格" },
  { id: "fp",          label: "FP技能士",           icon: "💰", level: "2級" },
  { id: "kihon_joho",  label: "基本情報技術者",     icon: "🖥️", level: "国家資格" },
  { id: "kaigo",       label: "介護福祉士",         icon: "🤝", level: "国家資格" },
  { id: "oyo_joho",    label: "応用情報技術者",     icon: "⚙️", level: "国家資格" },
  { id: "careman",     label: "ケアマネージャー",   icon: "📋", level: "国家資格" },
  { id: "touroku",     label: "登録販売者",         icon: "💊", level: "国家資格" },
]

export const TEXTBOOKS: Textbook[] = [
  // 日商簿記検定
  {
    id: "boki1", title: "みんなが欲しかった！簿記の教科書 日商2級", author: "滝澤ななみ",
    publisher: "TAC出版", price: 2200, coverColor: "#E8F4FD", matchScore: 95,
    reason: "図解が豊富で視覚的に理解しやすく、要点がコンパクトにまとまっています。忙しい社会人が短時間で効率よく学べる構成です。",
    features: ["図解が豊富", "要点まとめあり", "初心者向け", "スマホアプリ連動"],
    difficulty: "易", visualLevel: 90, detailLevel: 60,
    amazonUrl: "https://www.amazon.co.jp/dp/B0XXXXX", qualification: "boki2",
  },
  {
    id: "boki2", title: "スッキリわかる 日商簿記2級", author: "加藤 裕介",
    publisher: "TAC出版", price: 1650, coverColor: "#E8FDF4", matchScore: 82,
    reason: "会話形式で解説が進むため読みやすく、理解度チェック問題が章ごとについています。",
    features: ["会話形式", "章末問題", "コンパクト", "カラー印刷"],
    difficulty: "易", visualLevel: 75, detailLevel: 55,
    amazonUrl: "https://www.amazon.co.jp/dp/B0YYYYY", qualification: "boki2",
  },
  {
    id: "boki3", title: "パブロフ流でみんな合格 日商簿記2級", author: "よせだあつこ",
    publisher: "翔泳社", price: 1980, coverColor: "#FDE8F4", matchScore: 88,
    reason: "マンガ形式の導入と豊富な図解で、初めて簿記を学ぶ方でも直感的に理解できます。",
    features: ["マンガ形式", "図解多数", "独学向け", "無料動画付き"],
    difficulty: "易", visualLevel: 95, detailLevel: 50,
    amazonUrl: "https://www.amazon.co.jp/dp/B0AAAAA", qualification: "boki2",
  },
  // TOEIC
  {
    id: "toeic1", title: "TOEIC L&R TEST 出る単特急 金のフレーズ", author: "TEX加藤",
    publisher: "朝日新聞出版", price: 990, coverColor: "#FFF8E1", matchScore: 96,
    reason: "TOEICに頻出する単語・フレーズを厳選。スキマ時間に使いやすいコンパクト設計で、スコアアップに直結します。",
    features: ["頻出単語厳選", "音声DL付き", "スキマ時間向け", "ベストセラー"],
    difficulty: "普", visualLevel: 40, detailLevel: 70,
    amazonUrl: "https://www.amazon.co.jp/dp/toeic1", qualification: "toeic",
  },
  {
    id: "toeic2", title: "TOEIC L & R TEST 完全攻略バイブル", author: "濱崎潤之輔",
    publisher: "アルク", price: 2420, coverColor: "#E3F2FD", matchScore: 87,
    reason: "満点講師が設問ごとの解き方を体系的に解説。高スコアを狙う方に最適な一冊です。",
    features: ["解法テクニック", "模擬テスト付き", "ハイスコア向け", "詳細解説"],
    difficulty: "難", visualLevel: 55, detailLevel: 90,
    amazonUrl: "https://www.amazon.co.jp/dp/toeic2", qualification: "toeic",
  },
  // ITパスポート
  {
    id: "itp1", title: "いちばんやさしいITパスポート", author: "山本 三雄",
    publisher: "技術評論社", price: 1760, coverColor: "#E8EAF6", matchScore: 94,
    reason: "IT初心者でも読み進められるやさしい解説と豊富なイラストで、短期合格を狙えます。",
    features: ["初心者向け", "イラスト豊富", "短期合格対応", "過去問付き"],
    difficulty: "易", visualLevel: 88, detailLevel: 55,
    amazonUrl: "https://www.amazon.co.jp/dp/itp1", qualification: "it_passport",
  },
  {
    id: "itp2", title: "ITパスポート完全攻略", author: "大滝 みや子",
    publisher: "技術評論社", price: 1848, coverColor: "#FCE4EC", matchScore: 85,
    reason: "出題範囲を網羅した定番テキスト。解説の丁寧さと問題数の多さで確実な実力が身につきます。",
    features: ["網羅的", "問題数多い", "解説丁寧", "定番書籍"],
    difficulty: "普", visualLevel: 60, detailLevel: 85,
    amazonUrl: "https://www.amazon.co.jp/dp/itp2", qualification: "it_passport",
  },
  // 宅建士
  {
    id: "tak1", title: "みんなが欲しかった！宅建士の教科書", author: "滝澤ななみ",
    publisher: "TAC出版", price: 2860, coverColor: "#F3E5F5", matchScore: 93,
    reason: "フルカラーで図解が充実。法律の難しい内容をわかりやすく視覚化しており、独学でも理解しやすいです。",
    features: ["フルカラー", "図解豊富", "独学向け", "別冊問題集付き"],
    difficulty: "普", visualLevel: 85, detailLevel: 65,
    amazonUrl: "https://www.amazon.co.jp/dp/tak1", qualification: "takken",
  },
  {
    id: "tak2", title: "わかって合格る宅建士 基本テキスト", author: "LEC東京リーガルマインド",
    publisher: "LEC", price: 3080, coverColor: "#E8F5E9", matchScore: 84,
    reason: "予備校の講義ノウハウを凝縮。重要ポイントの整理が秀逸で、試験直前期にも活用できます。",
    features: ["予備校監修", "重要ポイント整理", "直前期対応", "模擬試験付き"],
    difficulty: "普", visualLevel: 65, detailLevel: 80,
    amazonUrl: "https://www.amazon.co.jp/dp/tak2", qualification: "takken",
  },
  // FP技能士
  {
    id: "fp1", title: "みんなが欲しかった！FPの教科書 2級", author: "滝澤ななみ",
    publisher: "TAC出版", price: 2530, coverColor: "#FFF3E0", matchScore: 92,
    reason: "お金の流れをビジュアルで解説。生活に身近な内容なので飽きずに学べ、試験合格後も実生活で役立ちます。",
    features: ["ビジュアル解説", "身近な事例", "2級対応", "別冊問題集"],
    difficulty: "普", visualLevel: 82, detailLevel: 62,
    amazonUrl: "https://www.amazon.co.jp/dp/fp1", qualification: "fp",
  },
  {
    id: "fp2", title: "スッキリわかる FP技能士2級", author: "白鳥光良",
    publisher: "TAC出版", price: 1980, coverColor: "#E0F7FA", matchScore: 83,
    reason: "コンパクトにまとまったテキストで通勤電車でも読みやすい。要点が絞られているため短期学習に向いています。",
    features: ["コンパクト", "通勤学習向け", "要点特化", "過去問連動"],
    difficulty: "易", visualLevel: 70, detailLevel: 60,
    amazonUrl: "https://www.amazon.co.jp/dp/fp2", qualification: "fp",
  },
  // 基本情報技術者
  {
    id: "ki1", title: "基本情報技術者 テキスト＆問題集", author: "大滝 みや子",
    publisher: "技術評論社", price: 2178, coverColor: "#ECEFF1", matchScore: 91,
    reason: "午前・午後両試験に対応した一冊完結型テキスト。プログラミング初心者でも丁寧な解説で理解できます。",
    features: ["午前午後対応", "一冊完結", "初心者対応", "擬似言語解説"],
    difficulty: "普", visualLevel: 70, detailLevel: 78,
    amazonUrl: "https://www.amazon.co.jp/dp/ki1", qualification: "kihon_joho",
  },
  {
    id: "ki2", title: "令和07年 基本情報技術者 合格教本", author: "岡嶋 裕史",
    publisher: "技術評論社", price: 2530, coverColor: "#F1F8E9", matchScore: 80,
    reason: "最新の試験制度に対応した網羅的なテキスト。詳しく学びたい方に最適です。",
    features: ["最新試験対応", "網羅的", "詳細解説", "科目別対策"],
    difficulty: "難", visualLevel: 45, detailLevel: 92,
    amazonUrl: "https://www.amazon.co.jp/dp/ki2", qualification: "kihon_joho",
  },
  // 介護福祉士
  {
    id: "kai1", title: "福祉教科書 介護福祉士 完全合格テキスト", author: "介護福祉士試験対策研究会",
    publisher: "翔泳社", price: 2860, coverColor: "#FCE4EC", matchScore: 90,
    reason: "現場で役立つ知識と試験対策を両立。写真・イラスト豊富で実務未経験者にも理解しやすいです。",
    features: ["写真豊富", "現場直結", "実務未経験OK", "過去問付き"],
    difficulty: "普", visualLevel: 80, detailLevel: 70,
    amazonUrl: "https://www.amazon.co.jp/dp/kai1", qualification: "kaigo",
  },
  {
    id: "kai2", title: "介護福祉士国家試験模擬問題集", author: "中央法規出版編集部",
    publisher: "中央法規", price: 2530, coverColor: "#E8F5E9", matchScore: 82,
    reason: "問題演習特化型。解説が詳しく、苦手分野を効率よく克服できます。",
    features: ["問題演習特化", "詳細解説", "苦手克服", "模擬試験形式"],
    difficulty: "普", visualLevel: 40, detailLevel: 88,
    amazonUrl: "https://www.amazon.co.jp/dp/kai2", qualification: "kaigo",
  },
  // 応用情報技術者
  {
    id: "oy1", title: "応用情報技術者 テキスト＆問題集", author: "大滝 みや子",
    publisher: "技術評論社", price: 2530, coverColor: "#E3F2FD", matchScore: 89,
    reason: "幅広い出題範囲を効率よくカバー。基本情報技術者からのステップアップにも最適です。",
    features: ["広範囲カバー", "ステップアップ向け", "午後記述対策", "解説詳細"],
    difficulty: "難", visualLevel: 60, detailLevel: 85,
    amazonUrl: "https://www.amazon.co.jp/dp/oy1", qualification: "oyo_joho",
  },
  {
    id: "oy2", title: "応用情報技術者 合格教本", author: "岡嶋 裕史",
    publisher: "技術評論社", price: 2860, coverColor: "#FFF8E1", matchScore: 78,
    reason: "試験範囲を徹底的に網羅した辞書的一冊。辞書として使いながら学習を深めたい方向け。",
    features: ["辞書的活用", "徹底網羅", "上級者向け", "深掘り解説"],
    difficulty: "難", visualLevel: 35, detailLevel: 95,
    amazonUrl: "https://www.amazon.co.jp/dp/oy2", qualification: "oyo_joho",
  },
  // ケアマネージャー
  {
    id: "cm1", title: "ケアマネジャー試験ワークブック", author: "介護支援専門員受験対策研究会",
    publisher: "中央法規", price: 3190, coverColor: "#F3E5F5", matchScore: 91,
    reason: "現場経験者が監修した実践的テキスト。法改正に対応した最新情報で安心して学べます。",
    features: ["実践的内容", "法改正対応", "現場監修", "重要語句強調"],
    difficulty: "難", visualLevel: 55, detailLevel: 88,
    amazonUrl: "https://www.amazon.co.jp/dp/cm1", qualification: "careman",
  },
  {
    id: "cm2", title: "ユーキャンのケアマネジャー速習レッスン", author: "ユーキャン",
    publisher: "ユーキャン学び出版", price: 2750, coverColor: "#E0F7FA", matchScore: 85,
    reason: "初学者でも読み進めやすい丁寧な解説。通信講座のノウハウが詰まった信頼性の高い一冊です。",
    features: ["初学者向け", "丁寧な解説", "通信講座監修", "要点整理"],
    difficulty: "普", visualLevel: 72, detailLevel: 72,
    amazonUrl: "https://www.amazon.co.jp/dp/cm2", qualification: "careman",
  },
  // 登録販売者
  {
    id: "to1", title: "登録販売者 合格教本", author: "堀 美智子",
    publisher: "技術評論社", price: 2178, coverColor: "#FFF3E0", matchScore: 93,
    reason: "薬の成分から法律まで幅広くカバー。図解と表を効果的に使い、複雑な薬の分類も整理しやすいです。",
    features: ["成分から法律まで", "図解・表豊富", "分類整理", "過去問対応"],
    difficulty: "普", visualLevel: 78, detailLevel: 75,
    amazonUrl: "https://www.amazon.co.jp/dp/to1", qualification: "touroku",
  },
  {
    id: "to2", title: "ユーキャンの登録販売者 速習テキスト＆重要過去問", author: "ユーキャン",
    publisher: "ユーキャン学び出版", price: 2530, coverColor: "#E8F5E9", matchScore: 86,
    reason: "テキストと過去問が一体型。コンパクトに要点をまとめながら問題演習も同時にできます。",
    features: ["テキスト+過去問", "コンパクト設計", "要点特化", "実績豊富"],
    difficulty: "易", visualLevel: 68, detailLevel: 65,
    amazonUrl: "https://www.amazon.co.jp/dp/to2", qualification: "touroku",
  },
]

// 30日分の進捗データ（ページ範囲形式）
export const MOCK_PROGRESS: ProgressEntry[] = [
  { date: "3/1",  fromPage: 0,  toPage: 0,   totalPages: 0 },
  { date: "3/2",  fromPage: 0,  toPage: 0,   totalPages: 0 },
  { date: "3/3",  fromPage: 1,  toPage: 12,  totalPages: 12 },
  { date: "3/4",  fromPage: 13, toPage: 20,  totalPages: 20 },
  { date: "3/5",  fromPage: 0,  toPage: 0,   totalPages: 20 },
  { date: "3/6",  fromPage: 21, toPage: 30,  totalPages: 30 },
  { date: "3/7",  fromPage: 31, toPage: 44,  totalPages: 44 },
  { date: "3/8",  fromPage: 45, toPage: 56,  totalPages: 56 },
  { date: "3/9",  fromPage: 0,  toPage: 0,   totalPages: 56 },
  { date: "3/10", fromPage: 57, toPage: 70,  totalPages: 70 },
  { date: "3/11", fromPage: 71, toPage: 88,  totalPages: 88 },
  { date: "3/12", fromPage: 89, toPage: 98,  totalPages: 98 },
  { date: "3/13", fromPage: 99, toPage: 112, totalPages: 112 },
  { date: "3/14", fromPage: 0,  toPage: 0,   totalPages: 112 },
  { date: "3/15", fromPage: 113,toPage: 126, totalPages: 126 },
  { date: "3/16", fromPage: 127,toPage: 140, totalPages: 140 },
  { date: "3/17", fromPage: 141,toPage: 155, totalPages: 155 },
  { date: "3/18", fromPage: 156,toPage: 168, totalPages: 168 },
  { date: "3/19", fromPage: 169,toPage: 180, totalPages: 180 },
  { date: "3/20", fromPage: 0,  toPage: 0,   totalPages: 180 },
  { date: "3/21", fromPage: 181,toPage: 196, totalPages: 196 },
  { date: "3/22", fromPage: 197,toPage: 210, totalPages: 210 },
  { date: "3/23", fromPage: 211,toPage: 224, totalPages: 224 },
  { date: "3/24", fromPage: 225,toPage: 238, totalPages: 238 },
  { date: "3/25", fromPage: 239,toPage: 250, totalPages: 250 },
  { date: "3/26", fromPage: 0,  toPage: 0,   totalPages: 250 },
  { date: "3/27", fromPage: 251,toPage: 264, totalPages: 264 },
  { date: "3/28", fromPage: 265,toPage: 278, totalPages: 278 },
  { date: "3/29", fromPage: 279,toPage: 290, totalPages: 290 },
  { date: "3/30", fromPage: 291,toPage: 302, totalPages: 302 },
]

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: "q1",
    question: "売掛金の仕訳として正しいものはどれですか？商品¥100,000を掛けで販売した。",
    options: [
      "（借）売掛金 100,000 / （貸）売上 100,000",
      "（借）売上 100,000 / （貸）売掛金 100,000",
      "（借）買掛金 100,000 / （貸）売上 100,000",
      "（借）現金 100,000 / （貸）売掛金 100,000",
    ],
    answer: 0,
    explanation: "商品を掛けで販売した場合、代金を後で受け取る権利（売掛金）が発生します。売掛金は資産の増加なので借方に記帳します。",
  },
  {
    id: "q2",
    question: "減価償却の目的として最も適切なものはどれですか？",
    options: [
      "税金を節約するため",
      "固定資産の価値減少を費用として計上するため",
      "現金の流出を記録するため",
      "在庫の評価を行うため",
    ],
    answer: 1,
    explanation: "減価償却は、時間の経過や使用により価値が減少する固定資産の費用化です。取得原価を使用可能期間にわたって費用配分します。",
  },
  {
    id: "q3",
    question: "貸借対照表（B/S）に記載されないものはどれですか？",
    options: [
      "現金",
      "売上高",
      "資本金",
      "借入金",
    ],
    answer: 1,
    explanation: "売上高は損益計算書（P/L）に記載されます。貸借対照表には資産・負債・純資産が記載されます。",
  },
]

export const MOCK_PASSER_REVIEWS: PasserReview[] = [
  {
    id: "r1", name: "田村 健二", age: 29, occupation: "営業職",
    daysToPass: 62, textbookUsed: "みんなが欲しかった！簿記の教科書",
    score: 84, studyHoursPerDay: 1.5,
    comment: "平日は帰宅後1時間、週末に3〜4時間を2ヶ月続けました。図解が多くて仕訳のイメージが掴みやすかったです。",
  },
  {
    id: "r2", name: "鈴木 麻衣", age: 25, occupation: "事務職",
    daysToPass: 45, textbookUsed: "みんなが欲しかった！簿記の教科書",
    score: 91, studyHoursPerDay: 2,
    comment: "経理未経験でしたが、このテキストのおかげで基礎から理解できました。章末の確認問題が弱点発見に役立ちました。",
  },
  {
    id: "r3", name: "中村 翔太", age: 32, occupation: "ITエンジニア",
    daysToPass: 78, textbookUsed: "みんなが欲しかった！簿記の教科書",
    score: 76, studyHoursPerDay: 1,
    comment: "仕事が忙しく1日1時間しか取れませんでしたが、コンパクトにまとまっているので無理なく続けられました。",
  },
]

export const SIMILAR_USER_DATA = {
  labels: ["1週目", "2週目", "3週目", "4週目", "5週目", "6週目", "7週目", "8週目"],
  you: [15, 42, 68, 95, 118, 145, 178, 210],
  passers: [20, 50, 85, 120, 155, 185, 215, 240],
  failers: [10, 25, 38, 45, 52, 55, 58, 60],
}
