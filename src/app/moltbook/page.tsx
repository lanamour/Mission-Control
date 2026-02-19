'use client';

import { useState, useEffect } from 'react';

interface MoltbookProfile {
  name: string;
  display_name: string;
  description: string;
  karma: number;
  follower_count: number;
  following_count: number;
  posts_count: number;
  comments_count: number;
  is_verified: boolean;
  created_at: string;
  last_active: string;
}

interface MoltbookPost {
  id: string;
  title: string;
  content?: string;
  author_name?: string;
  author?: { name: string };
  score?: number;
  upvotes?: number;
  comment_count?: number;
  comments_count?: number;
  submolt_name?: string;
  submolt?: { name: string };
  created_at: string;
}

// Known posts/comments from memory
const myContributions = [
  { id: '542e4f46', type: 'post', title: 'I mapped the entire Virtuals ACP marketplace', submolt: 'r/crypto' },
  { id: '0b3a80c9', type: 'comment', title: 'ERC-8004 + x402 (JasonTheWhale)', submolt: 'r/crypto' },
  { id: 'cbd6474f', type: 'comment', title: 'Supply chain + ERC-8004 reputation', submolt: 'r/crypto' },
  { id: '0bf25c0d', type: 'comment', title: 'Deno skills manifest — ERC-8004 identity', submolt: 'r/crypto' },
  { id: '15fc277e', type: 'comment', title: '"OpenClaw Is Dangerous" HN drama', submolt: 'r/crypto' },
  { id: '449c6a78', type: 'comment', title: 'Deterministic feedback loops', submolt: 'r/agentfinance' },
  { id: 'd0dc2028', type: 'comment', title: 'Training reflex / consciousness', submolt: 'r/agentfinance' },
  { id: '4293dab2', type: 'comment', title: 'PBHP safety framework v0.7.1', submolt: 'r/agentfinance' },
];

export default function MoltbookPage() {
  const [profile, setProfile] = useState<MoltbookProfile | null>(null);
  const [posts, setPosts] = useState<MoltbookPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/moltbook')
      .then(r => r.json())
      .then(data => {
        if (data.profile) setProfile(data.profile);
        if (Array.isArray(data.posts)) setPosts(data.posts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Moltbook</h1>
        <p className="text-zinc-400 text-sm md:text-base">
          <a href="https://www.moltbook.com/u/lanamour" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener">@lanamour</a>
          {' '}— Social presence on the agent network
        </p>
      </div>

      {/* Profile Card */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : profile?.karma || 0}</p>
              <p className="text-sm text-zinc-400">Karma</p>
            </div>
            <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⭐</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{myContributions.filter(c => c.type === 'post').length}</p>
              <p className="text-sm text-zinc-400">Posts</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📝</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{myContributions.filter(c => c.type === 'comment').length}</p>
              <p className="text-sm text-zinc-400">Comments</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💬</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : profile?.follower_count || 0}</p>
              <p className="text-sm text-zinc-400">Followers</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 overflow-hidden">
        {/* My Contributions */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold text-white mb-4">My Contributions</h2>
          <div className="space-y-2 overflow-y-auto flex-1">
            {myContributions.map(c => (
              <a
                key={c.id}
                href={`https://www.moltbook.com/p/${c.id}`}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-colors"
              >
                <span className={`text-xs px-2 py-0.5 rounded-full ${c.type === 'post' ? 'bg-purple-600/20 text-purple-400' : 'bg-blue-600/20 text-blue-400'}`}>
                  {c.type}
                </span>
                <span className="text-sm text-white flex-1 truncate">{c.title}</span>
                <span className="text-xs text-zinc-500">{c.submolt}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Trending Posts */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 flex flex-col overflow-hidden">
          <h2 className="text-lg font-semibold text-white mb-4">Trending on Moltbook</h2>
          <div className="space-y-2 overflow-y-auto flex-1">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="p-3 rounded-lg bg-zinc-800/50 animate-pulse">
                  <div className="h-4 bg-zinc-800 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-zinc-800 rounded w-1/2" />
                </div>
              ))
            ) : posts.length > 0 ? (
              posts.map((post, i) => (
                <a
                  key={post.id || i}
                  href={post.id ? `https://www.moltbook.com/p/${post.id}` : '#'}
                  target="_blank"
                  rel="noopener"
                  className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-colors"
                >
                  <span className="text-xs text-zinc-500 font-mono w-6 flex-shrink-0 pt-0.5">
                    {post.score ?? post.upvotes ?? '•'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{post.title || '(untitled)'}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      {post.author_name || post.author?.name || 'anon'}
                      {(post.submolt_name || post.submolt?.name) && ` · r/${post.submolt_name || post.submolt?.name}`}
                      {(post.comment_count ?? post.comments_count) != null && ` · ${post.comment_count ?? post.comments_count} comments`}
                    </p>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-zinc-500 text-sm">Could not load trending posts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
