'use client' // Wajib ditambahkan di baris paling atas

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Ganti onNavigate dengan router Next.js
import './HomeScreen.css'

import logoImg from './assets/wk_logo.png'
import sem1BtnImg from './assets/Sem1_button.png'
import sem2BtnImg from './assets/Sem2_button.png'
import sem3BtnImg from './assets/Sem3_button.png'

const APP_VERSION = 'v1.0.0'
const APP_CREDIT = '© 2026 Frederick Liko'

export default function HomeScreen() {
  const router = useRouter() // Inisialisasi router


  return (
    <div className="home-container">

      <div className="title-wrapper">
        <img src={logoImg.src} alt="PoyNFriends" className="game-logo-img" />
      </div>

      <div className="main-menu">
        {/* Menggunakan router.push untuk pindah halaman */}
        <button className="image-menu-btn" onClick={() => router.push('/play')}>
          <img src={sem1BtnImg.src} alt="Play" className="menu-btn-img" />
        </button>
        <button className="image-menu-btn" onClick={() => router.push('/play')}>
          <img src={sem2BtnImg.src} alt="Play" className="menu-btn-img" />
        </button>
        <button className="image-menu-btn" onClick={() => router.push('/about')}>
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