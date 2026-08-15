// src/pages/TutorDetailPage.tsx
import { useParams, useNavigate } from "react-router";
import { SessionCard } from "../components/SessionCard";
import { MOCK_TUTORS, MOCK_SESSIONS } from "../data/mockData";

function TutorDetailPage() {
  // Reads whatever is in the :id slot of the URL.
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // The URL is user input — it can be anything, including garbage.
  const tutor = MOCK_TUTORS.find((t) => t.id === Number(id));

  if (tutor === undefined) {
    return (
      <div className="p-4 border-2 border-dashed border-marker-coral rounded-lg text-marker-coral bg-marker-coral/5">
        No tutor found with id "{id}".
      </div>
    );
  }

  const tutorSessions = MOCK_SESSIONS.filter((s) => s.tutorId === tutor.id);

  return (
    <div>
      <h2 className="font-display text-2xl mb-1">{tutor.name}</h2>
      <p className="text-sm text-ink-dim dark:text-chalk-dim font-mono mb-4">{tutor.email}</p>

      <span
        className={`inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-full mb-6 ${
          tutor.isActive
            ? "bg-marker-green/15 text-marker-green"
            : "bg-ink-dim/15 text-ink-dim"
        }`}
      >
        {tutor.isActive ? "Active" : "Away"}
      </span>

      <h3 className="font-display text-lg mb-2">Sessions with this tutor</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {tutorSessions.length === 0 ? (
          <p className="text-ink-dim dark:text-chalk-dim text-sm italic">No sessions listed yet.</p>
        ) : (
          tutorSessions.map((session) => <SessionCard key={session.id} session={session} />)
        )}
      </div>

      <button
        onClick={() => navigate("/tutors")}
        className="px-4 py-2 bg-marker-green dark:bg-chalk text-white dark:text-board rounded-md hover:brightness-110 transition-all text-sm font-medium"
      >
        ← Back to tutors
      </button>
    </div>
  );
}

export default TutorDetailPage;
