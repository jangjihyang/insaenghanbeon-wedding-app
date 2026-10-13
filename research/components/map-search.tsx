'use client';
import Link from 'next/link';
import {useEffect, useMemo, useState} from 'react';
import {halls} from '@/lib/data';
import {allVenueCandidates, type VenueCandidate} from '@/lib/venue-inventory';
import {Icon} from '@/components/icons';

type MapPlace={id:string;name:string;region:'서울'|'경기'|'인천';district:string;address:string;type:string;sourceUrl:string;slug?:string;lat?:number;lng?:number};
const knownCoordinates:Record<string,[number,number]>={
  'yeonhap-weddinghall':[37.5712,127.0028], 'navy-hotel-wedding':[37.4998,126.9015], 'l65-hotel-wedding':[37.5801,127.0477], 'it-convention':[37.2738,127.0712], 'ds-convention-wedding':[37.2869,126.9833], 'grand-ostium':[37.4416,126.6995], 'arena-park-wedding':[37.4734,126.6442], 'darmiang':[37.3826,126.6566]
};
const regions=['전체','서울','경기','인천'] as const;
const cityCenters:Record<string,[number,number]>={전체:[37.501,127.01],서울:[37.5665,126.978],경기:[37.401,127.15],인천:[37.4563,126.7052]};

const detailed:MapPlace[]=halls.map(h=>{const point=knownCoordinates[h.slug];return {id:h.slug,name:h.name,region:h.region,district:h.district,address:h.address,type:h.type,sourceUrl:h.officialUrl,slug:h.slug,lat:point?.[0],lng:point?.[1]}});
const candidates:MapPlace[]=allVenueCandidates.map((v:VenueCandidate)=>({id:v.id,name:v.name,region:v.region,district:v.district,address:v.address,type:v.type,sourceUrl:v.url}));

function osmEmbed(lat:number,lng:number){const spread=.018;const bbox=[lng-spread,lat-spread,lng+spread,lat+spread].join('%2C');return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`}
function queryFor(place:MapPlace){return place.address!=='미확인'?place.address:`${place.name} ${place.region} ${place.district}`}

export function MapSearch(){
 const[region,setRegion]=useState<(typeof regions)[number]>('전체'); const[query,setQuery]=useState(''); const[selected,setSelected]=useState<MapPlace>(detailed[0]);const[point,setPoint]=useState<[number,number]>(knownCoordinates[detailed[0].id]);const[locating,setLocating]=useState(false);const[locationStatus,setLocationStatus]=useState('');
 const pool=useMemo(()=>[...detailed,...candidates].filter(p=>region==='전체'||p.region===region),[region]);
 const displayed=useMemo(()=>pool.filter(p=>`${p.name} ${p.district} ${p.address} ${p.type}`.toLowerCase().includes(query.toLowerCase())).slice(0,30),[pool,query]);
 useEffect(()=>{if(region==='전체')return;const next=pool[0];if(next&&next.id!==selected.id){setSelected(next);setQuery('')}},[region,pool,selected.id]);
 useEffect(()=>{let cancelled=false;const known=selected.lat&&selected.lng?[selected.lat,selected.lng] as [number,number]:knownCoordinates[selected.id];if(known){setPoint(known);setLocationStatus('공개 주소 기반 위치');return;}const search=queryFor(selected);setLocating(true);setLocationStatus('공개 주소를 지도에서 찾는 중…');const timer=window.setTimeout(async()=>{try{const response=await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&countrycodes=kr&q=${encodeURIComponent(search)}`,{headers:{Accept:'application/json'}});const data=await response.json();if(cancelled)return;if(data?.[0]?.lat&&data?.[0]?.lon){setPoint([Number(data[0].lat),Number(data[0].lon)]);setLocationStatus('공개 주소·장소명 검색 결과');}else{setPoint(cityCenters[selected.region]);setLocationStatus('정확한 위치를 찾지 못해 지역 중심을 표시합니다.');}}catch{if(!cancelled){setPoint(cityCenters[selected.region]);setLocationStatus('위치 검색이 연결되지 않아 지역 중심을 표시합니다.');}}finally{if(!cancelled)setLocating(false)}},900);return()=>{cancelled=true;window.clearTimeout(timer)}},[selected]);
 function choose(place:MapPlace){setSelected(place);setQuery('');}
 const mapLink=`https://map.naver.com/p/search/${encodeURIComponent(queryFor(selected))}`;
 return <section className="map-search-section">
   <div className="map-search-head"><div><span className="eyebrow">OPEN MAP DISCOVERY</span><h2>실제 지도에서 웨딩 장소 찾기</h2><p>API 키 없이 OpenStreetMap 실제 지도를 사용합니다. 장소를 선택하면 공개 주소 또는 장소명으로 위치를 찾아 보여드려요.</p></div><Link href="/search" className="text-link">전체 목록 검색 <Icon name="arrow" /></Link></div>
   <div className="map-region-tabs">{regions.map(tab=><button key={tab} className={region===tab?'active':''} onClick={()=>setRegion(tab)}>{tab}</button>)}</div>
   <div className="map-explorer real-map-explorer"><div className="venue-list-panel"><div className="map-list-summary"><b>{pool.length}곳</b><span>공개 자료 기반 장소 후보</span></div><div className="map-place-search"><Icon name="search" size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="장소명·구·주소 검색"/></div><div className="map-venue-list">{displayed.map(place=><button className={selected.id===place.id?'selected':''} onClick={()=>choose(place)} key={place.id}><span className="venue-dot"><Icon name="pin" size={15}/></span><span><b>{place.name}</b><small>{place.district} · {place.address==='미확인'?'주소 확인 필요':place.address}</small></span></button>)}{!displayed.length&&<p className="map-list-empty">검색 결과가 없습니다.</p>}</div></div>
   <div className="map-stage real-map-stage"><iframe className="openstreetmap-frame" title={`${selected.name} 위치 지도`} src={osmEmbed(point[0],point[1])}/><div className="map-attribution">© OpenStreetMap contributors</div><div className="map-selected-card"><div className="map-card-photo official-gallery-cover"><Icon name="pin" size={18}/></div><div><span>{selected.region} · {selected.district}</span><b>{selected.name}</b><small>{selected.type}</small><div><strong>{locating?'위치 확인 중':locationStatus}</strong></div></div>{selected.slug?<Link href={`/halls/${selected.slug}`} aria-label={`${selected.name} 상세 보기`}><Icon name="chevron" /></Link>:<a href={mapLink} target="_blank" rel="noreferrer" aria-label={`${selected.name} 네이버 지도에서 보기`}><Icon name="arrow" /></a>}</div></div></div>
   <p className="real-map-note">정확한 핀은 공개 주소 또는 장소명 검색 결과를 기준으로 표시됩니다. 주소가 없거나 상호가 변경된 후보는 지역 중심이 보일 수 있으니, <a href={mapLink} target="_blank" rel="noreferrer">외부 지도에서 다시 확인</a>해 주세요.</p>
 </section>
}
