'use client';
import Link from 'next/link';
import {FormEvent,useEffect,useMemo,useState} from 'react';
import {getSupabase} from '@/lib/supabase';
import {halls} from '@/lib/data';
import {Icon} from '@/components/icons';

type User={id:string;email:string|null};
function useUser(){const sb=useMemo(()=>getSupabase(),[]);const [user,setUser]=useState<User|null>(null);useEffect(()=>{if(!sb)return;sb.auth.getUser().then(({data})=>setUser(data.user?{id:data.user.id,email:data.user.email??null}:null));const {data:{subscription}}=sb.auth.onAuthStateChange((_e,s)=>setUser(s?.user?{id:s.user.id,email:s.user.email??null}:null));return()=>subscription.unsubscribe()},[sb]);return{sb,user}}

export function LoginBox(){
  const{sb,user}=useUser();const[mode,setMode]=useState<'login'|'signup'>('login');const[email,setEmail]=useState('');const[password,setPassword]=useState('');const[msg,setMsg]=useState('');const[busy,setBusy]=useState(false);
  async function submit(e:FormEvent){e.preventDefault();if(!sb)return setMsg('Supabase 연결값을 먼저 설정해주세요.');setBusy(true);const r=mode==='login'?await sb.auth.signInWithPassword({email,password}):await sb.auth.signUp({email,password,options:{emailRedirectTo:`${window.location.origin}/my`}});setBusy(false);if(r.error)return setMsg('입력 정보를 다시 확인해주세요.');setMsg(mode==='login'?'로그인되었습니다. 잠시 후 이동합니다.':'가입 확인 메일을 보냈어요. 메일함에서 인증을 완료해주세요.');if(mode==='login')setTimeout(()=>location.href='/my',700)}
  async function social(provider:'google'|'kakao'){if(!sb)return setMsg('Supabase 연결값을 먼저 설정해주세요.');setBusy(true);const{error}=await sb.auth.signInWithOAuth({provider,options:{redirectTo:`${window.location.origin}/my`}});if(error){setBusy(false);setMsg(provider==='google'?'Google 로그인이 아직 설정되지 않았어요. Supabase Authentication 설정을 확인해주세요.':'Kakao 로그인이 아직 설정되지 않았어요. Supabase Authentication 설정을 확인해주세요.')}}
  if(user)return <div className="auth-card done"><div className="success-circle">✓</div><h2>이미 로그인되어 있어요</h2><p>{user.email}</p><Link className="primary-button" href="/my">마이페이지로 가기</Link></div>;
  return <div className="auth-card"><div className="auth-tabs"><button className={mode==='login'?'selected':''} onClick={()=>setMode('login')}>로그인</button><button className={mode==='signup'?'selected':''} onClick={()=>setMode('signup')}>회원가입</button></div><h1>{mode==='login'?'다시 만나 반가워요':'인생한번 시작하기'}</h1><p className="auth-desc">내가 찜한 웨딩홀과 문의 내역을 한 곳에서 관리해요.</p><div className="social-login"><button type="button" className="social-button google" onClick={()=>social('google')} disabled={busy}><span>G</span> Google로 계속하기</button><button type="button" className="social-button kakao" onClick={()=>social('kakao')} disabled={busy}><span>●</span> 카카오로 계속하기</button></div><div className="auth-divider"><span>또는 이메일로 계속하기</span></div><form onSubmit={submit}><label>이메일<input type="email" required placeholder="name@email.com" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>비밀번호<input minLength={6} type="password" required placeholder="6자 이상 입력" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary-button" disabled={busy}>{busy?'처리 중...':mode==='login'?'로그인':'회원가입'}</button></form>{msg&&<p className="form-message">{msg}</p>}<div className="auth-note"><Icon name="check" size={14}/> 로그인하면 찜, 후기, 견적 문의를 안전하게 저장할 수 있어요.</div></div>}


export function FavoriteButton({slug}:{slug:string}){const{sb,user}=useUser();const[saved,setSaved]=useState(false);const[busy,setBusy]=useState(false);useEffect(()=>{if(!sb||!user)return;sb.from('favorites').select('id').eq('hall_slug',slug).eq('user_id',user.id).maybeSingle().then(({data})=>setSaved(Boolean(data)))},[sb,user,slug]);async function toggle(){if(!sb)return alert('Supabase 연결 후 이용할 수 있어요.');if(!user){location.href='/login';return;}setBusy(true);if(saved)await sb.from('favorites').delete().eq('hall_slug',slug).eq('user_id',user.id);else await sb.from('favorites').insert({hall_slug:slug,user_id:user.id});setSaved(!saved);setBusy(false)}return <button className={`save-round ${saved?'saved':''}`} disabled={busy} onClick={toggle} aria-label={saved?'찜 취소':'찜하기'}><Icon name={saved?'heartFill':'heart'} size={25}/><span>{saved?'찜했어요':'찜하기'}</span></button>}

export function ReviewComposer({slug,hallName}:{slug:string;hallName:string}) {
  const {sb,user}=useUser();
  const [score,setScore]=useState(5); const [meal,setMeal]=useState(5); const [mood,setMood]=useState(5); const [parking,setParking]=useState(5);
  const [text,setText]=useState(''); const [files,setFiles]=useState<File[]>([]); const [msg,setMsg]=useState(''); const [open,setOpen]=useState(false); const [busy,setBusy]=useState(false);
  const previews=useMemo(()=>files.map(file=>({file,url:URL.createObjectURL(file)})),[files]);
  useEffect(()=>()=>previews.forEach(item=>URL.revokeObjectURL(item.url)),[previews]);
  function chooseFiles(event:React.ChangeEvent<HTMLInputElement>) {
    const chosen=Array.from(event.target.files||[]);
    const allowed=chosen.filter(file=>['image/jpeg','image/png','image/webp'].includes(file.type) && file.size<=8*1024*1024);
    const combined=[...files,...allowed].slice(0,5);
    setFiles(combined);
    if(chosen.length!==allowed.length) setMsg('JPG, PNG, WEBP 파일만 가능하며 사진 한 장은 8MB 이하로 올려주세요.');
    else if(files.length+allowed.length>5) setMsg('사진은 최대 5장까지 올릴 수 있어요.');
    else setMsg('');
    event.target.value='';
  }
  function removeFile(index:number){setFiles(current=>current.filter((_,i)=>i!==index));}
  async function uploadPhotos(){
    if(!sb||!user||!files.length) return [] as string[];
    const uploadedPaths:string[]=[];
    try {
      for(const file of files){
        const ext=(file.name.split('.').pop()||'jpg').toLowerCase();
        const path=`${user.id}/${Date.now()}-${crypto.randomUUID()}.${ext}`;
        const {error}=await sb.storage.from('review-images').upload(path,file,{contentType:file.type,upsert:false});
        if(error) throw error;
        uploadedPaths.push(path);
      }
      return uploadedPaths.map(path=>sb.storage.from('review-images').getPublicUrl(path).data.publicUrl);
    } catch(error) {
      if(uploadedPaths.length) await sb.storage.from('review-images').remove(uploadedPaths);
      throw error;
    }
  }
  async function submit(e:FormEvent){
    e.preventDefault();
    if(!sb||!user){location.href='/login';return;}
    if(text.trim().length<20){setMsg('후기를 20자 이상 작성해주세요.');return;}
    setBusy(true); setMsg('사진과 후기를 저장하고 있어요.');
    try {
      const imageUrls=await uploadPhotos();
      const {error}=await sb.from('reviews').insert({hall_slug:slug,user_id:user.id,author_name:user.email?.split('@')[0]||'예비부부',rating:score,meal_rating:meal,mood_rating:mood,parking_rating:parking,content:text.trim(),image_urls:imageUrls,status:'published'});
      if(error) throw error;
      setText(''); setFiles([]); setOpen(false); setMsg('소중한 후기와 사진이 등록되었어요.');
    } catch { setMsg('저장하지 못했어요. Supabase 저장소 설정을 확인한 뒤 다시 시도해주세요.'); }
    finally { setBusy(false); }
  }
  if(!open)return <button className="outline-full" onClick={()=>setOpen(true)}><Icon name="review"/> 이 웨딩홀 후기 남기기</button>;
  return <form className="review-composer" onSubmit={submit}>
    <div className="composer-head"><div><b>{hallName}</b><p>실제 상담·방문·예식 경험을 알려주세요.</p></div><button type="button" onClick={()=>setOpen(false)} aria-label="닫기"><Icon name="close"/></button></div>
    <div className="score-picker"><span>전체 만족도</span><div>{[1,2,3,4,5].map(n=><button type="button" key={n} className={n<=score?'on':''} onClick={()=>setScore(n)}>★</button>)}</div><strong>{score}.0</strong></div>
    <div className="mini-score-grid">{([{label:'식사',value:meal,setter:setMeal},{label:'분위기',value:mood,setter:setMood},{label:'주차',value:parking,setter:setParking}] as Array<{label:string;value:number;setter:(value:number)=>void}>).map(item=><label key={item.label}>{item.label}<select value={item.value} onChange={e=>item.setter(Number(e.target.value))}>{[5,4,3,2,1].map(n=><option key={n} value={n}>{n}점</option>)}</select></label>)}</div>
    <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="예식장 분위기, 식사, 주차, 상담 경험을 솔직하게 적어주세요. (20자 이상)" maxLength={800}/>
    <div className="photo-upload-box"><div className="photo-upload-head"><div><b>후기 사진</b><span>최대 5장 · JPG, PNG, WEBP · 장당 8MB 이하</span></div><label className="photo-select-button"><Icon name="photo" size={16}/> 사진 추가<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={chooseFiles}/></label></div>{previews.length>0&&<div className="photo-preview-grid">{previews.map((item,index)=><div className="photo-preview" key={`${item.file.name}-${index}`}><img src={item.url} alt={`업로드 예정 사진 ${index+1}`}/><button type="button" onClick={()=>removeFile(index)} aria-label={`${index+1}번째 사진 삭제`}><Icon name="close" size={13}/></button></div>)}</div>}</div>
    <button className="primary-button" type="submit" disabled={busy}>{busy?'후기 저장 중...':'후기 등록하기'}</button>{msg&&<p className="form-message">{msg}</p>}
  </form>
}

type ReviewRow={id:string;author_name:string;rating:number;meal_rating:number;mood_rating:number;parking_rating:number;content:string;created_at:string;hall_slug:string;image_urls:string[]|null};
export function LiveReviews({slug}:{slug?:string}) {
  const {sb}=useUser(); const [rows,setRows]=useState<ReviewRow[]>([]); const [loading,setLoading]=useState(true);
  useEffect(()=>{if(!sb){setLoading(false);return;}let q=sb.from('reviews').select('id,author_name,rating,meal_rating,mood_rating,parking_rating,content,image_urls,created_at,hall_slug').eq('status','published').order('created_at',{ascending:false}).limit(20);if(slug)q=q.eq('hall_slug',slug);q.then(({data})=>{setRows((data||[]) as ReviewRow[]);setLoading(false)})},[sb,slug]);
  if(loading)return <div className="loading-line">후기를 불러오는 중이에요.</div>;
  if(!rows.length)return <div className="empty-review"><Icon name="review" size={28}/><b>아직 등록된 후기가 없어요</b><span>첫 번째 경험을 남겨주세요.</span></div>;
  return <div className="live-reviews">{rows.map(row=><article className="review-row" key={row.id}><div className="review-row-top"><div><b>{row.author_name||'예비부부'}</b><span>{new Date(row.created_at).toLocaleDateString('ko-KR')}</span></div><strong>★ {Number(row.rating).toFixed(1)}</strong></div><p>{row.content}</p>{Boolean(row.image_urls?.length)&&<div className="review-photo-grid">{row.image_urls!.map((url,index)=><a href={url} target="_blank" rel="noreferrer" key={`${url}-${index}`}><img src={url} alt={`${row.author_name||'예비부부'} 후기 사진 ${index+1}`}/></a>)}</div>}<div className="review-stats"><span>식사 {row.meal_rating}</span><span>분위기 {row.mood_rating}</span><span>주차 {row.parking_rating}</span>{row.image_urls?.length?<span><Icon name="photo" size={11}/> 사진 {row.image_urls.length}</span>:null}</div></article>)}</div>
}

export function MyData(){const{sb,user}=useUser();const[favorites,setFavorites]=useState<string[]>([]);const[reviews,setReviews]=useState<{id:string;hall_slug:string;content:string;rating:number;created_at:string}[]>([]);const[inquiries,setInquiries]=useState<{id:string;hall_slug:string;wedding_date:string;guest_count:number;created_at:string}[]>([]);useEffect(()=>{if(!sb||!user)return;Promise.all([sb.from('favorites').select('hall_slug').eq('user_id',user.id),sb.from('reviews').select('id,hall_slug,content,rating,created_at').eq('user_id',user.id).order('created_at',{ascending:false}),sb.from('inquiries').select('id,hall_slug,wedding_date,guest_count,created_at').eq('user_id',user.id).order('created_at',{ascending:false})]).then(([f,r,i])=>{setFavorites((f.data||[]).map(x=>x.hall_slug));setReviews(r.data||[]);setInquiries(i.data||[])})},[sb,user]);if(!sb)return <div className="connect-guide"><b>Supabase 연결이 필요해요</b><span>.env.local 설정 후 로그인과 저장 기능을 사용할 수 있어요.</span></div>;if(!user)return <div className="login-required"><div className="lock-icon">♡</div><h2>나만의 웨딩 플래너</h2><p>찜한 웨딩홀, 작성한 후기, 견적 문의를 한 번에 관리하세요.</p><Link className="primary-button" href="/login">로그인하고 시작하기</Link></div>;const hallName=(slug:string)=>halls.find(h=>h.slug===slug)?.name||slug;return <div className="my-data"><section><div className="my-section-head"><div><span>내가 찜한 웨딩홀</span><h2>{favorites.length}곳</h2></div><Link href="/compare">비교하기 <Icon name="chevron"/></Link></div>{favorites.length?<div className="my-list">{favorites.map(slug=><Link href={`/halls/${slug}`} key={slug}><span className="list-icon heart-bg">♥</span><div><b>{hallName(slug)}</b><small>상세 조건과 후기를 확인해보세요</small></div><Icon name="chevron"/></Link>)}</div>:<p className="empty-inline">마음에 드는 웨딩홀을 찜해보세요.</p>}</section><section><div className="my-section-head"><div><span>견적 문의</span><h2>{inquiries.length}건</h2></div><Link href="/inquiries/new">새 문의 <Icon name="chevron"/></Link></div>{inquiries.length?<div className="my-list">{inquiries.slice(0,3).map(i=><Link href={`/halls/${i.hall_slug}`} key={i.id}><span className="list-icon calendar-bg">▣</span><div><b>{hallName(i.hall_slug)}</b><small>{i.wedding_date||'희망일 미정'} · {i.guest_count||0}명</small></div><Icon name="chevron"/></Link>)}</div>:<p className="empty-inline">아직 문의한 웨딩홀이 없어요.</p>}</section><section><div className="my-section-head"><div><span>내가 쓴 후기</span><h2>{reviews.length}개</h2></div><Link href="/reviews">전체 후기 <Icon name="chevron"/></Link></div>{reviews.length?<div className="my-list">{reviews.slice(0,3).map(r=><Link href={`/halls/${r.hall_slug}`} key={r.id}><span className="list-icon review-bg">★</span><div><b>{hallName(r.hall_slug)} · ★ {r.rating}</b><small>{r.content.slice(0,46)}{r.content.length>46?'…':''}</small></div><Icon name="chevron"/></Link>)}</div>:<p className="empty-inline">방문하거나 예식을 올린 웨딩홀의 후기를 남겨주세요.</p>}</section></div>}

export function InquiryForm({defaultSlug}:{defaultSlug?:string}){const{sb,user}=useUser();const[slug,setSlug]=useState(defaultSlug||halls[0].slug);const[date,setDate]=useState('');const[count,setCount]=useState('150');const[name,setName]=useState('');const[phone,setPhone]=useState('');const[note,setNote]=useState('');const[msg,setMsg]=useState('');async function submit(e:FormEvent){e.preventDefault();if(!sb||!user){location.href='/login';return;}const r=await sb.from('inquiries').insert({user_id:user.id,hall_slug:slug,wedding_date:date||null,guest_count:Number(count)||0,contact_name:name,contact_phone:phone,note});setMsg(r.error?'문의 저장에 실패했어요.':'견적 문의가 저장되었어요. 마이페이지에서 확인할 수 있어요.');if(!r.error)(e.currentTarget as HTMLFormElement).reset()}return <form className="inquiry-form" onSubmit={submit}><label>관심 웨딩홀<select value={slug} onChange={e=>setSlug(e.target.value)}>{halls.map(h=><option value={h.slug} key={h.slug}>{h.name}</option>)}</select></label><div className="two-inputs"><label>희망 예식일<input type="date" value={date} onChange={e=>setDate(e.target.value)}/></label><label>예상 하객 수<input type="number" min="10" value={count} onChange={e=>setCount(e.target.value)} placeholder="예: 150"/></label></div><div className="two-inputs"><label>이름<input required value={name} onChange={e=>setName(e.target.value)} placeholder="성함"/></label><label>연락처<input required value={phone} onChange={e=>setPhone(e.target.value)} placeholder="010-0000-0000"/></label></div><label>상담 시 알려줄 내용<textarea value={note} onChange={e=>setNote(e.target.value)} placeholder="관심 있는 시간대, 중요하게 생각하는 조건 등을 남겨주세요." maxLength={500}/></label><button className="primary-button">견적 문의 저장하기</button>{msg&&<p className="form-message">{msg}</p>}<p className="privacy-note">입력한 정보는 내 문의 기록 저장과 웨딩홀 상담 요청을 위해서만 사용됩니다.</p></form>}
