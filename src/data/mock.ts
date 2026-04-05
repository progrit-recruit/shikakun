import { Textbook, ProgressEntry, Quiz, PasserReview } from "@/types"

export const QUALIFICATIONS = [
  { id: "boki2", label: "簿記2級", icon: "📊" },
  { id: "takken", label: "宅建士", icon: "🏠" },
  { id: "it_passport", label: "ITパスポート", icon: "💻" },
]

export const TEXTBOOKS: Textbook[] = [
  {
    id: "tb1",
    title: "みんなが欲しかった！簿記の教科書 日商2級",
    author: "滝澤ななみ",
    publisher: "TAC出版",
    price: 2200,
    coverColor: "#E8F4FD",
    matchScore: 95,
    reason: "図解が豊富で視覚的に理解しやすく、要点がコンパクトにまとまっています。忙しい社会人が短時間で効率よく学べる構成です。",
    features: ["図解が豊富", "要点まとめあり", "初心者向け", "スマホアプリ連動"],
    difficulty: "易",
    visualLevel: 90,
    detailLevel: 60,
    amazonUrl: "https://www.amazon.co.jp/dp/B0XXXXX",
    qualification: "boki2",
  },
  {
    id: "tb2",
    title: "スッキリわかる 日商簿記2級",
    author: "加藤 裕介",
    publisher: "TAC出版",
    price: 1650,
    coverColor: "#E8FDF4",
    matchScore: 82,
    reason: "会話形式で解説が進むため読みやすく、理解度チェック問題が章ごとについています。",
    features: ["会話形式", "章末問題", "コンパクト", "カラー印刷"],
    difficulty: "易",
    visualLevel: 75,
    detailLevel: 55,
    amazonUrl: "https://www.amazon.co.jp/dp/B0YYYYY",
    qualification: "boki2",
  },
  {
    id: "tb3",
    title: "合格テキスト 日商簿記2級 商業簿記",
    author: "TAC簿記検定講座",
    publisher: "TAC出版",
    price: 1760,
    coverColor: "#FDF8E8",
    matchScore: 74,
    reason: "試験範囲を網羅した詳細なテキスト。じっくり読み込むスタイルの方に最適です。",
    features: ["網羅的", "詳細解説", "試験対応", "講師推奨"],
    difficulty: "普",
    visualLevel: 40,
    detailLevel: 95,
    amazonUrl: "https://www.amazon.co.jp/dp/B0ZZZZZ",
    qualification: "boki2",
  },
  {
    id: "tb4",
    title: "パブロフ流でみんな合格 日商簿記2級",
    author: "よせだあつこ",
    publisher: "翔泳社",
    price: 1980,
    coverColor: "#FDE8F4",
    matchScore: 88,
    reason: "マンガ形式の導入と豊富な図解で、初めて簿記を学ぶ方でも直感的に理解できます。",
    features: ["マンガ形式", "図解多数", "独学向け", "無料動画付き"],
    difficulty: "易",
    visualLevel: 95,
    detailLevel: 50,
    amazonUrl: "https://www.amazon.co.jp/dp/B0AAAAA",
    qualification: "boki2",
  },
]

export const MOCK_PROGRESS: ProgressEntry[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(2025, 2, i + 1)
  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`
  const pages = i < 5 ? 0 : i < 10 ? Math.floor(Math.random() * 8) + 3 : Math.floor(Math.random() * 12) + 5
  return {
    date: dateStr,
    pages,
    totalPages: Math.min(pages * (i + 1) * 0.7, 320),
  }
}).map((entry, i, arr) => ({
  ...entry,
  totalPages: Math.round(arr.slice(0, i + 1).reduce((sum, e) => sum + e.pages, 0)),
}))

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
    id: "r1",
    name: "田村 健二",
    age: 29,
    occupation: "営業職",
    daysToPass: 62,
    textbookUsed: "みんなが欲しかった！簿記の教科書",
    score: 84,
    studyHoursPerDay: 1.5,
    comment: "平日は帰宅後1時間、週末に3〜4時間を2ヶ月続けました。この参考書は図解が多くて、仕訳のイメージが掴みやすかったです。電車の中でもサクサク読めました。",
  },
  {
    id: "r2",
    name: "鈴木 麻衣",
    age: 25,
    occupation: "事務職",
    daysToPass: 45,
    textbookUsed: "みんなが欲しかった！簿記の教科書",
    score: 91,
    studyHoursPerDay: 2,
    comment: "経理未経験でしたが、このテキストのおかげで基礎から理解できました。章末の確認問題が自分の弱点発見に役立ちました。",
  },
  {
    id: "r3",
    name: "中村 翔太",
    age: 32,
    occupation: "ITエンジニア",
    daysToPass: 78,
    textbookUsed: "みんなが欲しかった！簿記の教科書",
    score: 76,
    studyHoursPerDay: 1,
    comment: "仕事が忙しく1日1時間しか取れませんでしたが、コンパクトにまとまっているので無理なく続けられました。",
  },
]

export const SIMILAR_USER_DATA = {
  labels: ["1週目", "2週目", "3週目", "4週目", "5週目", "6週目", "7週目", "8週目"],
  you: [15, 42, 68, 95, 118, 145, 178, 210],
  passers: [20, 50, 85, 120, 155, 185, 215, 240],
  failers: [10, 25, 38, 45, 52, 55, 58, 60],
}
