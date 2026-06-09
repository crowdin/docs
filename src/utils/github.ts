export interface RepoStats {
    stars: number | null;
    forks: number | null;
}

// Cached per build so multiple <RepoCard /> instances for the same repo only hit the GitHub API once.
const statsCache = new Map<string, RepoStats>();

/**
 * Fetches a repository's star and fork counts from the GitHub API at build time.
 *
 * Returns null counts on any failure (network error, rate limit, missing repo)
 * so the page still builds — RepoCard renders a dash in that case.
 *
 * Set the GITHUB_TOKEN env var to raise the API rate limit (60 → 5000 req/h).
 */
export async function getRepoStats(organization: string, slug: string): Promise<RepoStats> {
    const key = `${organization}/${slug}`;

    const cached = statsCache.get(key);
    if (cached) return cached;

    const result: RepoStats = { stars: null, forks: null };

    try {
        const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };

        const token = import.meta.env.GITHUB_TOKEN;
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await fetch(`https://api.github.com/repos/${key}`, { headers });

        if (response.ok) {
            const data = await response.json();
            result.stars = data.stargazers_count ?? null;
            result.forks = data.forks_count ?? null;
        } else {
            console.warn(`[RepoCard] GitHub API responded ${response.status} for ${key}`);
        }
    } catch (error) {
        console.warn(`[RepoCard] Failed to fetch stats for ${key}:`, error);
    }

    statsCache.set(key, result);
    return result;
}
