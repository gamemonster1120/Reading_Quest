
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// FIX: Changed component definition to use React.FC to correctly handle children prop.
const AccordionItem: React.FC<{ title: string }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-700">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 flex justify-between items-center"
            >
                <span className="font-bold">{title}</span>
                <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="p-4 bg-gray-800 text-gray-300">{children}</div>}
        </div>
    )
}

const GuideScreen = () => {
    const navigate = useNavigate();
    const quotes = [
        "A reader lives a thousand lives before he dies . . . The man who never reads lives only one.",
        "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
        "Reading is essential for those who seek to rise above the ordinary."
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">독서 가이드</h1>
            
            <div className="bg-gray-800 rounded-lg p-4 mb-6 italic text-center text-gray-400">
                "{randomQuote}"
            </div>

            <div className="rounded-lg overflow-hidden">
                <AccordionItem title="어떤 책을 읽을까?">
                    <p>자신의 흥미와 관심사에서 시작하는 것이 가장 좋습니다. 베스트셀러 목록을 참고하거나, 좋아하는 영화의 원작 소설을 읽어보는 것도 좋은 방법입니다.</p>
                </AccordionItem>
                <AccordionItem title="효율적인 독서법">
                    <p>먼저 목차를 훑어보고 전체적인 구조를 파악하세요. 중요하다고 생각되는 부분은 메모하며 읽고, 다 읽은 후에는 간단하게라도 자신의 생각을 정리해보는 습관이 중요합니다.</p>
                </AccordionItem>
                <AccordionItem title="장르별 추천">
                    <ul className="list-disc pl-5 space-y-1">
                        <li><span className="font-semibold">SF:</span> 상상력의 한계를 넓히고 싶다면</li>
                        <li><span className="font-semibold">역사:</span> 과거를 통해 현재를 이해하고 싶다면</li>
                        <li><span className="font-semibold">자기계발:</span> 삶의 긍정적인 변화를 원한다면</li>
                    </ul>
                </AccordionItem>
            </div>
            
            <button 
                onClick={() => navigate('/')} 
                className="w-full mt-8 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-500 transition">
                홈으로 돌아가기
            </button>
        </div>
    );
};

export default GuideScreen;
