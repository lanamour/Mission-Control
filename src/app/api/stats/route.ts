import { NextResponse } from 'next/server';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const WORKSPACE = '/data/workspace';

function countWordsInFile(fp: string): number {
  try {
    return readFileSync(fp, 'utf-8').split(/\s+/).filter(Boolean).length;
  } catch { return 0; }
}

export async function GET() {
  let memoryFiles = 0;
  let totalWords = 0;

  // Root md files
  for (const f of ['MEMORY.md', 'SOUL.md', 'IDENTITY.md', 'USER.md', 'TOOLS.md']) {
    const fp = join(WORKSPACE, f);
    if (existsSync(fp)) {
      memoryFiles++;
      totalWords += countWordsInFile(fp);
    }
  }

  // memory/ dir
  const memDir = join(WORKSPACE, 'memory');
  if (existsSync(memDir)) {
    try {
      for (const f of readdirSync(memDir)) {
        if (f.endsWith('.md')) {
          memoryFiles++;
          totalWords += countWordsInFile(join(memDir, f));
        }
      }
    } catch { /* skip */ }
  }

  return NextResponse.json({
    tasksInProgress: 7,
    tasksDone: 7,
    activeAgents: 4,
    memoryFiles,
    totalWords,
    cronJobsActive: 3,
    lpProspects: '50+',
    uptime: '4 days',
  });
}
