import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-11/12 max-w-sm text-white border border-gray-700 animate-slide-up">
        <h2 className="text-xl font-bold mb-4 text-green-400">{title}</h2>
        <div className="mb-6 text-gray-300">{children}</div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition-colors font-semibold"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 transition-colors font-bold"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
