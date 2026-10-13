export function Icon({name, size=20}:{name:string;size?:number}) {
  const icons:Record<string,string>={search:'⌕',heart:'♡',heartFill:'♥',home:'⌂',user:'◉',compare:'⇄',review:'✦',pin:'⌖',star:'★',chevron:'›',check:'✓',calendar:'▣',menu:'☰',close:'×',arrow:'→',photo:'▧',filter:'≡',share:'↗',clock:'◷',checklist:'✓'};
  return <span aria-hidden="true" style={{fontSize:size,lineHeight:1,display:'inline-block'}}>{icons[name]||'•'}</span>;
}
