
import React from 'react';
import { useAppContext } from '../context/AppContext';
import { SettingsIcon, NotificationIcon } from '../components/icons/NavIcons';
import ProgressBar from '../components/ProgressBar';

// FIX: Changed component definition to use React.FC to correctly handle children prop.
const StatCard: React.FC<{ title: string, value: string | number }> = ({ title, value, children }) => (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center text-center h-full">
        <div className="text-gray-400 text-sm mb-1">{title}</div>
        {children}
        <div className="text-white font-bold text-lg mt-1">{value}</div>
    </div>
);

const HomeScreen = () => {
  const { state } = useAppContext();
  const { user, plan } = state;

  const today = new Date();
  const dateString = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  return (
    <div className="p-4 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-green-400">리딩 퀘스트</h1>
        <div className="flex items-center space-x-4">
            <button><NotificationIcon /></button>
            <button><SettingsIcon /></button>
        </div>
      </header>
      <p className="text-gray-400 text-sm">{dateString}</p>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-lg">
        <h2 className="text-lg font-bold mb-4">오늘의 계획</h2>
        {plan ? (
          <div className="space-y-3">
            <p className="text-xl font-bold text-green-300">{plan.bookTitle}</p>
            <ProgressBar value={plan.currentProgress} max={plan.goal} label={`목표 ${plan.goal}${plan.goalType === 'pages' ? '페이지' : '분'}`} />
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            <p>오늘의 계획이 없습니다.</p>
            <p className="text-sm">계획 탭에서 새로운 독서 계획을 추가해보세요!</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 h-32">
        <StatCard title="내 정보" value={user.name}>
            <img src={user.profileImage} alt="profile" className="w-12 h-12 rounded-full border-2 border-green-400"/>
            <span className="text-xs">Lv.{user.level}</span>
        </StatCard>
        <StatCard title="랭크" value={`#${user.rankPosition}`}>
            <div className="text-4xl">🏆</div>
            <span className="text-sm font-semibold">{user.rank}</span>
        </StatCard>
        <StatCard title="포인트" value={user.points.toLocaleString()}>
            <div className="text-4xl">💰</div>
            <span className="text-sm text-yellow-400 animate-pulse">일일 보너스!</span>
        </StatCard>
      </div>

    </div>
  );
};

export default HomeScreen;
