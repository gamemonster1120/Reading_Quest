import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Plan } from '../types';
import ProgressBar from '../components/ProgressBar';

interface PlanScreenProps {
  setQuizBookTitle: (title: string) => void;
}

const PlanScreen: React.FC<PlanScreenProps> = ({ setQuizBookTitle }) => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [bookTitle, setBookTitle] = useState('');
  const [goal, setGoal] = useState(50);
  const [progress, setProgress] = useState(state.plan?.currentProgress || 0);

  const handleSetPlan = () => {
    if (!bookTitle.trim()) {
      alert('책 제목을 입력해주세요.');
      return;
    }
    const newPlan: Plan = {
      bookTitle,
      author: '미상',
      goalType: 'pages',
      goal,
      currentProgress: 0,
      useAiQuiz: true,
      useShortFormLock: false,
      estimatedReward: {
        points: goal * 2,
        xp: goal * 5,
      },
    };
    dispatch({ type: 'SET_PLAN', payload: newPlan });
  };
  
  const handleUpdateProgress = () => {
    if (state.plan) {
      const newProgress = Math.min(progress, state.plan.goal);
      dispatch({ type: 'UPDATE_PLAN_PROGRESS', payload: newProgress });
    }
  };

  const handleCompletePlan = () => {
    if (state.plan) {
      setQuizBookTitle(state.plan.bookTitle);
      navigate('/quiz');
    }
  };
  
  const handleCancelPlan = () => {
    if (window.confirm('정말로 계획을 취소하시겠습니까?')) {
      dispatch({ type: 'CANCEL_PLAN' });
    }
  }

  if (state.plan) {
    // Existing plan view
    return (
      <div className="p-4 text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">오늘의 계획 상세</h1>
        <div className="bg-gray-800 p-6 rounded-lg space-y-6">
          <div>
            <p className="text-gray-400">책 제목</p>
            <p className="text-xl font-bold">{state.plan.bookTitle}</p>
          </div>
          <ProgressBar value={state.plan.currentProgress} max={state.plan.goal} />
          <div>
            <label htmlFor="progress" className="block mb-2 text-sm font-medium text-gray-300">
              진행률 입력 ({progress} / {state.plan.goal} 페이지)
            </label>
            <input
              type="range"
              id="progress"
              min="0"
              max={state.plan.goal}
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              onMouseUp={handleUpdateProgress}
              onTouchEnd={handleUpdateProgress}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <button
            onClick={handleCompletePlan}
            disabled={state.plan.currentProgress < state.plan.goal}
            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            달성 완료 & AI 퀴즈 풀기
          </button>
           <button
            onClick={handleCancelPlan}
            className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-500 transition mt-2"
          >
            계획 취소
          </button>
        </div>
      </div>
    );
  }

  // New plan view
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-6 text-center">새로운 계획 설정</h1>
      <div className="bg-gray-800 p-6 rounded-lg space-y-6">
        <div>
          <label htmlFor="book-title" className="block mb-2 text-sm font-medium text-gray-300">도서 검색</label>
          <input
            type="text"
            id="book-title"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
            className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="책 제목을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="goal" className="block mb-2 text-sm font-medium text-gray-300">목표 페이지: {goal}p</label>
          <input
            type="range"
            id="goal"
            min="10"
            max="200"
            step="10"
            value={goal}
            onChange={(e) => setGoal(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div className="text-center text-gray-400 bg-gray-700 p-3 rounded-lg">
          <p className="font-semibold">예상 보상</p>
          <p>💰 {goal * 2}포인트 / ✨ {goal * 5}XP</p>
        </div>
        <button
          onClick={handleSetPlan}
          className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition"
        >
          계획 시작하기
        </button>
      </div>
    </div>
  );
};

export default PlanScreen;
