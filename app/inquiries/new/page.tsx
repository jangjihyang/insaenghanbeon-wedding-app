import { redirect } from 'next/navigation';
export default async function LegacyInquiry({searchParams}:{searchParams:Promise<{hall?:string}>}){const q=await searchParams;redirect(q.hall?`/share-cost?slug=${encodeURIComponent(q.hall)}`:'/share-cost')}
