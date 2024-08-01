import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TitlePage from "./components/sanghyeon/pages/TitlePage.jsx";
import LoginPage from "./components/sanghyeon/pages/LoginPage.jsx";
import SignUpPage from "./components/sanghyeon/pages/SignUpPage.jsx";
import MainPage from "./components/sanghyeon/pages/MainPage.jsx";
import ProfilePage from "./components/sanghyeon/pages/ProfilePage.jsx";
import RecordPage from "./components/sanghyeon/pages/RecordPage.jsx";
import ReportPage from "./components/sanghyeon/pages/ReportPage.jsx";
import SolvedPage from "./components/sanghyeon/pages/SolvedPage.jsx";
import SingleMain from "./components/single/SingleMain.jsx";
import SinglePlay from "./components/single/single-play/SinglePlay.jsx";
import MultiMain from "./components/multi/MultiMain.jsx";
import MultiCreate from "./components/multi/MultiCreate.jsx";
import BattleCreate from "./components/battle/BattleCreate.jsx";
import BattleMain from "./components/battle/BattleMain.jsx";
import MultiGame from "./components/multi/MultiGame.jsx";
import BattleGame from "./components/battle/BattleGame.jsx";
import Ranking from "./components/ranking/Ranking.jsx";
import SoundStore from "./stores/SoundStore.jsx";
import React, { useEffect } from 'react';

function App() {
  const { initializeBackgroundMusic, stopBackgroundMusic, isPlaying } = SoundStore();

  useEffect(() => {
    // 배경음악 초기화 및 재생
    initializeBackgroundMusic('/BGM-1.mp3');

    return () => {
      // 컴포넌트가 언마운트될 때 배경음악 정지
      console.log('stop music');
      stopBackgroundMusic();
    };
  }, [initializeBackgroundMusic, stopBackgroundMusic]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TitlePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/record" element={<RecordPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/solved" element={<SolvedPage />} />
          <Route path="/multi" element={<MultiMain />} />
          <Route path="/multi-create" element={<MultiCreate />} />
          <Route path="/battle" element={<BattleMain />} />
          <Route path="/battle-create" element={<BattleCreate />} />
          <Route path="/multi-game" element={<MultiGame />} />
          <Route path="/battle-game" element={<BattleGame />} />
          <Route path="/single-main" element={<SingleMain />} />
          <Route path="/single-play/:content_id" element={<SinglePlay />} />
          <Route path="*" element={<TitlePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
