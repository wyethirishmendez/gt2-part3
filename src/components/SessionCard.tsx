import React from 'react';
import type { TutoringSession } from '../types';

interface SessionCardProps {
  session: TutoringSession;
  variant?: "default" | "compact";
}

const MAX_SLOTS_SHOWN = 6;

export const SessionCard: React.FC<SessionCardProps> = ({ session, variant = "default" }) => {
  const isCompact = variant === "compact";
  const dots = Math.min(session.availableSlots, MAX_SLOTS_SHOWN);
  const overflow = session.availableSlots > MAX_SLOTS_SHOWN;

  return (
    <div
      className={`bg-paper-panel dark:bg-board-panel border-2 border-dashed border-marker-blue/40 dark:border-chalk/30 rounded-md flex items-center gap-4 ${
        isCompact ? 'p-3' : 'p-4'
      }`}
    >
      <div className="font-mono text-xs text-ink-dim dark:text-chalk-dim shrink-0 leading-tight text-center w-14">
        <div className="text-[10px] uppercase tracking-wide">rate</div>
        <div className="text-base font-semibold text-marker-coral">${session.ratePerHour}</div>
        <div className="text-[10px]">/hr</div>
      </div>

      <div className="border-l-2 border-dashed border-marker-blue/30 dark:border-chalk/20 pl-4 flex-1 min-w-0">
        <h4 className={`font-display text-ink dark:text-chalk ${isCompact ? 'text-base' : 'text-lg'} leading-tight truncate`}>
          {session.subject}
        </h4>
        {!isCompact && (
          <div className="mt-1.5 flex items-center gap-1.5" aria-label={`${session.availableSlots} slots available`}>
            {Array.from({ length: dots }).map((_, i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-marker-green" />
            ))}
            {overflow && <span className="text-[10px] font-mono text-marker-green ml-0.5">+{session.availableSlots - MAX_SLOTS_SHOWN}</span>}
            <span className="text-xs font-mono text-ink-dim dark:text-chalk-dim ml-1">
              {session.availableSlots} open
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
