'use client';
import {useMemo, useState} from 'react';
import {allVenueCandidates, venueInventorySummary} from '@/lib/venue-inventory';
import {Icon} from '@/components/icons';

const regions=['전체','서울','경기','인천'] as const;
const statuses=['전체','공식 확인','플랫폼 확인','추가 확인 필요'] as const;

export function VenueInventoryExplorer(){
  const [region,setRegion]=useState<(typeof regions)[number]>('전체');
  const [status,setStatus]=useState<(typeof statuses)[number]>('전체');
  const [query,setQuery]=useState('');
  const filtered=useMemo(()=>allVenueCandidates.filter(v=>
    (region==='전체'||v.region===region) &&
    (status==='전체'||v.status===status) &&
    `${v.name} ${v.region} ${v.district} ${v.type} ${v.address}`.toLowerCase().includes(query.toLowerCase())
  ),[region,status,query]);
  return <section className="inventory-section">
    <div className="inventory-heading"><div><span className="eyebrow">LARGE-SCALE VENUE INDEX</span><h2>서울·경기·인천 웨딩 장소 후보</h2><p>공개 웹에서 확인한 {venueInventorySummary.total}곳을 출처 상태와 함께 정리했습니다.</p></div><div className="inventory-counts"><b>공식 {venueInventorySummary.official}</b><b>플랫폼 {venueInventorySummary.platform}</b><b>추가 확인 {venueInventorySummary.needsReview}</b></div></div>
    <div className="inventory-notice"><Icon name="check" size={15}/><p><b>목록 읽는 법</b> · ‘공식 확인’은 공식 웨딩·예약 안내 페이지를 확인했다는 뜻입니다. ‘플랫폼 확인’과 ‘추가 확인 필요’는 현재 운영·예약 가능 여부를 반드시 해당 장소에 다시 확인해야 합니다.</p></div>
    <div className="inventory-toolbar"><div className="inventory-search"><Icon name="search" size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="장소명, 지역, 구·시 검색"/>{query&&<button onClick={()=>setQuery('')} aria-label="검색어 지우기"><Icon name="close" size={15}/></button>}</div><div className="inventory-filter-row"><div>{regions.map(item=><button key={item} className={region===item?'active':''} onClick={()=>setRegion(item)}>{item}</button>)}</div><div>{statuses.map(item=><button key={item} className={status===item?'active':''} onClick={()=>setStatus(item)}>{item}</button>)}</div></div></div>
    <div className="inventory-result-head"><b>{filtered.length}개</b><span>확인일 2026.10.12 · 사진·가격·별점 미포함</span></div>
    <div className="inventory-grid">{filtered.map(v=><article className="inventory-card" key={v.id}><div className="inventory-card-top"><span>{v.region} · {v.district}</span><em className={`status-${v.status.replaceAll(' ','-')}`}>{v.status}</em></div><h3>{v.name}</h3><p className="inventory-type">{v.type}</p><p className="inventory-address"><Icon name="pin" size={13}/>{v.address==='미확인'?'주소 공개 확인 전':v.address}</p><p className="inventory-note">{v.note}</p><a href={v.url} target="_blank" rel="noreferrer">{v.urlType} 보기 <Icon name="arrow" size={13}/></a></article>)}</div>
    {!filtered.length&&<div className="inventory-empty"><Icon name="search" size={28}/><b>조건과 맞는 장소를 찾지 못했어요.</b><span>지역이나 확인 상태를 넓혀서 다시 검색해 보세요.</span></div>}
    <p className="inventory-disclaimer">외부 링크는 정보 출처 확인용입니다. 블로그·플랫폼·SNS 사진을 내려받거나 재게시하지 않았으며, 각 장소의 영업·예약·계약 조건은 공식 상담으로 최종 확인해야 합니다.</p>
  </section>
}
