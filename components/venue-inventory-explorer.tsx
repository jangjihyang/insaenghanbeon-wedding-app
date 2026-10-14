'use client';
import {useEffect,useMemo,useState} from 'react';
import Link from 'next/link';
import {allVenueCandidates, venueInventorySummary} from '@/lib/venue-inventory';
import {halls} from '@/lib/data';
import {Icon} from '@/components/icons';
import {getSupabase} from '@/lib/supabase';

const regions=['전체','서울','경기','인천'] as const;
const statuses=['전체','공식 확인','플랫폼 확인','추가 확인 필요'] as const;
const PAGE_SIZE=24;
const normalize=(x:string)=>x.toLowerCase().replace(/\s+/g,'');
const regionSummary=regions.slice(1).map(region=>{const rows=allVenueCandidates.filter(x=>x.region===region);return{region,count:rows.length,official:rows.filter(x=>x.status==='공식 확인').length,platform:rows.filter(x=>x.status==='플랫폼 확인').length,needsReview:rows.filter(x=>x.status==='추가 확인 필요').length}});
const detailedByName=new Map(halls.map(h=>[`${h.region}|${h.name}`,h.slug]));
type CostRow={venue_slug:string|null;venue_name:string;region:string;total_amount:number|null};
type CostMetric={average:number;count:number};
const won=(value:number)=>`${Math.round(value).toLocaleString('ko-KR')}원`;

export function VenueInventoryExplorer(){
 const sb=useMemo(()=>getSupabase(),[]);const[region,setRegion]=useState<(typeof regions)[number]>('전체');const[status,setStatus]=useState<(typeof statuses)[number]>('전체');const[query,setQuery]=useState('');const[advanced,setAdvanced]=useState(false);const[shownCount,setShownCount]=useState(PAGE_SIZE);const[costSort,setCostSort]=useState('기본순');const[costMetrics,setCostMetrics]=useState<Map<string,CostMetric>>(new Map());
 useEffect(()=>{let alive=true;async function load(){if(!sb)return;const{data}=await sb.from('cost_reports').select('venue_slug,venue_name,region,total_amount').eq('status','published').not('total_amount','is',null).limit(1000);if(!alive)return;const groups=new Map<string,number[]>();for(const row of (data||[]) as CostRow[]){if(!row.total_amount||row.total_amount<=0)continue;const keys=[row.venue_slug,`${row.region}|${row.venue_name}`].filter(Boolean) as string[];for(const item of keys){groups.set(item,[...(groups.get(item)||[]),row.total_amount])}}const next=new Map<string,CostMetric>();groups.forEach((values,item)=>next.set(item,{average:values.reduce((a,b)=>a+b,0)/values.length,count:values.length}));setCostMetrics(next)}load();return()=>{alive=false}},[sb]);
 const key=normalize(query);const browsingAll=region==='전체'&&!key;
 const metricFor=(v:{id:string;name:string;region:string})=>{const slug=detailedByName.get(`${v.region}|${v.name}`);return costMetrics.get(slug||'')||costMetrics.get(v.id)||costMetrics.get(`${v.region}|${v.name}`)||null};
 const filtered=useMemo(()=>{const rows=allVenueCandidates.filter(v=>(region==='전체'||v.region===region)&&(status==='전체'||v.status===status)&&(!key||normalize(`${v.name} ${v.region} ${v.district} ${v.type} ${v.address} ${v.note}`).includes(key)));if(costSort==='기본순')return rows;return [...rows].sort((a,b)=>{const aCost=metricFor(a)?.average;const bCost=metricFor(b)?.average;if(aCost===undefined||aCost===null)return 1;if(bCost===undefined||bCost===null)return -1;return costSort==='공유 비용 낮은순'?aCost-bCost:bCost-aCost})},[region,status,key,costSort,costMetrics]);
 const shown=filtered.slice(0,shownCount);
 function chooseRegion(next:(typeof regions)[number]){setRegion(next);setShownCount(PAGE_SIZE)}
 function clear(){setRegion('전체');setStatus('전체');setQuery('');setCostSort('기본순');setShownCount(PAGE_SIZE)}
 return <section className="clean-venue-finder">
   <div className="finder-hero"><span className="eyebrow">VENUE FINDER</span><h2>어떤 예식장을 찾으세요?</h2><p>예식장 이름이나 지역, 분위기 키워드로 간단히 찾아보세요.</p><div className="finder-search"><Icon name="search" size={20}/><input value={query} onChange={e=>{setQuery(e.target.value);setShownCount(PAGE_SIZE)}} placeholder="예: 그랜드, 강남, 호텔, 가든, 채플"/>{query&&<button onClick={()=>setQuery('')} aria-label="검색어 지우기"><Icon name="close"/></button>}</div>
   </div>
   <div className="finder-region-tabs">{regions.map(item=><button key={item} onClick={()=>chooseRegion(item)} className={region===item?'active':''}>{item}{item!=='전체'&&<small>{regionSummary.find(x=>x.region===item)?.count}</small>}</button>)}</div>
   {browsingAll?<div className="region-overview"><div className="region-overview-title"><div><span className="eyebrow">START WITH A REGION</span><h3>지역을 먼저 선택하면 더 쉽게 찾을 수 있어요.</h3></div><span>등록 후보 {venueInventorySummary.total}곳</span></div><div className="region-overview-grid">{regionSummary.map(item=><button key={item.region} onClick={()=>chooseRegion(item.region as (typeof regions)[number])}><span>{item.region}</span><b>{item.count}곳</b><small>공식 확인 {item.official} · 플랫폼 확인 {item.platform} · 추가 확인 {item.needsReview}</small><Icon name="arrow"/></button>)}</div></div>:<>
     <div className="finder-result-toolbar"><div><b>{filtered.length}곳</b><span>{key?`“${query}” 검색 결과`:`${region} 지역 예식장`}</span></div><div className="finder-toolbar-actions"><select value={costSort} onChange={e=>{setCostSort(e.target.value);setShownCount(PAGE_SIZE)}} aria-label="비용 정렬"><option>기본순</option><option>공유 비용 낮은순</option><option>공유 비용 높은순</option></select><button className={advanced?'selected':''} onClick={()=>setAdvanced(!advanced)}>출처 필터 {advanced?'닫기':'보기'}</button><button onClick={clear}>초기화</button></div></div>
     {advanced&&<div className="finder-advanced"><span>출처 상태</span>{statuses.map(item=><button key={item} className={status===item?'active':''} onClick={()=>{setStatus(item);setShownCount(PAGE_SIZE)}}>{item}</button>)}<p>‘공식 확인’은 공식 웨딩 안내 페이지 확인 상태입니다. 플랫폼·추가 확인 필요 장소는 현재 운영 여부와 계약 조건을 다시 확인하세요.</p></div>}
     <div className="clean-venue-grid">{shown.map(v=>{const slug=detailedByName.get(`${v.region}|${v.name}`);const content=<><div className="clean-card-top"><span>{v.region} · {v.district}</span><em className={`status-${v.status.replaceAll(' ','-')}`}>{v.status}</em></div><h3>{v.name}</h3><p>{v.type}</p><small>{v.address==='미확인'?'주소 확인 전':v.address}</small>{metricFor(v)?<strong className="clean-venue-cost">공유 평균 {won(metricFor(v)!.average)} <i>· {metricFor(v)!.count}건</i></strong>:<span className="clean-venue-cost empty">공유 비용 데이터 없음</span>}<footer>{slug?'상세 정보 보기':'출처 보기'} <Icon name="arrow" size={13}/></footer></>;return slug?<Link href={`/halls/${slug}`} className="clean-venue-card" key={v.id}>{content}</Link>:<a href={v.url} target="_blank" rel="noreferrer" className="clean-venue-card" key={v.id}>{content}</a>})}</div>
     {!filtered.length&&<div className="clean-empty"><Icon name="search" size={28}/><b>찾는 예식장이 아직 목록에 없어요.</b><span>다른 이름 일부나 지역·예식 형태 키워드로 다시 검색해 보세요.</span><Link href="/share-cost" className="outline-small">비용 공유에서 기타 예식장 제보하기</Link></div>}
     {filtered.length>shownCount&&<button className="load-more" onClick={()=>setShownCount(x=>x+PAGE_SIZE)}>예식장 {Math.min(PAGE_SIZE,filtered.length-shownCount)}곳 더 보기</button>}
     <p className="clean-finder-note">비용 정렬은 이용자가 공개한 비용 공유 총액의 평균이 있는 예식장만 대상으로 하며, 데이터가 없는 예식장은 뒤에 표시됩니다. 실제 계약 금액은 예식 시점·인원·포함 항목에 따라 달라집니다.</p>
   </>}
 </section>}
