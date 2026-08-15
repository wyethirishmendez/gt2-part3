// src/pages/TutorsPage.tsx
import { useState } from "react";
import { Link } from "react-router";
import type { User } from "../types";
import { TutorCard } from "../components/TutorCard";
import { MOCK_TUTORS, TILTS } from "../data/mockData";

function TutorsPage() {
  const [selectedTutor, setSelectedTutor] = useState<User | null>(null);

  return (
    <section>
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
          <div key={tutor.id} className="flex flex-col gap-2">
            <TutorCard tutor={tutor} onSelect={setSelectedTutor} tilt={TILTS[i % TILTS.length]} />
            <Link
              to={`/tutors/${tutor.id}`}
              className="self-start text-xs font-mono text-marker-blue hover:underline"
            >
              View full profile →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TutorsPage;
