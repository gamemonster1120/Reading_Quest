
import React, { createContext, useContext, useReducer } from 'react';
import { User, Plan, ShopItem, RankItem, Friend } from '../types';
import { MOCK_USER, MOCK_PLAN, MOCK_SHOP_ITEMS, MOCK_PERSONAL_RANKING, MOCK_FRIENDS } from '../constants';

interface AppState {
  user: User;
  plan: Plan | null;
  shopItems: ShopItem[];
  personalRanking: RankItem[];
  friendsRanking: Friend[];
}

type Action =
  | { type: 'SET_PLAN'; payload: Plan }
  | { type: 'UPDATE_PLAN_PROGRESS'; payload: number }
  | { type: 'COMPLETE_PLAN'; payload: { points: number; xp: number } }
  | { type: 'PURCHASE_ITEM'; payload: ShopItem }
  | { type: 'CANCEL_PLAN' };


const initialState: AppState = {
  user: MOCK_USER,
  plan: MOCK_PLAN,
  shopItems: MOCK_SHOP_ITEMS,
  personalRanking: MOCK_PERSONAL_RANKING,
  friendsRanking: MOCK_FRIENDS,
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_PLAN':
      return { ...state, plan: action.payload };
    case 'UPDATE_PLAN_PROGRESS':
      if (!state.plan) return state;
      return {
        ...state,
        plan: { ...state.plan, currentProgress: action.payload },
      };
    case 'CANCEL_PLAN':
      return { ...state, plan: null };
    case 'COMPLETE_PLAN': {
        const { points, xp } = action.payload;
        const newPoints = state.user.points + points;
        let newXp = state.user.xp + xp;
        let newLevel = state.user.level;
        let newXpToNextLevel = state.user.xpToNextLevel;

        while (newXp >= newXpToNextLevel) {
            newXp -= newXpToNextLevel;
            newLevel++;
            newXpToNextLevel = Math.floor(newXpToNextLevel * 1.5);
        }

        return {
            ...state,
            user: {
                ...state.user,
                points: newPoints,
                xp: newXp,
                level: newLevel,
                xpToNextLevel: newXpToNextLevel,
            },
            plan: null,
        };
    }
    case 'PURCHASE_ITEM': {
        const item = action.payload;
        if (state.user.points < item.price || state.user.items.includes(item.id)) {
            return state;
        }
        
        const updatedUser = {
            ...state.user,
            points: state.user.points - item.price,
            items: [...state.user.items, item.id],
        };

        if (item.effect?.type === 'BACKGROUND_CHANGE') {
            updatedUser.appBackground = item.effect.value;
        }

        return {
            ...state,
            user: updatedUser,
        };
    }
    default:
      return state;
  }
};

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// FIX: Changed component definition to use React.FC to correctly handle children prop.
export const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
        <div className={state.user.appBackground}>
            {children}
        </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
