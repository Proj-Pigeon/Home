import { guEarthConfig } from '@/lib/shared';

export type GuEarthStats = {
  stars: number | null;
  releaseTag: string | null;
  releaseUrl: string | null;
};

export type GuEarthContributor = {
  login: string;
  avatarUrl: string;
  profileUrl: string;
  type: string;
};

const nullStats: GuEarthStats = { stars: null, releaseTag: null, releaseUrl: null };

const githubHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function getGuEarthStats(): Promise<GuEarthStats> {
  const headers = githubHeaders;

  try {
    const [repoRes, releaseRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${guEarthConfig.user}/${guEarthConfig.repo}`, {
        next: { revalidate: 3600 },
        headers,
      }),
      fetch(
        `https://api.github.com/repos/${guEarthConfig.user}/${guEarthConfig.repo}/releases/latest`,
        { next: { revalidate: 3600 }, headers },
      ),
    ]);

    const repo = repoRes.ok ? await repoRes.json() : null;
    const release = releaseRes.ok ? await releaseRes.json() : null;

    return {
      stars: typeof repo?.stargazers_count === 'number' ? repo.stargazers_count : null,
      releaseTag: typeof release?.tag_name === 'string' ? release.tag_name : null,
      releaseUrl: typeof release?.html_url === 'string' ? release.html_url : null,
    };
  } catch {
    return nullStats;
  }
}

export async function getGuEarthContributors(): Promise<GuEarthContributor[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${guEarthConfig.user}/${guEarthConfig.repo}/contributors?per_page=100`,
      { next: { revalidate: 86400 }, headers: githubHeaders },
    );
    if (!res.ok) return [];

    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];

    return data.flatMap((item) => {
      const contributor = item as Record<string, unknown>;
      if (
        typeof contributor.login !== 'string' ||
        typeof contributor.avatar_url !== 'string' ||
        typeof contributor.html_url !== 'string' ||
        contributor.type === 'Anonymous'
      ) {
        return [];
      }
      return [
        {
          login: contributor.login,
          avatarUrl: contributor.avatar_url,
          profileUrl: contributor.html_url,
          type: typeof contributor.type === 'string' ? contributor.type : 'User',
        },
      ];
    });
  } catch {
    return [];
  }
}
