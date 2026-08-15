import React from 'react';
import type { Booking } from '../types';

interface BookingBadgeProps {
  booking: Booking;
  children?: React.ReactNode;
}

const STATUS_STYLE: Record<string, { bg: string; label: string }> = {
  confirmed: { bg: 'bg-marker-green', label: 'Confirmed' },
  completed: { bg: 'bg-ink-dim', label: 'Completed' },
  requested: { bg: 'bg-marker-yellow', label: 'Requested' },
};

export const BookingBadge: React.FC<BookingBadgeProps> = ({ booking, children }) => {
  const style = STATUS_STYLE[booking.status] ?? STATUS_STYLE.requested;

  return (
    <div className="inline-flex max-w-full rounded-md overflow-hidden shadow-md font-mono text-sm">
      <div className={`${style.bg} text-white px-3 py-3 flex flex-col items-center justify-center gap-1`}>
        <span className="text-[10px] tracking-widest uppercase -rotate-90 whitespace-nowrap">Pass</span>
      </div>
      <div className="ticket-perforation w-0.5 bg-paper-panel dark:bg-board-panel" style={{ ['--_perf-bg' as string]: 'var(--color-paper)' }} />
      <div className="bg-paper-panel dark:bg-board-panel text-ink dark:text-chalk px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="font-display text-base">Booking #{booking.id}</span>
          <span className={`text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-full text-white ${style.bg}`}>
            {style.label}
          </span>
        </div>
        {children && (
          <div className="mt-1.5 pt-1.5 border-t border-dashed border-ink/15 dark:border-chalk/20 text-xs text-ink-dim dark:text-chalk-dim">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};
