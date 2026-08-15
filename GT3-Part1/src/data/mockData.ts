// src/data/mockData.ts
// Moved out of App.tsx so more than one page can share the same tutors,
// sessions, and booking data.
import type { User, TutoringSession, Booking } from "../types";
import { UserRole, BookingStatus } from "../types";

export const MOCK_TUTORS: User[] = [
  { id: 1, name: "Mathematics", email: "alodia@tutorprof.com", role: UserRole.Tutor, isActive: true },
  { id: 2, name: "Science", email: "knite@tutorprof.com", role: UserRole.Tutor, isActive: true },
  { id: 3, name: "History", email: "hakken@tutorprof.com", role: UserRole.Tutor, isActive: false },
];

export const MOCK_SESSIONS: TutoringSession[] = [
  { id: 101, tutorId: 1, subject: "Geometry", ratePerHour: 25, availableSlots: 5 },
  { id: 102, tutorId: 1, subject: "Algebra", ratePerHour: 30, availableSlots: 3 },
  { id: 103, tutorId: 2, subject: "Physics", ratePerHour: 28, availableSlots: 2 },
  { id: 104, tutorId: 2, subject: "Astronomy", ratePerHour: 22, availableSlots: 4 },
  { id: 105, tutorId: 3, subject: "World History", ratePerHour: 20, availableSlots: 6 },
];

export const SAMPLE_BOOKING: Booking = {
  id: 1001,
  sessionId: 101,
  tuteeId: 99,
  status: BookingStatus.Confirmed,
  scheduledAt: new Date("2026-08-01T10:00:00Z"),
};

export const TILTS: Array<"a" | "b" | "c"> = ["a", "b", "c"];
