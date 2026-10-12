export type Hall = {
  slug: string;
  name: string;
  region: string;
  district: string;
  type: string;
  station: string;
  address: string;
  capacity: string;
  mealPrice: string;
  rental: string;
  guarantee: string;
  rating: number;
  reviewCount: number;
  meal: number;
  mood: number;
  parking: number;
  ceremony: number;
  image: string;
  gallery: string[];
  tags: string[];
  intro: string;
  badge?: string;
  benefits: string[];
};

const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=86`;

export const halls: Hall[] = [
  {
    slug: 'maison-de-lumiere', name: '메종 드 루미에르', region: '서울', district: '강남구', type: '호텔·컨벤션', station: '학동역 3분', address: '서울 강남구 논현로 000', capacity: '120~320명', mealPrice: '1인 92,000원~', rental: '대관 4,400,000원~', guarantee: '보증 180명', rating: 4.8, reviewCount: 284, meal: 4.9, mood: 4.8, parking: 4.5, ceremony: 4.8,
    image: photo('photo-1507504031003-b417219a0fde'), gallery: [photo('photo-1507504031003-b417219a0fde'), photo('photo-1519225421980-715cb0215aed'), photo('photo-1519741497674-611481863552')], tags: ['자연광 채플', '식사 만족', '프라이빗'], intro: '햇살이 스며드는 채플과 정갈한 코스 요리가 돋보이는 도심 속 웨딩 공간이에요.', badge: '이번 주 인기', benefits: ['시식 2인 제공', '당일 계약 혜택 상담', '하객 주차 3시간']
  },
  {
    slug: 'the-orangerie-seoul', name: '더 오랑주리 서울', region: '서울', district: '송파구', type: '하우스웨딩', station: '잠실역 7분', address: '서울 송파구 올림픽로 000', capacity: '80~220명', mealPrice: '1인 78,000원~', rental: '대관 3,200,000원~', guarantee: '보증 120명', rating: 4.7, reviewCount: 196, meal: 4.7, mood: 4.9, parking: 4.3, ceremony: 4.8,
    image: photo('photo-1519167758481-83f550bb49b3'), gallery: [photo('photo-1519167758481-83f550bb49b3'), photo('photo-1464366400600-7168b8af9bc3'), photo('photo-1478146896981-b80fe463b330')], tags: ['가든 연출', '단독홀', '감성 조명'], intro: '계절감 있는 플라워 연출과 단독 사용이 가능한 따뜻한 분위기의 하우스웨딩 공간이에요.', benefits: ['플라워 연출 상담', '신부대기실 단독 사용', '발렛 주차 안내']
  },
  {
    slug: 'seongbuk-terrace', name: '성북 테라스 가든', region: '서울', district: '성북구', type: '가든·야외', station: '한성대입구역 8분', address: '서울 성북구 성북로 000', capacity: '70~180명', mealPrice: '1인 69,000원~', rental: '대관 2,600,000원~', guarantee: '보증 100명', rating: 4.6, reviewCount: 118, meal: 4.5, mood: 4.9, parking: 4.1, ceremony: 4.7,
    image: photo('photo-1522673607200-164d1b6ce486'), gallery: [photo('photo-1522673607200-164d1b6ce486'), photo('photo-1511285560929-80b456fea0bc'), photo('photo-1492684223066-81342ee5ff30')], tags: ['야외 예식', '소규모', '반려동물 동반'], intro: '도심에서 조금 벗어나 초록빛 테라스와 여유로운 리셉션을 즐길 수 있는 공간이에요.', benefits: ['우천 시 실내 대체', '가든 포토존', '피로연 동선 안내']
  },
  {
    slug: 'river-atelier-hanam', name: '리버 아틀리에 하남', region: '경기', district: '하남시', type: '컨벤션', station: '미사역 5분', address: '경기 하남시 미사강변 000', capacity: '150~450명', mealPrice: '1인 74,000원~', rental: '대관 3,800,000원~', guarantee: '보증 250명', rating: 4.7, reviewCount: 341, meal: 4.8, mood: 4.6, parking: 4.9, ceremony: 4.7,
    image: photo('photo-1507504031003-b417219a0fde'), gallery: [photo('photo-1507504031003-b417219a0fde'), photo('photo-1519225421980-715cb0215aed'), photo('photo-1464366400600-7168b8af9bc3')], tags: ['넓은 주차', '한강뷰', '대규모'], intro: '넉넉한 하객 규모와 편리한 주차가 필요한 예비부부에게 잘 맞는 대형 컨벤션이에요.', badge: '주차 만족도 1위', benefits: ['하객 주차 5시간', '버스 대절 정차 가능', '식사 사전 시식']
  },
  {
    slug: 'atelier-suwon', name: '아틀리에 수원', region: '경기', district: '수원시', type: '하우스웨딩', station: '광교중앙역 10분', address: '경기 수원시 영통구 000', capacity: '60~160명', mealPrice: '1인 65,000원~', rental: '대관 2,300,000원~', guarantee: '보증 80명', rating: 4.5, reviewCount: 86, meal: 4.6, mood: 4.8, parking: 4.2, ceremony: 4.6,
    image: photo('photo-1511285560929-80b456fea0bc'), gallery: [photo('photo-1511285560929-80b456fea0bc'), photo('photo-1519741497674-611481863552'), photo('photo-1522673607200-164d1b6ce486')], tags: ['소규모', '맞춤 연출', '프라이빗'], intro: '우리만의 예식 순서와 플라워 톤을 섬세하게 조율할 수 있는 아늑한 공간이에요.', benefits: ['1:1 플래너 동행', '메뉴 커스터마이징', '입·퇴장 리허설']
  },
  {
    slug: 'dear-marine-incheon', name: '디어 마린 인천', region: '인천', district: '연수구', type: '호텔·컨벤션', station: '센트럴파크역 4분', address: '인천 연수구 아트센터대로 000', capacity: '120~350명', mealPrice: '1인 81,000원~', rental: '대관 4,100,000원~', guarantee: '보증 200명', rating: 4.6, reviewCount: 154, meal: 4.8, mood: 4.7, parking: 4.6, ceremony: 4.6,
    image: photo('photo-1519741497674-611481863552'), gallery: [photo('photo-1519741497674-611481863552'), photo('photo-1519167758481-83f550bb49b3'), photo('photo-1478146896981-b80fe463b330')], tags: ['호텔 예식', '뷰', '연회 전문'], intro: '도시 전망과 탄탄한 연회 운영 경험을 갖춘 호텔형 웨딩 베뉴예요.', benefits: ['신혼 객실 제안', '연회 전담 매니저', '가족 식사 공간']
  }
];

export const featuredReviews = [
  { name: '예식 3개월 전 · 서울', hall: '메종 드 루미에르', score: 5, text: '상담 때 들었던 내용과 실제 진행이 거의 같았어요. 특히 식사 반응이 정말 좋아서 하객분들께 여러 번 칭찬받았습니다.', tags: ['식사 만족', '친절한 진행'] },
  { name: '예식 완료 · 경기', hall: '리버 아틀리에 하남', score: 5, text: '부모님 하객이 많아 주차를 가장 걱정했는데 동선이 편했고, 예식장 내부도 생각보다 더 깔끔했어요.', tags: ['주차 편리', '넓은 홀'] },
  { name: '예식 5개월 전 · 서울', hall: '더 오랑주리 서울', score: 4, text: '채광과 플라워 연출이 예뻐서 사진이 기대돼요. 소규모 예식 분위기를 원하는 분께 추천해요.', tags: ['분위기', '포토존'] }
];

export function findHall(slug: string) { return halls.find((hall) => hall.slug === slug); }
