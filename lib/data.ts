export type Hall = {
  slug: string;
  name: string;
  region: '서울' | '경기' | '인천';
  district: string;
  type: string;
  station: string;
  address: string;
  capacity: string;
  mealPrice: string;
  rental: string;
  guarantee: string;
  rating: number | null;
  reviewCount: number;
  meal: number | null;
  mood: number | null;
  parking: number | null;
  ceremony: number | null;
  image: string | null;
  gallery: string[];
  galleryUrl: string;
  officialUrl: string;
  photoUsageNote: string;
  tags: string[];
  intro: string;
  badge?: string;
  benefits: string[];
};

/*
  실제 웨딩홀 데이터: 주소·교통·공식 링크는 각 공식 사이트 기준으로 확인했습니다.
  가격·수용 인원·평점은 계약 조건과 사용자 후기로 변동되므로 임의 수치를 넣지 않았습니다.
  image는 공식 도메인/공식 CDN에서 확인된 대표 이미지 경로만 사용했습니다.
  상업적 이미지 사용과 핫링크는 각 웨딩홀 권리자에게 별도 허가가 필요합니다.
*/
export const halls: Hall[] = [
  {
    slug:'yeonhap-weddinghall', name:'연합웨딩홀', region:'서울', district:'종로구', type:'웨딩홀', station:'1호선 종로5가역 2번 출구 · 도보 5분', address:'서울특별시 종로구 김상옥로 30, 한국기독교연합회관 3층', capacity:'공식 상담 시 확인', mealPrice:'공식 상담 시 확인', rental:'공식 상담 시 확인', guarantee:'공식 상담 시 확인', rating:null, reviewCount:0, meal:null, mood:null, parking:null, ceremony:null,
    image:'https://www.yhwedding.co.kr/attachList/upload/hall/c20201002175533993/p20201002181020067/add20210907201820900.jpg', gallery:['https://www.yhwedding.co.kr/attachList/upload/hall/c20201002175533993/p20201002181020067/add20210907201820900.jpg'], galleryUrl:'https://www.yhwedding.co.kr/whatsNew/gallery', officialUrl:'https://www.yhwedding.co.kr/', photoUsageNote:'공식 홈페이지 대표 이미지 경로 확인 · 상업적 사용 허가 별도 확인 필요', tags:['종로', '역세권', '공식 갤러리'], intro:'종로5가역 인근의 연합웨딩홀입니다. 세부 예식 조건과 비용은 공식 상담을 통해 확인할 수 있어요.', badge:'공식 정보 확인', benefits:['공식 위치 안내 제공', '종로5가역 도보 5분 안내', '공식 갤러리 연결']
  },
  {
    slug:'navy-hotel-wedding', name:'해군호텔W웨딩홀', region:'서울', district:'영등포구', type:'호텔 웨딩', station:'대방역·보라매역 셔틀 안내', address:'서울특별시 영등포구 가마산로 538', capacity:'공식 상담 시 확인', mealPrice:'공식 상담 시 확인', rental:'공식 상담 시 확인', guarantee:'공식 상담 시 확인', rating:null, reviewCount:0, meal:null, mood:null, parking:null, ceremony:null,
    image:'https://cdn.imweb.me/upload/S202206302a0f8304214ef/dab7eab7b9621.png', gallery:['https://cdn.imweb.me/upload/S202206302a0f8304214ef/dab7eab7b9621.png'], galleryUrl:'http://navywedding.co.kr/', officialUrl:'http://navywedding.co.kr/', photoUsageNote:'공식 홈페이지에서 사용된 공식 CDN 이미지 경로 확인 · 상업적 사용 허가 별도 확인 필요', tags:['영등포', '호텔 웨딩', '셔틀 안내'], intro:'해군호텔W웨딩홀은 영등포구 가마산로에 위치한 웨딩 공간입니다. 대방역과 보라매역 방면 예식 고객 셔틀 안내는 공식 홈페이지에서 확인할 수 있어요.', benefits:['공식 셔틀 안내 확인', '공식 웨딩 안내 연결', '상담으로 세부 조건 확인']
  },
  {
    slug:'l65-hotel-wedding', name:'L65호텔웨딩컨벤션', region:'서울', district:'동대문구', type:'호텔·컨벤션', station:'1호선 청량리역 5번 출구 바로 앞', address:'서울특별시 동대문구 왕산로 200, 청량리역 롯데캐슬스카이 L65 타워동 6층', capacity:'공식 상담 시 확인', mealPrice:'공식 상담 시 확인', rental:'공식 상담 시 확인', guarantee:'공식 상담 시 확인', rating:null, reviewCount:0, meal:null, mood:null, parking:null, ceremony:null,
    image:'https://www.L65hotelwedding.co.kr/attachList/upload/hall/c20240610195348533/p20240610195847947/pop20240611143502353.jpg', gallery:['https://www.L65hotelwedding.co.kr/attachList/upload/hall/c20240610195348533/p20240610195847947/pop20240611143502353.jpg'], galleryUrl:'https://www.l65hotelwedding.co.kr/wedding/garden/', officialUrl:'https://www.l65hotelwedding.co.kr/', photoUsageNote:'공식 홈페이지 홀 소개 이미지 경로 확인 · 상업적 사용 허가 별도 확인 필요', tags:['청량리', '역세권', '가든홀'], intro:'청량리역 바로 앞 L65 타워동에 위치한 호텔 웨딩 컨벤션입니다. 가든홀과 컨벤션홀 정보는 공식 페이지에서 확인할 수 있어요.', benefits:['청량리역 접근 안내', '공식 홀 소개 연결', '상담으로 예식 조건 확인']
  },
  {
    slug:'it-convention', name:'아이티컨벤션', region:'경기', district:'용인시 기흥구', type:'컨벤션', station:'수원 삼성전자삼거리 인근', address:'경기도 용인시 기흥구 흥덕1로 13, 흥덕IT밸리 A동 2층', capacity:'공식 상담 시 확인', mealPrice:'공식 상담 시 확인', rental:'공식 상담 시 확인', guarantee:'공식 상담 시 확인', rating:null, reviewCount:0, meal:null, mood:null, parking:null, ceremony:null,
    image:null, gallery:[], galleryUrl:'https://www.itconvention.co.kr/whatsNew/gallery/', officialUrl:'https://www.itconvention.co.kr/', photoUsageNote:'공식 갤러리 페이지 연결 · 직접 임베드 가능한 이미지 경로와 사용 허가 확인 필요', tags:['용인', '컨벤션', '공식 갤러리'], intro:'용인 흥덕IT밸리에 위치한 아이티컨벤션입니다. 정확한 홀 구성과 예식 조건은 공식 갤러리 및 상담을 통해 확인하세요.', benefits:['공식 위치 안내 제공', '공식 갤러리 연결', '상담으로 예식 조건 확인']
  },
  {
    slug:'ds-convention-wedding', name:'디에스컨벤션웨딩', region:'경기', district:'수원시 팔달구', type:'웨딩홀', station:'1호선 화서역 5·6번 출구 · 도보 5분', address:'경기도 수원시 팔달구 수성로 92, 농민회관 2층', capacity:'공식 상담 시 확인', mealPrice:'공식 상담 시 확인', rental:'공식 상담 시 확인', guarantee:'공식 상담 시 확인', rating:null, reviewCount:0, meal:null, mood:null, parking:null, ceremony:null,
    image:null, gallery:[], galleryUrl:'http://www.dsconvention.co.kr/whatsNew/gallery/', officialUrl:'http://www.dsconvention.co.kr/', photoUsageNote:'공식 갤러리 페이지 연결 · HTTPS 직접 이미지 경로와 사용 허가 확인 필요', tags:['수원', '화서역', '공식 갤러리'], intro:'화서역 인근 농민회관에 위치한 디에스컨벤션웨딩입니다. 공식 홈페이지에서 홀과 위치 정보를 확인할 수 있어요.', benefits:['화서역 도보 5분 공식 안내', '공식 갤러리 연결', '상담으로 예식 조건 확인']
  },
  {
    slug:'grand-ostium', name:'그랜드오스티엄', region:'인천', district:'미추홀구', type:'컨벤션', station:'인천 1호선 문학경기장역 2번 출구 · 도보 5분', address:'인천광역시 미추홀구 매소홀로 618, 인천문학경기장', capacity:'공식 상담 시 확인', mealPrice:'공식 상담 시 확인', rental:'공식 상담 시 확인', guarantee:'공식 상담 시 확인', rating:null, reviewCount:0, meal:null, mood:null, parking:null, ceremony:null,
    image:null, gallery:[], galleryUrl:'https://www.grandostium.co.kr/home/sub/official_wedding', officialUrl:'https://www.grandostium.co.kr/', photoUsageNote:'공식 홀 소개 페이지 연결 · 직접 임베드 가능한 이미지 경로와 사용 허가 확인 필요', tags:['인천', '문학경기장', '홀 투어'], intro:'인천문학경기장에 위치한 그랜드오스티엄입니다. 공식 홀 투어 페이지에서 예식 공간을 확인할 수 있어요.', badge:'공식 정보 확인', benefits:['문학경기장역 도보 5분 공식 안내', '공식 홀 투어 연결', '상담으로 예식 조건 확인']
  },
  {
    slug:'arena-park-wedding', name:'아레나파크웨딩홀', region:'인천', district:'미추홀구', type:'웨딩홀', station:'1호선 도원역 1번 출구 · 도보 5분 이내', address:'인천광역시 미추홀구 석정로 51 1층', capacity:'공식 상담 시 확인', mealPrice:'공식 상담 시 확인', rental:'공식 상담 시 확인', guarantee:'공식 상담 시 확인', rating:null, reviewCount:0, meal:null, mood:null, parking:null, ceremony:null,
    image:null, gallery:[], galleryUrl:'https://arenawed.kr/arena-hall', officialUrl:'https://arenawed.kr/', photoUsageNote:'공식 홀 소개 페이지 연결 · 직접 임베드 가능한 이미지 경로와 사용 허가 확인 필요', tags:['인천', '도원역', '공식 홀 소개'], intro:'도원역 인근에 위치한 아레나파크웨딩홀입니다. 공식 홀 소개 페이지에서 공간 정보를 확인할 수 있어요.', benefits:['도원역 접근 공식 안내', '공식 홀 소개 연결', '상담으로 예식 조건 확인']
  },
  {
    slug:'darmiang', name:'다르미앙', region:'인천', district:'연수구', type:'웨딩·연회', station:'인천 1호선 테크노파크역 4번 출구 연결 · 도보 3분 안내', address:'인천광역시 연수구 갯벌로 12, 미추홀타워 본관(A동) 21층', capacity:'공식 상담 시 확인', mealPrice:'공식 상담 시 확인', rental:'공식 상담 시 확인', guarantee:'공식 상담 시 확인', rating:null, reviewCount:0, meal:null, mood:null, parking:null, ceremony:null,
    image:'https://www.darmiang.co.kr/sh_page/img/p37_img01_1.jpg', gallery:['https://www.darmiang.co.kr/sh_page/img/p37_img01_1.jpg'], galleryUrl:'https://www.darmiang.co.kr/', officialUrl:'https://www.darmiang.co.kr/', photoUsageNote:'공식 홈페이지 Wedding 섹션 이미지 경로 확인 · 상업적 사용 허가 별도 확인 필요', tags:['송도', '테크노파크역', '웨딩·연회'], intro:'송도 미추홀타워 21층에 위치한 다르미앙입니다. 테크노파크역 연결 안내와 웨딩 공간 정보는 공식 홈페이지에서 확인할 수 있어요.', benefits:['테크노파크역 연결 공식 안내', '공식 웨딩 섹션 연결', '상담으로 예식 조건 확인']
  }
];

export const featuredReviews = [
  { name:'이용자 후기 수집 중', hall:'실제 웨딩홀 후기', score:null, text:'현재는 실제 예식장 정보와 공식 출처를 우선 반영 중입니다. 로그인 후 직접 방문·상담·예식 경험을 남겨주세요.', tags:['실제 후기 모집'] },
  { name:'정보 업데이트 안내', hall:'공식 조건 확인', score:null, text:'예식 비용, 수용 인원, 주차 조건은 날짜와 계약 조건에 따라 달라질 수 있어 공식 상담을 통해 확인해야 합니다.', tags:['공식 상담 권장'] },
  { name:'사진 권리 안내', hall:'공식 갤러리', score:null, text:'공식 홈페이지에 게시된 사진도 상업적 재사용 허가와는 별개입니다. 이미지 사용 전 각 웨딩홀의 권리 확인이 필요합니다.', tags:['사진 사용권 확인'] }
];

export function findHall(slug:string){return halls.find(hall=>hall.slug===slug);}
