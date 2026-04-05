"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { BookOpen, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

type Question = {
  id: string
  title: string
  subtitle?: string
  options: { value: string; label: string; emoji: string; desc?: string }[]
}

const QUESTIONS: Question[] = [
  {
    id: "style",
    title: "参考書を選ぶとき、どちらを重視しますか？",
    subtitle: "あなたの理解スタイルを教えてください",
    options: [
      { value: "visual", label: "図解・イラスト重視", emoji: "🎨", desc: "図やイラストで視覚的に理解したい" },
      { value: "text", label: "文章・解説重視", emoji: "📝", desc: "詳しい文章で丁寧に理解したい" },
    ],
  },
  {
    id: "detail",
    title: "学習スタイルはどちらに近いですか？",
    subtitle: "情報量の好みを教えてください",
    options: [
      { value: "summary", label: "要点だけサクサク", emoji: "⚡", desc: "ポイントを絞って効率よく学びたい" },
      { value: "detailed", label: "じっくり詳細に", emoji: "🔍", desc: "背景や理由まで理解してから進みたい" },
    ],
  },
  {
    id: "time",
    title: "1日の学習時間はどれくらいですか？",
    options: [
      { value: "30min", label: "30分未満", emoji: "⏱️", desc: "すき間時間を活用したい" },
      { value: "1h", label: "約1時間", emoji: "⏰", desc: "毎日コツコツ継続したい" },
      { value: "2h", label: "2時間以上", emoji: "🕑", desc: "集中的に取り組みたい" },
    ],
  },
  {
    id: "attribute",
    title: "現在のご職業を教えてください",
    options: [
      { value: "worker", label: "社会人", emoji: "💼", desc: "仕事をしながら学習" },
      { value: "student", label: "学生", emoji: "🎓", desc: "学業と並行して学習" },
      { value: "other", label: "その他", emoji: "👤", desc: "フリーランス・求職中など" },
    ],
  },
  {
    id: "qualification",
    title: "取得したい資格を選んでください",
    options: [
      { value: "boki2", label: "簿記2級", emoji: "📊", desc: "日商簿記検定2級" },
      { value: "takken", label: "宅建士", emoji: "🏠", desc: "宅地建物取引士" },
      { value: "it_passport", label: "ITパスポート", emoji: "💻", desc: "ITパスポート試験" },
    ],
  },
  {
    id: "level",
    title: "その分野の現在の知識レベルは？",
    options: [
      { value: "beginner", label: "ゼロから始める", emoji: "🌱", desc: "まったく初めて" },
      { value: "intermediate", label: "少し知っている", emoji: "📗", desc: "基礎は何となく知っている" },
      { value: "advanced", label: "ある程度わかる", emoji: "📘", desc: "実務経験や学習経験あり" },
    ],
  },
]

export default function DiagnosisPage() {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [direction, setDirection] = useState(1)

  const question = QUESTIONS[currentIndex]
  const progress = ((currentIndex) / QUESTIONS.length) * 100

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (currentIndex < QUESTIONS.length - 1) {
      setDirection(1)
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300)
    } else {
      const params = new URLSearchParams(newAnswers)
      router.push(`/result?${params.toString()}`)
    }
  }

  const handleBack = () => {
    if (currentIndex > 0) {
      setDirection(-1)
      setCurrentIndex(currentIndex - 1)
    }
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-lg">シカクン</span>
          </Link>
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {QUESTIONS.length}
          </span>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-2xl mx-auto px-4">
          <Progress value={progress} className="h-1.5 rounded-none" />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={question.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Question */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                  質問 {currentIndex + 1}/{QUESTIONS.length}
                </div>
                <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
                  {question.title}
                </h1>
                {question.subtitle && (
                  <p className="text-muted-foreground">{question.subtitle}</p>
                )}
              </div>

              {/* Options */}
              <div className={`grid gap-3 ${question.options.length === 2 ? "grid-cols-2" : "grid-cols-1 md:grid-cols-3"}`}>
                {question.options.map((option, i) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleAnswer(option.value)}
                    className={`group relative p-5 rounded-2xl border-2 text-left transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 bg-white active:scale-95 ${
                      answers[question.id] === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <div className="text-3xl mb-3">{option.emoji}</div>
                    <div className="font-bold text-base mb-1">{option.label}</div>
                    {option.desc && (
                      <div className="text-xs text-muted-foreground">{option.desc}</div>
                    )}
                    <div className="absolute top-3 right-3 w-5 h-5 rounded-full border-2 border-border group-hover:border-primary transition-colors flex items-center justify-center">
                      {answers[question.id] === option.value && (
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Back button */}
          {currentIndex > 0 && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleBack}
              className="mt-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              前の質問に戻る
            </motion.button>
          )}
        </div>
      </div>

      {/* Step dots */}
      <div className="pb-8 flex justify-center gap-2">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i < currentIndex
                ? "w-4 bg-primary"
                : i === currentIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
