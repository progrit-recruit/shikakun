export type LearningStyle = {
  visual: number       // 図解派 0-100
  detailed: number     // 詳細解説派 0-100
  timePerDay: string   // 1日の学習時間
  attribute: "worker" | "student"
  qualification: string
  level: "beginner" | "intermediate" | "advanced"
}

export type Textbook = {
  id: string
  title: string
  author: string
  publisher: string
  price: number
  coverColor: string
  matchScore: number
  reason: string
  features: string[]
  difficulty: "易" | "普" | "難"
  visualLevel: number   // 図解の多さ 0-100
  detailLevel: number   // 詳細さ 0-100
  amazonUrl: string
  qualification: string
}

export type DiagnosisAnswer = {
  questionId: string
  value: string | number
}

export type ProgressEntry = {
  date: string
  pages: number
  totalPages: number
}

export type Quiz = {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export type PasserReview = {
  id: string
  name: string
  age: number
  occupation: string
  daysToPass: number
  textbookUsed: string
  score: number
  comment: string
  studyHoursPerDay: number
}

export type DiagnosisResult = {
  style: LearningStyle
  recommended: Textbook
  alternative: Textbook
}
