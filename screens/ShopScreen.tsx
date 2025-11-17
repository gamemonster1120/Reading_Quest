import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ShopItem, ShopCategory } from '../types';
import Modal from '../components/Modal';

const ShopScreen = () => {
  const { state, dispatch } = useAppContext();
  const { user, shopItems } = state;
  const [activeTab, setActiveTab] = useState<ShopCategory>(ShopCategory.COSMETICS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const handlePurchaseClick = (item: ShopItem) => {
    if (user.points < item.price || user.items.includes(item.id)) {
        return;
    }
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  
  const confirmPurchase = () => {
    if (selectedItem) {
        dispatch({ type: 'PURCHASE_ITEM', payload: selectedItem });
    }
    setIsModalOpen(false);
    setSelectedItem(null);
  }

  const filteredItems = shopItems.filter(item => item.category === activeTab);

  const TabButton = ({ category }: { category: ShopCategory }) => (
    <button
      onClick={() => setActiveTab(category)}
      className={`px-4 py-2 text-sm font-bold rounded-t-lg transition ${activeTab === category ? 'bg-gray-800 text-green-400' : 'bg-gray-700 text-gray-400'}`}
    >
      {category}
    </button>
  );

  return (
    <div className="p-4">
       <header className="flex justify-between items-center mb-4 p-3 bg-gray-800 rounded-lg">
            <h1 className="text-2xl font-bold">포인트 상점</h1>
            <div className="text-lg font-bold text-yellow-400">💰 {user.points.toLocaleString()} P</div>
      </header>
      
      <div className="flex space-x-1 border-b border-gray-700">
        <TabButton category={ShopCategory.COSMETICS} />
        <TabButton category={ShopCategory.BENEFITS} />
        <TabButton category={ShopCategory.TITLES} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        {filteredItems.map(item => {
          const isOwned = user.items.includes(item.id);
          const canAfford = user.points >= item.price;
          return (
            <div key={item.id} className="bg-gray-800 rounded-lg p-3 flex flex-col justify-between shadow-lg">
                <img src={item.image} alt={item.name} className="w-full h-24 object-cover rounded mb-2"/>
                <h3 className="font-bold text-md">{item.name}</h3>
                <p className="text-xs text-gray-400 flex-grow">{item.description}</p>
                <button 
                    onClick={() => handlePurchaseClick(item)}
                    disabled={isOwned || !canAfford}
                    className={`w-full mt-2 py-1.5 rounded text-sm font-bold transition
                                disabled:cursor-not-allowed
                                ${isOwned ? 'bg-gray-600 text-gray-400' : 
                                  canAfford ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-red-800 text-red-300'}`}
                >
                    {isOwned ? '보유 중' : `💰 ${item.price.toLocaleString()}`}
                </button>
            </div>
          );
        })}
      </div>
      
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmPurchase}
        title="구매 확인"
       >
        {selectedItem && (
            <p><span className="font-bold text-green-300">{selectedItem.name}</span>을(를) <span className="font-bold text-yellow-300">{selectedItem.price.toLocaleString()}P</span>에 구매하시겠습니까?</p>
        )}
      </Modal>

    </div>
  );
};

export default ShopScreen;