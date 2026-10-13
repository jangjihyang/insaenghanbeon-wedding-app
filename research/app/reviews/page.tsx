import {LiveReviews} from '@/components/client-widgets';
import {featuredReviews, halls, publicReviewResearch} from '@/lib/data';
import {Icon} from '@/components/icons';

export default function Reviews(){
  return <div className="page-wrap reviews-page">
    <div className="page-intro"><span className="eyebrow">HONEST REVIEWS</span><h1>결혼을 먼저 경험한<br/>사람들의 이야기</h1><p>이용자가 직접 남긴 후기와 공개 웹에서 확인한 정보를 구분해 보여드려요.</p></div>
    <div className="review-insight"><div><span>공개 웹 리서치 기준</span><h2>출처 · 확인일 · 신뢰도</h2><p>광고성 콘텐츠와 방문자 경험을 구분하고, 사진은 원문으로만 연결합니다.</p></div><div className="insight-icon">✦</div></div>
    <section className="public-research-feed"><div className="public-research-title"><div><span className="eyebrow">VERIFIED PUBLIC SOURCES</span><h2>웨딩홀별 공개 후기 요약</h2></div><p>2026.10.12 확인 · 로그인 없이 확인 가능한 공개 페이지 기준</p></div>
      <div className="research-grid">{halls.map(h=>{const r=publicReviewResearch[h.slug]; if(!r)return null; return <article key={h.slug} className="research-card"><div className="research-card-top"><div><span>{h.region} · {h.district}</span><h3>{h.name}</h3></div><b className={`confidence-badge confidence-${r.confidence.replaceAll(' ','-')}`}>{r.confidence}</b></div><p>{r.summary}</p><small>주의: {r.caution}</small><div className="research-links">{r.sources.slice(0,2).map(source=><a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label} <Icon name="arrow" size={12}/></a>)}</div></article>})}</div>
      <p className="research-disclaimer">후기는 작성자 개인 경험이며, 시설의 상시 품질이나 계약 조건을 보증하지 않습니다. 블로그·SNS·리뷰 플랫폼의 사진과 영상은 재게시하지 않았습니다.</p>
    </section>
    <section className="review-feed"><h2>회원이 직접 남긴 후기</h2><LiveReviews/>{featuredReviews.map((r)=><article className="review-row demo" key={r.name}><div className="review-row-top"><div><b>{r.name}</b><span>{r.hall}</span></div></div><p>{r.text}</p><div className="review-stats">{r.tags.map(t=><span key={t}>{t}</span>)}</div></article>)}</section>
  </div>
}
