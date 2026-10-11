'use client'

/* ============================================================
   GANTI 2 BARIS INI:
   - QR_IMAGE: path/nama gambar QR code Anda
   - TARGET_URL: link tujuan setelah QR di-scan
   ============================================================ */
const QR_IMAGE = '/assets/qr_game.png' // ← GANTI INI
const TARGET_URL = 'https://poygames.netlify.app' // ← GANTI INI

export default function Sem1({ onNavigate }: { onNavigate: (screen: string) => void }) {
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
            <h1 style={styles.title}>Relation Game</h1>
            <p style={styles.subtitle}>
              Scan QR code di bawah untuk mulai bermain.
            </p>
          </div>

          {/* CARD QR */}
          <div style={styles.card}>
            <div style={styles.qrWrap}>
              {/* Ganti src dengan gambar QR Anda */}
              <img
                src={QR_IMAGE}
                alt="QR Code Relation Game"
                style={styles.qrImage}
              />
            </div>

            <p style={styles.hint}>
              Arahkan kamera HP Anda ke QR code di atas, atau klik tombol di
              bawah ini jika membuka di perangkat yang sama.
            </p>

            <a
              href={TARGET_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.linkBtn}
            >
              Buka Link
            </a>
          </div>

          <p style={styles.footnote}>
            Pastikan koneksi internet stabil saat membuka link.
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
    maxWidth: 520,
    margin: '0 auto',
    padding: '40px 18px 60px',
    color: '#f1f5f9',
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    fontSize: 15,
    lineHeight: 1.5,
    boxSizing: 'border-box',
  },

  /* HEADER */
  header: {
    textAlign: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    margin: '0 0 8px',
    letterSpacing: '-0.5px',
    color: '#ffffff',
    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
  },
  subtitle: {
    fontSize: 14,
    margin: 0,
    color: 'rgba(255,255,255,0.75)',
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

  /* CARD */
  card: {
    background: 'rgba(15, 23, 42, 0.92)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 26,
    marginBottom: 18,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
    textAlign: 'center',
  },

  /* QR wrapper - putih biar kontras */
  qrWrap: {
    display: 'inline-block',
    padding: 16,
    background: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  qrImage: {
    display: 'block',
    width: 240,
    height: 240,
    objectFit: 'contain',
  },

  hint: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    lineHeight: 1.6,
    margin: '0 0 20px',
  },

  linkBtn: {
    display: 'block',
    width: '100%',
    padding: '14px 20px',
    borderRadius: 12,
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    fontWeight: 700,
    fontSize: 15,
    textDecoration: 'none',
    letterSpacing: '0.3px',
    boxShadow: '0 4px 14px rgba(34,197,94,0.4)',
    boxSizing: 'border-box',
    cursor: 'pointer',
  },

  footnote: {
    marginTop: 22,
    textAlign: 'center',
    fontSize: 11.5,
    color: 'rgba(255,255,255,0.4)',
    fontStyle: 'italic',
  },
}