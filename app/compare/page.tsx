import { CompareBoard } from '@/components/compare-board';
export default function Compare() {
  return <div className="page-wrap compare-page">
    <div className="page-intro"><span className="eyebrow">SMART COMPARE</span><h1>조건과 공유 비용을 비교해보세요</h1><p>웨딩홀 기본 조건과 이용자가 공유한 비용 데이터를 함께 확인할 수 있어요.</p></div>
    <CompareBoard />
  </div>;
}
