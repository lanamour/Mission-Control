import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function GET() {
  try {
    const raw = JSON.parse(readFileSync('/data/.openclaw/openclaw.json', 'utf-8'));
    const defaults = raw?.agents?.defaults || {};

    const parsed = {
      model: defaults?.model?.primary || null,
      heartbeatModel: defaults?.heartbeat?.model || null,
      compactionMode: defaults?.compaction?.mode || 'default',
      memoryFlush: defaults?.compaction?.memoryFlush?.enabled || false,
      memoryFlushThreshold: defaults?.compaction?.memoryFlush?.softThresholdTokens || null,
      contextPruning: defaults?.contextPruning?.mode || 'off',
      contextPruningTtl: defaults?.contextPruning?.ttl || null,
      memorySearch: defaults?.memorySearch?.enabled || false,
      hybridSearch: defaults?.memorySearch?.query?.hybrid?.enabled || false,
      sessionMemory: defaults?.memorySearch?.experimental?.sessionMemory || false,
      maxConcurrent: defaults?.maxConcurrent || 4,
      subagentsConcurrent: defaults?.subagents?.maxConcurrent || 8,
    };

    // Redact sensitive values
    const safeRaw = JSON.parse(JSON.stringify(raw));
    if (safeRaw.env?.vars) {
      for (const key of Object.keys(safeRaw.env.vars)) {
        safeRaw.env.vars[key] = '***REDACTED***';
      }
    }
    if (safeRaw.channels?.telegram?.botToken) safeRaw.channels.telegram.botToken = '***REDACTED***';
    if (safeRaw.gateway?.auth?.token) safeRaw.gateway.auth.token = '***REDACTED***';

    return NextResponse.json({ parsed, raw: safeRaw });
  } catch (err: any) {
    return NextResponse.json({ parsed: null, raw: null, error: err.message });
  }
}
