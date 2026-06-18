import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/beneficiaries', label: 'Beneficiaries' },
  { to: '/map', label: 'GIS Map' },
  { to: '/documents', label: 'OCR' },
  { to: '/satellite', label: 'Satellite AI' },
  { to: '/recommendations', label: 'Recommendations' },
  { to: '/reports', label: 'Reports' },
];

export function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-white/10 bg-black/20 p-6 backdrop-blur-xl lg:border-r">
          <div className="mb-10">
            <p className="font-display text-2xl font-bold tracking-tight text-emerald-300">FRA Atlas</p>
            <p className="mt-2 text-sm text-white/60">AI-Powered WebGIS decision support</p>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `block rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-emerald-500/20 text-emerald-200' : 'text-white/70 hover:bg-white/5 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.28em] text-white/50">Signed in as</p>
            <p className="mt-2 font-semibold">{user?.name}</p>
            <p className="text-sm text-white/60">{user?.role}</p>
            <button onClick={logout} className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm hover:bg-white/15">
              Logout
            </button>
          </div>
        </aside>
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
