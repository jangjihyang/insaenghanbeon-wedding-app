import { CompareBoard } from '@/components/compare-board';
export default function Compare() {
  return <div className="page-wrap compare-page">
    <div className="page-intro"><span className="eyebrow">SMART COMPARE</span><h1>한눈에 비교해보세요</h1><p>마음에 드는 웨딩홀을 3곳까지 모아 조건을 나란히 살펴볼 수 있어요.</p></div>
    <CompareBoard />
  </div>;
}
