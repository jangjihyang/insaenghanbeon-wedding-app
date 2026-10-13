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

export type PublicReviewSource = {
  label: string;
  url: string;
  kind: '방문자 블로그' | '리뷰 플랫폼' | '공식 SNS' | '촬영자 포트폴리오';
};

export type PublicReviewResearch = {
  summary: string;
  caution: string;
  confidence: '낮음' | '중간 이하' | '중간' | '중상';
  checkedAt: string;
  sources: PublicReviewSource[];
};

/*
  공개 웹 후기 리서치(2026-10-12): 로그인 없이 확인 가능한 페이지의 내용을
  중립적으로 재서술했습니다. 별점·가격·수용인원은 출처별 차이 또는 변동 가능성 때문에
  넣지 않았고, 원문 사진은 저작권·초상권 확인 전 재게시하지 않습니다.
*/
export const publicReviewResearch: Record<string, PublicReviewResearch> = {
  'yeonhap-weddinghall': {
    summary: '공개 방문 후기는 교회 예식에 가까운 차분한 형식과 하객 좌석 배치를 특징으로 언급합니다. 예식 공간과 연회장이 층을 달리해 이동이 있다는 점도 확인할 만합니다.',
    caution: '블로그 두 건은 동일 작성자이며 후기 표본이 적습니다. 교회식·찬송가 요소는 개인 취향에 따라 다르게 느껴질 수 있습니다.', confidence: '중간 이하', checkedAt: '2026-10-12',
    sources: [
      {label:'방문 하객 블로그',kind:'방문자 블로그',url:'https://m.blog.naver.com/paranglife/224220500737'},
      {label:'제3자 관찰 블로그',kind:'방문자 블로그',url:'https://m.blog.naver.com/paranglife/224193616130'},
    ],
  },
  'navy-hotel-wedding': {
    summary: '하객 후기는 세인트홀의 화이트톤 공간과 생음악·조명 연출을 인상으로 언급합니다. 셔틀·주차와 연회장 이용 여건은 방문 시점에 따라 달라질 수 있습니다.',
    caution: '교통·주차·식사 시간에 관한 구체적 경험은 한 방문자 후기 중심이므로 상시 조건처럼 보기는 어렵습니다.', confidence: '중간', checkedAt: '2026-10-12',
    sources: [
      {label:'하객 방문 후기',kind:'방문자 블로그',url:'https://m.blog.naver.com/yes_shoong/224119110872'},
      {label:'본식 당사자 후기',kind:'방문자 블로그',url:'https://m.blog.naver.com/taein0208/224160397900'},
      {label:'본식 스냅 게시물',kind:'촬영자 포트폴리오',url:'https://www.instagram.com/p/DScADxtD0uM'},
    ],
  },
  'l65-hotel-wedding': {
    summary: '공개 하객 후기는 가든홀의 자연광·정원 분위기와 컨벤션홀의 샹들리에 연출을 각각 언급합니다. 홀과 연회장이 같은 층이라는 편의 의견도 있으나 혼잡 가능성은 시간대별 확인이 필요합니다.',
    caution: '주차 시간과 혼잡은 일부 방문 경험이므로 모든 예식 시간에 동일하다고 단정하지 않습니다.', confidence: '중간', checkedAt: '2026-10-12',
    sources: [
      {label:'가든홀 하객 후기',kind:'방문자 블로그',url:'https://lifensook.tistory.com/502'},
      {label:'가든홀 하객 후기',kind:'방문자 블로그',url:'https://blog.naver.com/PostView.naver?blogId=olzrolzrv&logNo=224335567010&redirect=Dlog'},
    ],
  },
  'it-convention': {
    summary: '한 공개 하객 후기는 우드·베이지 로비와 밝은 대기실, 어두운 홀의 대비를 인상으로 묘사합니다. 해당 방문자는 주차·동선·식사에 만족했다고 했으나 후기 수가 제한적입니다.',
    caution: '공식 계정 게시물은 홍보 콘텐츠로 구분합니다. 주차와 음식 평가는 개인 경험을 일반화하지 않습니다.', confidence: '중간', checkedAt: '2026-10-12',
    sources: [
      {label:'아모르홀 가족 하객 후기',kind:'방문자 블로그',url:'https://m.blog.naver.com/pretty6144/224317004326'},
      {label:'그레이스홀 본식 촬영 후기',kind:'촬영자 포트폴리오',url:'https://blog.naver.com/mj0832/224113245268'},
      {label:'공식 계정 공간 게시물',kind:'공식 SNS',url:'https://www.instagram.com/p/DWGjBBsE8MU'},
    ],
  },
  'ds-convention-wedding': {
    summary: '공개 검색에서 하객 후기 링크는 확인되지만, 본문 세부 내용을 충분히 검토할 수 없어 게시할 방문자 후기 정보가 아직 부족합니다. 공개 스냅에서는 어두운 홀과 입장 조명 연출을 참고할 수 있습니다.',
    caution: '스냅과 공식 게시물은 이용자 경험 리뷰가 아닙니다. 장점·불편사항을 다수 의견처럼 표시하지 않습니다.', confidence: '낮음', checkedAt: '2026-10-12',
    sources: [
      {label:'하객 후기 (본문 검토 제한)',kind:'방문자 블로그',url:'https://blog.naver.com/PostView.naver?blogId=jscom88080&logNo=224174694204'},
      {label:'본식 스냅 포트폴리오',kind:'촬영자 포트폴리오',url:'https://bitsaegim.kr/304'},
    ],
  },
  'grand-ostium': {
    summary: '공개 투어·방문 후기에서는 CMCC홀의 높은 층고와 클래식한 분위기, 주차 편의가 언급됩니다. 주차 후 이동 거리와 대기공간·동선은 홀과 이용 시점에 따라 달라 직접 확인이 필요하다는 의견도 있습니다.',
    caution: '투어·계약 의사가 있는 리뷰와 실제 하객 후기는 구분해서 읽어야 하며, 동선 의견은 일부 방문자의 경험입니다.', confidence: '중상', checkedAt: '2026-10-12',
    sources: [
      {label:'공개 투어 후기·리뷰',kind:'리뷰 플랫폼',url:'https://www.weddingbook.com/weddinghall/96d3bb9d-2d60-11e6-93b9-0abe8d4f74d3?tabId=4'},
      {label:'하객 방문 후기',kind:'방문자 블로그',url:'https://andongbooja3.tistory.com/entry/%EA%B7%B8%EB%9E%9C%EB%93%9C-%EC%98%A4%EC%8A%A4%ED%8B%B0%EC%97%84-%EC%9B%A8%EB%94%A9%ED%99%80-%ED%9B%84%EA%B8%B0-%EC%9D%B8%EC%B2%9C%EB%AC%B8%ED%95%99%EA%B2%BD%EA%B8%B0%EC%9E%A5-%EC%A3%BC%EC%B0%A8-%ED%8E%B8%ED%95%9C-%ED%95%98%EA%B0%9D-%EC%8B%9D%EC%82%AC-%ED%9B%84%EA%B8%B0'},
      {label:'블리스홀 본식 후기',kind:'방문자 블로그',url:'https://blog.naver.com/sakurai00125/224216086049'},
    ],
  },
  'arena-park-wedding': {
    summary: '공개 방문 의견에서는 홀의 꽃 장식과 행진에 맞춘 조명 연출이 인상으로 언급됩니다. 주차와 뷔페 평가는 후기별 경험이 달라 별도 확인이 필요합니다.',
    caution: '반복적으로 검증된 단점은 자료 부족으로 표시하지 않습니다. 사업자 SNS 메뉴 소개는 이용자 만족도 근거가 아닙니다.', confidence: '중간 이하', checkedAt: '2026-10-12',
    sources: [
      {label:'네이버 방문 후기 (상세 확인 제한)',kind:'방문자 블로그',url:'https://blog.naver.com/jam_d/224240207969'},
      {label:'아이웨딩 공개 후기',kind:'리뷰 플랫폼',url:'https://www.iwedding.co.kr/enterprise/info/1355131054'},
      {label:'공식 메뉴 게시물',kind:'공식 SNS',url:'https://www.instagram.com/p/Dcan7-kE9T5'},
    ],
  },
  'darmiang': {
    summary: '공개 하객 후기는 통창의 자연광과 송도 전망, 그리너리한 공간 분위기를 장점으로 언급합니다. 햇빛이 강한 자리와 홀·식사 공간 사이 이동은 방문 시 확인할 요소로 나타납니다.',
    caution: '햇빛과 이동에 관한 내용은 개별 경험이며, 빈도나 보편적 문제로 단정하지 않습니다.', confidence: '중상', checkedAt: '2026-10-12',
    sources: [
      {label:'하객 후기',kind:'방문자 블로그',url:'https://blog.naver.com/saltnbright/224281368324'},
      {label:'하객 방문 후기',kind:'방문자 블로그',url:'https://m.blog.naver.com/choimy84/224077222517'},
      {label:'촬영자의 공개 경험담',kind:'촬영자 포트폴리오',url:'https://www.threads.com/@doavely/post/Ddy6wFUn15E/%EB%82%98-%EB%B3%B8%EC%8B%9D%EC%8A%A4%EB%83%85-%EC%9E%91%EA%B0%80%EC%9D%B8%EB%8D%B0-%EC%86%A1%EB%8F%84-%EB%8B%A4%EB%A5%B4%EB%AF%B8%EC%95%99-%EC%B4%AC%EC%98%81-%EA%B0%94%EB%8B%A4%EA%B0%80-%EC%8B%A0%EB%B6%80%EB%8B%98%EC%9D%B4-%EA%BC%AD-%EC%8B%9D%EC%82%AC%ED%95%98%EA%B3%A0-%EA%B0%80%EB%9D%BC%EA%B3%A0-%ED%95%98%EC%85%94%EC%84%9C-%EB%B0%A5-%EB%A8%B9%EC%9D%80%EC%A0%81-%EC%9E%88%EB%8A%94%EB%8D%B0-%EB%B0%A5-%EB%84%88%EB%AC%B4-%EB%A7%9B%EC%9E%88%EC%96%B4-%EB%98%90-%EB%A8%B9%EA%B7%9C-%EC%8B%AD%EB%8B%88%EB%8B%A4'},
    ],
  },
};

export function getPublicReviewResearch(slug: string) {
  return publicReviewResearch[slug];
}
