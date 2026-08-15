// src/pages/BookingsPage.tsx
// Only reachable when logged in — ProtectedRoute guards this page's route.
import { BookingBadge } from "../components/BookingBadge";
import useAuthStore from "../store/authStore";
import { SAMPLE_BOOKING } from "../data/mockData";

function BookingsPage() {
  const userName = useAuthStore((state) => state.userName);

  return (
    <section>
      <h2 className="font-display text-2xl mb-3">My hall pass</h2>
      <p className="text-sm text-ink-dim dark:text-chalk-dim mb-4">
        Logged in as {userName}.
      </p>
      <BookingBadge booking={SAMPLE_BOOKING}>
        <span>Scheduled for {SAMPLE_BOOKING.scheduledAt.toLocaleDateString()}</span>
      </BookingBadge>
    </section>
  );
}

export default BookingsPage;
