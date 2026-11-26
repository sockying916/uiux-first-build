import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { INDICES_DATA, MarketSymbol, formatPrice } from '../data/marketsData';
import { InteractiveChart } from './InteractiveChart';

interface IndicesHeroProps {
  activeSymbol: MarketSymbol;
  onSelectSymbol: (symbol: MarketSymbol) => void;
  watchlist: Set<string>;
  onToggleStar: (id: string) => void;
  onJumpToSection: (id: string) => void;
}

const MARKET_SUBTABS = [
  { id: 'indices', label: 'Overview' },
  { id: 'indices', label: 'Indices', isExact: true },
  { id: 'stocks', label: 'Stocks' },
  { id: 'crypto', label: 'Crypto' },
  { id: 'futures', label: 'Futures' },
  { id: 'forex', label: 'Forex & Bonds' },
  { id: 'sectors', label: 'Heatmap' },
  { id: 'news', label: 'News & Ideas' },
];

export const IndicesHero: React.FC<IndicesHeroProps> = ({
  activeSymbol,
  onSelectSymbol,
  watchlist,
  onToggleStar,
  onJumpToSection,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const offset = dir === 'right' ? 320 : -320;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section id="indices" className="pt-5 pb-10">
      {/* Sub-navigation bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-5 border-b border-[#E0E3EB]/70 dark:border-[#2A2E39]">
        {MARKET_SUBTABS.map((tab) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => onJumpToSection(tab.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              tab.isExact
                ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722]'
                : 'text-[#6A6D78] dark:text-[#868993] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] hover:text-[#131722] dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Section Title: Indices > (Exact match to screenshot) */}
      <div className="mt-7 mb-4 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onSelectSymbol(INDICES_DATA[0])}
          className="group inline-flex items-center gap-1 text-left cursor-pointer"
        >
          <h1 className="font-display text-[26px] sm:text-[28px] font-bold tracking-[-0.02em] text-[#131722] dark:text-white">
            Indices
          </h1>
          <ChevronRight className="w-6 h-6 text-[#131722] dark:text-white group-hover:translate-x-0.5 transition-transform" />
        </button>

        {activeSymbol.category !== 'Indices' && (
          <button
            type="button"
            onClick={() => onSelectSymbol(INDICES_DATA[0])}
            className="text-xs font-medium text-[#2962FF] hover:underline cursor-pointer whitespace-nowrap"
          >
            Reset chart to S&amp;P 500
          </button>
        )}
      </div>

      {/* Horizontal Index Cards Carousel with Right Arrow Button */}
      <div className="relative group">
        <div
          ref={carouselRef}
          className="flex items-stretch gap-3 overflow-x-auto no-scrollbar scroll-smooth pr-12 py-1"
        >
          {INDICES_DATA.map((idx) => {
            const isSelected = activeSymbol.id === idx.id;
            const isUp = idx.changePercent >= 0;
            return (
              <button
                key={idx.id}
                type="button"
                onClick={() => onSelectSymbol(idx)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl min-w-[238px] text-left transition-all shrink-0 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#F0F3FA] dark:bg-[#1E222D] border-[#D1D4DC] dark:border-[#363A45]'
                    : 'bg-white dark:bg-[#131722] border-[#E0E3EB]/80 dark:border-[#2A2E39] hover:bg-[#F8F9FD] dark:hover:bg-[#1E222D]/70'
                }`}
              >
                {/* Circular colored badge (500, 100, 30, 2000, etc.) */}
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold tracking-tight shrink-0"
                  style={{
                    backgroundColor: idx.badgeColor,
                    color: idx.badgeTextColor ?? '#FFFFFF',
                  }}
                >
                  {idx.badgeText}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-[14px] font-semibold text-[#131722] dark:text-white truncate">
                      {idx.name}
                    </span>
                    {idx.delayed && (
                      <span
                        className="text-[10px] font-bold text-[#F57C00] shrink-0"
                        title="Delayed data"
                      >
                        D
                      </span>
                    )}
                    <span
                      className="inline-block w-2 h-0.5 rounded-full bg-[#787B86]/60 shrink-0"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="mt-0.5 flex items-baseline gap-1.5 tabular-nums whitespace-nowrap">
                    <span className="text-[14px] font-semibold text-[#131722] dark:text-white">
                      {formatPrice(idx.price, idx.decimals)}
                    </span>
                    <span className="text-[10px] font-medium text-[#6A6D78] dark:text-[#868993]">
                      {idx.unit}
                    </span>
                    <span
                      className={`text-[13px] font-semibold ml-0.5 ${
                        isUp ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : '−'}
                      {Math.abs(idx.changePercent).toFixed(2)}%
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Left scroll button (appears on hover) */}
        <button
          type="button"
          onClick={() => scrollCarousel('left')}
          className="hidden md:flex opacity-0 group-hover:opacity-100 absolute left-0 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] shadow-md items-center justify-center text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] transition-opacity cursor-pointer"
          aria-label="Scroll indices left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right circular scroll arrow button (exact match to screenshot) */}
        <button
          type="button"
          onClick={() => scrollCarousel('right')}
          className="flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] shadow-md items-center justify-center text-[#131722] dark:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] transition-colors cursor-pointer"
          aria-label="Scroll indices right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Main Interactive Chart Viewport */}
      <div className="mt-6 rounded-2xl border border-[#E0E3EB]/90 dark:border-[#2A2E39] bg-white dark:bg-[#131722] p-4 sm:p-6">
        <InteractiveChart
          symbol={activeSymbol}
          isStarred={watchlist.has(activeSymbol.id)}
          onToggleStar={onToggleStar}
        />
      </div>
    </section>
  );
};
