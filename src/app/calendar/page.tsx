import { calendarEvents } from '@/lib/mockData';
import { CalendarGrid } from '@/components/CalendarGrid';

export default function CalendarPage() {
  const eventsByType = {
    cron: calendarEvents.filter(e => e.type === 'cron'),
    deadlines: calendarEvents.filter(e => e.type === 'deadline'),
    milestones: calendarEvents.filter(e => e.type === 'milestone'),
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Calendar</h1>
        <p className="text-zinc-400">Schedule and track important dates</p>
      </div>

      {/* Event type legend */}
      <div className="mb-6">
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600" />
            <span className="text-zinc-300">Cron Jobs ({eventsByType.cron.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600" />
            <span className="text-zinc-300">Deadlines ({eventsByType.deadlines.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-600" />
            <span className="text-zinc-300">Milestones ({eventsByType.milestones.length})</span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1">
        <CalendarGrid events={calendarEvents} />
      </div>
    </div>
  );
}