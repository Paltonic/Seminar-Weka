'use client'

// 1. REMOVE useRouter import entirely!
// import { useRouter } from 'next/navigation' 

import './HomeScreen.css'

import logoImg from './assets/wk_logo.png'
import sem1BtnImg from './assets/Sem1_button.png'
import sem2BtnImg from './assets/Sem2_button.png'
import sem3BtnImg from './assets/Sem3_button.png'

const APP_VERSION = 'v1.0.4'
const APP_CREDIT = '© 2026 Frederick Liko'

// 2. Accept the onNavigate prop from page.tsx
export default function HomeScreen({ onNavigate }: { onNavigate: (screen: string) => void }) {

  return (
    <div className="home-container">

      <div className="title-wrapper">
        <img src={logoImg.src} alt="PoyNFriends" className="game-logo-img" />
      </div>

      <div className="main-menu">
        {/* 3. Change router.push to onNavigate */}
        <button className="image-menu-btn" onClick={() => onNavigate('sem1')}>
          <img src={sem1BtnImg.src} alt="Play" className="menu-btn-img" />
        </button>
        
        <button className="image-menu-btn" onClick={() => onNavigate('sem2')}>
          <img src={sem2BtnImg.src} alt="Play" className="menu-btn-img" />
        </button>
        
        <button className="image-menu-btn" onClick={() => onNavigate('sem3')}>
          <img src={sem3BtnImg.src} alt="About" className="menu-btn-img" />
        </button>
      </div>

      <div className="home-footer">
        <span className="home-version">{APP_VERSION}</span>
        <span className="home-credit">{APP_CREDIT}</span>
      </div>
    </div>
  )
}