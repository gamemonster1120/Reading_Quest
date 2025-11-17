import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { QuizQuestion } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface QuizScreenProps {
  bookTitle: string;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ bookTitle }) => {
  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!bookTitle) {
      setError("퀴즈를 생성할 책 정보가 없습니다.");
      setLoading(false);
      return;
    }
    generateQuiz();
  }, [bookTitle]);

  const generateQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `'${bookTitle}' 책에 대한 내용으로 객관식 퀴즈 5개를 만들어줘.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              quizzes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.STRING },
                  },
                },
              },
            },
          },
        },
      });
      
      const jsonResponse = JSON.parse(response.text);
      if (jsonResponse.quizzes && jsonResponse.quizzes.length > 0) {
        setQuestions(jsonResponse.quizzes);
      } else {
        throw new Error("퀴즈 생성에 실패했습니다. 유효한 질문이 없습니다.");
      }

    } catch (e) {
      console.error(e);
      setError("AI 퀴즈를 생성하는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnswerSelect = (option: string) => {
    if (selectedAnswer) return; // Prevent changing answer
    
    setSelectedAnswer(option);
    const correct = option === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
        setScore(score + 1);
    }
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Finish quiz
      if (state.plan) {
        const reward = {
            points: state.plan.estimatedReward.points + (score * 10), // bonus for correct answers
            xp: state.plan.estimatedReward.xp + (score * 20),
        }
        dispatch({ type: 'COMPLETE_PLAN', payload: reward });
      }
      navigate('/');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen"><p>AI가 당신만을 위한 퀴즈를 만들고 있어요...</p></div>;
  if (error) return <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <p className="text-red-400 mb-4">{error}</p>
      <button onClick={() => navigate('/')} className="px-4 py-2 bg-green-600 rounded">홈으로 돌아가기</button>
  </div>;
  if (questions.length === 0) return <div className="flex items-center justify-center h-screen"><p>생성된 퀴즈가 없습니다.</p></div>;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="p-4 flex flex-col h-screen">
      <header className="text-center mb-4">
        <h1 className="text-xl font-bold">AI 퀴즈</h1>
        <p className="text-sm text-gray-400">{currentQuestionIndex + 1} / {questions.length}</p>
      </header>
      
      <div className="flex-grow flex flex-col justify-center">
        <div className="bg-gray-800 p-6 rounded-lg mb-6 text-center">
            <p className="text-lg">{currentQuestion.question}</p>
        </div>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            let buttonClass = 'bg-gray-700 hover:bg-gray-600';
            if (isSelected) {
              buttonClass = isCorrect ? 'bg-green-600' : 'bg-red-600';
            } else if (selectedAnswer && option === currentQuestion.correctAnswer) {
              buttonClass = 'bg-green-800'; // Show correct answer if wrong one was picked
            }
            return (
              <button 
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={!!selectedAnswer}
                className={`w-full text-left p-4 rounded-lg transition ${buttonClass}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      
      {selectedAnswer && (
        <div className="mt-auto">
             <div className="text-center mb-4 p-3 rounded-lg animate-fade-in">
                {isCorrect ? 
                    <p className="text-green-400 font-bold">정답입니다! (+10P, +20XP)</p> : 
                    <p className="text-red-400 font-bold">오답입니다. 정답: {currentQuestion.correctAnswer}</p>
                }
            </div>
            <button
                onClick={handleNext}
                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500"
            >
                {currentQuestionIndex < questions.length - 1 ? '다음 문제' : '결과 확인'}
            </button>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
