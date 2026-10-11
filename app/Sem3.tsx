'use client'

import { useState } from 'react'

type DISCType = 'D' | 'I' | 'S' | 'C'

type Option = {
  type: DISCType
  en: string
  id: string
}

type Question = {
  id: number
  options: Option[]
}

/* ============================================================
   DATA SOAL
   ============================================================ */
const QUESTIONS: Question[] = [
  {
    id: 1,
    options: [
      { type: 'D', en: 'Directing', id: 'Memimpin' },
      { type: 'I', en: 'Influencing', id: 'Gampang Mendapat Teman / Tidak Aneh-aneh' },
      { type: 'S', en: 'Steady', id: 'Tenang' },
      { type: 'C', en: 'Cautious', id: 'Teliti / Tekun' },
    ],
  },
  {
    id: 2,
    options: [
      { type: 'D', en: 'Self Certain', id: 'Percaya Diri' },
      { type: 'I', en: 'Optimistic', id: 'Optimis' },
      { type: 'S', en: 'Deliberate', id: 'Pelan tapi mantap' },
      { type: 'C', en: 'Restrained', id: 'Disiplin' },
    ],
  },
  {
    id: 3,
    options: [
      { type: 'D', en: 'Adventurous', id: 'Petualang' },
      { type: 'I', en: 'Enthusiastic', id: 'Riang / Suka melucu / Penuh tawa' },
      { type: 'S', en: 'Predictable', id: 'Mudah diatur / Setia' },
      { type: 'C', en: 'Logical', id: 'Berpikir logis, bukan perasaan' },
    ],
  },
  {
    id: 4,
    options: [
      { type: 'D', en: 'Decisive', id: 'Tegas / Agresif' },
      { type: 'I', en: 'Open', id: 'Suka Bergaul / Suka Berteman' },
      { type: 'S', en: 'Patient', id: 'Sabar / Pengertian' },
      { type: 'C', en: 'Analytical', id: 'Berpikir Analitis / Suka angka & data' },
    ],
  },
  {
    id: 5,
    options: [
      { type: 'D', en: 'Daring', id: 'Berani / Ambil Resiko' },
      { type: 'I', en: 'Impulsive', id: 'Tidak terencana / Spontan' },
      { type: 'S', en: 'Stabilizing', id: 'Pendamai / Peredam konflik' },
      { type: 'C', en: 'Precise', id: 'Detil / Seksama' },
    ],
  },
  {
    id: 6,
    options: [
      { type: 'D', en: 'Restless', id: 'Tidak Bisa Diam / Susah Santai' },
      { type: 'I', en: 'Emotional', id: 'Gampang terharu / Menangis' },
      { type: 'S', en: 'Protective', id: 'Selalu siap membantu' },
      { type: 'C', en: 'Doubting', id: 'Tidak gampang percaya / Menghindari keramaian' },
    ],
  },
  {
    id: 7,
    options: [
      { type: 'D', en: 'Competitive', id: 'Suka Tantangan' },
      { type: 'I', en: 'Persuading', id: 'Membujuk' },
      { type: 'S', en: 'Accommodating', id: 'Menghindari Konflik' },
      { type: 'C', en: 'Curious', id: 'Cari info sebelum bertindak' },
    ],
  },
  {
    id: 8,
    options: [
      { type: 'D', en: 'Assertive', id: 'Keras / Cepat buat keputusan' },
      { type: 'I', en: 'Talkative', id: 'Suka Bicara' },
      { type: 'S', en: 'Modest', id: 'Rendah hati / Sederhana' },
      { type: 'C', en: 'Tactful', id: 'Berpikir sebelum bertindak' },
    ],
  },
  {
    id: 9,
    options: [
      { type: 'D', en: 'Experimenting', id: 'Suka Mencoba' },
      { type: 'I', en: 'Charming', id: 'Suka mempesona pihak lain' },
      { type: 'S', en: 'Easy Going', id: 'Tidak Gampang Gelisah / Resah' },
      { type: 'C', en: 'Consistent', id: 'Tidak Gampang menerima pendapat' },
    ],
  },
  {
    id: 10,
    options: [
      { type: 'D', en: 'Forceful', id: 'Memaksa Kehendak' },
      { type: 'I', en: 'Sensitive', id: 'Perasa' },
      { type: 'S', en: 'Sincere', id: 'Tulus Membantu' },
      { type: 'C', en: 'Perfectionist', id: 'Perfeksionis' },
    ],
  },
]

/* ============================================================
   INFO TIPE DISC
   ============================================================ */
const DISC_INFO: Record<DISCType, { name: string; color: string; desc: string }> = {
  D: {
    name: 'Dominance',
    color: '#ef4444',
    desc: 'Berorientasi pada tugas dan hasil, tegas, menyukai tantangan, bergerak cepat, serta berani mengambil keputusan.',
  },
  I: {
    name: 'Influence',
    color: '#f59e0b',
    desc: 'Berorientasi pada orang dan hubungan, ramah, antusias, komunikatif, serta pandai memotivasi orang lain.',
  },
  S: {
    name: 'Steadiness',
    color: '#22c55e',
    desc: 'Berorientasi pada orang dengan gaya pasif/stabil, sabar, setia, pendengar yang baik, serta menyukai lingkungan yang harmonis.',
  },
  C: {
    name: 'Conscientiousness',
    color: '#3b82f6',
    desc: 'Berorientasi pada tugas dengan gaya pasif/analitis, teliti, terstruktur, menyukai aturan, dan menjaga standar kualitas kerja.',
  },
}

export default function Sem1({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const key = (qid: number, type: DISCType) => `q${qid}-${type}`

  const isValueUsed = (qid: number, type: DISCType, value: number) => {
    const q = QUESTIONS.find((x) => x.id === qid)
    if (!q) return false
    return q.options.some(
      (opt) => opt.type !== type && answers[key(qid, opt.type)] === value
    )
  }

  const setAnswer = (qid: number, type: DISCType, value: number) => {
    const k = key(qid, type)
    setAnswers((prev) => {
      const next = { ...prev }
      if (next[k] === value) {
        delete next[k]
      } else {
        next[k] = value
      }
      return next
    })
  }

  const reset = () => setAnswers({})

  // ==== Hitung total per tipe ====
  const totals: Record<DISCType, number> = { D: 0, I: 0, S: 0, C: 0 }
  Object.entries(answers).forEach(([k, v]) => {
    const type = k.split('-')[1] as DISCType
    totals[type] += v
  })

  // ==== Progress ====
  const answeredCount = QUESTIONS.filter((q) =>
    q.options.every((opt) => answers[key(q.id, opt.type)] !== undefined)
  ).length
  const allAnswered = answeredCount === QUESTIONS.length

  // ==== Dominan ====
  const sorted = (Object.entries(totals) as [DISCType, number][]).sort(
    (a, b) => b[1] - a[1]
  )
  const dominant = sorted[0][0]

  const progressPct = (answeredCount / QUESTIONS.length) * 100

  return (
    <>
      {/* BACKGROUND LAYER */}
      <div style={styles.bgLayer} />

      {/* SCROLL WRAPPER */}
      <div style={styles.scrollWrapper}>
        <div style={styles.content}>
          {/* HEADER */}
          <div style={styles.header}>
            <button
              onClick={() => onNavigate('home')}
              style={styles.backBtn}
              aria-label="Kembali"
            >
              ←
            </button>
            <h1 style={styles.title}>Tes DISC</h1>
            <p style={styles.subtitle}>
              Beri nilai 4 (paling cenderung) sampai 1 (paling tidak cenderung)
              untuk setiap pernyataan. Setiap angka hanya bisa dipakai sekali per
              soal.
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div style={styles.progressCard}>
            <div style={styles.progressHeader}>
              <span style={styles.progressLabel}>Progress</span>
              <span style={styles.progressValue}>
                {answeredCount} / {QUESTIONS.length} soal
              </span>
            </div>
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${progressPct}%`,
                }}
              />
            </div>
          </div>

          {/* SOAL-SOAL */}
          {QUESTIONS.map((q) => (
            <div key={q.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Soal {q.id}</h2>
              </div>

              <div style={styles.optionsList}>
                {q.options.map((opt) => {
                  const currentValue = answers[key(q.id, opt.type)]
                  return (
                    <div key={opt.type} style={styles.optionRow}>
                      <div style={styles.optionInfo}>
                        <div style={styles.optionEn}>{opt.en}</div>
                        <div style={styles.optionId}>{opt.id}</div>
                      </div>
                      <div style={styles.optionBtns}>
                        {[1, 2, 3, 4].map((v) => {
                          const selected = currentValue === v
                          const used = isValueUsed(q.id, opt.type, v)
                          return (
                            <button
                              key={v}
                              onClick={() => setAnswer(q.id, opt.type, v)}
                              disabled={used}
                              style={{
                                ...styles.numBtn,
                                ...(selected ? styles.numBtnActive : {}),
                                ...(used && !selected ? styles.numBtnDisabled : {}),
                              }}
                            >
                              {v}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* HASIL */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ ...styles.cardTitle, color: DISC_INFO[dominant].color }}>
                Hasil
              </h2>
            </div>

            {!allAnswered ? (
              <div style={styles.warn}>
                Selesaikan semua {QUESTIONS.length} soal dulu untuk melihat hasil
                akhir. ({QUESTIONS.length - answeredCount} soal lagi)
              </div>
            ) : (
              <div>
                <div
                  style={{
                    ...styles.resultHero,
                    borderColor: DISC_INFO[dominant].color,
                    background: `${DISC_INFO[dominant].color}22`,
                  }}
                >
                  <div style={styles.resultHeroLabel}>Tipe Dominan Anda</div>
                  <div
                    style={{
                      ...styles.resultHeroType,
                      color: DISC_INFO[dominant].color,
                    }}
                  >
                    {dominant} — {DISC_INFO[dominant].name}
                  </div>
                  <div style={styles.resultHeroScore}>
                    Skor: {totals[dominant]} / 40
                  </div>
                </div>

                <p style={styles.resultDesc}>{DISC_INFO[dominant].desc}</p>

                <div style={styles.timeLabel}>Rincian Skor</div>
                <div style={styles.scoreList}>
                  {sorted.map(([t, val]) => {
                    const info = DISC_INFO[t]
                    const pct = (val / 40) * 100
                    return (
                      <div key={t} style={styles.scoreRow}>
                        <div style={styles.scoreLabelWrap}>
                          <span
                            style={{
                              ...styles.scoreBadge,
                              background: info.color,
                            }}
                          >
                            {t}
                          </span>
                          <span style={styles.scoreName}>{info.name}</span>
                        </div>
                        <div style={styles.scoreBarWrap}>
                          <div
                            style={{
                              ...styles.scoreBarFill,
                              width: `${pct}%`,
                              background: info.color,
                            }}
                          />
                        </div>
                        <span style={styles.scoreNumber}>{val}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <p style={styles.footnote}>
            Skor minimum tiap tipe = 10, maksimum = 40. Tipe dengan skor tertinggi
            adalah kepribadian dominan Anda.
          </p>
        </div>
      </div>
    </>
  )
}

/* ============================================================
   INLINE STYLES
   ============================================================ */
const styles: Record<string, React.CSSProperties> = {
  bgLayer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9998,
    backgroundImage:
      "linear-gradient(rgba(2, 6, 23, 0.75), rgba(2, 6, 23, 0.75)), url('/assets/bgimage.jpeg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
  },

  scrollWrapper: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    overflowY: 'auto',
    overflowX: 'hidden',
    WebkitOverflowScrolling: 'touch',
  },

  content: {
    maxWidth: 780,
    margin: '0 auto',
    padding: '40px 18px 60px',
    color: '#f1f5f9',
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: 15,
    lineHeight: 1.5,
    boxSizing: 'border-box',
  },

  header: {
    textAlign: 'center',
    marginBottom: 22,
    position: 'relative',
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    margin: '0 0 6px',
    letterSpacing: '-0.5px',
    color: '#ffffff',
    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
  },
  subtitle: {
    fontSize: 13.5,
    margin: 0,
    color: 'rgba(255,255,255,0.75)',
    lineHeight: 1.55,
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 42,
    height: 42,
    borderRadius: 12,
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(15,23,42,0.9)',
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
    backdropFilter: 'blur(8px)',
  },

  /* Progress bar */
  progressCard: {
    background: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 14,
    padding: '14px 18px',
    marginBottom: 18,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.6)',
  },
  progressValue: {
    fontSize: 13,
    fontWeight: 700,
    color: '#ffffff',
    fontVariantNumeric: 'tabular-nums',
  },
  progressTrack: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    background: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    background: 'linear-gradient(90deg, #22c55e, #4ade80)',
    transition: 'width 0.3s ease',
  },

  card: {
    background: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
  },
  cardTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: '0.5px',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  /* Score display */
  scoreList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  scoreRow: {
    display: 'grid',
    gridTemplateColumns: '130px 1fr 40px',
    alignItems: 'center',
    gap: 10,
  },
  scoreLabelWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    minWidth: 0,
  },
  scoreBadge: {
    width: 26,
    height: 26,
    borderRadius: 7,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontWeight: 800,
    fontSize: 13,
    flex: '0 0 auto',
  },
  scoreName: {
    fontSize: 12.5,
    color: 'rgba(255,255,255,0.8)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  scoreBarWrap: {
    height: 10,
    background: 'rgba(255,255,255,0.08)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  scoreBarFill: {
    height: '100%',
    borderRadius: 5,
    transition: 'width 0.3s ease',
  },
  scoreNumber: {
    textAlign: 'right',
    fontSize: 15,
    fontWeight: 800,
    color: '#ffffff',
    fontVariantNumeric: 'tabular-nums',
  },

  /* Reset button */
  resetBtn: {
    padding: '6px 12px',
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    color: '#fca5a5',
    background: 'rgba(239,68,68,0.15)',
    border: '1px solid rgba(239,68,68,0.4)',
    borderRadius: 8,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

  /* Options */
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  optionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    padding: '10px 12px',
    background: 'rgba(0,0,0,0.35)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  optionInfo: {
    flex: '1 1 200px',
    minWidth: 0,
  },
  optionEn: {
    fontSize: 14,
    fontWeight: 700,
    color: '#e2e8f0',
    marginBottom: 2,
  },
  optionId: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 1.35,
  },
  optionBtns: {
    display: 'flex',
    gap: 6,
    flex: '0 0 auto',
  },
  numBtn: {
    width: 38,
    height: 38,
    borderRadius: 9,
    border: '1.5px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.75)',
    fontSize: 15,
    fontWeight: 800,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.15s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numBtnActive: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    borderColor: '#4ade80',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(34,197,94,0.5)',
  },
  numBtnDisabled: {
    opacity: 0.25,
    cursor: 'not-allowed',
  },

  /* Result */
  resultHero: {
    padding: '20px 22px',
    borderRadius: 14,
    border: '2px solid',
    textAlign: 'center',
    marginBottom: 14,
  },
  resultHeroLabel: {
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 6,
  },
  resultHeroType: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: '-0.4px',
    marginBottom: 4,
  },
  resultHeroScore: {
    fontSize: 13,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.75)',
    fontVariantNumeric: 'tabular-nums',
  },
  resultDesc: {
    fontSize: 13.5,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 1.6,
    margin: '0 0 18px',
  },

  timeLabel: {
    marginTop: 8,
    marginBottom: 10,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
  },

  warn: {
    padding: '12px 14px',
    borderRadius: 10,
    fontSize: 13,
    fontWeight: 600,
    background: 'rgba(239,68,68,0.15)',
    border: '1.5px solid rgba(239,68,68,0.4)',
    color: '#fca5a5',
  },

  footnote: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.4)',
    fontStyle: 'italic',
  },
}