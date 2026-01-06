export interface Commit {
    type: string;
    hash: string;
    shortHash: string;
    date: string;
    headline: string;
    body: string;
    repo: string;
    owner: string;
    repoSlug: string;
    remoteUrl: string;
    stats?: {
        added: number;
        deleted: number;
        files: number;
    };
    files?: Array<{
        file: string;
        added: number;
        deleted: number;
    }>;
}

export interface ActivityData {
    generatedAt: string;
    periodStart: string;
    commits: Commit[];
}

export type Category = 'WP Fusion' | 'Free Plugins' | 'MCP Servers' | 'Personal' | 'Other';

export const CATEGORY_MAP: Record<string, Category> = {
    'autohub': 'WP Fusion',
    'wp-fusion': 'WP Fusion',
    'media-tools': 'WP Fusion',
    'mcp-freescout': 'MCP Servers',
    'mcp-automem': 'MCP Servers',
    'automem': 'MCP Servers',
    'mcp-ecosystem': 'MCP Servers',
    'robinhood-mcp': 'MCP Servers',
    'uncensored-voice-server': 'Free Plugins', // Or personal?
    'sunset-voyages': 'Personal',
    'haven': 'Personal',
    'activity-report': 'Personal',
};

export const getCategory = (repo: string): Category => {
    if (CATEGORY_MAP[repo]) return CATEGORY_MAP[repo];
    if (repo.startsWith('mcp-')) return 'MCP Servers';
    return 'Other';
};
