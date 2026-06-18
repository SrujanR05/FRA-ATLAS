import type { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({ title, subtitle, action }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">{title}</h1>
        {subtitle ? <p className="mt-2 max-w-3xl text-sm text-white/60">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}
