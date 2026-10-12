'use client';
import { useState } from 'react';
import { Hall } from '@/lib/data';
import { Icon } from '@/components/icons';

const extraPhotos = [
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=86',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1400&q=86',
  'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1400&q=86'
];

export function VenueGallery({ hall }: { hall: Hall }) {
  const photos = [...hall.gallery, ...extraPhotos];
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return <>
    <div className="detail-gallery" aria-label={`${hall.name} 대표 사진 갤러리`}>
      <button className="detail-main gallery-trigger" onClick={() => { setActive(0); setOpen(true); }} style={{ backgroundImage: `url(${photos[0]})` }} aria-label="첫 번째 사진 크게 보기" />
      <div className="detail-side">
        <button className="gallery-trigger" onClick={() => { setActive(1); setOpen(true); }} style={{ backgroundImage: `url(${photos[1]})` }} aria-label="두 번째 사진 크게 보기" />
        <button className="gallery-trigger" onClick={() => { setActive(2); setOpen(true); }} style={{ backgroundImage: `url(${photos[2]})` }} aria-label="모든 사진 보기"><span><Icon name="photo" /> 사진 {photos.length}장 보기</span></button>
      </div>
    </div>

    <section className="content-section venue-gallery-section">
      <div className="gallery-section-head"><div><span className="eyebrow">PHOTO GALLERY</span><h2>{hall.name} 공간 둘러보기</h2><p>예식홀, 신부대기실, 연회 공간을 사진으로 미리 확인하세요.</p></div><button onClick={() => { setActive(0); setOpen(true); }}>전체 보기 <Icon name="arrow" /></button></div>
      <div className="gallery-grid">{photos.slice(0, 6).map((photo, index) => <button className={index === 0 ? 'featured' : ''} onClick={() => { setActive(index); setOpen(true); }} key={`${photo}-${index}`} style={{ backgroundImage: `url(${photo})` }} aria-label={`${index + 1}번째 갤러리 사진 크게 보기`}><span>{index === 0 ? '대표 홀' : index === 1 ? '신부대기실' : index === 2 ? '연회 공간' : '시설 사진'}</span></button>)}</div>
    </section>

    {open && <div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`${hall.name} 사진 크게 보기`}>
      <button className="gallery-modal-backdrop" onClick={() => setOpen(false)} aria-label="갤러리 닫기" />
      <div className="gallery-modal-content">
        <div className="gallery-modal-top"><span>{active + 1} / {photos.length}</span><button onClick={() => setOpen(false)} aria-label="갤러리 닫기"><Icon name="close" size={25} /></button></div>
        <div className="gallery-large-photo" style={{ backgroundImage: `url(${photos[active]})` }} />
        <div className="gallery-thumb-row">{photos.map((photo, index) => <button className={active === index ? 'active' : ''} onClick={() => setActive(index)} key={`${photo}-thumb-${index}`} style={{ backgroundImage: `url(${photo})` }} aria-label={`${index + 1}번째 사진 선택`} />)}</div>
      </div>
    </div>}
  </>;
}
