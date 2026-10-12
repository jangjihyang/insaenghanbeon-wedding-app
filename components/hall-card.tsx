import Link from 'next/link';
import {Hall} from '@/lib/data';
import {Icon} from '@/components/icons';
export function HallCard({hall,compact=false}:{hall:Hall;compact?:boolean}){
  return <article className={`hall-card ${compact?'compact':''}`}>
    <Link href={`/halls/${hall.slug}`} className={`hall-image ${hall.image?'':'official-gallery-cover'}`} style={hall.image?{backgroundImage:`url(${hall.image})`}:undefined} aria-label={`${hall.name} 상세보기`}>
      {hall.image?<span className="photo-count"><Icon name="photo" size={14}/> 공식 사진</span>:<span className="gallery-cover-copy"><Icon name="photo" size={22}/><b>공식 갤러리</b><small>사진 권리 확인 후 반영</small></span>}
      {hall.badge&&<span className="image-badge">{hall.badge}</span>}
    </Link>
    <div className="hall-content"><div className="hall-topline"><span>{hall.region} · {hall.district}</span><button className="heart-button" aria-label="찜하기"><Icon name="heart" size={23}/></button></div><Link href={`/halls/${hall.slug}`}><h3>{hall.name}</h3></Link><p className="hall-sub">{hall.type} · {hall.station}</p><div className="rating-row">{hall.rating!==null?<><b><Icon name="star" size={14}/> {hall.rating}</b><span>후기 {hall.reviewCount}</span></>:<b className="pending-rating">실제 후기 수집 중</b>}<i>·</i><span>공식 정보 확인</span></div><div className="price-row"><strong>가격·인원 상담 확인</strong></div><div className="chips">{hall.tags.slice(0,3).map(tag=><span key={tag}>{tag}</span>)}</div></div>
  </article>
}
