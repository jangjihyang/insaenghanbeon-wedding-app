'use client';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { halls, Hall } from '@/lib/data';
import { Icon } from '@/components/icons';

declare global { interface Window { kakao?: any } }

type HallPin = Hall & { lat: number; lng: number };
const pins: HallPin[] = halls.map((hall, index) => ({
  ...hall,
  lat: [37.5172, 37.5134, 37.5938, 37.5632, 37.2859, 37.3923][index],
  lng: [127.0286, 127.1023, 126.9982, 127.1865, 127.0588, 126.6367][index]
}));
const regionTabs = ['전체', '서울', '경기', '인천'];

export function MapSearch() {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [region, setRegion] = useState('전체');
  const [selected, setSelected] = useState<HallPin>(pins[0]);
  const [mapReady, setMapReady] = useState(false);
  const appKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
  const displayed = useMemo(() => pins.filter((pin) => region === '전체' || pin.region === region), [region]);

  useEffect(() => {
    if (!appKey || !mapElement.current) return;
    const init = () => {
      if (!window.kakao?.maps || !mapElement.current) return;
      window.kakao.maps.load(() => {
        const center = new window.kakao.maps.LatLng(37.50, 127.02);
        mapRef.current = new window.kakao.maps.Map(mapElement.current, { center, level: 9 });
        setMapReady(true);
      });
    };
    const existing = document.getElementById('kakao-map-sdk') as HTMLScriptElement | null;
    if (existing) { if (window.kakao?.maps) init(); else existing.addEventListener('load', init, { once: true }); return; }
    const script = document.createElement('script');
    script.id = 'kakao-map-sdk'; script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
    script.addEventListener('load', init, { once: true });
    document.head.appendChild(script);
  }, [appKey]);

  useEffect(() => {
    if (!mapReady || !mapRef.current || !window.kakao?.maps) return;
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = displayed.map((pin) => {
      const marker = new window.kakao.maps.Marker({ position: new window.kakao.maps.LatLng(pin.lat, pin.lng), map: mapRef.current, title: pin.name });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        setSelected(pin);
        mapRef.current.panTo(new window.kakao.maps.LatLng(pin.lat, pin.lng));
      });
      return marker;
    });
  }, [displayed, mapReady]);

  function choose(pin: HallPin) {
    setSelected(pin);
    if (mapRef.current && window.kakao?.maps) mapRef.current.panTo(new window.kakao.maps.LatLng(pin.lat, pin.lng));
  }

  return <section className="map-search-section">
    <div className="map-search-head"><div><span className="eyebrow">MAP DISCOVERY</span><h2>지도에서 가까운 웨딩홀 찾기</h2><p>지역을 선택하고 지도 위 핀을 눌러 예식장을 살펴보세요.</p></div><Link href="/search" className="text-link">조건 검색으로 찾기 <Icon name="arrow" /></Link></div>
    <div className="map-region-tabs">{regionTabs.map((tab) => <button key={tab} className={region === tab ? 'active' : ''} onClick={() => setRegion(tab)}>{tab}</button>)}</div>
    <div className="map-explorer">
      <div className="venue-list-panel"><div className="map-list-summary"><b>{displayed.length}곳</b><span>현재 지도 영역의 웨딩홀</span></div><div className="map-venue-list">{displayed.map((pin) => <button className={selected.slug === pin.slug ? 'selected' : ''} onClick={() => choose(pin)} key={pin.slug}><span className="venue-dot"><Icon name="pin" size={15} /></span><span><b>{pin.name}</b><small>{pin.district} · {pin.station}</small></span><strong>{pin.rating!==null?`★ ${pin.rating}`:'공식'}</strong></button>)}</div></div>
      <div className="map-stage">
        {appKey ? <div ref={mapElement} className="kakao-map" aria-label="카카오 지도" /> : <div className="map-fallback" aria-label="수도권 웨딩홀 지도 미리보기"><div className="map-grid" /><div className="map-river" />{displayed.map((pin) => <button key={pin.slug} className={`fallback-pin ${selected.slug === pin.slug ? 'selected' : ''}`} style={{ left: `${20 + ((pin.lng - 126.6) / .6) * 62}%`, top: `${78 - ((pin.lat - 37.2) / .43) * 57}%` }} onClick={() => choose(pin)} aria-label={`${pin.name} 선택`}><span>♥</span><b>{pin.name.split(' ')[0]}</b></button>)}<div className="map-area-label seoul">SEOUL</div><div className="map-area-label gyeonggi">GYEONGGI</div><div className="map-fallback-note"><Icon name="pin" size={15}/> 지도 키를 연결하면 실제 지도로 표시돼요</div></div>}
        <div className="map-selected-card"><div className={`map-card-photo ${selected.image?'':'official-gallery-cover'}`} style={selected.image?{ backgroundImage: `url(${selected.image})` }:undefined}>{!selected.image&&<Icon name="photo" size={18}/>}</div><div><span>{selected.region} · {selected.district}</span><b>{selected.name}</b><small>{selected.type} · {selected.station}</small><div><strong>{selected.rating!==null?`★ ${selected.rating}`:'공식 정보'}</strong><em>{selected.reviewCount?`후기 ${selected.reviewCount}`:'후기 수집 중'}</em></div></div><Link href={`/halls/${selected.slug}`} aria-label={`${selected.name} 상세 보기`}><Icon name="chevron" /></Link></div>
      </div>
    </div>
  </section>;
}
