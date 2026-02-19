import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { Task } from '@/lib/types';

const TASKS_FILE = '/data/workspace/.tasks.json';

function readTasks(): Task[] {
  try {
    const data = readFileSync(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeTasks(tasks: Task[]) {
  writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

export async function GET() {
  return NextResponse.json(readTasks());
}

export async function POST(request: Request) {
  const body = await request.json();
  const tasks = readTasks();
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: body.title || '',
    description: body.description || '',
    status: body.status || 'backlog',
    assignee: body.assignee || 'lanamour',
    project: body.project || '',
    projectId: body.projectId || '',
    dueDate: body.dueDate || undefined,
    createdAt: new Date().toISOString().split('T')[0],
    cronJobId: body.cronJobId || undefined,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const tasks = readTasks();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 });
  tasks[idx] = { ...tasks[idx], ...updates };
  writeTasks(tasks);
  return NextResponse.json(tasks[idx]);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const { id } = body;
  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });
  const tasks = readTasks();
  const filtered = tasks.filter(t => t.id !== id);
  if (filtered.length === tasks.length) return NextResponse.json({ error: 'not found' }, { status: 404 });
  writeTasks(filtered);
  return NextResponse.json({ success: true });
}
