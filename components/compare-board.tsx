'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { halls, Hall } from '@/lib/data';
import { getSupabase } from '@/lib/supabase';
import { Icon } from '@/components/icons';
type Favorite={hall_slug:string};
type Cost={venue_slug:string|null;total_amount:number;meal_price:number|null;guest_count:number|null};
const won=(value:number|null)=>value===null?'데이터 수집 중':`${Math.round(value).toLocaleString('ko-KR')}원`;
export function CompareBoard(){
 const sb=useMemo(()=>getSupabase(),[]);const[selected,setSelected]=useState<Hall[]>(halls.slice(0,3));const[personalized,setPersonalized]=useState(false);const[costs,setCosts]=useState<Cost[]>([]);
 useEffect(()=>{if(!sb)return;const client=sb;async function load(){const[{data:userData},{data:costData}]=await Promise.all([client.auth.getUser(),client.from('cost_reports').select('venue_slug,total_amount,meal_price,guest_count').eq('status','published')]);setCosts((costData||[]) as Cost[]);if(!userData.user)return;const{data}=await client.from('favorites').select('hall_slug').eq('user_id',userData.user.id);const favorite=((data||[])as Favorite[]).map(x=>halls.find(h=>h.slug===x.hall_slug)).filter(Boolean)as Hall[];if(favorite.length){setSelected(favorite.slice(0,3));setPersonalized(true)}}load()},[sb]);
 const stats=(slug:string)=>{const rows=costs.filter(x=>x.venue_slug===slug&&x.total_amount);if(!rows.length)return{count:0,total:null,meal:null};return{count:rows.length,total:rows.reduce((a,x)=>a+x.total_amount,0)/rows.length,meal:rows.filter(x=>x.meal_price).length?rows.filter(x=>x.meal_price).reduce((a,x)=>a+(x.meal_price||0),0)/rows.filter(x=>x.meal_price).length:null}};
 if(!selected.length)return null;
 const rows:Array<[string,(hall:Hall)=>string]>=[['공유 비용 건수',h=>`${stats(h.slug).count}건`],['평균 공유 총액',h=>won(stats(h.slug).total)],['평균 1인 식대',h=>won(stats(h.slug).meal)],['예식 인원',h=>h.capacity],['최소 보증',h=>h.guarantee],['주차 만족도',h=>`${h.parking??'—'} / 5.0`]];
 return <><div className="compare-tip"><Icon name="heart" size={24}/><div><b>{personalized?'내가 찜한 웨딩홀을 비교하고 있어요.':'대표 웨딩홀을 비용까지 비교해보세요.'}</b><span>공유 건수와 평균은 이용자가 자발적으로 등록한 공개 데이터만 반영됩니다.</span></div><Link href={personalized?'/my':'/costs'}>{personalized?'내 찜 보기':'비용 둘러보기'} <Icon name="chevron"/></Link></div><div className="compare-table"><div className="compare-row venue-row"><div className="compare-label">웨딩홀</div>{selected.map(h=><Link href={`/halls/${h.slug}`} key={h.slug}><div className="compare-image" style={{backgroundImage:`url(${h.image})`}}/><b>{h.name}</b><span>{h.region} · {h.type}</span></Link>)}</div>{rows.map(([label,get])=><div className="compare-row" key={label}><div className="compare-label">{label}</div>{selected.map(h=><div key={h.slug}>{get(h)}</div>)}</div>)}</div><p className="compare-note">* 공유 비용은 예식 시점·시간대·인원·식사·할인 조건에 따라 달라지는 참고 정보입니다. 표본이 적은 경우 평균값을 신중하게 살펴보세요.</p><div className="compare-actions"><Link href="/costs" className="outline-full">공유 비용 더 살펴보기 <Icon name="arrow"/></Link><Link href="/share-cost" className="primary-button">내 비용 공유하기 <Icon name="arrow"/></Link></div></>}
