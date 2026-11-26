import React from 'react';

interface FooterProps {
  onJumpToSection: (id: string) => void;
  onOpenBlackFriday: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onJumpToSection,
  onOpenBlackFriday,
}) => {
  return (
    <footer
      id="footer"
      className="mt-16 border-t border-[#E0E3EB] dark:border-[#2A2E39] bg-[#F8F9FD] dark:bg-[#0C0E15] py-12"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 text-[#131722] dark:text-white">
              <svg
                width="26"
                height="18"
                viewBox="0 0 36 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M2 5H13V20H8V9.5H2V5Z" fill="currentColor" />
                <circle cx="18" cy="7.5" r="2.6" fill="currentColor" />
                <path d="M23.5 5H29.5L23 20H17L23.5 5Z" fill="currentColor" />
              </svg>
              <span className="font-display font-bold text-lg tracking-tight">
                TradingView
              </span>
            </div>
            <p className="mt-3 text-xs text-[#6A6D78] dark:text-[#868993] leading-relaxed max-w-xs">
              Look first / Then leap. Market data, multi-asset charting, and global screeners in one workspace.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold text-[#131722] dark:text-white mb-3">
              Markets
            </h3>
            <ul className="space-y-2 text-xs text-[#6A6D78] dark:text-[#868993]">
              <li>
                <button type="button" onClick={() => onJumpToSection('indices')} className="hover:text-[#2962FF] cursor-pointer">
                  World Indices
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onJumpToSection('stocks')} className="hover:text-[#2962FF] cursor-pointer">
                  US Stocks
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onJumpToSection('crypto')} className="hover:text-[#2962FF] cursor-pointer">
                  Cryptocurrencies
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onJumpToSection('futures')} className="hover:text-[#2962FF] cursor-pointer">
                  Futures &amp; Forex
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold text-[#131722] dark:text-white mb-3">
              Products
            </h3>
            <ul className="space-y-2 text-xs text-[#6A6D78] dark:text-[#868993]">
              <li>
                <button type="button" onClick={() => onJumpToSection('indices')} className="hover:text-[#2962FF] cursor-pointer">
                  Supercharts
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onJumpToSection('stocks')} className="hover:text-[#2962FF] cursor-pointer">
                  Stock Screener
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onJumpToSection('sectors')} className="hover:text-[#2962FF] cursor-pointer">
                  Sector Heatmap
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenBlackFriday} className="hover:text-[#2962FF] cursor-pointer">
                  Black Friday Pricing
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold text-[#131722] dark:text-white mb-3">
              Community
            </h3>
            <ul className="space-y-2 text-xs text-[#6A6D78] dark:text-[#868993]">
              <li>
                <button type="button" onClick={() => onJumpToSection('ideas')} className="hover:text-[#2962FF] cursor-pointer">
                  Trading Ideas
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onJumpToSection('news')} className="hover:text-[#2962FF] cursor-pointer">
                  Market News
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xs font-bold text-[#131722] dark:text-white mb-3">
              Legal &amp; Data
            </h3>
            <p className="text-xs text-[#6A6D78] dark:text-[#868993] leading-relaxed">
              Quotes marked with D are delayed by exchange rules. Financial figures are formatted for display and informational analysis.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#E0E3EB]/80 dark:border-[#2A2E39] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6A6D78] dark:text-[#868993]">
          <span>&copy; 2026 TradingView Markets Workspace</span>
          <span>Indices · Stocks · Crypto · Futures · Forex · Bonds</span>
        </div>
      </div>
    </footer>
  );
};
