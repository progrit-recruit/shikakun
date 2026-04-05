"use client"

import { useEffect, useState, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  BookOpen, ExternalLink, ArrowRight, CheckCircle,
  Sparkles, TrendingUp, Brain, Target
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TEXTBOOKS } from "@/data/mock"
import { Textbook } from "@/types"

function getRecommendation(params: URLSearchParams): { recommended: Textbook; alternative: Textbook } {
  const style = params.get("style")
  const detail = params.get("detail")
  const qualification = params.get("qualification") ?? "boki2"

  const books = TEXTBOOKS.filter((b) => b.qualification === qualification)

  // Simple scoring based on user style
  const scored = books.map((book) => {
    let score = book.matchScore
    if (style === "visual") score += book.visualLevel * 0.1
    if (style === "text") score += (100 - book.visualLevel) * 0.1
    if (detail === "summary") score += (100 - book.detailLevel) * 0.05
    if (detail === "detailed") score += book.detailLevel * 0.05
    return { ...book, matchScore: Math.min(Math.round(score), 99) }
  })

  scored.sort((a, b) => b.matchScore - a.matchScore)
  return { recommended: scored[0], alternative: scored[1] }
}

function StyleBar({ label, value, color }: { label: string; value: number; color: string }) {
  const [width, setWidth] = useState(0)
  useEffect(() => { setTimeout(() => setWidth(value), 300) }, [value])
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{value}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  )
}

function ResultContent() {
  const params = useSearchParams()
  const [phase, setPhase] = useState<"loading" | "reveal">("loading")
  const [loadingStep, setLoadingStep] = useState(0)

  const LOADING_STEPS = [
    "学習スタイルを分析中...",
    "参考書データベースを照合中...",
    "マッチ度を計算中...",
    "最適な1冊を選定中...",
  ]

  useEffect(() => {
    const timer1 = setTimeout(() => setLoadingStep(1), 700)
    const timer2 = setTimeout(() => setLoadingStep(2), 1400)
    const timer3 = setTimeout(() => setLoadingStep(3), 2100)
    const timer4 = setTimeout(() => setPhase("reveal"), 2800)
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4) }
  }, [])

  const { recommended, alternative } = getRecommendation(params)

  const styleLabels: Record<string, string> = {
    visual: "図解・イラスト派",
    text: "文章・解説派",
    summary: "要点まとめ派",
    detailed: "詳細解説派",
    "30min": "30分/日",
    "1h": "1時間/日",
    "2h": "2時間以上/日",
    worker: "社会人",
    student: "学生",
    boki2: "簿記2級",
    takken: "宅建士",
    it_passport: "ITパスポート",
    beginner: "初心者",
    intermediate: "中級者",
    advanced: "上級者",
  }

  const styleItems = [
    { key: "style", icon: Brain },
    { key: "detail", icon: Target },
    { key: "time", icon: TrendingUp },
    { key: "attribute", icon: BookOpen },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-lg">シカクン</span>
          </Link>
          <Badge variant="outline" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />AI分析結果
          </Badge>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {phase === "loading" ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[80vh] px-4"
          >
            <div className="text-center max-w-sm">
              {/* Animated logo */}
              <div className="relative w-24 h-24 mx-auto mb-8">
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-primary/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border-4 border-primary border-t-transparent"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
              </div>

              <h2 className="text-2xl font-black mb-2">AI が分析しています</h2>
              <p className="text-muted-foreground text-sm mb-8">
                あなたの学習スタイルに最適な参考書を選定中...
              </p>

              <div className="space-y-2 text-left">
                {LOADING_STEPS.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: loadingStep >= i ? 1 : 0.3, x: 0 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${loadingStep > i ? "bg-primary" : loadingStep === i ? "border-2 border-primary animate-pulse" : "border-2 border-border"}`}>
                      {loadingStep > i && <CheckCircle className="w-3 h-3 text-white" />}
                    </div>
                    <span className={loadingStep >= i ? "text-foreground font-medium" : "text-muted-foreground"}>
                      {step}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto px-4 py-12"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 font-bold px-4 py-2 rounded-full mb-4 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  分析完了！あなたの最適な1冊が見つかりました
                </div>
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                あなたの学習スタイルに<br />
                <span className="text-primary">ぴったりの参考書</span>はこれです
              </h1>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Main recommendation */}
              <motion.div
                className="md:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-primary border-2 shadow-xl shadow-primary/10 overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-indigo-600 px-6 py-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white font-bold text-sm">AIおすすめの1冊</span>
                    <Badge className="ml-auto bg-white/20 text-white border-0 text-xs">
                      マッチ度 {recommended.matchScore}%
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex gap-5 mb-6">
                      {/* Book cover */}
                      <div
                        className="w-24 h-32 rounded-lg shrink-0 flex items-center justify-center shadow-md"
                        style={{ backgroundColor: recommended.coverColor }}
                      >
                        <BookOpen className="w-10 h-10 text-slate-600/60" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="font-black text-xl leading-tight mb-2">{recommended.title}</h2>
                        <div className="text-sm text-muted-foreground mb-3">
                          {recommended.author} 著 / {recommended.publisher}
                        </div>
                        <div className="flex gap-2 flex-wrap mb-3">
                          {recommended.features.map((f) => (
                            <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
                          ))}
                        </div>
                        <div className="text-2xl font-black text-primary">¥{recommended.price.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Match score bar */}
                    <div className="mb-5 p-4 bg-primary/5 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold">マッチ度</span>
                        <span className="text-2xl font-black text-primary">{recommended.matchScore}%</span>
                      </div>
                      <Progress value={recommended.matchScore} className="h-3" />
                    </div>

                    {/* Why */}
                    <div className="mb-5">
                      <h3 className="font-bold text-sm mb-2 flex items-center gap-1.5">
                        <Brain className="w-4 h-4 text-primary" />
                        AIがこの本を選んだ理由
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed bg-slate-50 p-4 rounded-xl">
                        {recommended.reason}
                      </p>
                    </div>

                    <a
                      href={recommended.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-500 text-slate-900 font-black py-3.5 rounded-xl transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Amazonで購入する
                    </a>

                    <Link
                      href="/dashboard"
                      className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3 rounded-xl hover:opacity-90 transition-opacity"
                    >
                      学習を始める <ArrowRight className="w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Right column */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Your style */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-primary" />
                      あなたの学習スタイル
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {styleItems.map(({ key }) => {
                        const val = params.get(key)
                        return val ? (
                          <Badge key={key} variant="outline" className="text-xs">
                            {styleLabels[val] ?? val}
                          </Badge>
                        ) : null
                      })}
                    </div>
                    <StyleBar label="視覚的理解" value={params.get("style") === "visual" ? 78 : 42} color="bg-violet-400" />
                    <StyleBar label="詳細志向" value={params.get("detail") === "detailed" ? 82 : 35} color="bg-blue-400" />
                    <StyleBar label="効率重視" value={params.get("detail") === "summary" ? 75 : 48} color="bg-emerald-400" />
                  </CardContent>
                </Card>

                {/* Alternative */}
                <Card>
                  <CardContent className="p-5">
                    <h3 className="font-bold mb-3 text-sm text-muted-foreground">代替候補</h3>
                    <div
                      className="w-12 h-16 rounded-lg mb-3 flex items-center justify-center"
                      style={{ backgroundColor: alternative.coverColor }}
                    >
                      <BookOpen className="w-6 h-6 text-slate-500/60" />
                    </div>
                    <p className="font-bold text-sm leading-tight mb-1">{alternative.title}</p>
                    <p className="text-xs text-muted-foreground mb-3">{alternative.author}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">マッチ度 {alternative.matchScore}%</Badge>
                      <span className="font-bold text-sm">¥{alternative.price.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <div className="bg-gradient-to-br from-primary to-indigo-600 rounded-2xl p-5 text-white">
                  <Sparkles className="w-6 h-6 mb-2 text-white/70" />
                  <p className="font-black text-sm mb-1">プレミアムで</p>
                  <p className="text-xs text-white/70 mb-3">合格者の進捗データと比較して合格確率を高めよう</p>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1 text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    ダッシュボードへ <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense>
      <ResultContent />
    </Suspense>
  )
}
