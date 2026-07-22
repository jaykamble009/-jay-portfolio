export type GitHubData = {
  user: {
    name: string;
    login: string;
    avatarUrl: string;
    bio: string;
    createdAt: string;
    followers: { totalCount: number };
    following: { totalCount: number };
    repositories: {
      totalCount: number;
      nodes: Array<{
        name: string;
        stargazerCount: number;
        forkCount: number;
        updatedAt: string;
        url: string;
        homepageUrl: string | null;
        isArchived: boolean;
        primaryLanguage: { name: string; color: string } | null;
        repositoryTopics: { nodes: Array<{ topic: { name: string } }> };
      }>;
    };
    contributionsCollection: {
      contributionCalendar: {
        totalContributions: number;
        weeks: Array<{
          contributionDays: Array<{
            contributionCount: number;
            date: string;
            color: string;
          }>;
        }>;
      };
    };
  };
};

export type GitHubResponse = {
  success: boolean;
  source?: 'graphql' | 'rest';
  fallbackUsed?: boolean;
  reason?: string;
  data: GitHubData | null;
};

export async function fetchGitHubData(): Promise<GitHubResponse> {
  // Read safely without crashing, only server-side
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'JayKamble009';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    if (!token) {
      console.warn("[GitHub API] GITHUB_TOKEN is missing. Falling back to REST API.");
      return await fetchRestFallback(username);
    }

    const query = `
      query($username: String!) {
        user(login: $username) {
          name
          login
          avatarUrl
          bio
          createdAt
          followers { totalCount }
          following { totalCount }
          repositories(first: 100, privacy: PUBLIC, orderBy: {field: STARGAZERS, direction: DESC}) {
            totalCount
            nodes {
              name
              stargazerCount
              forkCount
              updatedAt
              url
              homepageUrl
              isArchived
              primaryLanguage {
                name
                color
              }
              repositoryTopics(first: 3) {
                nodes {
                  topic {
                    name
                  }
                }
              }
            }
          }
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                  color
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 60 }, // Cache for 1 minute
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[GitHub API] GraphQL responded with status ${res.status}. Falling back to REST.`);
      return await fetchRestFallback(username);
    }

    const json = await res.json();
    
    if (json.errors) {
      console.warn("[GitHub API] GraphQL Errors encountered. Falling back to REST.");
      return await fetchRestFallback(username);
    }

    return {
      success: true,
      source: 'graphql',
      fallbackUsed: false,
      data: json.data as GitHubData
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.warn(`[GitHub API] Exception: ${error?.message || 'Unknown error'}. Falling back to REST.`);
    return await fetchRestFallback(username);
  }
}

async function fetchRestFallback(username: string): Promise<GitHubResponse> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { 
        next: { revalidate: 60 }, 
        signal: controller.signal 
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, { 
        next: { revalidate: 60 }, 
        signal: controller.signal 
      })
    ]);

    clearTimeout(timeoutId);

    if (!userRes.ok || !reposRes.ok) {
      console.error("[GitHub API] REST fallback failed. Network or Rate Limit reached on unauthenticated API.");
      return { 
        success: false, 
        fallbackUsed: true, 
        reason: "REST fallback also failed (Rate Limit or Network Error)", 
        data: null 
      };
    }

    const userData = await userRes.json();
    const reposData = await reposRes.json();

    const data: GitHubData = {
      user: {
        name: userData.name || userData.login,
        login: userData.login,
        avatarUrl: userData.avatar_url,
        bio: userData.bio || '',
        createdAt: userData.created_at,
        followers: { totalCount: userData.followers },
        following: { totalCount: userData.following },
        repositories: {
          totalCount: userData.public_repos,
          nodes: reposData.map((repo: any) => ({
            name: repo.name,
            stargazerCount: repo.stargazers_count,
            forkCount: repo.forks_count,
            updatedAt: repo.updated_at,
            url: repo.html_url,
            homepageUrl: repo.homepage || null,
            isArchived: repo.archived,
            primaryLanguage: repo.language ? { name: repo.language, color: '#8b949e' } : null,
            repositoryTopics: { nodes: (repo.topics || []).map((t: string) => ({ topic: { name: t } })) }
          }))
        },
        contributionsCollection: {
          contributionCalendar: {
            totalContributions: 0,
            weeks: [] // Empty weeks for fallback mode (no crash)
          }
        }
      }
    };

    return {
      success: true,
      source: 'rest',
      fallbackUsed: true,
      data
    };
  } catch (error: any) {
    clearTimeout(timeoutId);
    console.error("[GitHub API] REST fallback exception:", error?.message || 'Unknown error');
    return { 
      success: false, 
      fallbackUsed: true, 
      reason: "REST fallback exception", 
      data: null 
    };
  }
}
