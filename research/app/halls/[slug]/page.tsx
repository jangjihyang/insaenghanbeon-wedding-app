import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findHall, getPublicReviewResearch } from '@/lib/data';
import { FavoriteButton, ReviewComposer, LiveReviews } from '@/components/client-widgets';
import { Icon } from '@/components/icons';
import { VenueGallery } from '@/components/venue-gallery';
import { FacilityInfo } from '@/components/facility-info';
import { PublicReviewInsight } from '@/components/public-review-insight';

export function generateStaticParams() {
  return ['yeonhap-weddinghall','navy-hotel-wedding','l65-hotel-wedding','it-convention','ds-convention-wedding','grand-ostium','arena-park-wedding','darmiang'].map((slug) => ({ slug }));
}

export default async function HallDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const h = findHall(slug);
  if (!h) notFound();

  const scores: [string, number | null][] = [['식사', h.meal], ['분위기', h.mood], ['주차', h.parking], ['진행', h.ceremony]];
  const publicResearch = getPublicReviewResearch(h.slug);

  return (
    <>
      <VenueGallery hall={h} />

      <div className="detail-wrap">
        <section className="detail-summary">
          <div className="venue-kicker"><span>{h.region} · {h.district}</span><span>{h.type}</span></div>
          <h1>{h.name}</h1>
          <p className="detail-station"><Icon name="pin" /> {h.station} · {h.address}</p>
          <div className="detail-score">
            <strong>{h.rating !== null ? `★ ${h.rating}` : '실제 후기 수집 중'}</strong><span>{h.reviewCount ? `실제 후기 ${h.reviewCount}개` : '공식 정보 기반 등록'}</span><i /><a className="official-source-link" href={h.officialUrl} target="_blank" rel="noreferrer">공식 홈페이지 <Icon name="arrow" /></a>
          </div>
          <div className="detail-actions">
            <FavoriteButton slug={h.slug} />
            <Link href={`/inquiries/new?hall=${h.slug}`} className="inquiry-cta">견적 문의하기 <Icon name="arrow" /></Link>
          </div>
        </section>

        <div className="detail-content">
          <div className="detail-main-col">
            <section className="content-section">
              <h2>{h.name}, 이런 점이 좋아요</h2>
              <p className="intro-text">{h.intro}</p>
              <div className="benefit-list">{h.benefits.map((x) => <div key={x}><span>✓</span>{x}</div>)}</div>
            </section>

            <section className="content-section">
              <h2>예식 정보</h2>
              <div className="info-grid">
                <div><span>예식 인원</span><b>{h.capacity}</b></div>
                <div><span>식사</span><b>{h.mealPrice}</b></div>
                <div><span>대관료</span><b>{h.rental}</b></div>
                <div><span>최소 보증</span><b>{h.guarantee}</b></div>
              </div>
              <p className="info-note">* 비용은 예식 일자, 시간대, 메뉴에 따라 달라질 수 있어요. 상담 시 정확한 견적을 확인하세요.</p>
            </section>

            <FacilityInfo hall={h} />

            <PublicReviewInsight research={publicResearch} />

            <section className="content-section review-section">
              <div className="review-heading">
                <div><span className="eyebrow">REAL REVIEW</span><h2>예비부부가 남긴 후기</h2></div>
                <Link href="/reviews">전체 보기 <Icon name="chevron" /></Link>
              </div>
              <div className="score-board">
                <div className="big-score"><b>{h.rating !== null ? h.rating : '—'}</b><span>{h.rating !== null ? '★★★★★' : '후기 수집 중'}</span><small>{h.reviewCount ? `후기 ${h.reviewCount}개 기준` : '새로운 실제 후기를 기다리고 있어요'}</small></div>
                <div className="score-bars">
                  {scores.map(([label, value]) => (
                    <div key={label}><span>{label}</span><div className="bar"><i style={{ width: `${(value ?? 0) * 20}%` }} /></div><b>{value !== null ? value.toFixed(1) : '—'}</b></div>
                  ))}
                </div>
              </div>
              <LiveReviews slug={h.slug} />
              <ReviewComposer slug={h.slug} hallName={h.name} />
            </section>
          </div>

          <aside className="detail-aside">
            <div className="aside-card"><span>상담 전 체크</span><b>내 예식 조건을<br />먼저 정리해보세요.</b><p>희망 일자와 인원, 중요 조건을 남기면 비교가 더 쉬워져요.</p><Link href={`/inquiries/new?hall=${h.slug}`}>상담 조건 남기기 <Icon name="arrow" /></Link></div>
            <div className="aside-card white"><span>기본 정보</span><p><Icon name="pin" /> {h.address}</p><p><Icon name="clock" /> 상담 가능 시간 확인</p></div>
          </aside>
        </div>
      </div>
    </>
  );
}
