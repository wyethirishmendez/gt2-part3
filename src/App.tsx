import React, { useState, useEffect, useRef } from 'react';
import type { User, TutoringSession, Booking } from './types';
import { UserRole, BookingStatus } from './types';
import { TutorCard } from './components/TutorCard';
import { SessionCard } from './components/SessionCard';
import { BookingBadge } from './components/BookingBadge';
import { useToggle } from './hooks/useToggle';
import { usePrevious } from './hooks/usePrevious';

const MOCK_TUTORS: User[] = [
  { id: 1, name: 'Mathematics', email: 'alodia@tutorprof.com', role: UserRole.Tutor, isActive: true },
  { id: 2, name: 'Science', email: 'knite@tutorprof.com', role: UserRole.Tutor, isActive: true },
  { id: 3, name: 'History', email: 'hakken@tutorprof.com', role: UserRole.Tutor, isActive: false },
];

const MOCK_SESSIONS: TutoringSession[] = [
  { id: 101, tutorId: 1, subject: 'Geometry', ratePerHour: 25, availableSlots: 5 },
  { id: 102, tutorId: 1, subject: 'Algebra', ratePerHour: 30, availableSlots: 3 },
  { id: 103, tutorId: 2, subject: 'Physics', ratePerHour: 28, availableSlots: 2 },
  { id: 104, tutorId: 2, subject: 'Astronomy', ratePerHour: 22, availableSlots: 4 },
  { id: 105, tutorId: 3, subject: 'World History', ratePerHour: 20, availableSlots: 6 },
];

const SAMPLE_BOOKING: Booking = {
  id: 1001,
  sessionId: 101,
  tuteeId: 99,
  status: BookingStatus.Confirmed,
  scheduledAt: new Date('2026-08-01T10:00:00Z'),
};

const TILTS: Array<'a' | 'b' | 'c'> = ['a', 'b', 'c'];

function App() {
  const [selectedTutor, setSelectedTutor] = useState<User | null>(null);
  const [sessions, setSessions] = useState<TutoringSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [isDarkMode, toggleDarkMode] = useToggle(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSessions(MOCK_SESSIONS);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timerId);
  }, []);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const focusSearchInput = (): void => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredSessions: TutoringSession[] = sessions.filter((s) =>
    s.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [showDetails, toggleDetails] = useToggle(false);
  const previousSearch = usePrevious<string>(searchTerm);

  // Derived, read-only stats pulled from existing data — no extra state needed.
  const activeTutorCount = MOCK_TUTORS.filter((t) => t.isActive).length;
  const totalOpenSlots = sessions.reduce((sum, s) => sum + s.availableSlots, 0);
  const subjectChips = Array.from(new Set(sessions.map((s) => s.subject)));

  return (
    <div className={`${isDarkMode ? 'dark texture-board' : 'texture-paper'} min-h-screen transition-colors duration-300`}>
      <div className="max-w-5xl mx-auto px-5 py-8 text-ink dark:text-chalk">

        {/* ===== Header ===== */}
        <header className="relative flex flex-wrap items-center justify-between gap-4 pb-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 shrink-0 rounded-full bg-marker-coral flex items-center justify-center font-display text-white text-lg shadow-md rotate-[-4deg]">
              SC
            </div>
            <div>
              <h1 className="font-display text-3xl leading-none">Peer Tutoring</h1>
              <p className="text-sm text-ink-dim dark:text-chalk-dim mt-1">
                GT2 Part 3 by Wyeth Irish Mendez | IT4C
              </p>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-2 px-3 py-2 rounded-full border-2 border-ink/15 dark:border-chalk/25 bg-paper-panel dark:bg-board-panel hover:border-marker-blue transition-colors text-sm font-medium"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${isDarkMode ? 'bg-chalk' : 'bg-ink'}`} />
            {isDarkMode ? 'Chalkboard mode' : 'Whiteboard mode'}
          </button>

          <span className="absolute -top-2 right-0 sm:right-24 rotate-3 bg-marker-yellow text-ink text-[11px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-sm shadow-sm hidden sm:inline-block">
            GT2 · Part 3
          </span>
        </header>

        <div className="chalk-rule dark:block hidden" />
        <div className="paper-rule dark:hidden block" />

        {/* ===== Hero stats ===== */}
        <section className="grid grid-cols-3 gap-3 py-6">
          <div className="text-center">
            <div className="font-display text-3xl text-marker-coral">{MOCK_TUTORS.length}</div>
            <div className="text-xs uppercase tracking-wide text-ink-dim dark:text-chalk-dim">Tutors listed</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl text-marker-green">{activeTutorCount}</div>
            <div className="text-xs uppercase tracking-wide text-ink-dim dark:text-chalk-dim">Online now</div>
          </div>
          <div className="text-center">
            <div className="font-display text-3xl text-marker-blue">{totalOpenSlots}</div>
            <div className="text-xs uppercase tracking-wide text-ink-dim dark:text-chalk-dim">Open slots</div>
          </div>
        </section>

        {/* ===== Search ===== */}
        <section className="mb-10">
          <h2 className="font-display text-2xl mb-3">Search sessions</h2>
          <div className="bg-paper-panel dark:bg-board-panel border-2 border-ink/10 dark:border-chalk/15 rounded-lg p-4">
            <div className="flex flex-wrap gap-2 items-center">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Filter by subject..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="px-3 py-2 border-2 border-ink/15 dark:border-chalk/25 rounded-md bg-transparent w-64 focus:outline-none focus:ring-2 focus:ring-marker-blue placeholder:text-ink-dim/60 dark:placeholder:text-chalk-dim/60"
              />
              <button
                onClick={focusSearchInput}
                className="px-4 py-2 bg-marker-blue hover:brightness-110 text-white rounded-md transition-all text-sm font-medium"
              >
                Jump to search
              </button>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-3 py-2 text-sm text-ink-dim dark:text-chalk-dim hover:text-marker-coral transition-colors"
                >
                  Clear ✕
                </button>
              )}
            </div>

            {subjectChips.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {subjectChips.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSearchTerm(subject)}
                    className={`text-xs font-mono px-2.5 py-1 rounded-full border transition-colors ${
                      searchTerm === subject
                        ? 'bg-marker-yellow border-marker-yellow text-ink'
                        : 'border-ink/15 dark:border-chalk/25 text-ink-dim dark:text-chalk-dim hover:border-marker-yellow'
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            )}

            {previousSearch !== undefined && previousSearch !== searchTerm && (
              <p className="text-xs text-ink-dim dark:text-chalk-dim mt-3 font-mono">
                last search: "{previousSearch}"
              </p>
            )}
          </div>
        </section>

        {/* ===== Tutors ===== */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display text-2xl">Pinned tutors</h2>
            {selectedTutor !== null && (
              <div className="text-sm px-3 py-1 bg-marker-green/15 text-marker-green rounded-full font-medium">
                Selected: {selectedTutor.name}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {MOCK_TUTORS.map((tutor, i) => (
              <TutorCard key={tutor.id} tutor={tutor} onSelect={setSelectedTutor} tilt={TILTS[i % TILTS.length]} />
            ))}
          </div>
        </section>

        {/* ===== Sessions / schedule ===== */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="font-display text-2xl">Class schedule</h2>
            <button
              onClick={() => setIsError(!isError)}
              className="text-xs font-mono px-2.5 py-1 border border-marker-coral/40 text-marker-coral rounded-full hover:bg-marker-coral/10 transition-colors"
            >
              {isError ? 'restore board' : 'simulate error'}
            </button>
          </div>

          {isError ? (
            <div className="p-4 border-2 border-dashed border-marker-coral rounded-lg text-marker-coral bg-marker-coral/5">
              <h3 className="font-display text-lg mb-1">The board got erased</h3>
              <p className="text-sm">Couldn't load the schedule — check your connection and try again.</p>
            </div>
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[1, 2, 3].map((skeleton) => (
                <div key={skeleton} className="border-2 border-dashed border-ink/10 dark:border-chalk/15 p-4 rounded-md h-20 flex items-center gap-4 animate-pulse">
                  <div className="h-8 w-10 bg-ink/10 dark:bg-chalk/10 rounded" />
                  <div className="flex-1">
                    <div className="h-4 bg-ink/10 dark:bg-chalk/10 rounded w-2/3 mb-2" />
                    <div className="h-3 bg-ink/10 dark:bg-chalk/10 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredSessions.length === 0 ? (
            <p className="text-ink-dim dark:text-chalk-dim text-sm italic">Nothing on the board for "{searchTerm}".</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </section>

        {/* ===== Bookings ===== */}
        <section className="mb-10">
          <h2 className="font-display text-2xl mb-3">My hall pass</h2>
          <BookingBadge booking={SAMPLE_BOOKING}>
            <span>Scheduled for {SAMPLE_BOOKING.scheduledAt.toLocaleDateString()}</span>
          </BookingBadge>
        </section>

        {/* ===== Extra details (notebook page) ===== */}
        <section className="mb-6">
          <h2 className="font-display text-2xl mb-3">Notebook</h2>
          <button
            onClick={toggleDetails}
            className="px-4 py-2 border-2 border-ink/15 dark:border-chalk/25 rounded-md mb-3 hover:border-marker-blue transition-colors text-sm font-medium"
          >
            {showDetails ? 'Close page' : 'Flip page open'}
          </button>

          {showDetails && (
            <div className="notebook-spiral pl-7 pr-4 py-4 bg-paper-panel dark:bg-board-panel rounded-r-md border border-ink/10 dark:border-chalk/15">
              <p className="font-display text-lg mb-2">How this page works</p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-ink-dim dark:text-chalk-dim">
                <li>Sessions load asynchronously via useEffect + setTimeout.</li>
                <li>Search filtering is a derived value — not stored in state.</li>
                <li>useRef tracks the search input without causing extra renders.</li>
                <li>usePrevious uses a ref + effect to remember the last search term.</li>
              </ul>
            </div>
          )}
        </section>

      </div>
    </div>
  );
}

export default App;
