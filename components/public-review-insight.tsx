import type { PublicReviewResearch } from '@/lib/data';

export function PublicReviewInsight({research}:{research:PublicReviewResearch | undefined}) {
  if (!research) return null;
  return <section className="content-section public-review-section">
    <div className="public-review-heading">
      <div><span className="eyebrow">PUBLIC WEB RESEARCH</span><h2>공개 후기에서 살펴본 포인트</h2></div>
      <span className={`confidence-badge confidence-${research.confidence.replaceAll(' ', '-')}`}>신뢰도 {research.confidence}</span>
    </div>
    <p className="public-review-summary">{research.summary}</p>
    <div className="public-review-caution"><b>확인할 점</b><p>{research.caution}</p></div>
    <div className="public-review-sources">
      <div className="public-review-meta"><b>공개 출처</b><span>확인일 {research.checkedAt}</span></div>
      <ul>{research.sources.map((source)=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label} <span>{source.kind}</span><i>↗</i></a></li>)}</ul>
    </div>
    <p className="public-review-disclaimer">개별 공개 게시물의 취지를 중립적으로 요약했습니다. 원문 사진·영상은 저작권 및 초상권 확인 전 사이트에 저장하거나 재게시하지 않습니다.</p>
  </section>;
}
