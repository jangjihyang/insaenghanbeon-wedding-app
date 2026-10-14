import { NextRequest, NextResponse } from 'next/server';

const allowedHosts = new Set(['x.com', 'www.x.com', 'twitter.com', 'www.twitter.com', 'mobile.twitter.com']);

function isPublicXPost(urlString: string) {
  try {
    const url = new URL(urlString);
    if (url.protocol !== 'https:' || !allowedHosts.has(url.hostname)) return false;
    return /\/(?:[^/]+)\/status\/\d+/i.test(url.pathname);
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url') || '';
  if (!isPublicXPost(url)) return NextResponse.json({ error: '지원하지 않는 X 공개 게시물 링크입니다.' }, { status: 400 });

  try {
    const endpoint = new URL('https://publish.twitter.com/oembed');
    endpoint.searchParams.set('url', url);
    endpoint.searchParams.set('omit_script', 'true');
    endpoint.searchParams.set('dnt', 'true');
    endpoint.searchParams.set('lang', 'ko');
    const response = await fetch(endpoint, { next: { revalidate: 3600 }, headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('oEmbed request failed');
    const data = await response.json();
    return NextResponse.json({ html: data.html || '', authorName: data.author_name || 'X', authorUrl: data.author_url || '', providerName: data.provider_name || 'X' }, { headers: { 'Cache-Control': 'public, max-age=3600' } });
  } catch {
    return NextResponse.json({ error: 'X 미리보기를 불러오지 못했습니다.' }, { status: 502 });
  }
}
