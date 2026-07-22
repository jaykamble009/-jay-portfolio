import { Suspense } from "react"
import { fetchGitHubData } from "@/lib/github"
import { GithubContributions } from "@/components/github-contributions"
import { Github, Star, GitFork, Users, BookOpen, Clock, Activity, ExternalLink, Archive, LayoutTemplate } from "lucide-react"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"
import Image from "next/image"
import { HighlightText } from "@/components/highlight-text"

function formatNumber(num: number) {
  return num > 999 ? (num / 1000).toFixed(1) + 'k' : num.toString();
}

function formatRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return rtf.format(-diffInMinutes, 'minute');
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return rtf.format(-diffInHours, 'hour');
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return rtf.format(-diffInDays, 'day');
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return rtf.format(-diffInMonths, 'month');
  
  const diffInYears = Math.floor(diffInDays / 365);
  return rtf.format(-diffInYears, 'year');
}

async function GithubDashboardContent() {
  const response = await fetchGitHubData();
  const data = response.data;

  if (!response.success || !data || !data.user) {
    return (
      <div className="w-full h-96 flex flex-col items-center justify-center rounded-3xl bg-card/40 backdrop-blur-xl border border-white/5 p-8 text-center">
        <Github className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-xl font-bold mb-2">GitHub Dashboard Unavailable</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          {response.reason || "Unable to fetch GitHub stats at the moment. We are currently experiencing rate limits or network issues."}
        </p>
      </div>
    );
  }

  const { user } = data;
  const repos = user.repositories.nodes;
  const bio = user.bio ? user.bio.replace("BSc IT (TY)", "B.Sc. in Information Technology Graduate") : null;
  
  // Calculate Totals
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazerCount, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forkCount, 0);
  const lastCommit = new Date(repos[0]?.updatedAt || user.createdAt);

  // Calculate Top Languages
  const languageMap = new Map<string, { count: number, color: string }>();
  repos.forEach(repo => {
    if (repo.primaryLanguage) {
      const current = languageMap.get(repo.primaryLanguage.name) || { count: 0, color: repo.primaryLanguage.color };
      languageMap.set(repo.primaryLanguage.name, { count: current.count + 1, color: repo.primaryLanguage.color });
    }
  });
  
  const topLanguages = Array.from(languageMap.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 4);

  // Filter featured repos
  const targetNames = siteConfig.featuredRepos || [];
  const featuredRepos = repos.filter(repo => 
    targetNames.some(target => repo.name.toLowerCase().includes(target.toLowerCase()))
  ).slice(0, 3);

  return (
    <div className="w-full rounded-3xl bg-card/40 backdrop-blur-xl border border-white/5 overflow-hidden shadow-2xl relative z-20">
      {/* Top Profile Banner */}
      <div className="p-8 border-b border-white/5 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 relative z-10 w-full sm:w-auto">
          <div className="w-24 h-24 shrink-0 rounded-full border-2 border-white/10 overflow-hidden bg-background">
            {user.avatarUrl ? (
              <Image src={user.avatarUrl} alt={user.name || user.login} width={96} height={96} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/20"><Github className="w-10 h-10 text-primary" /></div>
            )}
          </div>
          <div className="flex flex-col items-center sm:items-start justify-center pt-2">
            <h3 className="text-2xl font-bold text-foreground">{user.name || user.login}</h3>
            <p className="text-primary font-mono text-sm mb-3">@{user.login}</p>
            {bio && <p className="text-sm text-foreground/80 max-w-md leading-relaxed">{bio}</p>}
          </div>
        </div>

        <Button asChild className="relative z-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 shadow-lg shadow-primary/25 w-full sm:w-auto self-center">
          <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
            <Github className="w-4 h-4 mr-2" /> View Profile
          </a>
        </Button>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
        
        {/* Left Column: Stats */}
        <div className="p-8 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Users className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider"><HighlightText text="Followers" keywords={["Followers", "Repositories", "Contributions", "Top Languages", "Current Streak"]} /></span>
              </div>
              <div className="text-3xl font-bold text-foreground">{formatNumber(user.followers.totalCount)}</div>
            </div>
            <div className="bg-background/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <BookOpen className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider"><HighlightText text="Repositories" keywords={["Followers", "Repositories", "Contributions", "Top Languages", "Current Streak"]} /></span>
              </div>
              <div className="text-3xl font-bold text-foreground">{formatNumber(user.repositories.totalCount)}</div>
            </div>
            <div className="bg-background/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Star className="w-4 h-4 text-yellow-500/80" /> <span className="text-xs font-bold uppercase tracking-wider">Stars</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{formatNumber(totalStars)}</div>
            </div>
            <div className="bg-background/50 border border-white/5 rounded-2xl p-4 flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <GitFork className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-wider">Forks</span>
              </div>
              <div className="text-3xl font-bold text-foreground">{formatNumber(totalForks)}</div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h4 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> <HighlightText text="Top Languages" keywords={["Followers", "Repositories", "Contributions", "Top Languages", "Current Streak"]} />
            </h4>
            <div className="space-y-3">
              {topLanguages.map(([name, { count, color }]) => (
                <div key={name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: color }} />
                    <span className="text-muted-foreground font-medium">{name}</span>
                  </div>
                  <span className="font-mono text-foreground/50 text-xs">{count} repos</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Graph and Pinned */}
        <div className="lg:col-span-2 p-8 flex flex-col gap-8 w-full overflow-hidden">
          
          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> 
                {formatNumber(user.contributionsCollection.contributionCalendar.totalContributions)} <HighlightText text="Contributions" keywords={["Followers", "Repositories", "Contributions", "Top Languages", "Current Streak"]} /> (Last 12 Months)
              </h4>
              <span className="text-xs text-muted-foreground font-mono">Updated {formatRelativeTime(lastCommit.toISOString())}</span>
            </div>
            {/* Horizontal scroll container for the graph */}
            <div className="bg-background/50 border border-white/5 rounded-2xl p-4 sm:p-6 overflow-x-auto shadow-inner w-full scrollbar-thin scrollbar-thumb-white/10 min-h-[160px] flex items-center justify-center">
              {user.contributionsCollection.contributionCalendar.weeks.length > 0 ? (
                <GithubContributions weeks={user.contributionsCollection.contributionCalendar.weeks} />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <Activity className="w-8 h-8 text-muted-foreground/50 mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">Contribution graph is currently unavailable.</p>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Featured Repositories</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {featuredRepos.length === 0 ? (
                <div className="col-span-full bg-background/30 border border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[160px]">
                  <LayoutTemplate className="w-8 h-8 text-muted-foreground mb-2 opacity-50" />
                  <p className="text-sm font-medium text-muted-foreground">Featured repositories unavailable.</p>
                  <p className="text-xs text-muted-foreground/70">Pin repositories in site configuration.</p>
                </div>
              ) : (
                featuredRepos.map((repo, i) => (
                  <div key={i} className="bg-background/50 border border-white/5 hover:border-primary/30 hover:bg-white/5 rounded-2xl p-4 transition-all duration-300 group flex flex-col h-full shadow-sm">
                    <div className="flex items-start justify-between mb-2 gap-2">
                      <h5 className="font-bold text-foreground truncate group-hover:text-primary transition-colors">
                        {repo.name}
                      </h5>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase border ${repo.isArchived ? 'bg-secondary/10 text-secondary border-secondary/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                        {repo.isArchived ? 'Archived' : 'Active'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {repo.repositoryTopics?.nodes?.map(t => (
                        <span key={t.topic.name} className="px-1.5 py-0.5 bg-white/5 text-muted-foreground text-[10px] rounded border border-white/5">
                          {t.topic.name}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.primaryLanguage?.color || '#ccc' }} />
                        {repo.primaryLanguage?.name || 'Unknown'}
                      </span>
                      <span className="flex items-center gap-1 text-foreground/70">
                        <Star className="w-3.5 h-3.5" /> {formatNumber(repo.stargazerCount)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                      {repo.homepageUrl && (
                        <Button asChild variant="default" size="sm" className="flex-1 text-[10px] h-7 bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground border-none font-bold">
                          <a href={repo.homepageUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                        </Button>
                      )}
                      <Button asChild variant="outline" size="sm" className="flex-1 text-[10px] h-7 border-white/10 hover:bg-white/5 font-bold">
                        <a href={repo.url} target="_blank" rel="noopener noreferrer">Repository</a>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function GithubDashboardSkeleton() {
  return (
    <div className="w-full rounded-3xl bg-card/40 backdrop-blur-xl border border-white/5 overflow-hidden shadow-2xl animate-pulse relative z-20">
      <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row gap-6">
        <div className="w-20 h-20 rounded-full bg-white/5 shrink-0" />
        <div className="space-y-3 flex-1 py-2">
          <div className="h-7 w-48 bg-white/5 rounded" />
          <div className="h-4 w-32 bg-white/5 rounded" />
          <div className="h-4 w-full max-w-md bg-white/5 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl" />)}
          </div>
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="h-5 w-32 bg-white/5 rounded mb-4" />
            {[1,2,3,4].map(i => <div key={i} className="h-4 w-full bg-white/5 rounded" />)}
          </div>
        </div>
        <div className="lg:col-span-2 p-8 space-y-8">
          <div>
            <div className="flex justify-between mb-4">
              <div className="h-5 w-48 bg-white/5 rounded" />
              <div className="h-4 w-32 bg-white/5 rounded" />
            </div>
            <div className="h-40 w-full bg-white/5 rounded-2xl" />
          </div>
          <div>
            <div className="h-5 w-40 bg-white/5 rounded mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1,2,3].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GithubDashboard() {
  return (
    <section id="github" className="py-24 relative overflow-visible">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Live <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">Activity</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Real-time GitHub statistics and contribution history fetched dynamically via GraphQL.
          </p>
        </div>

        <Suspense fallback={<GithubDashboardSkeleton />}>
          <GithubDashboardContent />
        </Suspense>
      </div>
    </section>
  )
}
