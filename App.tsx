
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import PlanScreen from './screens/PlanScreen';
import ShopScreen from './screens/ShopScreen';
import RankScreen from './screens/RankScreen';
import ProfileScreen from './screens/ProfileScreen';
import GuideScreen from './screens/GuideScreen';
import QuizScreen from './screens/QuizScreen';
import NavBar from './components/NavBar';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Main />
      </HashRouter>
    </AppProvider>
  );
}

const Main = () => {
  const location = useLocation();
  const [quizBookTitle, setQuizBookTitle] = useState('');
  
  const showNavBar = location.pathname !== '/quiz';

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      <div className="container mx-auto max-w-lg h-screen flex flex-col">
        <main className="flex-grow overflow-y-auto pb-20">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/plan" element={<PlanScreen setQuizBookTitle={setQuizBookTitle} />} />
            <Route path="/shop" element={<ShopScreen />} />
            <Route path="/rank" element={<RankScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/guide" element={<GuideScreen />} />
            <Route path="/quiz" element={<QuizScreen bookTitle={quizBookTitle} />} />
          </Routes>
        </main>
        {showNavBar && <NavBar />}
      </div>
    </div>
  );
};


export default App;
