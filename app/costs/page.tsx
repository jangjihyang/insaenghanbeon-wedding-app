import Link from 'next/link';
import {CostFeed,CostNotice} from '@/components/cost-sharing';
import {CostStatistics} from '@/components/cost-statistics';
import {Icon} from '@/components/icons';
export default function Costs(){return <div className="page-wrap costs-page"><section className="costs-hero"><span className="eyebrow">OPEN WEDDING COST DATA</span><h1>숨겨진 웨딩홀 비용,<br/><em>함께 투명하게</em> 보세요.</h1><p>예비부부가 자발적으로 공유한 상담·계약·실제 결제 정보를 조건별로 살펴볼 수 있는 비영리 정보공유 공간입니다.</p><div className="costs-hero-actions"><Link className="primary-button" href="/share-cost">내 비용 공유하기 <Icon name="arrow"/></Link><Link className="outline-button" href="/tour-checklist">투어 체크리스트 보기</Link></div></section><CostNotice/><CostStatistics/><CostFeed/></div>}
