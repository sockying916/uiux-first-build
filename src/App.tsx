import { useState, useEffect, useCallback } from 'react';
import { INDICES_DATA, MarketSymbol } from './data/marketsData';
import { Navbar } from './components/Navbar';
import { IndicesHero } from './components/IndicesHero';
import { StocksScreenerSection } from './components/StocksScreenerSection';
import { CrossAssetSections } from './components/CrossAssetSections';
import { NewsAndIdeasSection } from './components/NewsAndIdeasSection';
import { BlackFridayModal } from './components/BlackFridayModal';
import { SearchModal } from './components/SearchModal';
import { WatchlistDrawer } from './components/WatchlistDrawer';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSymbol, setActiveSymbol] = useState<MarketSymbol>(INDICES_DATA[0]);
  const [activeNav, setActiveNav] = useState<string>('markets');
  const [searchOpen, setSearchOpen] = useState(false);
  const [blackFridayOpen, setBlackFridayOpen] = useState(false);
  const [watchlistOpen, setWatchlistOpen] = useState(false);
  const [sectorFilter, setSectorFilter] = useState<string | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tv_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('tv_watchlist');
      if (saved) return new Set(JSON.parse(saved));
    } catch {
      // ignore storage errors
    }
    return new Set(['SPX', 'NVDA', 'BTCUSD']);
  });

  // Sync dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('tv_theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore
    }
  }, [isDark]);

  // Persist watchlist
  useEffect(() => {
    try {
      localStorage.setItem('tv_watchlist', JSON.stringify(Array.from(watchlist)));
    } catch {
      // ignore
    }
  }, [watchlist]);

  // Global Cmd+K / Ctrl+K shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleStar = useCallback((id: string) => {
    setWatchlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleJumpToSection = useCallback((sectionId: string) => {
    if (sectionId === 'markets') {
      setActiveNav('markets');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#131722] text-[#131722] dark:text-[#D1D4DC] transition-colors">
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBlackFriday={() => setBlackFridayOpen(true)}
        activeNav={activeNav}
        onSelectNav={handleJumpToSection}
        isDark={isDark}
        onToggleTheme={() => setIsDark((d) => !d)}
        watchlistCount={watchlist.size}
        onOpenWatchlist={() => setWatchlistOpen(true)}
      />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <IndicesHero
          activeSymbol={activeSymbol}
          onSelectSymbol={setActiveSymbol}
          watchlist={watchlist}
          onToggleStar={handleToggleStar}
          onJumpToSection={handleJumpToSection}
        />

        <StocksScreenerSection
          activeSymbolId={activeSymbol.id}
          onSelectSymbol={setActiveSymbol}
          watchlist={watchlist}
          onToggleStar={handleToggleStar}
          sectorFilter={sectorFilter}
          onClearSectorFilter={() => setSectorFilter(null)}
        />

        <CrossAssetSections
          activeSymbolId={activeSymbol.id}
          onSelectSymbol={setActiveSymbol}
          onSelectSector={(sec) => setSectorFilter(sec)}
        />

        <NewsAndIdeasSection onSelectSymbol={setActiveSymbol} />
      </main>

      <Footer
        onJumpToSection={handleJumpToSection}
        onOpenBlackFriday={() => setBlackFridayOpen(true)}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectSymbol={setActiveSymbol}
      />

      <WatchlistDrawer
        isOpen={watchlistOpen}
        onClose={() => setWatchlistOpen(false)}
        watchlist={watchlist}
        onToggleStar={handleToggleStar}
        onSelectSymbol={setActiveSymbol}
      />

      <BlackFridayModal
        isOpen={blackFridayOpen}
        onClose={() => setBlackFridayOpen(false)}
      />
    </div>
  );
}
