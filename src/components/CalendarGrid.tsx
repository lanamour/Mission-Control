'use client';

import { useState } from 'react';
import { CalendarEvent } from '@/lib/types';

interface CalendarGridProps {
  events: CalendarEvent[];
}

export function CalendarGrid({ events }: CalendarGridProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDay = (day: number) => {
    const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === currentDateStr);
  };

  const getRecurringEventsForDay = (dayOfWeek: number) => {
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const dayName = dayMap[dayOfWeek];
    return events.filter(event => event.day === dayName && event.recurring);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === month && 
           today.getFullYear() === year;
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="calendar-day opacity-50">
          <span className="text-zinc-600">
            {new Date(year, month, -firstDayOfWeek + i + 1).getDate()}
          </span>
        </div>
      );
    }

    // Days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayOfWeek = new Date(year, month, day).getDay();
      const dayEvents = getEventsForDay(day);
      const recurringEvents = getRecurringEventsForDay(dayOfWeek);
      const allEvents = [...dayEvents, ...recurringEvents];

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday(day) ? 'today' : ''}`}
          onClick={() => setSelectedDay(selectedDay === day ? null : day)}
        >
          <span className={`text-sm font-medium ${isToday(day) ? 'text-white' : 'text-zinc-300'}`}>
            {day}
          </span>
          
          <div className="mt-1 space-y-1">
            {allEvents.slice(0, 3).map((event, index) => (
              <div
                key={`${event.id}-${day}-${index}`}
                className="text-xs px-1 py-0.5 rounded truncate"
                style={{ backgroundColor: event.color, color: 'white' }}
              >
                {event.title}
              </div>
            ))}
            {allEvents.length > 3 && (
              <div className="text-xs text-zinc-500">
                +{allEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-zinc-800">
        <h2 className="text-xl font-semibold text-white">
          {monthNames[month]} {year}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="calendar-grid border-b border-zinc-800">
        {dayNames.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-zinc-400 bg-zinc-800">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="calendar-grid">
        {renderCalendarDays()}
      </div>

      {/* Event details for selected day */}
      {selectedDay && (
        <div className="p-6 border-t border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-3">
            Events for {monthNames[month]} {selectedDay}
          </h3>
          <div className="space-y-2">
            {(() => {
              const dayOfWeek = new Date(year, month, selectedDay).getDay();
              const dayEvents = getEventsForDay(selectedDay);
              const recurringEvents = getRecurringEventsForDay(dayOfWeek);
              const allEvents = [...dayEvents, ...recurringEvents];
              
              if (allEvents.length === 0) {
                return <p className="text-zinc-400">No events scheduled</p>;
              }
              
              return allEvents.map((event, index) => (
                <div key={`${event.id}-detail-${index}`} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: event.color }}
                  />
                  <div>
                    <p className="text-white font-medium">{event.title}</p>
                    {event.time && <p className="text-zinc-400 text-sm">{event.time}</p>}
                    {event.recurring && <p className="text-zinc-500 text-xs">Recurring</p>}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      )}
    </div>
  );
}