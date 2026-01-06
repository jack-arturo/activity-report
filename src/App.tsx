import { useState, useEffect } from 'react'
import { ActivityData } from './lib/types'
import { DayView } from './components/DayView'
import { ProjectGrid } from './components/ProjectGrid'

function App() {
    const [data, setData] = useState<ActivityData | null>(null)

    useEffect(() => {
        fetch('/activity-data.json')
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error('Fetch error:', err))
    }, [])

    if (!data) return (
        <div className="min-h-screen flex items-center justify-center bg-bg">
            <div className="animate-pulse text-muted font-mono">Loading data...</div>
        </div>
    )

    if (!data.commits || !Array.isArray(data.commits)) {
        return <div className="p-8 text-red-500">Error: Invalid data format. Commits missing.</div>
    }

    return (
        <div className="min-h-screen bg-bg text-text pb-20">
            {/* Top Navigation / Header */}
            <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-6xl">
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">Activity Report</h1>
                        <p className="text-xs text-muted font-mono mt-0.5">
                            Updated {new Date(data.generatedAt).toLocaleString()}
                        </p>
                    </div>
                    <div className="flex gap-4 text-sm font-mono text-muted">
                        <div>
                            <span className="font-bold text-text">{data.commits.length}</span> commits
                        </div>
                        <div>
                            <span className="font-bold text-green-600">+{data.commits.reduce((acc, c) => acc + (c.stats?.added || 0), 0).toLocaleString()}</span>
                            <span className="mx-1">/</span>
                            <span className="font-bold text-red-600">-{data.commits.reduce((acc, c) => acc + (c.stats?.deleted || 0), 0).toLocaleString()}</span> lines
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-6xl space-y-12">
                {/* Day View Timeline */}
                <section>
                    <div className="flex justify-between items-baseline mb-6">
                        <h2 className="text-lg font-semibold">Weekly Rhythm</h2>
                        <span className="text-xs text-muted uppercase tracking-widest">Last 7 Days</span>
                    </div>
                    <DayView data={data} />
                </section>

                {/* Projects Grid */}
                <section>
                    <div className="flex justify-between items-baseline mb-6">
                        <h2 className="text-lg font-semibold">Project Breakdown</h2>
                        <span className="text-xs text-muted uppercase tracking-widest">By Category</span>
                    </div>
                    <ProjectGrid data={data} />
                </section>

                {/* Detailed Feed */}
                <section>
                    <h2 className="text-lg font-semibold mb-6">Recent Commits</h2>
                    <div className="space-y-3">
                        {data.commits.slice(0, 20).map((commit) => (
                            <div key={commit.hash} className="group flex gap-4 p-4 rounded-lg hover:bg-surface border border-transparent hover:border-border transition-all">
                                <div className="w-24 flex-shrink-0 text-xs text-muted font-mono pt-1">
                                    {new Date(commit.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-text">
                                            {commit.repo}
                                        </span>
                                        <a href={`https://github.com/verygoodplugins/${commit.repo}/commit/${commit.hash}`} target="_blank" className="font-mono text-[10px] text-blue bg-blue/5 px-1.5 rounded hover:bg-blue/10 transition-colors">
                                            {commit.shortHash}
                                        </a>
                                    </div>
                                    <h3 className="text-sm font-medium mb-1 leading-snug">{commit.headline}</h3>
                                    {commit.body && (
                                        <p className="text-xs text-muted line-clamp-2 leading-relaxed">{commit.body}</p>
                                    )}
                                </div>
                                <div className="text-right hidden sm:block">
                                    <div className="font-mono text-[10px] text-muted">
                                        <span className="text-green-600">+{commit.files?.reduce((acc, f) => acc + (f.added || 0), 0) || 0}</span>
                                        <span className="mx-1">/</span>
                                        <span className="text-red-600">-{commit.files?.reduce((acc, f) => acc + (f.deleted || 0), 0) || 0}</span>
                                    </div>
                                    <div className="text-[10px] text-muted mt-1">
                                        {commit.files.length} files
                                    </div>
                                </div>
                            </div>
                        ))}
                        {data.commits.length > 20 && (
                            <div className="text-center pt-4">
                                <button className="text-sm text-muted hover:text-text transition-colors">
                                    Show {data.commits.length - 20} more commits
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default App
