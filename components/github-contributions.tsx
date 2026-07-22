export function GithubContributions({ weeks }: { weeks: any[] }) {
  return (
    <div className="flex gap-[3px] overflow-x-auto pb-4 pt-2 scrollbar-hide mask-linear-fade w-full">
      {weeks.map((week, wIdx) => (
        <div key={wIdx} className="flex flex-col gap-[3px] shrink-0">
          {week.contributionDays.map((day: any, dIdx: number) => {
            const level = day.contributionCount === 0 ? 0 : 
                          day.contributionCount < 3 ? 1 : 
                          day.contributionCount < 6 ? 2 : 
                          day.contributionCount < 10 ? 3 : 4;
            
            const opacityMap = [0.1, 0.3, 0.5, 0.8, 1];
            const opacity = opacityMap[level];

            return (
              <div 
                key={dIdx} 
                className="w-[11px] h-[11px] rounded-[2px] bg-primary transition-all duration-300 hover:scale-150 hover:z-10 cursor-crosshair relative group"
                style={{ opacity: level === 0 ? 0.05 : opacity }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1.5 bg-background border border-white/10 rounded-md text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-xl transition-opacity duration-200">
                  {day.contributionCount} contributions on {new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
