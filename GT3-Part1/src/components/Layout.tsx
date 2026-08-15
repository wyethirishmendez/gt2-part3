// src/components/Layout.tsx
import { NavLink, Outlet } from "react-router";
import { useToggle } from "../hooks/useToggle";
import useAuthStore from "../store/authStore";

function Layout() {
  // Dark mode moves here, out of App.tsx, so every page inherits it.
  const [isDarkMode, toggleDarkMode] = useToggle(false);
  const userName = useAuthStore((state) => state.userName);
  const logout = useAuthStore((state) => state.logout);

  const base =
    "px-3 py-1.5 rounded-full text-sm font-medium border-2 transition-colors";
  
  // NavLink hands this function an isActive flag on every render.
  const linkClass = ({ isActive }: { isActive: boolean }): string => {
    if (isActive) {
      return isDarkMode
        ? `${base} bg-chalk border-chalk text-board`
        : `${base} bg-marker-green border-marker-green text-white`;
    }
    return `${base} border-ink/15 dark:border-chalk/25 text-ink-dim dark:text-chalk-dim hover:border-marker-green`;
  };

  return (
    <div className={isDarkMode ? "dark texture-board" : "texture-paper"}>
      <div className="min-h-screen transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-5 py-6 text-ink dark:text-chalk">
          <nav className="flex flex-wrap items-center gap-2 pb-6">
            <div className={`h-11 w-11 shrink-0 rounded-full flex items-center justify-center font-display text-lg shadow-md rotate-[-4deg] mr-2 ${
              isDarkMode
                ? "bg-chalk text-board"
                : "bg-marker-green text-white"
            }`}>
              PT
            </div>
            <span className="font-display text-xl mr-4">Peer Tutoring</span>

            <NavLink to="/" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/tutors" className={linkClass}>
              Tutors
            </NavLink>
            <NavLink to="/sessions" className={linkClass}>
              Sessions
            </NavLink>
            <NavLink to="/bookings" className={linkClass}>
              Bookings
            </NavLink>

            {userName === null ? (
              <NavLink to="/login" className={linkClass}>
                Login
              </NavLink>
            ) : (
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-full text-sm font-medium border-2 border-ink/15 dark:border-chalk/25 text-ink-dim dark:text-chalk-dim hover:border-marker-coral transition-colors"
              >
                Logout ({userName})
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className={`ml-auto flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-colors text-sm font-medium ${
                isDarkMode
                  ? "border-chalk bg-chalk text-board"
                  : "border-marker-green bg-marker-green text-white"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${isDarkMode ? "bg-board" : "bg-white"}`}
              />
              {isDarkMode ? "Chalkboard mode" : "Whiteboard mode"}
            </button>
          </nav>

          <div className="chalk-rule dark:block hidden" />
          <div className="paper-rule dark:hidden block" />

          <main className="pt-6">
            <Outlet /> {/* whichever child route matched renders here */}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
