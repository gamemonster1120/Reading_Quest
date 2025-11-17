
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { RankItem, Friend } from '../types';

const RankScreen = () => {
    const { state } = useAppContext();
    const { user, personalRanking, friendsRanking } = state;
    const [activeTab, setActiveTab] = useState<'personal' | 'friends'>('personal');

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-400';
        if (rank === 2) return 'text-gray-300';
        if (rank === 3) return 'text-yellow-600';
        return 'text-gray-400';
    };

    // FIX: Changed component definition to use React.FC to correctly handle props like `key`.
    const RankRow: React.FC<{ item: RankItem, isUser: boolean }> = ({ item, isUser }) => (
        <div className={`flex items-center p-3 rounded-lg ${isUser ? 'bg-green-800 border border-green-500' : 'bg-gray-800'}`}>
            <div className={`w-8 text-lg font-black text-center ${getRankColor(item.rank)}`}>{item.rank}</div>
            <img src={item.profileImage} alt={item.name} className="w-10 h-10 rounded-full mx-3"/>
            <div className="flex-grow">
                <p className="font-bold">{item.name} {isUser && '(나)'}</p>
            </div>
            <div className="font-semibold text-yellow-300">{item.points.toLocaleString()} P</div>
        </div>
    );

    const dataToShow = activeTab === 'personal' ? personalRanking : friendsRanking;
    const userRankData = {
        rank: user.rankPosition,
        name: user.name,
        points: dataToShow.find(r => r.name === user.name)?.points || 0, // Simplified for mock
        profileImage: user.profileImage,
    };
    

    return (
        <div className="p-4">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold">랭킹 보드</h1>
                <p className="text-sm text-gray-400">2024년 2학기 시즌</p>
            </header>

            <div className="flex justify-center bg-gray-800 p-1 rounded-lg mb-4">
                <button
                    onClick={() => setActiveTab('personal')}
                    className={`w-1/2 py-2 rounded-md text-sm font-bold ${activeTab === 'personal' ? 'bg-green-600 text-white' : 'text-gray-300'}`}
                >
                    개인 랭크
                </button>
                <button
                    onClick={() => setActiveTab('friends')}
                    className={`w-1/2 py-2 rounded-md text-sm font-bold ${activeTab === 'friends' ? 'bg-green-600 text-white' : 'text-gray-300'}`}
                >
                    친구 랭크
                </button>
            </div>

            <div className="space-y-2">
                <h2 className="font-bold text-lg mb-2">내 랭킹</h2>
                <RankRow item={userRankData} isUser={true} />

                <h2 className="font-bold text-lg pt-4 mb-2">상위 10위</h2>
                {dataToShow.slice(0, 10).map(item => (
                    <RankRow key={item.rank} item={item} isUser={item.name === user.name} />
                ))}
            </div>
        </div>
    );
};

export default RankScreen;
