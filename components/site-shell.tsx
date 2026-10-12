'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useEffect,useMemo,useState} from 'react';
import {getSupabase} from '@/lib/supabase';
import {Icon} from '@/components/icons';
const tabs=[['/','홈','home'],['/search','찾기','search'],['/compare','비교','compare'],['/reviews','후기','review'],['/community','공유','review'],['/my','마이','user']];
export function SiteShell({children}:{children:React.ReactNode}){
 const path=usePathname(); const sb=useMemo(()=>getSupabase(),[]); const [email,setEmail]=useState<string|null>(null); const [open,setOpen]=useState(false);
 useEffect(()=>{if(!sb)return;sb.auth.getUser().then(({data})=>setEmail(data.user?.email??null));const {data:{subscription}}=sb.auth.onAuthStateChange((_e,s)=>setEmail(s?.user?.email??null));return()=>subscription.unsubscribe()},[sb]);
 async function signOut(){if(sb){await sb.auth.signOut();location.href='/'}}
 return <><header className="site-header"><div className="header-inner"><Link href="/" className="brand" aria-label="인생한번 홈"><span className="brand-mark">인</span><strong>인생한번</strong><small>WEDDING GUIDE</small></Link><div className="desktop-links"><Link href="/search">웨딩홀 찾기</Link><Link href="/reviews">리얼후기</Link><Link href="/community">정보공유</Link><Link href="/compare">비교함</Link></div><div className="head-actions"><Link className="head-icon" aria-label="검색" href="/search"><Icon name="search" size={24}/></Link>{email?<button className="text-action" onClick={signOut}>로그아웃</button>:<Link className="login-pill" href="/login">로그인</Link>}<button className="mobile-menu" aria-label="메뉴" onClick={()=>setOpen(!open)}><Icon name="menu"/></button></div></div>{open&&<div className="mobile-drawer"><Link href="/search" onClick={()=>setOpen(false)}>웨딩홀 찾기</Link><Link href="/reviews" onClick={()=>setOpen(false)}>리얼후기</Link><Link href="/community" onClick={()=>setOpen(false)}>정보공유</Link><Link href="/compare" onClick={()=>setOpen(false)}>비교함</Link><Link href="/my" onClick={()=>setOpen(false)}>마이페이지</Link></div>}</header><main>{children}</main><nav className="bottom-nav">{tabs.map(([href,label,icon])=><Link className={path===href?'active':''} href={href} key={href}><Icon name={icon} size={19}/><span>{label}</span></Link>)}</nav></>
}
