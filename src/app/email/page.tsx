'use client';

import { useState, useEffect } from 'react';

interface Email {
  id: string;
  to: string[];
  from: string;
  subject: string;
  created_at: string;
  last_event: string;
  bcc?: string[];
  cc?: string[];
}

const statusColors: Record<string, { bg: string; text: string }> = {
  delivered: { bg: 'bg-green-600/20', text: 'text-green-400' },
  sent: { bg: 'bg-blue-600/20', text: 'text-blue-400' },
  bounced: { bg: 'bg-red-600/20', text: 'text-red-400' },
  complained: { bg: 'bg-yellow-600/20', text: 'text-yellow-400' },
  opened: { bg: 'bg-emerald-600/20', text: 'text-emerald-400' },
  clicked: { bg: 'bg-purple-600/20', text: 'text-purple-400' },
};

function timeAgo(ts: string): string {
  const now = Date.now();
  const then = new Date(ts).getTime();
  const diff = now - then;
  const min = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

export default function EmailPage() {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<string | null>(null);

  // Compose form
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    fetch('/api/emails')
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setEmails(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSend = async () => {
    if (!to || !subject) return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch('/api/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: [to], subject, text: body }),
      });
      const data = await res.json();
      if (data.id) {
        setSendResult('✅ Sent!');
        setTo(''); setSubject(''); setBody('');
        // Refresh list
        const listRes = await fetch('/api/emails');
        const listData = await listRes.json();
        if (Array.isArray(listData)) setEmails(listData);
        setTimeout(() => { setShowCompose(false); setSendResult(null); }, 1500);
      } else {
        setSendResult('❌ ' + (data.error || 'Failed'));
      }
    } catch (err: any) {
      setSendResult('❌ ' + err.message);
    } finally {
      setSending(false);
    }
  };

  const delivered = emails.filter(e => e.last_event === 'delivered').length;
  const bounced = emails.filter(e => e.last_event === 'bounced').length;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 md:mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Email</h1>
          <p className="text-zinc-400 text-sm md:text-base">lanamour@lanamour.net</p>
        </div>
        <button
          onClick={() => setShowCompose(!showCompose)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {showCompose ? 'Cancel' : '✉️ Compose'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : emails.length}</p>
              <p className="text-sm text-zinc-400">Total Sent</p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">📧</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : delivered}</p>
              <p className="text-sm text-zinc-400">Delivered</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">✅</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : bounced}</p>
              <p className="text-sm text-zinc-400">Bounced</p>
            </div>
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⚠️</span>
            </div>
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">{loading ? '…' : new Set(emails.flatMap(e => e.to)).size}</p>
              <p className="text-sm text-zinc-400">Recipients</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">👥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compose */}
      {showCompose && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">New Email</h2>
          <div className="space-y-3">
            <input
              value={to}
              onChange={e => setTo(e.target.value)}
              placeholder="To (email address)"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              placeholder="Message body..."
              rows={5}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-zinc-500">Sent from lanamour@lanamour.net · BCC to emmanueldaien@gmail.com</p>
              <div className="flex items-center gap-3">
                {sendResult && <span className="text-sm">{sendResult}</span>}
                <button
                  onClick={handleSend}
                  disabled={sending || !to || !subject}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-zinc-800 rounded w-1/3 mb-2" />
                <div className="h-3 bg-zinc-800 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : emails.length > 0 ? (
          <div className="space-y-2">
            {emails.map(email => {
              const sc = statusColors[email.last_event] || statusColors.sent;
              return (
                <div key={email.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white truncate">{email.subject || '(no subject)'}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.text} flex-shrink-0`}>
                          {email.last_event}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 truncate">
                        To: {email.to.join(', ')}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-500 flex-shrink-0">{timeAgo(email.created_at)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-lg mb-2">No emails yet</p>
            <p className="text-zinc-600 text-sm">Hit Compose to send your first email</p>
          </div>
        )}
      </div>
    </div>
  );
}
