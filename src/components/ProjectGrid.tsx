import { ActivityData, getCategory, Category } from '../lib/types';
import { cn, CATEGORY_TEXT_COLORS, CATEGORY_BG_COLORS } from '../lib/utils';
import { motion } from 'framer-motion';

interface ProjectGridProps {
    data: ActivityData;
}

export function ProjectGrid({ data }: ProjectGridProps) {
    // Group repos by category
    const reposByCategory = data.commits.reduce((acc, commit) => {
        const cat = getCategory(commit.repo);
        if (!acc[cat]) acc[cat] = new Set();
        acc[cat].add(commit.repo);
        return acc;
    }, {} as Record<Category, Set<string>>);

    // Calculate stats per repo
    const repoStats = data.commits.reduce((acc, commit) => {
        if (!acc[commit.repo]) {
            acc[commit.repo] = { commits: 0, added: 0, deleted: 0 };
        }
        acc[commit.repo].commits++;
        acc[commit.repo].added += (commit.stats?.added || 0);
        acc[commit.repo].deleted += (commit.stats?.deleted || 0);
        return acc;
    }, {} as Record<string, { commits: number; added: number; deleted: number }>);

    const categories = Object.keys(reposByCategory) as Category[];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(cat => (
                <div key={cat} className="space-y-3">
                    <h3 className={cn("text-xs font-bold uppercase tracking-widest pl-1", CATEGORY_TEXT_COLORS[cat])}>
                        {cat}
                    </h3>
                    <div className="grid gap-3">
                        {Array.from(reposByCategory[cat]).map(repo => {
                            const stats = repoStats[repo];
                            return (
                                <motion.a
                                    href={`https://github.com/verygoodplugins/${repo}`} // Optimistic URL, could be wrong owner
                                    target="_blank"
                                    key={repo}
                                    whileHover={{ y: -2 }}
                                    className="block bg-surface border border-border rounded-lg p-4 hover:shadow-md transition-all group"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-mono font-semibold text-sm group-hover:text-blue transition-colors">
                                            {repo}
                                        </span>
                                        <span className={cn("text-[10px] px-1.5 py-0.5 rounded font-mono", CATEGORY_BG_COLORS[cat], CATEGORY_TEXT_COLORS[cat])}>
                                            {stats.commits}c
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-mono text-muted">
                                        <span className="text-green-600">+{stats.added}</span>
                                        <span className="text-red-600">-{stats.deleted}</span>
                                    </div>
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
