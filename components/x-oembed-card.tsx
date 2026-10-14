'use client';
import {useEffect, useState} from 'react';
import {Icon} from '@/components/icons';

type Embed={html:string;authorName:string;authorUrl:string;providerName:string};
const isXPost=(url:string)=>{try{const x=new URL(url);return ['x.com','www.x.com','twitter.com','www.twitter.com','mobile.twitter.com'].includes(x.hostname)&&/\/(?:[^/]+)\/status\/\d+/i.test(x.pathname)}catch{return false}};

export function XoEmbedCard({url}:{url:string}){
 const[embed,setEmbed]=useState<Embed|null>(null);const[status,setStatus]=useState<'loading'|'ready'|'failed'>('loading');
 useEffect(()=>{let live=true;fetch(`/api/x-oembed?url=${encodeURIComponent(url)}`).then(r=>r.ok?r.json():Promise.reject()).then(data=>{if(live&&data.html){setEmbed(data);setStatus('ready')}else if(live)setStatus('failed')}).catch(()=>live&&setStatus('failed'));return()=>{live=false}},[url]);
 if(!isXPost(url))return null;
 if(status==='loading')return <div className="x-embed-card x-loading"><span className="x-mark">𝕏</span><span>공개 X 게시물 미리보기를 불러오는 중입니다.</span></div>;
 if(status==='failed')return <a className="x-embed-card x-failed" href={url} target="_blank" rel="noreferrer"><span className="x-mark">𝕏</span><span><b>X 게시물 원문 보기</b><small>미리보기를 불러오지 못했습니다. 원문에서 확인하세요.</small></span><Icon name="arrow" size={15}/></a>;
 return <article className="x-embed-card x-ready"><div className="x-embed-label"><span className="x-mark">𝕏</span><span>공개 X 게시물 미리보기</span><a href={url} target="_blank" rel="noreferrer">원문 보기 <Icon name="arrow" size={12}/></a></div><div className="x-oembed-html" dangerouslySetInnerHTML={{__html:embed?.html||''}}/><p className="x-embed-note">X가 제공한 oEmbed 미리보기입니다. 게시물의 공개 상태 변경·삭제에 따라 보이지 않을 수 있습니다.</p></article>;
}
