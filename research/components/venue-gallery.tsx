'use client';
import { useState } from 'react';
import { Hall } from '@/lib/data';
import { Icon } from '@/components/icons';

export function VenueGallery({ hall }: { hall: Hall }) {
  const photos = hall.gallery;
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  if (!photos.length) return <section className="content-section venue-gallery-section">
    <div className="gallery-section-head"><div><span className="eyebrow">OFFICIAL GALLERY</span><h2>{hall.name} 공식 사진 보기</h2><p>사진 저작권과 직접 사용 허가를 확인하는 동안 공식 갤러리에서 공간을 확인할 수 있어요.</p></div></div>
    <div className="official-gallery-panel"><div><b>공식 홀 소개·갤러리로 이동</b><p>{hall.photoUsageNote}</p></div><a className="official-source-link" href={hall.galleryUrl} target="_blank" rel="noreferrer">공식 갤러리 열기 <Icon name="arrow" /></a></div>
  </section>;
  return <>
    <div className="detail-gallery" aria-label={`${hall.name} 대표 사진 갤러리`}>
      <button className="detail-main gallery-trigger" onClick={() => { setActive(0); setOpen(true); }} style={{ backgroundImage: `url(${photos[0]})` }} aria-label="첫 번째 사진 크게 보기" />
      <div className="detail-side">
        <button className="gallery-trigger" onClick={() => { setActive(Math.min(1, photos.length-1)); setOpen(true); }} style={{ backgroundImage: `url(${photos[Math.min(1, photos.length-1)]})` }} aria-label="공식 사진 크게 보기" />
        <button className="gallery-trigger" onClick={() => { setActive(0); setOpen(true); }} style={{ backgroundImage: `url(${photos[Math.min(2, photos.length-1)]})` }} aria-label="모든 사진 보기"><span><Icon name="photo" /> 공식 사진 {photos.length}장</span></button>
      </div>
    </div>
    <section className="content-section venue-gallery-section">
      <div className="gallery-section-head"><div><span className="eyebrow">PHOTO GALLERY</span><h2>{hall.name} 공간 둘러보기</h2><p>공식 홈페이지에서 확인된 사진 경로입니다. 사용 권한은 별도 확인이 필요해요.</p></div><button onClick={() => { setActive(0); setOpen(true); }}>크게 보기 <Icon name="arrow" /></button></div>
      <div className="gallery-grid">{photos.map((photo,index)=><button className={index===0?'featured':''} onClick={()=>{setActive(index);setOpen(true)}} key={`${photo}-${index}`} style={{backgroundImage:`url(${photo})`}} aria-label={`${index+1}번째 갤러리 사진 크게 보기`}><span>공식 사진</span></button>)}</div>
      <div className="official-gallery-panel"><div><b>더 많은 사진은 공식 갤러리에서 확인</b><p>{hall.photoUsageNote}</p></div><a className="official-source-link" href={hall.galleryUrl} target="_blank" rel="noreferrer">공식 갤러리 열기 <Icon name="arrow" /></a></div>
    </section>
    {open && <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${hall.name} 사진 크게 보기`}><button className="gallery-modal-backdrop" onClick={()=>setOpen(false)} aria-label="갤러리 닫기"/><div className="gallery-modal-content"><div className="gallery-modal-top"><span>{active+1} / {photos.length}</span><button onClick={()=>setOpen(false)} aria-label="갤러리 닫기"><Icon name="close" size={25}/></button></div><div className="gallery-large-photo" style={{backgroundImage:`url(${photos[active]})`}}/><div className="gallery-thumb-row">{photos.map((photo,index)=><button className={active===index?'active':''} onClick={()=>setActive(index)} key={`${photo}-thumb-${index}`} style={{backgroundImage:`url(${photo})`}} aria-label={`${index+1}번째 사진 선택`}/>)}</div></div></div>}
  </>;
}
