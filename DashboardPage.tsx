import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { api } from '../api/client';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import type { DashboardStats } from '../types';

export function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    void api.get<DashboardStats>('/dashboard/stats').then((response) => setStats(response.data));
  }, []);

  const schemeData = stats ? Object.entries(stats.scheme_breakdown).map(([name, value]) => ({ name, value })) : [];

  return (
    <div>
      <SectionHeader
        title="Dashboard"
        subtitle="Operational overview of beneficiaries, claim status, GIS coverage, and scheme analytics."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats
          ? [
              ['Total Beneficiaries', stats.total_beneficiaries],
              ['Approved Claims', stats.approved_claims],
              ['Pending Claims', stats.pending_claims],
              ['Total Forest Area', stats.total_forest_area],
              ['Total Villages', stats.total_villages],
            ].map(([label, value]) => <StatCard key={label as string} label={label as string} value={value as number} />)
          : Array.from({ length: 5 }).map((_, index) => <div key={index} className="glass-panel h-28 animate-pulse rounded-3xl" />)}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <div className="glass-panel rounded-3xl p-5 xl:col-span-1">
          <p className="font-display text-xl font-bold text-emerald-200">Claim Status</p>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={schemeData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={4}>
                  {schemeData.map((entry, index) => (
                    <Cell key={entry.name} fill={['#10b981', '#38bdf8', '#f59e0b', '#f43f5e'][index % 4]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-5 xl:col-span-2">
          <p className="font-display text-xl font-bold text-emerald-200">Village Activity</p>
          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.trend_series ?? []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 glass-panel rounded-3xl p-5">
        <p className="font-display text-xl font-bold text-emerald-200">Forest Area Trend</p>
        <div className="mt-4 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats?.trend_series ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="area" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
