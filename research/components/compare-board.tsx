'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { halls, Hall } from '@/lib/data';
import { getSupabase } from '@/lib/supabase';
import { Icon } from '@/components/icons';

type Favorite = { hall_slug: string };

export function CompareBoard() {
  const sb = useMemo(() => getSupabase(), []);
  const [selected, setSelected] = useState<Hall[]>(halls.slice(0, 3));
  const [personalized, setPersonalized] = useState(false);

  useEffect(() => {
    if (!sb) return;
    const client = sb;
    async function loadFavorites() {
      const { data: userData } = await client.auth.getUser();
      if (!userData.user) return;
      const { data } = await client.from('favorites').select('hall_slug').eq('user_id', userData.user.id);
      const favoriteHalls = ((data || []) as Favorite[]).map((row) => halls.find((hall) => hall.slug === row.hall_slug)).filter(Boolean) as Hall[];
      if (favoriteHalls.length) {
        setSelected(favoriteHalls.slice(0, 3));
        setPersonalized(true);
      }
    }
    loadFavorites();
  }, [sb]);

  if (!selected.length) return null;
  const rows: Array<[string, (hall: Hall) => string]> = [
    ['평점', (hall) => `★ ${hall.rating}`],
    ['예식 인원', (hall) => hall.capacity],
    ['식사', (hall) => hall.mealPrice],
    ['최소 보증', (hall) => hall.guarantee],
    ['주차 만족도', (hall) => `${hall.parking} / 5.0`]
  ];

  return <>
    <div className="compare-tip">
      <Icon name="heart" size={24} />
      <div><b>{personalized ? '내가 찜한 웨딩홀을 비교하고 있어요.' : '찜한 웨딩홀을 비교함에 모아보세요.'}</b><span>{personalized ? '최대 3곳의 핵심 조건을 나란히 확인할 수 있어요.' : '로그인하면 내 찜 목록과 연동됩니다.'}</span></div>
      <Link href={personalized ? '/my' : '/login'}>{personalized ? '내 찜 보기' : '로그인'} <Icon name="chevron" /></Link>
    </div>
    <div className="compare-table">
      <div className="compare-row venue-row">
        <div className="compare-label">웨딩홀</div>
        {selected.map((hall) => <Link href={`/halls/${hall.slug}`} key={hall.slug}><div className="compare-image" style={{ backgroundImage: `url(${hall.image})` }} /><b>{hall.name}</b><span>{hall.region} · {hall.type}</span></Link>)}
      </div>
      {rows.map(([label, get]) => <div className="compare-row" key={label}><div className="compare-label">{label}</div>{selected.map((hall) => <div key={hall.slug}>{get(hall)}</div>)}</div>)}
    </div>
    <p className="compare-note">* 식사와 대관 비용은 예식일, 시간대, 메뉴에 따라 달라질 수 있어요. 상담 시 정확한 내용을 확인하세요.</p>
    <Link href="/search" className="outline-full">다른 웨딩홀 더 찾아보기 <Icon name="arrow" /></Link>
  </>;
}
