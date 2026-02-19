import { NextResponse } from 'next/server';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

interface ActivityEvent {
  id: string;
  type: string;
  icon: string;
  title: string;
  status: string;
  timestamp: string;
  detail?: string;
}

export async function GET() {
  const events: ActivityEvent[] = [];

  // 1. Cron jobs
  try {
    const cronData = JSON.parse(readFileSync('/data/.openclaw/cron/jobs.json', 'utf-8'));
    for (const job of cronData.jobs || []) {
      events.push({
        id: `cron-${job.id}`,
        type: 'cron',
        icon: '⏰',
        title: job.name || 'Cron Job',
        status: job.enabled ? 'active' : 'disabled',
        timestamp: job.updatedAt ? new Date(job.updatedAt).toISOString() : new Date().toISOString(),
        detail: `Schedule: ${job.schedule?.expr || job.schedule?.kind || 'unknown'}`,
      });
    }
  } catch {}

  // 2. Memory file changes
  try {
    const memDir = '/data/workspace/memory';
    const files = readdirSync(memDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const stat = statSync(join(memDir, file));
      events.push({
        id: `mem-${file}`,
        type: 'memory',
        icon: '🧠',
        title: `Memory updated: ${file}`,
        status: 'info',
        timestamp: stat.mtime.toISOString(),
        detail: `${Math.round(stat.size / 1024)}KB`,
      });
    }
  } catch {}

  // 3. Workspace file changes (MEMORY.md, SOUL.md, etc.)
  const watchFiles = ['MEMORY.md', 'SOUL.md', 'IDENTITY.md', 'TOOLS.md', 'HEARTBEAT.md'];
  for (const file of watchFiles) {
    try {
      const stat = statSync(join('/data/workspace', file));
      events.push({
        id: `ws-${file}`,
        type: 'workspace',
        icon: '📝',
        title: `${file} updated`,
        status: 'info',
        timestamp: stat.mtime.toISOString(),
      });
    } catch {}
  }

  // 4. Session activity
  try {
    const sessDir = '/data/.openclaw/agents/main/sessions';
    const files = readdirSync(sessDir).filter(f => f.endsWith('.jsonl'));
    for (const file of files.slice(-5)) {
      const stat = statSync(join(sessDir, file));
      events.push({
        id: `sess-${file}`,
        type: 'session',
        icon: '💬',
        title: `Session ${file.slice(0, 8)}...`,
        status: 'success',
        timestamp: stat.mtime.toISOString(),
        detail: `${Math.round(stat.size / 1024)}KB transcript`,
      });
    }
  } catch {}

  // 5. Task file changes
  try {
    const stat = statSync('/data/workspace/.tasks.json');
    events.push({
      id: 'tasks-update',
      type: 'tasks',
      icon: '✅',
      title: 'Tasks updated',
      status: 'info',
      timestamp: stat.mtime.toISOString(),
    });
  } catch {}

  // 6. Email activity (from Resend)
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = await res.json();
      for (const email of (data?.data || []).slice(0, 5)) {
        events.push({
          id: `email-${email.id}`,
          type: 'email',
          icon: '📧',
          title: `Email: ${email.subject}`,
          status: email.last_event === 'delivered' ? 'success' : email.last_event,
          timestamp: new Date(email.created_at).toISOString(),
          detail: `To: ${email.to.join(', ')}`,
        });
      }
    }
  } catch {}

  // Sort by timestamp desc
  events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return NextResponse.json(events.slice(0, 30));
}
