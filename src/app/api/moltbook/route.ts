import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = 'moltbook_sk_EINI8zCvTvNffimGGqa4JdQo8DFOtbOz';

    // Get profile
    const profileRes = await fetch('https://www.moltbook.com/api/v1/agents/me', {
      headers: { 'x-api-key': apiKey },
      next: { revalidate: 0 },
    });
    const profileData = await profileRes.json();

    // Get hot posts from r/crypto
    const hotRes = await fetch('https://www.moltbook.com/api/v1/posts?submolt=crypto&sort=hot&limit=10', {
      headers: { 'x-api-key': apiKey },
      next: { revalidate: 0 },
    });
    let posts: any[] = [];
    try {
      const hotData = await hotRes.json();
      posts = hotData?.posts || hotData?.data || (Array.isArray(hotData) ? hotData : []);
    } catch {}

    return NextResponse.json({
      profile: profileData?.agent || null,
      posts,
    });
  } catch (err: any) {
    return NextResponse.json({ profile: null, posts: [], error: err.message });
  }
}
