import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Login failed. Check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="glass-panel w-full max-w-md rounded-3xl p-8 shadow-glow"
      >
        <p className="font-display text-3xl font-bold text-emerald-200">
          FRA Atlas
        </p>

        <p className="mt-2 text-sm text-white/60">
          Sign in to access the GIS decision support system.
        </p>

        <div className="mt-8 space-y-4">
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
          />

          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-emerald-400"
          />

          {error ? (
            <p className="text-sm text-red-300">{error}</p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-sm text-white/60">
          New account?{' '}
          <Link to="/register" className="text-emerald-300">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}