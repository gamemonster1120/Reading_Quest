import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProgressBar from '../components/ProgressBar';

const StatBox = ({ label, value }: { label: string, value: string | number }) => (
    <div className="bg-gray-800 p-4 rounded-lg text-center">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const ProfileScreen = () => {
  const { state } = useAppContext();
  const { user } = state;
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">내 정보</h1>

      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg">
        <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full border-4 border-green-400 mb-4"/>
        <p className="text-sm bg-purple-600 px-3 py-1 rounded-full mb-2 font-semibold">{user.title}</p>
        <p className="text-2xl font-bold">{user.name}</p>
        <div className="w-full mt-4">
            <ProgressBar value={user.xp} max={user.xpToNextLevel} label={`레벨 ${user.level}`} />
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold mb-3">독서 통계</h2>
        <div className="grid grid-cols-3 gap-3">
            <StatBox label="총 읽은 책" value={28} />
            <StatBox label="총 페이지" value="5,678" />
            <StatBox label="총 독서 시간" value="128시간" />
        </div>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="font-bold mb-3">계획 달성률</h2>
        <div className="grid grid-cols-3 gap-3">
             <StatBox label="총 계획" value={45} />
             <StatBox label="달성" value={40} />
             <StatBox label="평균 달성률" value="89%" />
        </div>
         <div className="mt-4 text-center">
             <p className="text-lg">🔥 <span className="font-bold text-orange-400">15일</span> 연속 달성 중!</p>
        </div>
      </div>

      <button
          onClick={() => navigate('/guide')}
          className="w-full bg-gray-700 text-white font-bold py-3 rounded-lg hover:bg-gray-600 transition"
        >
          독서 가이드 보기
      </button>

    </div>
  );
};

export default ProfileScreen;
