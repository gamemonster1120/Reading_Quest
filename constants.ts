
import { User, Plan, RankItem, ShopItem, ShopCategory, Friend } from './types';

export const MOCK_USER: User = {
  name: '독서왕김코딩',
  level: 12,
  xp: 150,
  xpToNextLevel: 500,
  points: 2500,
  rank: 'Gold III',
  rankPosition: 123,
  profileImage: 'https://picsum.photos/seed/user1/100/100',
  title: '책의 탐험가',
  items: [],
  appBackground: 'bg-gray-900'
};

export const MOCK_PLAN: Plan = {
  bookTitle: 'React 마스터하기',
  author: '익명의 개발자',
  goalType: 'pages',
  goal: 50,
  currentProgress: 10,
  useAiQuiz: true,
  useShortFormLock: false,
  estimatedReward: {
    points: 100,
    xp: 250,
  }
};

export const MOCK_PERSONAL_RANKING: RankItem[] = [
  { rank: 1, name: '책벌레', points: 15000, profileImage: 'https://picsum.photos/seed/rank1/40/40' },
  { rank: 2, name: '지식탐험가', points: 14500, profileImage: 'https://picsum.photos/seed/rank2/40/40' },
  { rank: 3, name: '도서관유령', points: 13000, profileImage: 'https://picsum.photos/seed/rank3/40/40' },
  { rank: 4, name: '리딩마스터', points: 12500, profileImage: 'https://picsum.photos/seed/rank4/40/40' },
  { rank: 5, name: '속독의달인', points: 11000, profileImage: 'https://picsum.photos/seed/rank5/40/40' },
  { rank: 6, name: '활자중독', points: 10500, profileImage: 'https://picsum.photos/seed/rank6/40/40' },
  { rank: 7, name: '이야기꾼', points: 9800, profileImage: 'https://picsum.photos/seed/rank7/40/40' },
  { rank: 8, name: '페이지터너', points: 9200, profileImage: 'https://picsum.photos/seed/rank8/40/40' },
  { rank: 9, name: '상상가', points: 8500, profileImage: 'https://picsum.photos/seed/rank9/40/40' },
  { rank: 10, name: '문학소년', points: 8000, profileImage: 'https://picsum.photos/seed/rank10/40/40' },
];

export const MOCK_FRIENDS: Friend[] = [
    { rank: 1, name: '내친구코딩', points: 13200, profileImage: 'https://picsum.photos/seed/friend1/40/40' },
    { rank: 2, name: '독서왕김코딩', points: 12800, profileImage: MOCK_USER.profileImage },
    { rank: 3, name: '같이읽자', points: 11500, profileImage: 'https://picsum.photos/seed/friend2/40/40' },
    { rank: 4, name: '책끝장보기', points: 9500, profileImage: 'https://picsum.photos/seed/friend3/40/40' },
];


export const MOCK_SHOP_ITEMS: ShopItem[] = [
  { id: 'bg01', name: '고요한 밤하늘 배경', description: '프로필과 홈 화면을 밤하늘 테마로 변경합니다.', price: 1000, category: ShopCategory.COSMETICS, image: 'https://picsum.photos/seed/bg01/200/200', effect: { type: 'BACKGROUND_CHANGE', value: 'bg-[url(https://picsum.photos/seed/space/500/800)] bg-cover' } },
  { id: 'bg02', name: '따스한 도서관 배경', description: '프로필과 홈 화면을 도서관 테마로 변경합니다.', price: 1000, category: ShopCategory.COSMETICS, image: 'https://picsum.photos/seed/bg02/200/200', effect: { type: 'BACKGROUND_CHANGE', value: 'bg-[url(https://picsum.photos/seed/library/500/800)] bg-cover' } },
  { id: 'icon01', name: '황금 책 아이콘', description: '프로필 아이콘을 특별한 황금 책으로 변경합니다.', price: 500, category: ShopCategory.COSMETICS, image: 'https://picsum.photos/seed/icon01/200/200' },
  { id: 'benefit01', name: '스터디룸 우선 예약권', description: '제휴 스터디룸 예약 시 우선권을 가집니다.', price: 2000, category: ShopCategory.BENEFITS, image: 'https://picsum.photos/seed/benefit01/200/200' },
  { id: 'title01', name: '독서왕', description: '100권의 책을 읽으면 획득할 수 있는 칭호입니다.', price: 5000, category: ShopCategory.TITLES, image: 'https://picsum.photos/seed/title01/200/200' },
  { id: 'title02', name: '지식 탐험가', description: '5개 장르의 책을 모두 읽으면 획득할 수 있는 칭호입니다.', price: 3000, category: ShopCategory.TITLES, image: 'https://picsum.photos/seed/title02/200/200' },
];
