"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Legend
} from "recharts"
import {
  BookOpen, TrendingUp, Brain, Users, Star, Plus,
  CheckCircle, XCircle, ChevronRight, Trophy, Flame,
  Lock, Sparkles
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { MOCK_PROGRESS, MOCK_QUIZZES, MOCK_PASSER_REVIEWS, SIMILAR_USER_DATA } from "@/data/mock"

type Tab = "progress" | "quiz" | "compare" | "reviews"

const TABS: { id: Tab; label: string; icon: React.ElementType; premium: boolean }[] = [
  { id: "progress", label: "進捗", icon: TrendingUp, premium: false },
  { id: "quiz", label: "理解度チェック", icon: Brain, premium: true },
  { id: "compare", label: "類似比較", icon: Users, premium: true },
  { id: "reviews", label: "合格者の声", icon: Star, premium: true },
]

// Progress Tab
function ProgressTab() {
  const [todayPages, setTodayPages] = useState(12)
  const [inputValue, setInputValue] = useState("")
  const totalPages = 320
  const currentPage = MOCK_PROGRESS.reduce((sum, e) => sum + e.pages, 0)
  const progressPct = Math.min(Math.round((currentPage / totalPages) * 100), 100)

  const chartData = MOCK_PROGRESS.filter((_, i) => i % 3 === 0).map((entry) => ({
    date: entry.date,
    累計ページ: entry.totalPages,
  }))

  const handleAdd = () => {
    const pages = parseInt(inputValue)
    if (!isNaN(pages) && pages > 0) {
      setTodayPages(todayPages + pages)
      setInputValue("")
    }
  }

  // Heatmap-like calendar (last 30 days)
  const calendarData = MOCK_PROGRESS.map((e) => ({ date: e.date, pages: e.pages }))

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "今日", value: `${todayPages}P`, sub: "学習済み", color: "text-primary" },
          { label: "累計", value: `${currentPage + todayPages}P`, sub: `/ ${totalPages}P`, color: "text-foreground" },
          { label: "継続", value: "18日", sub: "連続学習", color: "text-amber-500" },
        ].map((s) => (
          <Card key={s.label} className="text-center">
            <CardContent className="p-4">
              <div className="text-xs text-muted-foreground mb-1">{s.label}</div>
              <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress bar */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              みんなが欲しかった！簿記の教科書 2級
            </h3>
            <span className="font-black text-primary text-lg">{progressPct}%</span>
          </div>
          <Progress value={progressPct} className="h-4 mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>P.1</span>
            <span>P.{currentPage}/{totalPages}</span>
            <span>P.{totalPages}</span>
          </div>
        </CardContent>
      </Card>

      {/* Add today's progress */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4 text-primary" />
            今日の進捗を記録
          </h3>
          <div className="flex gap-3">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="今日進んだページ数"
              className="flex-1 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button
              onClick={handleAdd}
              className="bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
            >
              記録する
            </button>
          </div>
          {todayPages > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 px-4 py-2.5 rounded-xl"
            >
              <Flame className="w-4 h-4" />
              今日は{todayPages}ページ学習しました！
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold mb-4">累計進捗グラフ</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="累計ページ"
                  stroke="oklch(0.511 0.229 264.37)"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Calendar heatmap */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold mb-4">学習カレンダー（3月）</h3>
          <div className="flex flex-wrap gap-1.5">
            {calendarData.map((d, i) => {
              const intensity = d.pages === 0 ? 0 : d.pages < 5 ? 1 : d.pages < 10 ? 2 : 3
              const colors = ["bg-slate-100", "bg-indigo-200", "bg-indigo-400", "bg-indigo-600"]
              return (
                <div
                  key={i}
                  title={`${d.date}: ${d.pages}ページ`}
                  className={`w-8 h-8 rounded-md ${colors[intensity]} flex items-center justify-center text-xs text-white font-bold`}
                >
                  {d.pages > 0 && d.pages}
                </div>
              )
            })}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>少</span>
            {["bg-slate-100", "bg-indigo-200", "bg-indigo-400", "bg-indigo-600"].map((c) => (
              <div key={c} className={`w-4 h-4 rounded ${c}`} />
            ))}
            <span>多</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Quiz Tab
function QuizTab() {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([])

  const quiz = MOCK_QUIZZES[currentQ]

  const handleSelect = (i: number) => {
    if (answered) return
    setSelected(i)
    setAnswered(true)
    if (i === quiz.answer) {
      setScore(score + 1)
    } else {
      setWrongAnswers([...wrongAnswers, currentQ])
    }
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

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
        <div className="text-6xl mb-4">{score === MOCK_QUIZZES.length ? "🏆" : score >= 2 ? "🎯" : "📚"}</div>
        <h2 className="text-3xl font-black mb-2">
          {score} / {MOCK_QUIZZES.length}問 正解！
        </h2>
        <p className="text-muted-foreground mb-6">
          {score === MOCK_QUIZZES.length ? "完璧です！この範囲は完全に理解できています。" : "間違えた問題を復習しておきましょう。"}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => { setCurrentQ(0); setSelected(null); setAnswered(false); setScore(0); setDone(false); setWrongAnswers([]) }}
            className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
          >
            もう一度チャレンジ
          </button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-muted-foreground">問題 {currentQ + 1} / {MOCK_QUIZZES.length}</div>
        <Badge variant="outline">
          <Brain className="w-3 h-3 mr-1" />AI生成問題
        </Badge>
      </div>
      <Progress value={((currentQ) / MOCK_QUIZZES.length) * 100} className="h-2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-lg leading-snug mb-6">{quiz.question}</h3>
              <div className="space-y-3">
                {quiz.options.map((opt, i) => {
                  let style = "border-border bg-white hover:border-primary hover:bg-primary/5"
                  if (answered) {
                    if (i === quiz.answer) style = "border-emerald-500 bg-emerald-50"
                    else if (i === selected) style = "border-red-400 bg-red-50"
                    else style = "border-border bg-white opacity-50"
                  }
                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      disabled={answered}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all text-sm ${style}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">
                          {["A", "B", "C", "D"][i]}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {answered && i === quiz.answer && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                        {answered && i === selected && i !== quiz.answer && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                      </div>
                    </button>
                  )
                })}
              </div>

              {answered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-blue-50 rounded-xl"
                >
                  <div className="font-bold text-sm text-blue-700 mb-1">解説</div>
                  <p className="text-sm text-blue-600 leading-relaxed">{quiz.explanation}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {answered && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={handleNext}
              className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
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

// Compare Tab
function CompareTab() {
  const { labels, you, passers, failers } = SIMILAR_USER_DATA

  const chartData = labels.map((label, i) => ({
    week: label,
    あなた: you[i],
    合格者平均: passers[i],
    不合格者平均: failers[i],
  }))

  const latestYou = you[you.length - 1]
  const latestPass = passers[passers.length - 1]
  const ratio = Math.round((latestYou / latestPass) * 100)

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-primary/5 to-indigo-50 border-primary/20">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-black text-2xl">{ratio}%</div>
              <div className="text-xs text-muted-foreground">合格者ペースとの比較</div>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            同じ参考書・近い学習スタイルの合格者と比較して、あなたは<span className="font-bold text-primary"> {ratio >= 80 ? "良いペース" : "少し遅れ気味"}</span>です。
            {ratio < 80 && "1日のページ数を2〜3ページ増やすと合格ラインに乗れます。"}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold mb-4">累計ページ数の比較（週別）</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="week" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="合格者平均" fill="#86efac" radius={[4, 4, 0, 0]} />
                <Bar dataKey="あなた" fill="oklch(0.511 0.229 264.37)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="不合格者平均" fill="#fca5a5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-primary" />
            AIからのアドバイス
          </h3>
          <div className="space-y-3">
            {[
              { icon: "📈", text: "現在のペースを維持できれば、62日後に合格ラインに到達する見込みです" },
              { icon: "⚠️", text: "第3章「有価証券」の理解度が低い傾向があります。重点的に復習しましょう" },
              { icon: "💡", text: "同じ参考書を使った合格者の多くは、週末に集中的に演習問題を解いています" },
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

// Reviews Tab
function ReviewsTab() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-xl border border-amber-200">
        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
        <p className="text-sm text-amber-700 font-medium">
          同じ参考書・近い属性の合格者{MOCK_PASSER_REVIEWS.length}名のリアルな記録です
        </p>
      </div>

      {MOCK_PASSER_REVIEWS.map((review, i) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-white font-black text-sm shrink-0">
                  {review.name[0]}
                </div>
                <div>
                  <div className="font-bold">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.age}歳 / {review.occupation}</div>
                </div>
                <Badge className="ml-auto bg-emerald-50 text-emerald-700 border-emerald-200 text-xs">
                  <Trophy className="w-3 h-3 mr-1" />合格
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "合格まで", value: `${review.daysToPass}日` },
                  { label: "得点", value: `${review.score}点` },
                  { label: "1日平均", value: `${review.studyHoursPerDay}h` },
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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("progress")
  const [isPremium, setIsPremium] = useState(false)

  const currentTab = TABS.find((t) => t.id === activeTab)!

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-lg">シカクン</span>
          </Link>
          <div className="flex items-center gap-3">
            {!isPremium && (
              <button
                onClick={() => setIsPremium(true)}
                className="text-xs font-bold text-primary border border-primary px-3 py-1.5 rounded-lg hover:bg-primary/5 transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                プレミアム体験
              </button>
            )}
            {isPremium && (
              <Badge className="bg-gradient-to-r from-amber-400 to-orange-400 text-white border-0 text-xs">
                <Star className="w-3 h-3 mr-1 fill-white" />PREMIUM
              </Badge>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-2xl mx-auto px-4 flex gap-1 pb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-1.5 px-3 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {tab.premium && !isPremium && (
                <Lock className="w-2.5 h-2.5 text-muted-foreground/60" />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {currentTab.premium && !isPremium ? (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-16 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-7 h-7 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-black mb-2">プレミアム機能</h2>
              <p className="text-muted-foreground text-sm mb-6">
                「{currentTab.label}」はプレミアムプランでご利用いただけます。
              </p>
              <button
                onClick={() => setIsPremium(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-400 text-white font-black px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                <Sparkles className="w-4 h-4" />
                プレミアムを体験する（¥580/月）
              </button>
              <p className="text-xs text-muted-foreground mt-3">デモのため無料で体験できます</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "progress" && <ProgressTab />}
              {activeTab === "quiz" && <QuizTab />}
              {activeTab === "compare" && <CompareTab />}
              {activeTab === "reviews" && <ReviewsTab />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
