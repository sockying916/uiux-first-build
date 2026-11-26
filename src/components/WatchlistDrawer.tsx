import React from 'react';
import { X, Star } from 'lucide-react';
import { ALL_SYMBOLS, MarketSymbol, formatPrice } from '../data/marketsData';

interface WatchlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  watchlist: Set<string>;
  onToggleStar: (id: string) => void;
  onSelectSymbol: (symbol: MarketSymbol) => void;
}

export const WatchlistDrawer: React.FC<WatchlistDrawerProps> = ({
  isOpen,
  onClose,
  watchlist,
  onToggleStar,
  onSelectSymbol,
}) => {
  if (!isOpen) return null;

  const savedSymbols = ALL_SYMBOLS.filter((s) => watchlist.has(s.id));

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Saved watchlist"
    >
      <aside
        className="w-full max-w-sm h-full bg-white dark:bg-[#131722] border-l border-[#E0E3EB] dark:border-[#2A2E39] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 border-b border-[#E0E3EB] dark:border-[#2A2E39] flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-[#131722] dark:text-white">
              Saved Watchlist
            </h2>
            <p className="text-xs text-[#6A6D78] dark:text-[#868993]">
              {savedSymbols.length} {savedSymbols.length === 1 ? 'symbol' : 'symbols'} tracked
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6A6D78] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] cursor-pointer"
            aria-label="Close watchlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#E0E3EB]/70 dark:divide-[#2A2E39]">
          {savedSymbols.length === 0 ? (
            <div className="p-8 text-center">
              <Star className="w-8 h-8 text-[#B2B5BE] mx-auto mb-3" />
              <p className="text-sm font-medium text-[#131722] dark:text-white">
                Your watchlist is empty
              </p>
              <p className="text-xs text-[#6A6D78] dark:text-[#868993] mt-1">
                Click the star icon on any index, stock, or chart to pin it here.
              </p>
            </div>
          ) : (
            savedSymbols.map((sym) => {
              const isUp = sym.changePercent >= 0;
              return (
                <div
                  key={sym.id}
                  onClick={() => {
                    onSelectSymbol(sym);
                    onClose();
                    document.getElementById('indices')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-[#F8F9FD] dark:hover:bg-[#1E222D] cursor-pointer transition-colors"
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
                      <div className="font-semibold text-sm text-[#131722] dark:text-white">
                        {sym.ticker}
                      </div>
                      <div className="text-xs text-[#6A6D78] dark:text-[#868993] truncate">
                        {sym.name}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right tabular-nums">
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

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStar(sym.id);
                      }}
                      className="p-1.5 rounded-lg hover:bg-[#E0E3EB]/60 dark:hover:bg-[#2A2E39] cursor-pointer"
                      aria-label={`Remove ${sym.ticker} from watchlist`}
                    >
                      <Star className="w-4 h-4 fill-[#2962FF] text-[#2962FF]" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
};
