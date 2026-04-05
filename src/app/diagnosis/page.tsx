"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { BookOpen, ArrowLeft, Check, Sparkles, Star, Lock } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { QUALIFICATIONS } from "@/data/mock"

type Question = {
  id: string
  title: string
  subtitle?: string
  options: { value: string; label: string; emoji: string; desc?: string }[]
}

const buildQuestions = (): Question[] => [
  {
    id: "qualification",
    title: "取得したい資格を選んでください",
    options: QUALIFICATIONS.map((q) => ({
      value: q.id,
      label: q.label,
      emoji: q.icon,
      desc: q.level,
    })),
  },
  {
    id: "style",
    title: "参考書を選ぶとき、どちらを重視しますか？",
    subtitle: "あなたの理解スタイルを教えてください",
    options: [
      { value: "visual", label: "図解・イラスト重視", emoji: "🎨", desc: "図やイラストで視覚的に理解したい" },
      { value: "text",   label: "文章・解説重視",     emoji: "📝", desc: "詳しい文章で丁寧に理解したい" },
    ],
  },
  {
    id: "detail",
    title: "学習スタイルはどちらに近いですか？",
    subtitle: "情報量の好みを教えてください",
    options: [
      { value: "summary",  label: "要点だけサクサク", emoji: "⚡", desc: "ポイントを絞って効率よく学びたい" },
      { value: "detailed", label: "じっくり詳細に",   emoji: "🔍", desc: "背景や理由まで理解してから進みたい" },
    ],
  },
  {
    id: "time",
    title: "1日の学習時間はどれくらいですか？",
    options: [
      { value: "30min", label: "30分未満", emoji: "⏱️", desc: "すき間時間を活用したい" },
      { value: "1h",    label: "約1時間",  emoji: "⏰", desc: "毎日コツコツ継続したい" },
      { value: "2h",    label: "2時間以上", emoji: "🕑", desc: "集中的に取り組みたい" },
    ],
  },
  {
    id: "attribute",
    title: "現在のご職業を教えてください",
    options: [
      { value: "worker",  label: "社会人",  emoji: "💼", desc: "仕事をしながら学習" },
      { value: "student", label: "学生",    emoji: "🎓", desc: "学業と並行して学習" },
      { value: "other",   label: "その他",  emoji: "👤", desc: "フリーランス・求職中など" },
    ],
  },
  {
    id: "level",
    title: "その分野の現在の知識レベルは？",
    options: [
      { value: "beginner",     label: "ゼロから始める",   emoji: "🌱", desc: "まったく初めて" },
      { value: "intermediate", label: "少し知っている",   emoji: "📗", desc: "基礎は何となく知っている" },
      { value: "advanced",     label: "ある程度わかる",   emoji: "📘", desc: "実務経験や学習経験あり" },
    ],
  },
  {
    id: "deadline",
    title: "いつまでに取得したいですか？",
    subtitle: "目標時期を教えてください",
    options: [
      { value: "1month",  label: "1ヶ月以内",  emoji: "🔥", desc: "短期集中で一気に合格を目指す" },
      { value: "3months", label: "3ヶ月以内",  emoji: "📅", desc: "コツコツ着実に進めたい" },
      { value: "6months", label: "6ヶ月以内",  emoji: "🗓️", desc: "余裕を持ってじっくり学習したい" },
      { value: "1year",   label: "1年以内",    emoji: "⏳", desc: "ライフスタイルに合わせてマイペースに" },
    ],
  },
]

const QUESTIONS = buildQuestions()

// ペイウォール画面
function Paywall({ onPurchase }: { onPurchase: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex items-center justify-center px-4 py-12"
    >
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-200">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 bg-amber-400 rounded-full flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
          </div>
        </div>

        <h1 className="text-2xl font-black mb-2">AI理解スタイル診断</h1>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          あなたの学習スタイルを分析し、<br />
          10資格・50冊以上の参考書から<br />
          最適な「あなたの1冊」を即座に選定します。
        </p>

        {/* Features */}
        <div className="bg-slate-50 rounded-2xl p-5 mb-6 text-left space-y-3">
          {[
            "全10資格・50冊以上のデータベースから選定",
            "6問2分の診断で学習スタイルを数値化",
            "マッチ度と選定理由を詳細にレポート",
            "進捗管理・理解度チェックも永続利用可能",
          ].map((f) => (
            <div key={f} className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-emerald-600" />
              </div>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 rounded-2xl p-5 mb-6">
          <div className="text-xs text-muted-foreground mb-1">ベースプラン（買い切り）</div>
          <div className="flex items-baseline justify-center gap-1 mb-1">
            <span className="text-4xl font-black text-indigo-600">¥1,500</span>
            <span className="text-muted-foreground text-sm">一回限り</span>
          </div>
          <div className="text-xs text-muted-foreground">
            参考書1冊（平均¥2,000）の<span className="font-bold text-indigo-600">75%以下</span>で最適な1冊が見つかる
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onPurchase}
          className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 text-lg mb-3"
        >
          <Sparkles className="w-5 h-5" />
          診断を始める（¥1,500）
        </button>

        <button
          onClick={onPurchase}
          className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors py-2 flex items-center justify-center gap-1"
        >
          <Lock className="w-3 h-3" />
          デモのため無料で体験できます
        </button>
      </div>
    </motion.div>
  )
}

// Brain icon inline since we need it inside the file
function Brain({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
      <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/>
      <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  )
}

export default function DiagnosisPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<"paywall" | "quiz">("paywall")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [direction, setDirection] = useState(1)

  const question = QUESTIONS[currentIndex]
  const progress = (currentIndex / QUESTIONS.length) * 100

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    if (currentIndex < QUESTIONS.length - 1) {
      setDirection(1)
      setTimeout(() => setCurrentIndex(currentIndex + 1), 250)
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
    enter:  (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  }

  // 資格選択は3列グリッド、2択は2列、3択は1列
  const gridClass =
    question.id === "qualification" ? "grid-cols-2 md:grid-cols-3" :
    question.options.length === 2   ? "grid-cols-2" :
    "grid-cols-1 md:grid-cols-3"

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
          {phase === "quiz" && (
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {QUESTIONS.length}
            </span>
          )}
        </div>
      </header>

      {/* Progress bar (quiz only) */}
      {phase === "quiz" && (
        <div className="bg-white border-b">
          <div className="max-w-2xl mx-auto px-4">
            <Progress value={progress} className="h-1.5 rounded-none" />
          </div>
        </div>
      )}

      {phase === "paywall" ? (
        <Paywall onPurchase={() => setPhase("quiz")} />
      ) : (
        <>
          <div className="flex-1 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={question.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {/* Question header */}
                  <div className="mb-6 text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full mb-4">
                      質問 {currentIndex + 1}/{QUESTIONS.length}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-2">
                      {question.title}
                    </h1>
                    {question.subtitle && (
                      <p className="text-muted-foreground text-sm">{question.subtitle}</p>
                    )}
                  </div>

                  {/* Options */}
                  <div className={`grid gap-3 ${gridClass}`}>
                    {question.options.map((option, i) => (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => handleAnswer(option.value)}
                        className={`group relative p-4 rounded-2xl border-2 text-left transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 bg-white active:scale-95 ${
                          answers[question.id] === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.emoji}</div>
                        <div className="font-bold text-sm mb-0.5">{option.label}</div>
                        {option.desc && (
                          <div className="text-xs text-muted-foreground">{option.desc}</div>
                        )}
                        <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-border group-hover:border-primary transition-colors flex items-center justify-center">
                          {answers[question.id] === option.value && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
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
                  className="mt-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
                >
                  <ArrowLeft className="w-4 h-4" />
                  前の質問に戻る
                </motion.button>
              )}
            </div>
          </div>

          {/* Step dots */}
          <div className="pb-6 flex justify-center gap-2">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i < currentIndex ? "w-4 bg-primary" :
                  i === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
