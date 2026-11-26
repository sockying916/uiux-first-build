import React from 'react';
import { ChevronRight, ThumbsUp, MessageSquare, TrendingUp, TrendingDown } from 'lucide-react';
import {
  MARKET_NEWS,
  COMMUNITY_IDEAS,
  ALL_SYMBOLS,
  MarketSymbol,
} from '../data/marketsData';

interface NewsAndIdeasSectionProps {
  onSelectSymbol: (symbol: MarketSymbol) => void;
}

export const NewsAndIdeasSection: React.FC<NewsAndIdeasSectionProps> = ({
  onSelectSymbol,
}) => {
  const handlePickSymbol = (ticker: string) => {
    const found = ALL_SYMBOLS.find((s) => s.ticker === ticker || s.id === ticker);
    if (found) {
      onSelectSymbol(found);
      document.getElementById('indices')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12 pt-8 border-t border-[#E0E3EB]/80 dark:border-[#2A2E39]">
      {/* Top Stories */}
      <section id="news">
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#131722] dark:text-white inline-flex items-center gap-1 mb-5">
          <span>Top Market Stories</span>
          <ChevronRight className="w-5 h-5" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MARKET_NEWS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handlePickSymbol(item.symbol)}
              className="p-5 rounded-2xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] hover:bg-[#F8F9FD] dark:hover:bg-[#1E222D]/60 text-left transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#6A6D78] dark:text-[#868993]">
                  <span className="font-semibold text-[#2962FF]">{item.symbol}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.publishedAt}</span>
                </div>

                <h3 className="mt-2 font-display text-base font-bold text-[#131722] dark:text-white leading-snug">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-[#6A6D78] dark:text-[#868993] leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 text-xs font-medium text-[#6A6D78] dark:text-[#868993]">
                {item.source}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Community Trading Ideas */}
      <section id="ideas" className="pt-8 border-t border-[#E0E3EB]/80 dark:border-[#2A2E39]">
        <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#131722] dark:text-white inline-flex items-center gap-1 mb-5">
          <span>Community Ideas</span>
          <ChevronRight className="w-5 h-5" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COMMUNITY_IDEAS.map((idea) => {
            const min = Math.min(...idea.trendPoints);
            const max = Math.max(...idea.trendPoints);
            const span = max - min || 1;
            const pathD = idea.trendPoints
              .map((val, idx) => {
                const x = (idx / (idea.trendPoints.length - 1)) * 260;
                const y = 76 - ((val - min) / span) * 60;
                return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
              })
              .join(' ');
            const isLong = idea.bias === 'Long';
            const color = isLong ? '#089981' : '#F23645';

            return (
              <button
                key={idea.id}
                type="button"
                onClick={() => handlePickSymbol(idea.symbol)}
                className="p-5 rounded-2xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] hover:bg-[#F8F9FD] dark:hover:bg-[#1E222D]/60 text-left transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Mini Chart Thumbnail */}
                  <div className="w-full h-24 rounded-xl bg-[#F8F9FD] dark:bg-[#1E222D] p-3 mb-4 flex items-center justify-center">
                    <svg viewBox="0 0 260 88" className="w-full h-full overflow-visible">
                      <path
                        d={pathD}
                        fill="none"
                        stroke={color}
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#6A6D78] dark:text-[#868993]">
                    <span className="font-mono font-semibold text-[#131722] dark:text-white">
                      {idea.symbol}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{idea.timeframe}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        isLong ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isLong ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {idea.bias}
                    </span>
                  </div>

                  <h3 className="mt-2 font-display text-base font-bold text-[#131722] dark:text-white leading-snug">
                    {idea.title}
                  </h3>

                  <p className="mt-1.5 text-sm text-[#6A6D78] dark:text-[#868993] leading-relaxed">
                    {idea.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E0E3EB]/70 dark:border-[#2A2E39] flex items-center justify-between text-xs text-[#6A6D78] dark:text-[#868993]">
                  <span className="font-medium text-[#131722] dark:text-[#D1D4DC]">
                    by {idea.author} · {idea.publishedAt}
                  </span>
                  <span className="inline-flex items-center gap-3 tabular-nums">
                    <span className="inline-flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {idea.likes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {idea.comments}
                    </span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
