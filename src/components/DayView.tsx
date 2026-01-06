import { useMemo } from 'react';
import { format, parseISO, eachDayOfInterval, subDays } from 'date-fns';
import { ActivityData, getCategory } from '../lib/types';
import { cn, CATEGORY_COLORS } from '../lib/utils';
import { motion } from 'framer-motion';

interface DayViewProps {
    data: ActivityData;
}

export function DayView({ data }: DayViewProps) {
    const days = useMemo(() => {
        // Generate last 7 days + today
        const today = new Date();
        const start = subDays(today, 6);
        return eachDayOfInterval({ start, end: today });
    }, []);

    const commitsByDay = useMemo(() => {
        const map = new Map<string, typeof data.commits>();
        data.commits.forEach(commit => {
            const dateKey = format(parseISO(commit.date), 'yyyy-MM-dd');
            const current = map.get(dateKey) || [];
            map.set(dateKey, [...current, commit]);
        });
        return map;
    }, [data]);

    return (
        <div className="flex justify-between items-end gap-2 overflow-x-auto pb-4">
            {days.map((day, i) => {
                const dateKey = format(day, 'yyyy-MM-dd');
                const dayCommits = commitsByDay.get(dateKey) || [];
                const isToday = i === days.length - 1;

                // Group by category to show distribution
                const categoryCounts = dayCommits.reduce((acc, commit) => {
                    const cat = getCategory(commit.repo);
                    acc[cat] = (acc[cat] || 0) + 1;
                    return acc;
                }, {} as Record<string, number>);

                const total = dayCommits.length;

                return (
                    <div key={dateKey} className="flex flex-col items-center gap-2 min-w-[60px] flex-1">
                        <div className="text-xs font-mono text-muted uppercase tracking-wider">
                            {format(day, 'EEE')}
                        </div>

                        <div className={cn(
                            "w-full rounded-md flex flex-col-reverse overflow-hidden relative transition-all",
                            isToday ? "h-32 bg-slate-100 ring-2 ring-offset-2 ring-slate-200" : "h-24 bg-slate-50"
                        )}>
                            {total === 0 ? (
                                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                    <div className="w-1 h-1 bg-slate-300 rounded-full" />
                                </div>
                            ) : (
                                Object.entries(categoryCounts).map(([cat, count]) => (
                                    <motion.div
                                        key={cat}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(count / Math.max(total, 5)) * 100}%` }}
                                        className={cn("w-full transition-all", CATEGORY_COLORS[cat])}
                                        title={cat}
                                    />
                                ))
                            )}
                        </div>

                        <div className={cn("text-xs font-bold font-mono", isToday ? "text-text" : "text-slate-400")}>
                            {format(day, 'd')}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
