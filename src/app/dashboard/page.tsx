"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts"
import {
  BookOpen, TrendingUp, Brain, Users, Star,
  CheckCircle, XCircle, ChevronRight, Trophy,
  Lock, Sparkles, ChevronDown
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MOCK_PROGRESS, MOCK_QUIZZES, MOCK_PASSER_REVIEWS, SIMILAR_USER_DATA } from "@/data/mock"

type Tab = "progress" | "quiz" | "compare" | "reviews"

const TABS: { id: Tab; label: string; icon: React.ElementType; premium: boolean }[] = [
  { id: "progress", label: "進捗",       icon: TrendingUp, premium: false },
  { id: "quiz",     label: "理解度",     icon: Brain,      premium: true  },
  { id: "compare",  label: "類似比較",   icon: Users,      premium: true  },
  { id: "reviews",  label: "合格者の声", icon: Star,       premium: true  },
]

// ── 学習カレンダー ────────────────────────────────────
function StudyCalendar() {
  const MONTH_LABEL = "2025年3月"
  const DAYS = ["日", "月", "火", "水", "木", "金", "土"]

  // 3/1 is Saturday (index 6) → offset = 6
  const startOffset = 6
  const totalDays = 30

  const dayMap: Record<number, number> = {}
  MOCK_PROGRESS.forEach((e) => {
    const day = parseInt(e.date.split("/")[1])
    dayMap[day] = e.toPage - e.fromPage
  })

  const cells: { day: number | null; pages: number }[] = []
  for (let i = 0; i < startOffset; i++) cells.push({ day: null, pages: 0 })
  for (let d = 1; d <= totalDays; d++) cells.push({ day: d, pages: dayMap[d] ?? 0 })

  const getColor = (pages: number) => {
    if (pages === 0) return { bg: "bg-slate-100", text: "text-slate-300", ring: "" }
    if (pages <= 8)  return { bg: "bg-indigo-100", text: "text-indigo-600", ring: "ring-1 ring-indigo-200" }
    if (pages <= 14) return { bg: "bg-indigo-400", text: "text-white",      ring: "" }
    return               { bg: "bg-indigo-600", text: "text-white",      ring: "" }
  }

  const totalStudyDays = Object.values(dayMap).filter(v => v > 0).length
  const streak = 18

  return (
    <Card>
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-base">{MONTH_LABEL}の学習記録</h3>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span>📅 {totalStudyDays}日学習</span>
            <span>🔥 {streak}日連続</span>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d, i) => (
            <div key={d} className={`text-center text-xs font-bold pb-1 ${i === 0 ? "text-red-400" : i === 6 ? "text-blue-400" : "text-muted-foreground"}`}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((cell, idx) => {
            if (!cell.day) return <div key={`empty-${idx}`} />
            const { bg, text, ring } = getColor(cell.pages)
            return (
              <div
                key={cell.day}
                title={cell.pages > 0 ? `${cell.day}日：${cell.pages}ページ学習` : `${cell.day}日：学習なし`}
                className={`aspect-square rounded-lg flex flex-col items-center justify-center ${bg} ${ring} cursor-default select-none`}
              >
                <span className={`text-xs font-bold ${text}`}>{cell.day}</span>
                {cell.pages > 0 && (
                  <span className={`text-[9px] leading-none ${text} opacity-80`}>{cell.pages}P</span>
                )}
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
          <span>学習量</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded bg-slate-100" />
            <div className="w-4 h-4 rounded bg-indigo-100" />
            <div className="w-4 h-4 rounded bg-indigo-400" />
            <div className="w-4 h-4 rounded bg-indigo-600" />
          </div>
          <span>多</span>
        </div>
      </CardContent>
    </Card>
  )
}

// ── 進捗タブ ────────────────────────────────────────
function ProgressTab() {
  const [fromPage, setFromPage] = useState("")
  const [toPage, setToPage]     = useState("")
  const [logs, setLogs] = useState<{ from: number; to: number; date: string }[]>([])
  const [error, setError] = useState("")

  const totalBookPages = 320
  const latestPage = logs.length > 0
    ? Math.max(...logs.map(l => l.to))
    : MOCK_PROGRESS[MOCK_PROGRESS.length - 1].totalPages

  const progressPct = Math.min(Math.round((latestPage / totalBookPages) * 100), 100)

  const chartData = MOCK_PROGRESS.filter((_, i) => i % 3 === 0).map((e) => ({
    date: e.date,
    累計ページ: e.totalPages,
  }))

  const handleRecord = () => {
    const f = parseInt(fromPage)
    const t = parseInt(toPage)
    setError("")

    if (isNaN(f) || isNaN(t)) { setError("数字を入力してください"); return }
    if (f >= t)               { setError("終了ページは開始ページより大きくしてください"); return }
    if (f < 1 || t > totalBookPages) { setError(`1〜${totalBookPages}の範囲で入力してください`); return }

    const today = new Date()
    const label = `${today.getMonth() + 1}/${today.getDate()}`
    setLogs([{ from: f, to: t, date: label }, ...logs])
    setFromPage("")
    setToPage("")
  }

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center gap-2 text-sm">
              <BookOpen className="w-4 h-4 text-primary" />
              みんなが欲しかった！簿記の教科書 2級
            </h3>
            <span className="font-black text-primary text-xl">{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-4 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>P.1</span>
            <span className="font-medium">P.{latestPage} / {totalBookPages}</span>
            <span>P.{totalBookPages}</span>
          </div>
        </CardContent>
      </Card>

      {/* 今日の進捗入力 */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold mb-1 text-sm">今日の学習を記録</h3>
          <p className="text-xs text-muted-foreground mb-3">取り組んだページの範囲を入力してください</p>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1">
              <input
                type="number"
                value={fromPage}
                onChange={(e) => setFromPage(e.target.value)}
                placeholder="開始ページ"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center"
              />
            </div>
            <span className="text-muted-foreground font-bold text-sm shrink-0">〜</span>
            <div className="flex-1">
              <input
                type="number"
                value={toPage}
                onChange={(e) => setToPage(e.target.value)}
                placeholder="終了ページ"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-center"
              />
            </div>
            <span className="text-xs text-muted-foreground shrink-0">ページ</span>
          </div>

          {error && (
            <p className="text-xs text-red-500 mb-2">{error}</p>
          )}

          <button
            onClick={handleRecord}
            className="w-full bg-primary text-primary-foreground font-bold py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
          >
            記録する
          </button>

          {/* 本日のログ */}
          {logs.length > 0 && (
            <div className="mt-3 space-y-2">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-sm bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2.5"
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-emerald-700 font-medium">
                    {log.date}：{log.from}〜{log.to}ページ（{log.to - log.from}ページ）
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* グラフ */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold mb-4 text-sm">累計進捗グラフ</h3>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Line
                  type="monotone" dataKey="累計ページ"
                  stroke="oklch(0.511 0.229 264.37)"
                  strokeWidth={2.5} dot={false} activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* カレンダー */}
      <StudyCalendar />
    </div>
  )
}

// ── 理解度チェックタブ ───────────────────────────────
function QuizTab() {
  const [currentQ, setCurrentQ]   = useState(0)
  const [selected, setSelected]   = useState<number | null>(null)
  const [answered, setAnswered]   = useState(false)
  const [results, setResults]     = useState<boolean[]>([])
  const [done, setDone]           = useState(false)

  const quiz = MOCK_QUIZZES[currentQ]

  const handleSelect = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    setResults([...results, i === quiz.answer])
  }

  const handleNext = () => {
    if (currentQ < MOCK_QUIZZES.length - 1) {
      setCurrentQ(currentQ + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      setDone(true)
    }
  }

  const correct = results.filter(Boolean).length

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-10">
        <div className="text-6xl mb-4">
          {correct === MOCK_QUIZZES.length ? "🏆" : correct >= 2 ? "🎯" : "📚"}
        </div>
        <h2 className="text-2xl font-black mb-1">
          {correct} / {MOCK_QUIZZES.length}問 正解
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          {correct === MOCK_QUIZZES.length
            ? "完璧！この範囲は完全に理解できています。"
            : "間違えた問題を参考書で復習しましょう。"}
        </p>
        <button
          onClick={() => { setCurrentQ(0); setSelected(null); setAnswered(false); setResults([]); setDone(false) }}
          className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          もう一度チャレンジ
        </button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-muted-foreground">
          問題 {currentQ + 1} / {MOCK_QUIZZES.length}
        </span>
        <Badge variant="outline" className="text-xs">
          <Brain className="w-3 h-3 mr-1" />AI生成問題
        </Badge>
      </div>
      <Progress value={(currentQ / MOCK_QUIZZES.length) * 100} className="h-2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}
        >
          <Card>
            <CardContent className="p-5">
              <h3 className="font-bold text-base leading-snug mb-5">{quiz.question}</h3>
              <div className="space-y-2.5">
                {quiz.options.map((opt, i) => {
                  let style = "border-border bg-white hover:border-primary hover:bg-primary/5"
                  if (answered) {
                    if (i === quiz.answer)                   style = "border-emerald-500 bg-emerald-50"
                    else if (i === selected)                 style = "border-red-400 bg-red-50"
                    else                                     style = "border-border bg-white opacity-40"
                  }
                  return (
                    <button
                      key={i} onClick={() => handleSelect(i)} disabled={answered}
                      className={`w-full text-left p-3.5 rounded-xl border-2 transition-all text-sm ${style}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">
                          {["A","B","C","D"][i]}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {answered && i === quiz.answer && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />}
                        {answered && i === selected && i !== quiz.answer && <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-blue-50 rounded-xl"
                >
                  <div className="font-bold text-xs text-blue-700 mb-1">解説</div>
                  <p className="text-sm text-blue-600 leading-relaxed">{quiz.explanation}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {answered && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={handleNext}
              className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-sm"
            >
              {currentQ < MOCK_QUIZZES.length - 1 ? "次の問題へ" : "結果を見る"}
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// ── 類似比較タブ ────────────────────────────────────
function CompareTab() {
  const { labels, you, passers, failers } = SIMILAR_USER_DATA
  const chartData = labels.map((label, i) => ({
    week: label, あなた: you[i], 合格者平均: passers[i], 不合格者平均: failers[i],
  }))
  const ratio = Math.round((you[you.length - 1] / passers[passers.length - 1]) * 100)

  return (
    <div className="space-y-5">
      <Card className="bg-gradient-to-br from-primary/5 to-indigo-50 border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-black text-2xl">{ratio}%</div>
              <div className="text-xs text-muted-foreground">合格者ペースとの比較</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            合格者と比較して<span className="font-bold text-primary"> {ratio >= 80 ? "良いペース" : "少し遅れ気味"}</span>です。
            {ratio < 80 && "1日2〜3ページ増やすと合格ラインに乗れます。"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold text-sm mb-4">累計ページ数の比較（週別）</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="合格者平均" fill="#86efac" radius={[4,4,0,0]} />
                <Bar dataKey="あなた" fill="oklch(0.511 0.229 264.37)" radius={[4,4,0,0]} />
                <Bar dataKey="不合格者平均" fill="#fca5a5" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />AIからのアドバイス
          </h3>
          <div className="space-y-2.5">
            {[
              { icon: "📈", text: "現在のペースを維持できれば62日後に合格ラインに到達する見込みです" },
              { icon: "⚠️", text: "第3章「有価証券」の進捗が遅い傾向があります。重点的に復習しましょう" },
              { icon: "💡", text: "合格者の多くは週末に集中的に演習問題を解いています" },
            ].map((a, i) => (
              <div key={i} className="flex gap-3 p-3 bg-slate-50 rounded-xl text-sm">
                <span>{a.icon}</span>
                <span className="text-muted-foreground">{a.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// ── 合格者の声タブ ───────────────────────────────────
function ReviewsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
        <p className="text-xs text-amber-700 font-medium">
          同じ参考書・近い属性の合格者{MOCK_PASSER_REVIEWS.length}名のリアルな記録
        </p>
      </div>

      {MOCK_PASSER_REVIEWS.map((review, i) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  {review.name[0]}
                </div>
                <div>
                  <div className="font-bold text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.age}歳 / {review.occupation}</div>
                </div>
                <Badge className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                  <Trophy className="w-3 h-3 mr-1" />合格
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: "合格まで", value: `${review.daysToPass}日` },
                  { label: "得点",     value: `${review.score}点` },
                  { label: "1日平均",  value: `${review.studyHoursPerDay}h` },
                ].map((s) => (
                  <div key={s.label} className="text-center p-2 bg-slate-50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-0.5">{s.label}</div>
                    <div className="font-black text-sm">{s.value}</div>
                  </div>
                ))}
              </div>

              <blockquote className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3 italic">
                「{review.comment}」
              </blockquote>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

// ── メインページ ─────────────────────────────────────
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("progress")
  const [isPremium, setIsPremium] = useState(false)

  const currentTab = TABS.find((t) => t.id === activeTab)!

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold">シカクン</span>
          </Link>
          {!isPremium ? (
            <button
              onClick={() => setIsPremium(true)}
              className="text-xs font-bold text-primary border border-primary px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />プレミアム体験
            </button>
          ) : (
            <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 text-xs">
              <Star className="w-3 h-3 mr-1 fill-white" />PREMIUM
            </Badge>
          )}
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-4 flex">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.premium && !isPremium && <Lock className="w-2.5 h-2.5 opacity-50" />}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-5">
        <AnimatePresence mode="wait">
          {currentTab.premium && !isPremium ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="py-16 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-muted-foreground" />
              </div>
              <h2 className="text-lg font-black mb-2">プレミアム機能</h2>
              <p className="text-muted-foreground text-sm mb-6">
                「{currentTab.label}」はプレミアムでご利用いただけます。
              </p>
              <button
                onClick={() => setIsPremium(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-black px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm"
              >
                <Sparkles className="w-4 h-4" />プレミアムを体験する（¥580/月）
              </button>
              <p className="text-xs text-muted-foreground mt-2">デモのため無料で体験できます</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
            >
              {activeTab === "progress" && <ProgressTab />}
              {activeTab === "quiz"     && <QuizTab />}
              {activeTab === "compare"  && <CompareTab />}
              {activeTab === "reviews"  && <ReviewsTab />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
