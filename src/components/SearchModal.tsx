import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import {
  ALL_SYMBOLS,
  AssetCategory,
  MarketSymbol,
  formatPrice,
} from '../data/marketsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSymbol: (symbol: MarketSymbol) => void;
}

const CATEGORIES: ('All' | AssetCategory)[] = [
  'All',
  'Indices',
  'Stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Bonds',
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSymbol,
}) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<'All' | AssetCategory>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_SYMBOLS.filter((sym) => {
      if (category !== 'All' && sym.category !== category) return false;
      if (!q) return true;
      return (
        sym.ticker.toLowerCase().includes(q) ||
        sym.name.toLowerCase().includes(q) ||
        sym.exchange.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/45 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Symbol search"
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
          <Search className="w-5 h-5 text-[#6A6D78] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search symbol, company, index, or currency (e.g. SPX, NVDA, BTCUSD)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[#131722] dark:text-white placeholder:text-[#6A6D78] dark:placeholder:text-[#868993] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6A6D78] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-[#E0E3EB] dark:border-[#2A2E39] overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                category === cat
                  ? 'bg-[#131722] dark:bg-white text-white dark:text-[#131722]'
                  : 'text-[#6A6D78] dark:text-[#868993] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto divide-y divide-[#E0E3EB]/60 dark:divide-[#2A2E39]">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#6A6D78] dark:text-[#868993]">
              No symbols match &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((sym) => {
              const isUp = sym.changePercent >= 0;
              return (
                <button
                  key={sym.id}
                  type="button"
                  onClick={() => {
                    onSelectSymbol(sym);
                    onClose();
                    document.getElementById('indices')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full px-4 py-3 flex items-center justify-between gap-4 hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]/70 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{
                        backgroundColor: sym.badgeColor,
                        color: sym.badgeTextColor ?? '#FFFFFF',
                      }}
                    >
                      {sym.badgeText}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#131722] dark:text-white">
                          {sym.ticker}
                        </span>
                        <span className="text-xs text-[#6A6D78] dark:text-[#868993] truncate">
                          {sym.name}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#6A6D78] dark:text-[#868993]">
                        {sym.category} · {sym.exchange}
                      </div>
                    </div>
                  </div>

                  <div className="text-right tabular-nums shrink-0">
                    <div className="font-mono text-sm font-semibold text-[#131722] dark:text-white">
                      {formatPrice(sym.price, sym.decimals)}
                    </div>
                    <div
                      className={`text-xs font-semibold ${
                        isUp ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isUp ? '+' : '−'}
                      {Math.abs(sym.changePercent).toFixed(2)}%
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
