import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

const WORKSPACE = '/data/workspace';
const QUEUE_FILE = join(WORKSPACE, '.action-queue.json');

function readFile(path: string): string {
  try {
    return readFileSync(path, 'utf-8');
  } catch {
    return `File not found: ${path}`;
  }
}

function queueAction(action: string, details: string) {
  const queue = existsSync(QUEUE_FILE)
    ? JSON.parse(readFileSync(QUEUE_FILE, 'utf-8'))
    : [];
  queue.push({
    action,
    details,
    timestamp: new Date().toISOString(),
    status: 'pending',
  });
  writeFileSync(QUEUE_FILE, JSON.stringify(queue, null, 2));
}

export async function POST(req: NextRequest) {
  const { actionId } = await req.json();

  try {
    switch (actionId) {
      case 'market-scan': {
        queueAction('market-scan', 'Run GTCP market intelligence scan');
        // Also return latest market context from memory
        const memory = readFile(join(WORKSPACE, 'MEMORY.md'));
        const marketSection = memory.split('### Market Context')[1]?.split('\n##')[0] || 'No market data yet';
        return NextResponse.json({
          status: 'queued',
          message: '📊 Market scan queued — Lanamour will run it on next heartbeat.',
          preview: `**Latest cached data:**\n${marketSection.trim()}`,
        });
      }

      case 'deal-sourcing': {
        queueAction('deal-sourcing', 'Scan auctions & dealers for GTCP pipeline');
        return NextResponse.json({
          status: 'queued',
          message: '🏎️ Deal sourcing queued — will scan Collecting Cars, RM Sotheby\'s, Bonhams.',
        });
      }

      case 'check-portfolio': {
        const memory = readFile(join(WORKSPACE, 'MEMORY.md'));
        const investSection = memory.split('## Investments')[1]?.split('\n## ')[0] || '';
        return NextResponse.json({
          status: 'instant',
          message: '💰 Portfolio snapshot',
          data: investSection.trim() || 'No investment data found in memory.',
        });
      }

      case 'check-email': {
        queueAction('check-email', 'Scan inbox for urgent unread messages');
        return NextResponse.json({
          status: 'queued',
          message: '📧 Email check queued — Lanamour will scan on next heartbeat.',
          note: '⚠️ Google Workspace (lanamouropen@gmail.com) is currently disabled. Needs OAuth with emmanueldaien@gmail.com.',
        });
      }

      case 'check-calendar': {
        queueAction('check-calendar', 'Check upcoming events in next 48h');
        // Return cron jobs as a preview
        const tools = readFile(join(WORKSPACE, 'TOOLS.md'));
        const cronSection = tools.split('## Cron Jobs')[1]?.split('\n## ')[0] || '';
        return NextResponse.json({
          status: 'queued',
          message: '📅 Calendar check queued.',
          preview: `**Scheduled cron jobs:**\n${cronSection.trim()}`,
        });
      }

      case 'update-memory': {
        const memory = readFile(join(WORKSPACE, 'MEMORY.md'));
        const wordCount = memory.split(/\s+/).length;
        // List recent daily files
        const memoryDir = join(WORKSPACE, 'memory');
        let dailyFiles: string[] = [];
        if (existsSync(memoryDir)) {
          dailyFiles = readdirSync(memoryDir)
            .filter(f => f.endsWith('.md'))
            .sort()
            .reverse()
            .slice(0, 5);
        }
        queueAction('update-memory', 'Review and consolidate memory files');
        return NextResponse.json({
          status: 'queued',
          message: '🧠 Memory review queued.',
          data: `MEMORY.md: ${wordCount} words\nRecent daily files: ${dailyFiles.join(', ') || 'none'}`,
        });
      }

      case 'web-search': {
        queueAction('web-search', 'Awaiting search query from user');
        return NextResponse.json({
          status: 'queued',
          message: '🔍 What do you want me to search? Drop a query in Telegram and I\'ll research it.',
        });
      }

      case 'moltbook': {
        queueAction('moltbook', 'Check Moltbook posts and engage');
        const memory = readFile(join(WORKSPACE, 'MEMORY.md'));
        const moltSection = memory.match(/Moltbook:.*karma \d+/)?.[0] || '';
        return NextResponse.json({
          status: 'queued',
          message: '🦞 Moltbook engagement queued.',
          preview: moltSection || '@lanamour — will browse and comment on next heartbeat.',
        });
      }

      case 'lp-research': {
        const lpFile = join(WORKSPACE, 'gtcp/lp-research.md');
        if (existsSync(lpFile)) {
          const content = readFile(lpFile);
          const lines = content.split('\n').length;
          const prospects = (content.match(/^##/gm) || []).length;
          queueAction('lp-research', 'Find new LP prospects');
          return NextResponse.json({
            status: 'queued',
            message: '🏦 LP research queued — will find new prospects.',
            data: `Current file: ${lines} lines, ~${prospects} prospect sections`,
          });
        }
        queueAction('lp-research', 'Find new LP prospects');
        return NextResponse.json({
          status: 'queued',
          message: '🏦 LP research queued.',
        });
      }

      case 'generate-report': {
        queueAction('generate-report', 'Generate weekly summary report');
        return NextResponse.json({
          status: 'queued',
          message: '📝 Report generation queued — Lanamour will compile and deliver via Telegram.',
        });
      }

      default:
        return NextResponse.json({ status: 'error', message: `Unknown action: ${actionId}` }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}

// GET: check queue status
export async function GET() {
  if (!existsSync(QUEUE_FILE)) {
    return NextResponse.json({ queue: [] });
  }
  const queue = JSON.parse(readFileSync(QUEUE_FILE, 'utf-8'));
  return NextResponse.json({ queue });
}
