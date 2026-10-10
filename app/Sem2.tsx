'use client'

// Import CSS global Anda (jika belum di-import di layout.tsx)
// import './globals.css' 

export default function Sem1({ onNavigate }: { onNavigate: (screen: string) => void }) {
  return (
    // Gunakan class shared-screen-bg di sini
    <div className="shared-screen-bg">
      
      {/* Tombol Back Absolute di Kiri Atas */}
      <button className="back-btn" onClick={() => onNavigate('home')}>
        ←
      </button>

      {/* Konten Game Anda */}
      <div style={{ textAlign: 'center', color: 'white' }}>
        <h1>Seminar 2</h1>
        <p>Gameplay Seminar 2 ada di sini.</p>
      </div>

    </div>
  )
}