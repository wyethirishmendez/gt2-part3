// src/pages/SessionsPage.tsx
import { useState, useEffect, useRef } from "react";
import type { TutoringSession } from "../types";
import { SessionCard } from "../components/SessionCard";
import { usePrevious } from "../hooks/usePrevious";
import { MOCK_SESSIONS } from "../data/mockData";

function SessionsPage() {
  const [sessions, setSessions] = useState<TutoringSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const previousSearch = usePrevious<string>(searchTerm);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSessions(MOCK_SESSIONS);
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timerId);
  }, []);

  const focusSearchInput = (): void => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredSessions: TutoringSession[] = sessions.filter((s) =>
    s.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const subjectChips = Array.from(new Set(sessions.map((s) => s.subject)));

  return (
    <div>
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
              className="px-4 py-2 bg-marker-green dark:bg-chalk text-white dark:text-board rounded-md hover:brightness-110 transition-all text-sm font-medium"
            >
              Jump to search
            </button>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
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
                      ? "bg-marker-yellow border-marker-yellow text-ink"
                      : "border-ink/15 dark:border-chalk/25 text-ink-dim dark:text-chalk-dim hover:border-marker-yellow"
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

      <section>
        <div className="flex items-center gap-3 mb-3">
          <h2 className="font-display text-2xl">Class schedule</h2>
          <button
            onClick={() => setIsError(!isError)}
            className="text-xs font-mono px-2.5 py-1 border border-marker-coral/40 text-marker-coral rounded-full hover:bg-marker-coral/10 transition-colors"
          >
            {isError ? "restore board" : "simulate error"}
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
              <div
                key={skeleton}
                className="border-2 border-dashed border-ink/10 dark:border-chalk/15 p-4 rounded-md h-20 flex items-center gap-4 animate-pulse"
              >
                <div className="h-8 w-10 bg-ink/10 dark:bg-chalk/10 rounded" />
                <div className="flex-1">
                  <div className="h-4 bg-ink/10 dark:bg-chalk/10 rounded w-2/3 mb-2" />
                  <div className="h-3 bg-ink/10 dark:bg-chalk/10 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredSessions.length === 0 ? (
          <p className="text-ink-dim dark:text-chalk-dim text-sm italic">
            Nothing on the board for "{searchTerm}".
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default SessionsPage;
