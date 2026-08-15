import React from 'react';
import type { User } from '../types';

interface TutorCardProps {
  tutor: User;
  onSelect: (tutor: User) => void;
  tilt?: 'a' | 'b' | 'c';
}

const NOTE_COLORS = [
  'bg-sticky-butter',
  'bg-sticky-blue',
  'bg-sticky-mint',
  'bg-sticky-blush',
];

export const TutorCard: React.FC<TutorCardProps> = ({ tutor, onSelect, tilt = 'a' }) => {
  const noteColor = NOTE_COLORS[tutor.id % NOTE_COLORS.length];

  return (
    <div
      className={`sticky-tilt-${tilt} relative rounded-sm ${noteColor} text-ink p-5 pt-6 shadow-md flex flex-col gap-2 transition-transform duration-200`}
    >
      <span
        className="push-pin absolute -top-1.5 left-1/2 -translate-x-1/2 bg-marker-coral"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-xl leading-tight">{tutor.name}</h3>
        <span
          className={`mt-1 inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-full ${
            tutor.isActive
              ? 'bg-marker-green/15 text-marker-green'
              : 'bg-ink-dim/15 text-ink-dim'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${tutor.isActive ? 'bg-marker-green' : 'bg-ink-dim'}`}
          />
          {tutor.isActive ? 'Active' : 'Away'}
        </span>
      </div>

      <p className="text-sm text-ink-dim font-mono break-all">{tutor.email}</p>

      <button
<<<<<<< HEAD
        className="mt-3 self-start px-4 py-1.5 bg-ink text-paper text-sm font-medium rounded hover:bg-marker-green dark:hover:bg-chalk transition-colors"
=======
        className="mt-3 self-start px-4 py-1.5 bg-ink text-paper text-sm font-medium rounded hover:bg-marker-blue transition-colors"
>>>>>>> 2d3a340683bebfcb6d08dcdbb92eb81023aaf73f
        onClick={(_e: React.MouseEvent<HTMLButtonElement>) => onSelect(tutor)}
      >
        Pick this tutor →
      </button>
    </div>
  );
};
