import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const CATEGORY_COLORS: Record<string, string> = {
    'WP Fusion': 'bg-orange-500',
    'Free Plugins': 'bg-green-500',
    'MCP Servers': 'bg-purple-500',
    'Personal': 'bg-blue-500',
    'Other': 'bg-gray-500',
};

export const CATEGORY_TEXT_COLORS: Record<string, string> = {
    'WP Fusion': 'text-orange-500',
    'Free Plugins': 'text-green-500',
    'MCP Servers': 'text-purple-500',
    'Personal': 'text-blue-500',
    'Other': 'text-gray-500',
};

export const CATEGORY_BG_COLORS: Record<string, string> = {
    'WP Fusion': 'bg-orange-500/10',
    'Free Plugins': 'bg-green-500/10',
    'MCP Servers': 'bg-purple-500/10',
    'Personal': 'bg-blue-500/10',
    'Other': 'bg-gray-500/10',
};
