import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Globe,
  User,
  Sun,
  Moon,
  ChevronDown,
  LineChart,
  Layers,
  Filter,
  Flame,
  Building2,
  BookOpen,
  Star,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenBlackFriday: () => void;
  activeNav: string;
  onSelectNav: (section: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  watchlistCount: number;
  onOpenWatchlist: () => void;
}

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'ES', label: 'Español' },
  { code: 'JA', label: '日本語' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onOpenBlackFriday,
  activeNav,
  onSelectNav,
  isDark,
  onToggleTheme,
  watchlistCount,
  onOpenWatchlist,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    {
      id: 'products',
      label: 'Products',
      dropdown: [
        { label: 'Supercharts', desc: 'Interactive multi-asset charting', icon: LineChart, target: 'indices' },
        { label: 'Stock Screener', desc: 'Filter global equities by fundamentals', icon: Filter, target: 'stocks' },
        { label: 'Market Heatmaps', desc: 'Visual sector & S&P 500 performance', icon: Flame, target: 'sectors' },
        { label: 'Crypto & Futures', desc: 'Real-time spot and derivatives pulse', icon: Layers, target: 'crypto' },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      dropdown: [
        { label: 'Trading Ideas', desc: 'Technical setups from top analysts', icon: BookOpen, target: 'ideas' },
        { label: 'Market News', desc: 'Breaking macro & earnings headlines', icon: Flame, target: 'news' },
      ],
    },
    {
      id: 'markets',
      label: 'Markets',
      dropdown: null,
    },
    {
      id: 'brokers',
      label: 'Brokers',
      dropdown: [
        { label: 'Compare Brokers', desc: 'Trade directly from charts with verified partners', icon: Building2, target: 'footer' },
        { label: 'Futures & FX Execution', desc: 'Low-latency multi-asset routing', icon: Layers, target: 'futures' },
      ],
    },
    {
      id: 'more',
      label: 'More',
      dropdown: [
        { label: 'World Indices', desc: 'US, Europe & Asia benchmark overview', icon: Globe, target: 'indices' },
        { label: 'Bonds & Yields', desc: 'Sovereign treasury curves', icon: LineChart, target: 'forex' },
      ],
    },
  ];

  const handleNavAction = (itemId: string, hasDropdown: boolean) => {
    if (!hasDropdown) {
      setOpenMenu(null);
      onSelectNav(itemId);
      return;
    }
    setOpenMenu((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <header
      ref={navRef}
      className="sticky top-0 z-40 h-16 w-full bg-white/95 dark:bg-[#131722]/95 backdrop-blur-md border-b border-[#E0E3EB]/80 dark:border-[#2A2E39]"
    >
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4 lg:gap-8">
        {/* Left: Brand + Search */}
        <div className="flex items-center gap-4 lg:gap-6 shrink-0">
          <button
            type="button"
            onClick={() => onSelectNav('indices')}
            className="flex items-center gap-2 text-[#131722] dark:text-white whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2962FF] rounded-md"
            aria-label="TradingView Markets Home"
          >
            {/* Geometric TradingView-style vector mark */}
            <svg
              width="28"
              height="18"
              viewBox="0 0 36 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden="true"
            >
              <path d="M2 5H13V20H8V9.5H2V5Z" fill="currentColor" />
              <circle cx="18" cy="7.5" r="2.6" fill="currentColor" />
              <path d="M23.5 5H29.5L23 20H17L23.5 5Z" fill="currentColor" />
            </svg>
            <span className="font-display font-bold text-[19px] tracking-[-0.02em]">
              TradingView
            </span>
          </button>

          {/* Search Pill Trigger (matches screenshot) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2.5 h-10 px-4 w-44 md:w-56 rounded-full bg-[#F0F3FA] dark:bg-[#1E222D] hover:bg-[#E5E9F2] dark:hover:bg-[#2A2E39] text-[#6A6D78] dark:text-[#868993] text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2962FF]"
          >
            <Search className="w-4 h-4 shrink-0 text-[#6A6D78] dark:text-[#868993]" />
            <span className="truncate">Search (⌘K)</span>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activeNav === item.id || (item.id === 'markets' && activeNav === 'markets');
            const isOpen = openMenu === item.id;
            return (
              <div key={item.id} className="relative">
                <button
                  type="button"
                  onClick={() => handleNavAction(item.id, Boolean(item.dropdown))}
                  className={`flex items-center gap-1 py-2 text-[15px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2962FF] rounded ${
                    isActive
                      ? 'text-[#2962FF]'
                      : 'text-[#131722] dark:text-[#D1D4DC] hover:text-[#2962FF] dark:hover:text-[#2962FF]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 opacity-60 transition-transform duration-150 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {item.dropdown && isOpen && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-xl bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] shadow-xl py-2 z-50">
                    {item.dropdown.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <button
                          key={sub.label}
                          type="button"
                          onClick={() => {
                            setOpenMenu(null);
                            onSelectNav(sub.target);
                          }}
                          className="w-full px-4 py-2.5 flex items-start gap-3 text-left hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] transition-colors cursor-pointer"
                        >
                          <Icon className="w-4 h-4 mt-0.5 text-[#2962FF] shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-[#131722] dark:text-white">
                              {sub.label}
                            </div>
                            <div className="text-xs text-[#6A6D78] dark:text-[#868993]">
                              {sub.desc}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Language, User, Promo CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Search Icon */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-full hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] text-[#131722] dark:text-white"
            aria-label="Search markets"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Picker */}
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() => setOpenMenu((p) => (p === 'lang' ? null : 'lang'))}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] text-[#131722] dark:text-[#D1D4DC] text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              aria-label="Select language"
            >
              <Globe className="w-[18px] h-[18px] text-[#131722] dark:text-[#D1D4DC]" />
              <span>{selectedLang}</span>
            </button>

            {openMenu === 'lang' && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] shadow-xl py-1.5 z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setSelectedLang(l.code);
                      setOpenMenu(null);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-sm flex items-center justify-between hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] cursor-pointer ${
                      selectedLang === l.code
                        ? 'text-[#2962FF] font-semibold'
                        : 'text-[#131722] dark:text-[#D1D4DC]'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span className="text-xs opacity-60">{l.code}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Account / Theme / Watchlist Menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenMenu((p) => (p === 'user' ? null : 'user'))}
              className="relative p-2 rounded-full hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] text-[#131722] dark:text-[#D1D4DC] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2962FF]"
              aria-label="Account and display preferences"
            >
              <User className="w-5 h-5" />
            </button>

            {openMenu === 'user' && (
              <div className="absolute right-0 top-full mt-2 w-60 rounded-xl bg-white dark:bg-[#1E222D] border border-[#E0E3EB] dark:border-[#2A2E39] shadow-xl py-2 z-50">
                <div className="px-4 py-2 border-b border-[#E0E3EB] dark:border-[#2A2E39]">
                  <div className="text-sm font-semibold text-[#131722] dark:text-white">
                    Market Workspace
                  </div>
                  <div className="text-xs text-[#6A6D78] dark:text-[#868993]">
                    Global Equities &amp; Macro
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onToggleTheme();
                    setOpenMenu(null);
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-sm text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#6A6D78]" />}
                    {isDark ? 'Light theme' : 'Dark theme'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onOpenWatchlist();
                    setOpenMenu(null);
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between text-sm text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-[#2962FF]" />
                    Saved watchlist
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#6A6D78] dark:text-[#868993]">
                    {watchlistCount}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Black Friday CTA Button (exact coral-orange gradient from screenshot) */}
          <button
            type="button"
            onClick={onOpenBlackFriday}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#F05161] via-[#F26A53] to-[#F3964E] hover:brightness-105 active:scale-[0.99] text-white text-center transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#FF5722]"
          >
            <span className="block text-[12px] font-bold leading-tight tracking-tight">
              Black Friday
            </span>
            <span className="block text-[10px] font-medium leading-tight opacity-95">
              Up to 80% OFF
            </span>
          </button>

          {/* Mobile Drawer Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39] text-[#131722] dark:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#131722] border-b border-[#E0E3EB] dark:border-[#2A2E39] px-4 py-4 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onSelectNav(item.id === 'products' ? 'stocks' : item.id);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeNav === item.id
                  ? 'bg-[#2962FF]/10 text-[#2962FF]'
                  : 'text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#2A2E39]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
