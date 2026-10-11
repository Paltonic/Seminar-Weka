'use client'

import { useState } from 'react'

type Item = {
  id: number
  name: string
  cost: number
  type: 'need' | 'wish'
}

export default function Sem1({ onNavigate }: { onNavigate: (screen: string) => void }) {
  const [income, setIncome] = useState('')
  const [cost, setCost] = useState('')
  const [items, setItems] = useState<Item[]>([])
  const [nameInput, setNameInput] = useState('')
  const [costInput, setCostInput] = useState('')
  const [typeInput, setTypeInput] = useState<'need' | 'wish'>('need')

  const incomeNum = parseFloat(income) || 0
  const costNum = parseFloat(cost) || 0
  const result = incomeNum - costNum

  const needs = items.filter((i) => i.type === 'need')
  const wishes = items.filter((i) => i.type === 'wish')
  const totalNeed = needs.reduce((s, i) => s + i.cost, 0)
  const totalWish = wishes.reduce((s, i) => s + i.cost, 0)
  const totalBoth = totalNeed + totalWish

  const monthsNeed = result > 0 ? totalNeed / result : 0
  const monthsWish = result > 0 ? totalWish / result : 0
  const monthsBoth = result > 0 ? totalBoth / result : 0

  const WEEKS_PER_MONTH = 52 / 12
  const weeksNeed = monthsNeed * WEEKS_PER_MONTH
  const weeksWish = monthsWish * WEEKS_PER_MONTH
  const weeksBoth = monthsBoth * WEEKS_PER_MONTH

  const yearsNeed = monthsNeed / 12
  const yearsWish = monthsWish / 12
  const yearsBoth = monthsBoth / 12

  const formatRupiah = (n: number) =>
    'Rp ' + Math.round(n).toLocaleString('id-ID')

  const fmt = (n: number, decimals = 1): string => {
    if (!isFinite(n) || n <= 0) return '-'
    const rounded = n.toFixed(decimals)
    return rounded.replace(/\.?0+$/, '')
  }

  const handleAddItem = () => {
    const c = parseFloat(costInput)
    if (!nameInput.trim() || isNaN(c) || c <= 0) return
    setItems([
      ...items,
      { id: Date.now(), name: nameInput.trim(), cost: c, type: typeInput },
    ])
    setNameInput('')
    setCostInput('')
  }

  const handleDelete = (id: number) =>
    setItems(items.filter((i) => i.id !== id))

  const renderList = (list: Item[]) => {
    if (list.length === 0) return <p style={styles.empty}>Belum ada item.</p>
    return (
      <ul style={styles.list}>
        {list.map((item) => (
          <li key={item.id} style={styles.listItem}>
            <span style={styles.itemName}>{item.name}</span>
            <span style={styles.itemRight}>
              <span style={styles.itemAmount}>{formatRupiah(item.cost)}</span>
              <button
                style={styles.delBtn}
                onClick={() => handleDelete(item.id)}
                aria-label="Hapus"
              >
                X
              </button>
            </span>
          </li>
        ))}
      </ul>
    )
  }

  const renderTimeGrid = (
    weeks: number,
    months: number,
    years: number,
    accent: 'need' | 'wish' | 'both'
  ) => {
    const valueColor =
      accent === 'need' ? '#93c5fd' : accent === 'wish' ? '#d8b4fe' : '#86efac'
    const bg =
      accent === 'need'
        ? 'rgba(59,130,246,0.10)'
        : accent === 'wish'
        ? 'rgba(168,85,247,0.10)'
        : 'rgba(34,197,94,0.10)'

    return (
      <div style={{ ...styles.timeGrid, background: bg }}>
        <div style={styles.timeCell}>
          <div style={styles.timeCellLabel}>Minggu</div>
          <div style={{ ...styles.timeCellValue, color: valueColor }}>
            {fmt(weeks, 1)}
          </div>
        </div>
        <div style={styles.timeCellDivider} />
        <div style={styles.timeCell}>
          <div style={styles.timeCellLabel}>Bulan</div>
          <div style={{ ...styles.timeCellValue, color: valueColor }}>
            {fmt(months, 1)}
          </div>
        </div>
        <div style={styles.timeCellDivider} />
        <div style={styles.timeCell}>
          <div style={styles.timeCellLabel}>Tahun</div>
          <div style={{ ...styles.timeCellValue, color: valueColor }}>
            {fmt(years, 2)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* ===== BACKGROUND LAYER ===== */}
      <div style={styles.bgLayer} />

      {/* ===== SCROLL WRAPPER ===== */}
      <div style={styles.scrollWrapper}>
        <div style={styles.content}>
          {/* HEADER (dengan back button di dalamnya) */}
          <div style={styles.header}>
            <button
              onClick={() => onNavigate('home')}
              style={styles.backBtn}
              aria-label="Kembali"
            >
              ←
            </button>
            <h1 style={styles.title}>Kalkulator Keuangan</h1>
            <p style={styles.subtitle}>
              Hitung sisa uang per bulan, lalu lihat estimasi waktu dalam minggu,
              bulan, dan tahun.
            </p>
          </div>

          {/* 1. INCOME & COST */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Income &amp; Cost / Bulan</h2>
            </div>

            <div style={styles.fieldRow}>
              <div style={styles.field}>
                <label style={styles.label}>Income per Bulan</label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="0"
                  style={styles.input}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Cost per Bulan</label>
                <input
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="0"
                  style={styles.input}
                />
              </div>
            </div>

            <div
              style={{
                ...styles.resultBox,
                ...(result >= 0 ? styles.resultBoxPositive : styles.resultBoxNegative),
              }}
            >
              <span style={styles.resultLabel}>Sisa Uang / Bulan</span>
              <span
                style={{
                  ...styles.resultValue,
                  ...(result >= 0
                    ? styles.resultValuePositive
                    : styles.resultValueNegative),
                }}
              >
                {formatRupiah(result)}
              </span>
            </div>
          </div>

          {/* 2. TAMBAH ITEM */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Tambah Need / Wish</h2>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Nama Item</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Contoh: Laptop, Liburan"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Biaya</label>
              <input
                type="number"
                value={costInput}
                onChange={(e) => setCostInput(e.target.value)}
                placeholder="0"
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Tipe</label>
              <div style={styles.toggleGroup}>
                <button
                  onClick={() => setTypeInput('need')}
                  style={{
                    ...styles.toggleBtn,
                    ...(typeInput === 'need' ? styles.toggleBtnNeedActive : {}),
                  }}
                >
                  Need
                </button>
                <button
                  onClick={() => setTypeInput('wish')}
                  style={{
                    ...styles.toggleBtn,
                    ...(typeInput === 'wish' ? styles.toggleBtnWishActive : {}),
                  }}
                >
                  Wish
                </button>
              </div>
            </div>

            <button onClick={handleAddItem} style={styles.primaryBtn}>
              Tambahkan
            </button>
          </div>

          {/* 3. DAFTAR */}
          <div style={styles.twoCols}>
            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={{ ...styles.cardTitle, color: '#60a5fa' }}>Need</h2>
              </div>
              {renderList(needs)}
              <div style={styles.totalRow}>
                <span>Total Need</span>
                <strong style={styles.totalValue}>{formatRupiah(totalNeed)}</strong>
              </div>
              <div style={styles.timeLabel}>Estimasi waktu tercapai</div>
              {renderTimeGrid(weeksNeed, monthsNeed, yearsNeed, 'need')}
            </div>

            <div style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={{ ...styles.cardTitle, color: '#c084fc' }}>Wish</h2>
              </div>
              {renderList(wishes)}
              <div style={styles.totalRow}>
                <span>Total Wish</span>
                <strong style={styles.totalValue}>{formatRupiah(totalWish)}</strong>
              </div>
              <div style={styles.timeLabel}>Estimasi waktu tercapai</div>
              {renderTimeGrid(weeksWish, monthsWish, yearsWish, 'wish')}
            </div>
          </div>

          {/* 4. RINGKASAN */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={{ ...styles.cardTitle, color: '#4ade80' }}>Ringkasan</h2>
            </div>

            <div style={styles.totalRow}>
              <span>Total Need + Wish</span>
              <strong style={styles.totalValue}>{formatRupiah(totalBoth)}</strong>
            </div>

            <div style={styles.timeLabel}>Estimasi waktu tercapai (semua)</div>
            {renderTimeGrid(weeksBoth, monthsBoth, yearsBoth, 'both')}

            {result <= 0 && (
              <div style={styles.warn}>
                Isi Income dan Cost terlebih dahulu dengan sisa lebih dari 0
                supaya waktu bisa dihitung.
              </div>
            )}
          </div>

          <p style={styles.footnote}>
            Asumsi: 1 tahun = 12 bulan = 52 minggu. Sisa uang dihitung per bulan.
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
  /* Background layer - fixed, tidak ikut scroll */
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

  /* Scroll wrapper - transparan */
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

  /* Header - relative sebagai anchor back button */
  header: {
    textAlign: 'center',
    marginBottom: 26,
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
    fontSize: 14,
    margin: 0,
    color: 'rgba(255,255,255,0.75)',
  },

  /* Back button - absolute di dalam header, sejajar judul */
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

  card: {
    background: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 22,
    marginBottom: 18,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 18,
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

  fieldRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 14,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.65)',
    margin: 0,
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 10,
    border: '1.5px solid rgba(255,255,255,0.12)',
    background: 'rgba(0,0,0,0.5)',
    color: '#ffffff',
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    boxSizing: 'border-box',
  },

  resultBox: {
    marginTop: 8,
    padding: '16px 20px',
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  resultBoxPositive: {
    background:
      'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(5,150,105,0.15))',
    border: '1.5px solid rgba(16,185,129,0.55)',
  },
  resultBoxNegative: {
    background:
      'linear-gradient(135deg, rgba(239,68,68,0.22), rgba(220,38,38,0.15))',
    border: '1.5px solid rgba(239,68,68,0.55)',
  },
  resultLabel: {
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.75)',
  },
  resultValue: {
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: '-0.5px',
    fontVariantNumeric: 'tabular-nums',
  },
  resultValuePositive: { color: '#4ade80' },
  resultValueNegative: { color: '#f87171' },

  toggleGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 10,
  },
  toggleBtn: {
    padding: '11px 14px',
    borderRadius: 10,
    border: '1.5px solid rgba(255,255,255,0.12)',
    background: 'rgba(255,255,255,0.05)',
    color: 'rgba(255,255,255,0.75)',
    fontWeight: 700,
    fontSize: 14,
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
  toggleBtnNeedActive: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    borderColor: '#60a5fa',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(59,130,246,0.4)',
  },
  toggleBtnWishActive: {
    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
    borderColor: '#c084fc',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(168,85,247,0.4)',
  },

  primaryBtn: {
    width: '100%',
    padding: 13,
    borderRadius: 10,
    border: 'none',
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 14.5,
    fontFamily: 'inherit',
    letterSpacing: '0.3px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(34,197,94,0.35)',
  },
  delBtn: {
    flex: '0 0 auto',
    width: 26,
    height: 26,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(239,68,68,0.9)',
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 700,
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  list: { listStyle: 'none', padding: 0, margin: '0 0 4px' },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    padding: '11px 13px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 10,
    marginBottom: 8,
    fontSize: 14,
  },
  itemName: {
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: '#e2e8f0',
  },
  itemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flex: '0 0 auto',
  },
  itemAmount: {
    fontWeight: 700,
    fontVariantNumeric: 'tabular-nums',
    color: '#ffffff',
  },
  empty: {
    margin: '0 0 4px',
    padding: 16,
    textAlign: 'center',
    fontSize: 13.5,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.4)',
    background: 'rgba(0,0,0,0.25)',
    borderRadius: 10,
    border: '1px dashed rgba(255,255,255,0.1)',
  },

  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0 4px',
    marginTop: 6,
    borderTop: '1.5px dashed rgba(255,255,255,0.12)',
    fontSize: 14,
    color: 'rgba(255,255,255,0.75)',
  },
  totalValue: {
    fontSize: 17,
    fontWeight: 800,
    color: '#ffffff',
    fontVariantNumeric: 'tabular-nums',
  },

  timeLabel: {
    marginTop: 14,
    marginBottom: 8,
    fontSize: 11.5,
    fontWeight: 700,
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
  },

  timeGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr auto 1fr auto 1fr',
    alignItems: 'center',
    gap: 0,
    padding: '12px 6px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.06)',
  },
  timeCell: {
    textAlign: 'center',
    padding: '2px 4px',
  },
  timeCellLabel: {
    fontSize: 10.5,
    fontWeight: 700,
    letterSpacing: '0.6px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 4,
  },
  timeCellValue: {
    fontSize: 20,
    fontWeight: 800,
    fontVariantNumeric: 'tabular-nums',
    letterSpacing: '-0.3px',
  },
  timeCellDivider: {
    width: 1,
    height: 32,
    background: 'rgba(255,255,255,0.1)',
  },

  twoCols: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 18,
    marginBottom: 0,
  },

  warn: {
    marginTop: 14,
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