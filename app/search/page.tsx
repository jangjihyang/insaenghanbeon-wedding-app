import {SearchExplorer} from '@/components/search-explorer';
const typeMap:Record<string,string>={hotel:'호텔·컨벤션',house:'하우스웨딩',garden:'가든·야외'};
export default async function Search({searchParams}:{searchParams:Promise<{region?:string;type?:string}>}){const params=await searchParams;return <div className="page-wrap search-page"><div className="page-intro"><span className="eyebrow">VENUE FINDER</span><h1>내게 맞는 웨딩홀 찾기</h1><p>지역, 예식 형태, 실제 후기를 살펴보고 나만의 후보를 만들어보세요.</p></div><SearchExplorer initialRegion={params.region} initialType={typeMap[params.type||'']}/></div>}
