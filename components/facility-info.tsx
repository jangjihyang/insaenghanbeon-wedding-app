import { Hall } from '@/lib/data';

export function FacilityInfo({ hall }: { hall: Hall }) {
  const facilities = [
    { symbol: 'P', title: '주차', value: hall.parking >= 4.7 ? '넉넉한 주차 가능' : '하객 주차 지원', detail: hall.parking >= 4.7 ? '승용차·버스 동선 안내' : '예식 당일 주차 시간 확인' },
    { symbol: 'B', title: '신부대기실', value: '전용 공간 1실', detail: '예식홀과 가까운 독립 동선' },
    { symbol: 'F', title: '연회 시설', value: '피로연 동시 진행', detail: `${hall.capacity} 수용 규모` },
    { symbol: 'A', title: '접근성', value: hall.station, detail: '대중교통 및 하객 이동 편의' },
    { symbol: 'C', title: '편의 시설', value: '가족 휴게 공간', detail: '수유실·화장실 위치 확인 가능' },
    { symbol: 'S', title: '상담·시식', value: '사전 예약 운영', detail: '상담 가능 시간은 웨딩홀에 문의' }
  ];

  return <section className="content-section facility-section">
    <div className="facility-title"><div><span className="eyebrow">VENUE FACILITIES</span><h2>시설 및 편의 정보</h2></div><p>방문 전 꼭 필요한 시설을 미리 확인하세요.</p></div>
    <div className="facility-grid">{facilities.map((facility) => <article key={facility.title}><span className="facility-symbol">{facility.symbol}</span><div><small>{facility.title}</small><b>{facility.value}</b><p>{facility.detail}</p></div></article>)}</div>
    <div className="facility-notice"><span>i</span><p>시설 운영 및 제공 범위는 시즌·예식 일정에 따라 바뀔 수 있어요. 방문 상담 전 웨딩홀에 다시 확인해주세요.</p></div>
  </section>;
}
