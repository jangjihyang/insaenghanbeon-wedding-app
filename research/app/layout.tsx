import './globals.css';
import {SiteShell} from '@/components/site-shell';
export const metadata={title:'인생한번 | 웨딩홀 비교',description:'한 번뿐인 결혼식, 실제 후기와 조건으로 웨딩홀을 비교하세요.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><SiteShell>{children}</SiteShell></body></html>}
