import { Hall } from '@/lib/data';

export function FacilityInfo({ hall }: { hall: Hall }) {
  const facilities = [
    { symbol:'P', title:'주차', value:'공식 상담 시 확인', detail:'주차 가능 여부·시간·버스 동선은 웨딩홀에 확인' },
    { symbol:'B', title:'신부대기실', value:'공식 상담 시 확인', detail:'전용 공간과 예식홀 동선은 방문 상담 권장' },
    { symbol:'F', title:'연회 시설', value:'공식 상담 시 확인', detail:'연회 구성과 동시 진행 여부는 일정별 확인' },
    { symbol:'A', title:'접근성', value:hall.station, detail:'공식 위치 안내 기준' },
    { symbol:'C', title:'편의 시설', value:'공식 상담 시 확인', detail:'가족 휴게 공간 등 이용 가능 시설 확인' },
    { symbol:'S', title:'상담·시식', value:'사전 예약 문의', detail:'상담 가능 시간과 시식 운영은 공식 문의' }
  ];
  return <section className="content-section facility-section">
    <div className="facility-title"><div><span className="eyebrow">VENUE FACILITIES</span><h2>시설 및 편의 정보</h2></div><p>공식 안내와 상담으로 확인이 필요한 정보입니다.</p></div>
    <div className="facility-grid">{facilities.map((facility)=><article key={facility.title}><span className="facility-symbol">{facility.symbol}</span><div><small>{facility.title}</small><b>{facility.value}</b><p>{facility.detail}</p></div></article>)}</div>
    <div className="facility-notice"><span>i</span><p>시설 운영, 가격, 수용 인원, 주차 및 제공 범위는 날짜와 계약 조건에 따라 달라질 수 있어요. 예식장 방문·계약 전에 반드시 공식 상담으로 다시 확인해주세요.</p></div>
  </section>;
}
