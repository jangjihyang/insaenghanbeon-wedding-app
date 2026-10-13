import Link from 'next/link';
import {CostShareForm} from '@/components/cost-sharing';
export default async function ShareCost({searchParams}:{searchParams:Promise<{venue?:string;slug?:string}>}){const q=await searchParams;return <div className="page-wrap share-cost-page"><Link className="mini-back" href={q.slug?`/halls/${q.slug}`:'/costs'}>‹ 비용 둘러보기로 돌아가기</Link><CostShareForm defaultVenue={q.venue||''} defaultSlug={q.slug||''}/></div>}
