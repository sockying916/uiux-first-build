import React, { useState, useMemo } from 'react';
import {
  ChevronRight,
  Search,
  Star,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react';
import { STOCKS_DATA, MarketSymbol, formatPrice } from '../data/marketsData';

interface StocksScreenerSectionProps {
  activeSymbolId: string;
  onSelectSymbol: (symbol: MarketSymbol) => void;
  watchlist: Set<string>;
  onToggleStar: (id: string) => void;
  sectorFilter: string | null;
  onClearSectorFilter: () => void;
}

type ScreenerTab = 'Most Active' | 'Top Gainers' | 'Top Losers' | 'Large Cap' | 'High Dividend';
type SortKey = 'ticker' | 'price' | 'changePercent' | 'volume' | 'marketCap';

function parseMagnitude(val?: string): number {
  if (!val || val === '—') return 0;
  const num = parseFloat(val);
  if (val.endsWith('T')) return num * 1e12;
  if (val.endsWith('B')) return num * 1e9;
  if (val.endsWith('M')) return num * 1e6;
  return num;
}

export const StocksScreenerSection: React.FC<StocksScreenerSectionProps> = ({
  activeSymbolId,
  onSelectSymbol,
  watchlist,
  onToggleStar,
  sectorFilter,
  onClearSectorFilter,
}) => {
  const [activeTab, setActiveTab] = useState<ScreenerTab>('Most Active');
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('volume');
  const [sortAsc, setSortAsc] = useState(false);

  const tabs: ScreenerTab[] = [
    'Most Active',
    'Top Gainers',
    'Top Losers',
    'Large Cap',
    'High Dividend',
  ];

  const handleTabChange = (tab: ScreenerTab) => {
    setActiveTab(tab);
    if (tab === 'Top Gainers') {
      setSortKey('changePercent');
      setSortAsc(false);
    } else if (tab === 'Top Losers') {
      setSortKey('changePercent');
      setSortAsc(true);
    } else if (tab === 'Large Cap') {
      setSortKey('marketCap');
      setSortAsc(false);
    } else if (tab === 'Most Active') {
      setSortKey('volume');
      setSortAsc(false);
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc((prev) => !prev);
    } else {
      setSortKey(key);
      setSortAsc(key === 'ticker');
    }
  };

  const filteredStocks = useMemo(() => {
    let list = [...STOCKS_DATA];

    if (sectorFilter) {
      const normalized = sectorFilter.toLowerCase();
      list = list.filter((s) => {
        const sec = (s.sector ?? '').toLowerCase();
        return (
          sec.includes(normalized) ||
          normalized.includes(sec) ||
          (normalized === 'health care' && sec === 'healthcare') ||
          (normalized === 'information technology' && sec === 'technology')
        );
      });
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.ticker.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          (s.sector ?? '').toLowerCase().includes(q)
      );
    }

    if (activeTab === 'Top Gainers') {
      list = list.filter((s) => s.changePercent > 0);
    } else if (activeTab === 'Top Losers') {
      list = list.filter((s) => s.changePercent < 0);
    } else if (activeTab === 'High Dividend') {
      list = list.filter((s) => s.dividendYield && s.dividendYield !== '—');
    }

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'ticker') cmp = a.ticker.localeCompare(b.ticker);
      else if (sortKey === 'price') cmp = a.price - b.price;
      else if (sortKey === 'changePercent') cmp = a.changePercent - b.changePercent;
      else if (sortKey === 'volume') cmp = parseMagnitude(a.volume) - parseMagnitude(b.volume);
      else if (sortKey === 'marketCap') cmp = parseMagnitude(a.marketCap) - parseMagnitude(b.marketCap);
      return sortAsc ? cmp : -cmp;
    });

    return list;
  }, [activeTab, query, sortKey, sortAsc, sectorFilter]);

  return (
    <section id="stocks" className="py-10 border-t border-[#E0E3EB]/80 dark:border-[#2A2E39]">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="font-display text-2xl font-bold tracking-[-0.02em] text-[#131722] dark:text-white inline-flex items-center gap-1">
            <span>US Stocks</span>
            <ChevronRight className="w-5 h-5" />
          </h2>
          {sectorFilter && (
            <button
              type="button"
              onClick={onClearSectorFilter}
              className="text-xs font-medium text-[#2962FF] hover:underline cursor-pointer"
            >
              Sector: {sectorFilter} ×
            </button>
          )}
        </div>

        {/* Inline Filter Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#6A6D78] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter ticker or company..."
            className="w-full h-9 pl-9 pr-3 rounded-lg bg-[#F0F3FA] dark:bg-[#1E222D] text-sm text-[#131722] dark:text-white placeholder:text-[#6A6D78] dark:placeholder:text-[#868993] border border-transparent focus:border-[#2962FF] focus:bg-white dark:focus:bg-[#131722] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabChange(tab)}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeTab === tab
                ? 'bg-[#2962FF]/12 text-[#2962FF] font-semibold'
                : 'text-[#6A6D78] dark:text-[#868993] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] hover:text-[#131722] dark:hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* High-Density TradingView Screener Table */}
      <div className="overflow-x-auto rounded-2xl border border-[#E0E3EB] dark:border-[#2A2E39] bg-white dark:bg-[#131722]">
        <table className="w-full border-collapse text-left min-w-[780px]">
          <thead>
            <tr className="border-b border-[#E0E3EB] dark:border-[#2A2E39] text-[12px] font-medium text-[#6A6D78] dark:text-[#868993]">
              <th className="py-3 pl-4 pr-2 w-10">
                <span className="sr-only">Watchlist</span>
              </th>
              <th className="py-3 px-3">
                <button
                  type="button"
                  onClick={() => handleSort('ticker')}
                  className="inline-flex items-center gap-1 hover:text-[#131722] dark:hover:text-white cursor-pointer"
                >
                  <span>Symbol</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('price')}
                  className="inline-flex items-center justify-end gap-1 hover:text-[#131722] dark:hover:text-white cursor-pointer"
                >
                  <span>Price</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('changePercent')}
                  className="inline-flex items-center justify-end gap-1 hover:text-[#131722] dark:hover:text-white cursor-pointer"
                >
                  <span>Change %</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('volume')}
                  className="inline-flex items-center justify-end gap-1 hover:text-[#131722] dark:hover:text-white cursor-pointer"
                >
                  <span>Volume</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">
                <button
                  type="button"
                  onClick={() => handleSort('marketCap')}
                  className="inline-flex items-center justify-end gap-1 hover:text-[#131722] dark:hover:text-white cursor-pointer"
                >
                  <span>Market Cap</span>
                  <ArrowUpDown className="w-3 h-3 opacity-60" />
                </button>
              </th>
              <th className="py-3 px-3 text-right">P/E</th>
              <th className="py-3 px-3">Sector</th>
              <th className="py-3 pl-3 pr-5 text-right">Analyst Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E0E3EB]/70 dark:divide-[#2A2E39] text-sm">
            {filteredStocks.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center">
                  <p className="text-sm font-medium text-[#131722] dark:text-white">
                    No matching stocks found
                  </p>
                  <p className="text-xs text-[#6A6D78] dark:text-[#868993] mt-1">
                    Adjust your filter query or clear the active sector filter.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      setActiveTab('Most Active');
                      onClearSectorFilter();
                    }}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-[#2962FF] text-white text-xs font-semibold cursor-pointer"
                  >
                    Reset filters
                  </button>
                </td>
              </tr>
            ) : (
              filteredStocks.map((stock) => {
                const isUp = stock.changePercent >= 0;
                const isSelected = activeSymbolId === stock.id;
                const isStarred = watchlist.has(stock.id);
                return (
                  <tr
                    key={stock.id}
                    onClick={() => {
                      onSelectSymbol(stock);
                      document.getElementById('indices')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#2962FF]/6 dark:bg-[#2962FF]/12'
                        : 'hover:bg-[#F8F9FD] dark:hover:bg-[#1E222D]/60'
                    }`}
                  >
                    <td
                      className="py-3 pl-4 pr-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(stock.id);
                      }}
                    >
                      <button
                        type="button"
                        className="p-1 rounded hover:bg-[#E0E3EB]/60 dark:hover:bg-[#2A2E39] cursor-pointer"
                        aria-label={isStarred ? `Remove ${stock.ticker} from watchlist` : `Add ${stock.ticker} to watchlist`}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            isStarred
                              ? 'fill-[#2962FF] text-[#2962FF]'
                              : 'text-[#B2B5BE] dark:text-[#5D606B]'
                          }`}
                        />
                      </button>
                    </td>

                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                          style={{
                            backgroundColor: stock.badgeColor,
                            color: stock.badgeTextColor ?? '#FFFFFF',
                          }}
                        >
                          {stock.badgeText}
                        </span>
                        <div className="min-w-0">
                          <div className="font-semibold text-[#131722] dark:text-white leading-tight">
                            {stock.ticker}
                          </div>
                          <div className="text-xs text-[#6A6D78] dark:text-[#868993] truncate max-w-[200px]">
                            {stock.name}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-[#131722] dark:text-white">
                      {formatPrice(stock.price, stock.decimals)}
                      <span className="text-[10px] font-sans font-normal text-[#6A6D78] dark:text-[#868993] ml-1">
                        {stock.unit}
                      </span>
                    </td>

                    <td
                      className={`py-3 px-3 text-right font-mono tabular-nums font-semibold ${
                        isUp ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : '−'}
                      {Math.abs(stock.changePercent).toFixed(2)}%
                    </td>

                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#131722] dark:text-[#D1D4DC]">
                      {stock.volume ?? '—'}
                    </td>

                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#131722] dark:text-[#D1D4DC]">
                      {stock.marketCap ?? '—'}
                    </td>

                    <td className="py-3 px-3 text-right font-mono tabular-nums text-[#6A6D78] dark:text-[#868993]">
                      {stock.peRatio ?? '—'}
                    </td>

                    <td className="py-3 px-3 text-xs text-[#6A6D78] dark:text-[#868993] whitespace-nowrap">
                      {stock.sector}
                    </td>

                    <td className="py-3 pl-3 pr-5 text-right whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          stock.rating === 'Strong Buy' || stock.rating === 'Buy'
                            ? 'text-[#089981]'
                            : stock.rating === 'Sell'
                            ? 'text-[#F23645]'
                            : 'text-[#6A6D78] dark:text-[#868993]'
                        }`}
                      >
                        {stock.rating === 'Strong Buy' || stock.rating === 'Buy' ? (
                          <TrendingUp className="w-3.5 h-3.5" />
                        ) : stock.rating === 'Sell' ? (
                          <TrendingDown className="w-3.5 h-3.5" />
                        ) : (
                          <Minus className="w-3.5 h-3.5" />
                        )}
                        <span>{stock.rating}</span>
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};
