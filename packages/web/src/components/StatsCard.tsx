import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function StatsCard({ title, children, className = '' }: StatsCardProps) {
  return (
    <div className={`stats-card mb-6 ${className}`}>
      <h2 className="text-lg font-semibold text-text-primary mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}
