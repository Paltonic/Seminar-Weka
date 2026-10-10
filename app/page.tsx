'use client' // 1. Add this at the very top because we are using useState

import { useState } from 'react'
import HomeScreen from './HomeScreen';
import Sem1 from './Sem1'; // 2. Import your other screens
import Sem2 from './Sem2';
import Sem3 from './Sem3';
import './App.css'; 

export default function Home() {
  // 3. Create state to track the current screen (default is 'home')
  const [currentScreen, setCurrentScreen] = useState('home')

  return (
    <main>
      {/* 4. Conditionally render screens based on the state */}
      {currentScreen === 'home' && <HomeScreen onNavigate={setCurrentScreen} />}
      {currentScreen === 'sem1' && <Sem1 onNavigate={setCurrentScreen} />}
      {currentScreen === 'sem2' && <Sem2 onNavigate={setCurrentScreen} />}
      {currentScreen === 'sem3' && <Sem3 onNavigate={setCurrentScreen} />}
    </main>
  );
}