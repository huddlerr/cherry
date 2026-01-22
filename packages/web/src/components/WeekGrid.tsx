import { useMemo } from 'react';

interface WeekGridProps {
  weeksLived: number;
  totalWeeks: number;
}

export default function WeekGrid({ weeksLived, totalWeeks }: WeekGridProps) {
  const weeks = useMemo(() => {
    const result = [];
    for (let i = 0; i < totalWeeks; i++) {
      const isPast = i < weeksLived;
      const isCurrent = i === weeksLived;

      let bgColor = 'bg-week-future';
      let title = 'A week in your potential future';

      if (isPast) {
        bgColor = 'bg-week-past';
        title = 'A week from your past';
      }
      if (isCurrent) {
        bgColor = 'bg-week-current';
        title = 'Your current week';
      }

      result.push(
        <div
          key={i}
          className={`aspect-square rounded-[1px] ${bgColor} hover:opacity-80 cursor-pointer`}
          title={title}
        />
      );
    }
    return result;
  }, [weeksLived, totalWeeks]);

  return (
    <div>
      {/* Week Grid */}
      <div className="week-grid mb-4">
        {weeks}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-week-past" />
          <span className="text-text-secondary">Past</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-week-current" />
          <span className="text-text-secondary">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm bg-week-future border border-gray-200" />
          <span className="text-text-secondary">Future</span>
        </div>
      </div>
    </div>
  );
}
