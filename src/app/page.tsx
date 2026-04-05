"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BookOpen, Brain, TrendingUp, Check, Star, Clock, Users, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
}

const BEFORE_AFTER = [
  { before: "Amazonで5冊の参考書を比較検討", after: "理解スタイル診断（2分）に答えるだけ" },
  { before: "比較記事を1時間読み込む", after: "AIが最適な1冊を即提示" },
  { before: "結論が出ずそのまま放置", after: "そのままAmazonで購入" },
  { before: "また来週から…の繰り返し", after: "今日から勉強スタート！" },
]

const STEPS = [
  {
    icon: Brain,
    title: "理解スタイル診断",
    desc: "約2分の診断で、あなたの学習スタイルを数値化します。図解派か文章派か、要点重視か詳細重視かなど6つの質問に答えるだけ。",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: BookOpen,
    title: "AIが「あなたの1冊」を提示",
    desc: "診断結果×参考書データベースを照合し、マッチ度を算出。最適な1〜2冊を理由とともに即座に提示します。",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: TrendingUp,
    title: "進捗管理・理解度チェック",
    desc: "今日何ページ進んだかを記録してグラフ化。AIが学習範囲に合わせた問題を生成し、定着度を確認できます。",
    color: "bg-emerald-50 text-emerald-600",
  },
]

const PLANS = [
  {
    name: "ベースプラン",
    price: "¥1,500",
    period: "買い切り",
    description: "参考書選びに迷う時間をゼロに",
    features: [
      "理解スタイル診断",
      "AIによる参考書選定",
      "進捗記録・グラフ表示",
      "永続使用可能",
    ],
    cta: "今すぐ始める",
    highlight: false,
  },
  {
    name: "プレミアム",
    price: "¥580",
    period: "/ 月",
    description: "合格まで徹底サポート",
    features: [
      "ベースプランの全機能",
      "AIによる理解度チェック問題",
      "類似ユーザーとの進捗比較",
      "合格者レビュー・体験談",
      "必要な月だけ契約OK",
    ],
    cta: "プレミアムで始める",
    highlight: true,
  },
]

const QUALIFICATIONS = [
  { label: "簿記2級", count: "2,341人が学習中" },
  { label: "宅建士", count: "1,892人が学習中" },
  { label: "ITパスポート", count: "3,210人が学習中" },
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">シカクン</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#how" className="hover:text-foreground transition-colors">使い方</a>
            <a href="#price" className="hover:text-foreground transition-colors">料金</a>
            <a href="#qual" className="hover:text-foreground transition-colors">対応資格</a>
          </nav>
          <Link
            href="/diagnosis"
            className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            無料で診断 <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-violet-500/10 via-transparent to-transparent" />

          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-white/20"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{ y: [-10, 10, -10], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <Badge className="mb-6 bg-white/10 text-white border-white/20 hover:bg-white/15 text-sm px-4 py-1.5">
                🤖 AI参考書選定 × 進捗管理
              </Badge>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-black leading-tight tracking-tighter mb-6"
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
            >
              選ぶ時間を<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                ゼロにする。
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
              variants={fadeUp} initial="hidden" animate="visible" custom={2}
            >
              AIがあなたの学習スタイルを分析し、<br className="hidden md:block" />
              膨大な参考書の中から「あなたの1冊」を即座に提示。<br className="hidden md:block" />
              今日から勉強を始められる状態をお届けします。
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={fadeUp} initial="hidden" animate="visible" custom={3}
            >
              <Link
                href="/diagnosis"
                className="group inline-flex items-center gap-2 bg-white text-slate-900 font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/90 transition-all shadow-xl shadow-white/10"
              >
                無料で診断を始める
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-white/50 text-sm">診断2分・登録不要</span>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
              variants={fadeUp} initial="hidden" animate="visible" custom={4}
            >
              {[
                { value: "7,443", label: "利用者数" },
                { value: "94%", label: "満足度" },
                { value: "2分", label: "診断時間" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-white/50 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4 text-sm">よくある悩み</Badge>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                Amazonのレビューを1時間読んで、<br />
                <span className="text-red-500">結局何も買えなかった。</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                簿記2級だけで5〜10冊以上。比較記事を読めば読むほど迷いが深まる。
                「選ぶ作業」で消耗して、勉強が始まらない。
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "❓", title: "判断基準がない", desc: "自分の理解スタイルを把握していないため「合う・合わない」を判断する軸がない" },
                { icon: "📚", title: "情報が多すぎる", desc: "「どれもおすすめ」と書かれた比較記事。選択肢が増えるほど決められなくなる" },
                { icon: "😰", title: "「無駄になる」恐怖", desc: "2,000円でも「買って続かなかったら嫌」という心理が行動を阻む" },
              ].map((item, i) => (
                <motion.div key={item.title} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                  <Card className="h-full border-0 shadow-sm bg-white">
                    <CardContent className="p-6">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                シカクンで、<span className="text-primary">すべてが変わる</span>
              </h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-6"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <Card className="border-red-100 bg-red-50/50">
                <CardContent className="p-6">
                  <div className="text-sm font-bold text-red-500 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center text-xs">✕</span>
                    Before（今まで）
                  </div>
                  <ul className="space-y-3">
                    {BEFORE_AFTER.map((item) => (
                      <li key={item.before} className="flex items-start gap-2 text-sm text-red-700">
                        <span className="mt-0.5 shrink-0">→</span>
                        {item.before}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-emerald-100 bg-emerald-50/50">
                <CardContent className="p-6">
                  <div className="text-sm font-bold text-emerald-600 mb-4 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs">✓</span>
                    After（シカクン）
                  </div>
                  <ul className="space-y-3">
                    {BEFORE_AFTER.map((item) => (
                      <li key={item.after} className="flex items-start gap-2 text-sm text-emerald-700">
                        <Check className="w-4 h-4 mt-0.5 shrink-0" />
                        {item.after}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4 text-sm">3ステップ</Badge>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
                診断2分で、<span className="text-primary">今日から始められる</span>
              </h2>
            </motion.div>

            <div className="space-y-8">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="flex gap-6 items-start"
                  variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                >
                  <div className="shrink-0 flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    {i < STEPS.length - 1 && <div className="w-px h-12 bg-border mt-3" />}
                  </div>
                  <div className="pt-2">
                    <div className="text-xs font-bold text-muted-foreground mb-1">STEP {i + 1}</div>
                    <h3 className="text-xl font-black mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
              >
                診断を始める <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Qualifications */}
        <section id="qual" className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h2 className="text-3xl font-black tracking-tight mb-4">対応資格</h2>
              <p className="text-muted-foreground">Phase 1では3資格からスタート。順次拡大予定。</p>
            </motion.div>

            <div className="grid grid-cols-3 gap-4">
              {QUALIFICATIONS.map((q, i) => (
                <motion.div key={q.label} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                  <Card className="text-center hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary">
                    <CardContent className="p-6">
                      <div className="font-black text-xl mb-2">{q.label}</div>
                      <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                        <Users className="w-3 h-3" />
                        {q.count}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="price" className="py-20 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4">
            <motion.div
              className="text-center mb-12"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">料金プラン</h2>
              <p className="text-muted-foreground">参考書1冊の半分以下の価格で始められます</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {PLANS.map((plan, i) => (
                <motion.div key={plan.name} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}>
                  <Card className={`h-full relative ${plan.highlight ? "border-primary border-2 shadow-lg shadow-primary/10" : ""}`}>
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground px-4">
                          <Star className="w-3 h-3 mr-1" />おすすめ
                        </Badge>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="text-sm font-bold text-muted-foreground mb-1">{plan.name}</div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black">{plan.price}</span>
                          <span className="text-muted-foreground text-sm">{plan.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href="/diagnosis"
                        className={`w-full inline-flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-opacity hover:opacity-90 ${
                          plan.highlight
                            ? "bg-primary text-primary-foreground"
                            : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                        }`}
                      >
                        {plan.cta} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.p
              className="text-center text-sm text-muted-foreground mt-6"
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <Clock className="w-3.5 h-3.5 inline mr-1" />
              参考書1冊が平均¥2,000。シカクンなら¥1,500で最適な1冊を即座に特定できます。
            </motion.p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center">
          <div className="max-w-2xl mx-auto px-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                田中さんが得るのは<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                  「今日から始められる状態」
                </span>
              </h2>
              <p className="text-white/60 text-lg mb-10">
                最適な参考書を選ぶだけじゃない。<br />
                「迷い」と「先延ばし」を消し去ります。
              </p>
              <Link
                href="/diagnosis"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-black text-xl px-10 py-5 rounded-2xl hover:bg-white/90 transition-all shadow-2xl"
              >
                <Zap className="w-5 h-5" />
                無料で診断を始める
              </Link>
              <p className="text-white/40 text-sm mt-4">診断2分・登録不要・今すぐ開始</p>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-950 text-white/40 py-8 text-center text-sm">
        <p>© 2025 シカクン. All rights reserved.</p>
      </footer>
    </div>
  )
}
