// src/pages/NotFoundPage.tsx
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="p-4 border-2 border-dashed border-marker-coral rounded-lg text-marker-coral bg-marker-coral/5">
      <h2 className="font-display text-2xl mb-2">The board got erased</h2>
      <p className="text-sm mb-3">404 — nothing lives at this URL.</p>
      <Link to="/" className="text-marker-blue underline hover:brightness-110 text-sm font-medium">
        Go back to the Dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;
