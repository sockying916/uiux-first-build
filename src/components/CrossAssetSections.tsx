import React from 'react';
import { ChevronRight } from 'lucide-react';
import {
  CRYPTO_DATA,
  FUTURES_DATA,
  FOREX_BONDS_DATA,
  SECTORS_HEATMAP,
  MarketSymbol,
  formatPrice,
} from '../data/marketsData';

interface CrossAssetSectionsProps {
  activeSymbolId: string;
  onSelectSymbol: (symbol: MarketSymbol) => void;
  onSelectSector: (sectorName: string) => void;
}

export const CrossAssetSections: React.FC<CrossAssetSectionsProps> = ({
  activeSymbolId,
  onSelectSymbol,
  onSelectSector,
}) => {
  const selectAndScrollToChart = (sym: MarketSymbol) => {
    onSelectSymbol(sym);
    document.getElementById('indices')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-12">
      {/* Crypto Section */}
      <section id="crypto" className="pt-8 border-t border-[#E0E3EB]/80 dark:border-[#2A2E39]">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#131722] dark:text-white inline-flex items-center gap-1">
            <span>Crypto</span>
            <ChevronRight className="w-5 h-5" />
          </h2>
          <span className="text-xs text-[#6A6D78] dark:text-[#868993] tabular-nums">
            Total Market Cap: $3.24T · BTC Dominance: 58.9%
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CRYPTO_DATA.map((coin) => {
            const isUp = coin.changePercent >= 0;
            const isSelected = activeSymbolId === coin.id;
            return (
              <button
                key={coin.id}
                type="button"
                onClick={() => selectAndScrollToChart(coin)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F0F3FA] dark:bg-[#1E222D] border-[#2962FF]'
                    : 'bg-white dark:bg-[#131722] border-[#E0E3EB] dark:border-[#2A2E39] hover:bg-[#F8F9FD] dark:hover:bg-[#1E222D]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      backgroundColor: coin.badgeColor,
                      color: coin.badgeTextColor ?? '#FFFFFF',
                    }}
                  >
                    {coin.badgeText}
                  </span>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm text-[#131722] dark:text-white truncate">
                      {coin.name}
                    </div>
                    <div className="text-xs font-mono text-[#6A6D78] dark:text-[#868993]">
                      {coin.ticker}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-2 tabular-nums">
                  <span className="font-mono font-bold text-base text-[#131722] dark:text-white">
                    ${formatPrice(coin.price, coin.decimals)}
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      isUp ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isUp ? '+' : '−'}
                    {Math.abs(coin.changePercent).toFixed(2)}%
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-[#6A6D78] dark:text-[#868993] tabular-nums">
                  24h Vol {coin.volume} · MCap {coin.marketCap}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Futures & Forex/Bonds Two-Column Grid */}
      <section
        id="futures"
        className="pt-8 border-t border-[#E0E3EB]/80 dark:border-[#2A2E39] grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Futures & Commodities */}
        <div>
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#131722] dark:text-white inline-flex items-center gap-1 mb-4">
            <span>Futures &amp; Commodities</span>
            <ChevronRight className="w-5 h-5" />
          </h2>

          <div className="rounded-2xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] divide-y divide-[#E0E3EB]/70 dark:divide-[#2A2E39]">
            {FUTURES_DATA.map((fut) => {
              const isUp = fut.changePercent >= 0;
              const isSelected = activeSymbolId === fut.id;
              return (
                <button
                  key={fut.id}
                  type="button"
                  onClick={() => selectAndScrollToChart(fut)}
                  className={`w-full px-4 py-3.5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${
                    isSelected
                      ? 'bg-[#2962FF]/6 dark:bg-[#2962FF]/12'
                      : 'hover:bg-[#F8F9FD] dark:hover:bg-[#1E222D]/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        backgroundColor: fut.badgeColor,
                        color: fut.badgeTextColor ?? '#FFFFFF',
                      }}
                    >
                      {fut.badgeText}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-[#131722] dark:text-white truncate">
                        {fut.name}
                      </div>
                      <div className="text-xs font-mono text-[#6A6D78] dark:text-[#868993]">
                        {fut.exchange}:{fut.ticker}
                      </div>
                    </div>
                  </div>

                  <div className="text-right tabular-nums shrink-0">
                    <div className="font-mono text-sm font-semibold text-[#131722] dark:text-white">
                      {formatPrice(fut.price, fut.decimals)}{' '}
                      <span className="text-[10px] font-sans text-[#6A6D78] dark:text-[#868993]">
                        {fut.unit}
                      </span>
                    </div>
                    <div
                      className={`text-xs font-semibold ${
                        isUp ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : '−'}
                      {Math.abs(fut.changePercent).toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Forex & Treasury Bonds */}
        <div id="forex">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#131722] dark:text-white inline-flex items-center gap-1 mb-4">
            <span>Forex &amp; Bonds</span>
            <ChevronRight className="w-5 h-5" />
          </h2>

          <div className="rounded-2xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722] divide-y divide-[#E0E3EB]/70 dark:divide-[#2A2E39]">
            {FOREX_BONDS_DATA.map((item) => {
              const isUp = item.changePercent >= 0;
              const isSelected = activeSymbolId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectAndScrollToChart(item)}
                  className={`w-full px-4 py-3.5 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer first:rounded-t-2xl last:rounded-b-2xl ${
                    isSelected
                      ? 'bg-[#2962FF]/6 dark:bg-[#2962FF]/12'
                      : 'hover:bg-[#F8F9FD] dark:hover:bg-[#1E222D]/60'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0"
                      style={{
                        backgroundColor: item.badgeColor,
                        color: item.badgeTextColor ?? '#FFFFFF',
                      }}
                    >
                      {item.badgeText}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-[#131722] dark:text-white truncate">
                        {item.name}
                      </div>
                      <div className="text-xs font-mono text-[#6A6D78] dark:text-[#868993]">
                        {item.category} · {item.ticker}
                      </div>
                    </div>
                  </div>

                  <div className="text-right tabular-nums shrink-0">
                    <div className="font-mono text-sm font-semibold text-[#131722] dark:text-white">
                      {formatPrice(item.price, item.decimals)}
                      {item.unit === '%' ? '%' : ''}
                    </div>
                    <div
                      className={`text-xs font-semibold ${
                        isUp ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : '−'}
                      {Math.abs(item.changePercent).toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* S&P 500 Sector Performance Heatmap */}
      <section id="sectors" className="pt-8 border-t border-[#E0E3EB]/80 dark:border-[#2A2E39]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#131722] dark:text-white inline-flex items-center gap-1">
              <span>S&amp;P 500 Sector Heatmap</span>
              <ChevronRight className="w-5 h-5" />
            </h2>
            <p className="text-xs text-[#6A6D78] dark:text-[#868993] mt-0.5">
              Click any sector tile to filter the US Stocks Screener by sector.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {SECTORS_HEATMAP.map((sec) => {
            const isPos = sec.changePercent >= 0;
            const bgClass = isPos
              ? sec.changePercent > 1
                ? 'bg-[#089981] text-white'
                : 'bg-[#089981]/85 text-white'
              : sec.changePercent < -1
              ? 'bg-[#F23645] text-white'
              : 'bg-[#F23645]/85 text-white';

            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => {
                  onSelectSector(sec.name);
                  document.getElementById('stocks')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded-xl text-left transition-transform hover:scale-[1.01] cursor-pointer flex flex-col justify-between min-h-[124px] ${bgClass}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-display font-bold text-sm leading-snug">
                    {sec.name}
                  </span>
                  <span className="font-mono text-sm font-bold tabular-nums shrink-0">
                    {isPos ? '+' : ''}
                    {sec.changePercent.toFixed(2)}%
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono tabular-nums text-white/90">
                  {sec.leaders.map((l) => (
                    <span key={l.ticker}>
                      {l.ticker} {l.changePercent >= 0 ? '+' : ''}
                      {l.changePercent.toFixed(2)}%
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
