// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../store/authStore";

function LoginPage() {
  const [name, setName] = useState<string>("");

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    login(name); // 1. put the token in the store
    navigate("/bookings"); // 2. then send them where they were going
  };

  return (
    <div className="max-w-sm">
      <h2 className="font-display text-2xl mb-3">Login</h2>
      <p className="text-sm text-ink-dim dark:text-chalk-dim mb-4">
        No real password — type any name to get a demo token.
      </p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className="w-full px-3 py-2 border-2 border-ink/15 dark:border-chalk/25 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-marker-blue"
      />
      <button
        onClick={handleLogin}
        disabled={name === ""}
        className="mt-3 px-4 py-2 bg-marker-green dark:bg-chalk text-white dark:text-board rounded-md hover:brightness-110 transition-all text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Log In
      </button>
    </div>
  );
}

export default LoginPage;
