import { NextResponse } from 'next/server';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, basename } from 'path';

const WORKSPACE = '/data/workspace';

const ROOT_FILES: Record<string, string> = {
  'MEMORY.md': 'longterm',
  'SOUL.md': 'soul',
  'IDENTITY.md': 'identity',
  'USER.md': 'identity',
  'TOOLS.md': 'tools',
};

function extractTitle(content: string, filename: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : filename.replace(/\.md$/i, '');
}

function processFile(filePath: string, type: string): object | null {
  try {
    const stat = statSync(filePath);
    const content = readFileSync(filePath, 'utf-8');
    const title = extractTitle(content, basename(filePath));
    const wordCount = content.split(/\s+/).filter(Boolean).length;
    return {
      id: filePath.replace(WORKSPACE + '/', '').replace(/[\/\.]/g, '-'),
      title,
      type,
      filePath: filePath.replace(WORKSPACE + '/', ''),
      content,
      wordCount,
      lastUpdated: stat.mtime.toISOString(),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const docs: object[] = [];

  // Root files
  for (const [file, type] of Object.entries(ROOT_FILES)) {
    const fp = join(WORKSPACE, file);
    if (existsSync(fp)) {
      const doc = processFile(fp, type);
      if (doc) docs.push(doc);
    }
  }

  // Daily logs
  const memDir = join(WORKSPACE, 'memory');
  if (existsSync(memDir)) {
    try {
      for (const file of readdirSync(memDir)) {
        if (file.endsWith('.md')) {
          const doc = processFile(join(memDir, file), 'daily');
          if (doc) docs.push(doc);
        }
      }
    } catch { /* skip */ }
  }

  // Sort by lastUpdated desc
  docs.sort((a: any, b: any) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  return NextResponse.json(docs);
}
