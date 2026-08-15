// src/pages/DashboardPage.tsx
import { useToggle } from "../hooks/useToggle";
import { MOCK_TUTORS, MOCK_SESSIONS } from "../data/mockData";

function DashboardPage() {
  const [showDetails, toggleDetails] = useToggle(false);

  const activeTutorCount = MOCK_TUTORS.filter((t) => t.isActive).length;
  const totalOpenSlots = MOCK_SESSIONS.reduce((sum, s) => sum + s.availableSlots, 0);

  return (
    <div>
      <h1 className="font-display text-3xl leading-none mb-1">Welcome back</h1>
      <p className="text-sm text-ink-dim dark:text-chalk-dim mb-6">
        GT3 Part 1 by Wyeth Irish Mendez | IT4C
      </p>

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

      {/* ===== Notebook ===== */}
      <section className="mb-6">
        <h2 className="font-display text-2xl mb-3">Notebook</h2>
        <button
          onClick={toggleDetails}
          className="px-4 py-2 border-2 border-ink/15 dark:border-chalk/25 rounded-md mb-3 hover:border-marker-blue transition-colors text-sm font-medium"
        >
          {showDetails ? "Close page" : "Flip page open"}
        </button>

        {showDetails && (
          <div className="notebook-spiral pl-7 pr-4 py-4 bg-paper-panel dark:bg-board-panel rounded-r-md border border-ink/10 dark:border-chalk/15">
            <p className="font-display text-lg mb-2">How this page works</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-ink-dim dark:text-chalk-dim">
              <li>The nav bar, dark mode, and Outlet all live in Layout now.</li>
              <li>Sessions and tutors live in src/data/mockData.ts, shared by every page.</li>
              <li>A Zustand store tracks login state; Bookings is a protected route.</li>
              <li>Tutor cards link to /tutors/:id, read with a typed useParams.</li>
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
