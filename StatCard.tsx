type Props = {
  label: string;
  value: string | number;
  accent?: string;
};

export function StatCard({ label, value, accent = 'text-emerald-300' }: Props) {
  return (
    <div className="glass-panel rounded-3xl p-5 shadow-glow">
      <p className="text-sm text-white/60">{label}</p>
      <p className={`mt-3 text-3xl font-bold ${accent}`}>{value}</p>
    </div>
  );
}
