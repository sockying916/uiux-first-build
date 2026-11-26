export type AssetCategory =
  | 'Indices'
  | 'Stocks'
  | 'Crypto'
  | 'Futures'
  | 'Forex'
  | 'Bonds';

export type Timeframe = '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'All';

export interface MarketSymbol {
  id: string;
  ticker: string;
  name: string;
  shortName?: string;
  category: AssetCategory;
  exchange: string;
  price: number;
  unit: string;
  decimals: number;
  change: number;
  changePercent: number;
  delayed?: boolean;
  marketOpen?: boolean;
  badgeText: string;
  badgeColor: string;
  badgeTextColor?: string;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  volume?: string;
  marketCap?: string;
  peRatio?: string;
  dividendYield?: string;
  sector?: string;
  rating?: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell';
  description: string;
}

export interface CandlePoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface SectorBlock {
  id: string;
  name: string;
  changePercent: number;
  marketCapWeight: number;
  leaders: { ticker: string; changePercent: number }[];
}

export interface MarketNewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  symbol: string;
  category: string;
  summary: string;
}

export interface CommunityIdea {
  id: string;
  title: string;
  author: string;
  symbol: string;
  timeframe: string;
  bias: 'Long' | 'Short' | 'Neutral';
  publishedAt: string;
  likes: number;
  comments: number;
  summary: string;
  trendPoints: number[];
}

export interface BlackFridayPlan {
  id: string;
  name: string;
  audience: string;
  discount: string;
  monthlyPrice: number;
  originalPrice: number;
  annualSavings: string;
  chartsPerTab: string;
  indicatorsPerChart: string;
  alerts: string;
  highlighted?: boolean;
}

export const INDICES_DATA: MarketSymbol[] = [
  {
    id: 'SPX',
    ticker: 'SPX',
    name: 'S&P 500',
    category: 'Indices',
    exchange: 'SP',
    price: 7182.78,
    unit: 'POINT',
    decimals: 2,
    change: -17.98,
    changePercent: -0.25,
    delayed: true,
    marketOpen: true,
    badgeText: '500',
    badgeColor: '#E15249',
    open: 7198.4,
    high: 7211.15,
    low: 7164.2,
    prevClose: 7200.76,
    volume: '3.12B',
    description: 'Standard & Poor’s 500 Index tracking 500 leading U.S. publicly traded companies.',
  },
  {
    id: 'NDX',
    ticker: 'NDX',
    name: 'Nasdaq 100',
    category: 'Indices',
    exchange: 'NASDAQ',
    price: 24891.45,
    unit: 'POINT',
    decimals: 2,
    change: 142.3,
    changePercent: 0.58,
    delayed: true,
    marketOpen: true,
    badgeText: '100',
    badgeColor: '#0088CC',
    open: 24780.1,
    high: 24940.0,
    low: 24720.55,
    prevClose: 24749.15,
    volume: '2.45B',
    description: '100 of the largest domestic and international non-financial companies listed on Nasdaq.',
  },
  {
    id: 'DJI',
    ticker: 'DJI',
    name: 'Dow 30',
    category: 'Indices',
    exchange: 'DJ',
    price: 49214.6,
    unit: 'POINT',
    decimals: 2,
    change: -64.12,
    changePercent: -0.13,
    delayed: true,
    marketOpen: true,
    badgeText: '30',
    badgeColor: '#1E53E5',
    open: 49280.0,
    high: 49355.4,
    low: 49112.8,
    prevClose: 49278.72,
    volume: '485M',
    description: 'Price-weighted index of 30 prominent blue-chip industrial and financial companies in the U.S.',
  },
  {
    id: 'RUT',
    ticker: 'RUT',
    name: 'Russell 2000 small cap',
    shortName: 'Russell 2000',
    category: 'Indices',
    exchange: 'RUSSELL',
    price: 2713.67,
    unit: 'USD',
    decimals: 3,
    change: 11.62,
    changePercent: 0.43,
    delayed: true,
    marketOpen: true,
    badgeText: '2000',
    badgeColor: '#2E7D32',
    open: 2701.1,
    high: 2724.4,
    low: 2694.85,
    prevClose: 2702.05,
    volume: '1.18B',
    description: 'Small-cap stock market index measuring the performance of 2,000 small-capitalization U.S. companies.',
  },
  {
    id: 'VIX',
    ticker: 'VIX',
    name: 'Volatility S&P 500',
    category: 'Indices',
    exchange: 'CBOE',
    price: 13.84,
    unit: 'POINT',
    decimals: 2,
    change: -0.62,
    changePercent: -4.29,
    delayed: true,
    marketOpen: true,
    badgeText: 'VIX',
    badgeColor: '#5B4CE6',
    open: 14.48,
    high: 14.72,
    low: 13.71,
    prevClose: 14.46,
    description: 'CBOE Volatility Index measuring the market expectation of near-term volatility conveyed by S&P 500 option prices.',
  },
  {
    id: 'DAX',
    ticker: 'DAX',
    name: 'DAX Performance',
    category: 'Indices',
    exchange: 'XETR',
    price: 23418.92,
    unit: 'EUR',
    decimals: 2,
    change: 184.5,
    changePercent: 0.79,
    delayed: false,
    marketOpen: false,
    badgeText: 'DAX',
    badgeColor: '#131722',
    open: 23240.0,
    high: 23480.2,
    low: 23210.4,
    prevClose: 23234.42,
    description: 'Blue-chip stock market index consisting of the 40 major German companies trading on the Frankfurt Stock Exchange.',
  },
  {
    id: 'UKX',
    ticker: 'UKX',
    name: 'FTSE 100',
    category: 'Indices',
    exchange: 'FTSE',
    price: 9145.3,
    unit: 'GBP',
    decimals: 2,
    change: 29.4,
    changePercent: 0.32,
    delayed: true,
    marketOpen: false,
    badgeText: '100',
    badgeColor: '#00695C',
    open: 9118.0,
    high: 9162.75,
    low: 9104.2,
    prevClose: 9115.9,
    description: 'Share index of the 100 companies listed on the London Stock Exchange with the highest market capitalization.',
  },
  {
    id: 'NI225',
    ticker: 'NI225',
    name: 'Nikkei 225',
    category: 'Indices',
    exchange: 'TSE',
    price: 44612.8,
    unit: 'JPY',
    decimals: 2,
    change: -118.4,
    changePercent: -0.26,
    delayed: true,
    marketOpen: false,
    badgeText: '225',
    badgeColor: '#C62828',
    open: 44745.0,
    high: 44810.5,
    low: 44510.0,
    prevClose: 44731.2,
    description: 'Stock market index for the Tokyo Stock Exchange measuring 225 large, publicly owned Japanese companies.',
  },
];

export const STOCKS_DATA: MarketSymbol[] = [
  {
    id: 'NVDA',
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 184.62,
    unit: 'USD',
    decimals: 2,
    change: 4.88,
    changePercent: 2.71,
    marketOpen: true,
    badgeText: 'NV',
    badgeColor: '#76B900',
    open: 180.4,
    high: 186.1,
    low: 179.85,
    prevClose: 179.74,
    volume: '54.8M',
    marketCap: '4.52T',
    peRatio: '48.4',
    dividendYield: '0.03%',
    sector: 'Technology',
    rating: 'Strong Buy',
    description: 'Accelerated computing, AI infrastructure, and graphics processing technology leader.',
  },
  {
    id: 'AAPL',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 256.4,
    unit: 'USD',
    decimals: 2,
    change: 1.95,
    changePercent: 0.77,
    marketOpen: true,
    badgeText: 'AA',
    badgeColor: '#131722',
    open: 254.9,
    high: 257.2,
    low: 253.6,
    prevClose: 254.45,
    volume: '41.2M',
    marketCap: '3.89T',
    peRatio: '33.6',
    dividendYield: '0.42%',
    sector: 'Technology',
    rating: 'Buy',
    description: 'Consumer hardware, silicon architecture, and global software & services ecosystem.',
  },
  {
    id: 'MSFT',
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 492.18,
    unit: 'USD',
    decimals: 2,
    change: -2.44,
    changePercent: -0.49,
    marketOpen: true,
    badgeText: 'MS',
    badgeColor: '#00A4EF',
    open: 495.0,
    high: 496.8,
    low: 490.2,
    prevClose: 494.62,
    volume: '22.6M',
    marketCap: '3.66T',
    peRatio: '35.1',
    dividendYield: '0.68%',
    sector: 'Technology',
    rating: 'Strong Buy',
    description: 'Enterprise cloud infrastructure, productivity software, and AI platforms.',
  },
  {
    id: 'AMZN',
    ticker: 'AMZN',
    name: 'Amazon.com, Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 238.94,
    unit: 'USD',
    decimals: 2,
    change: 3.12,
    changePercent: 1.32,
    marketOpen: true,
    badgeText: 'AM',
    badgeColor: '#FF9900',
    open: 236.2,
    high: 240.15,
    low: 235.1,
    prevClose: 235.82,
    volume: '38.4M',
    marketCap: '2.51T',
    peRatio: '41.2',
    dividendYield: '—',
    sector: 'Consumer Discretionary',
    rating: 'Strong Buy',
    description: 'Global cloud computing (AWS), e-commerce fulfillment, and digital advertising.',
  },
  {
    id: 'TSLA',
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 368.45,
    unit: 'USD',
    decimals: 2,
    change: -11.35,
    changePercent: -2.99,
    marketOpen: true,
    badgeText: 'TS',
    badgeColor: '#E31937',
    open: 378.1,
    high: 381.4,
    low: 365.2,
    prevClose: 379.8,
    volume: '79.1M',
    marketCap: '1.17T',
    peRatio: '84.6',
    dividendYield: '—',
    sector: 'Consumer Discretionary',
    rating: 'Neutral',
    description: 'Electric vehicles, autonomous driving software, and grid-scale energy storage.',
  },
  {
    id: 'GOOGL',
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 218.75,
    unit: 'USD',
    decimals: 2,
    change: 3.9,
    changePercent: 1.82,
    marketOpen: true,
    badgeText: 'GO',
    badgeColor: '#4285F4',
    open: 215.4,
    high: 219.6,
    low: 214.9,
    prevClose: 214.85,
    volume: '27.3M',
    marketCap: '2.68T',
    peRatio: '24.9',
    dividendYield: '0.38%',
    sector: 'Communication Services',
    rating: 'Strong Buy',
    description: 'Search, YouTube, Google Cloud, and frontier artificial intelligence research.',
  },
  {
    id: 'META',
    ticker: 'META',
    name: 'Meta Platforms, Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 648.12,
    unit: 'USD',
    decimals: 2,
    change: -5.88,
    changePercent: -0.9,
    marketOpen: true,
    badgeText: 'ME',
    badgeColor: '#0668E1',
    open: 653.5,
    high: 656.9,
    low: 644.8,
    prevClose: 654.0,
    volume: '14.9M',
    marketCap: '1.63T',
    peRatio: '27.8',
    dividendYield: '0.32%',
    sector: 'Communication Services',
    rating: 'Buy',
    description: 'Global social networks, digital advertising, and open-weights AI & spatial hardware.',
  },
  {
    id: 'JPM',
    ticker: 'JPM',
    name: 'JPMorgan Chase & Co.',
    category: 'Stocks',
    exchange: 'NYSE',
    price: 268.3,
    unit: 'USD',
    decimals: 2,
    change: 2.18,
    changePercent: 0.82,
    marketOpen: true,
    badgeText: 'JP',
    badgeColor: '#117ACA',
    open: 266.4,
    high: 269.5,
    low: 265.1,
    prevClose: 266.12,
    volume: '9.4M',
    marketCap: '758B',
    peRatio: '14.2',
    dividendYield: '2.15%',
    sector: 'Financials',
    rating: 'Buy',
    description: 'Global financial services, investment banking, asset management, and commercial banking.',
  },
  {
    id: 'LLY',
    ticker: 'LLY',
    name: 'Eli Lilly and Company',
    category: 'Stocks',
    exchange: 'NYSE',
    price: 892.5,
    unit: 'USD',
    decimals: 2,
    change: 19.4,
    changePercent: 2.22,
    marketOpen: true,
    badgeText: 'LY',
    badgeColor: '#D52B1E',
    open: 874.0,
    high: 897.8,
    low: 871.3,
    prevClose: 873.1,
    volume: '4.1M',
    marketCap: '848B',
    peRatio: '62.3',
    dividendYield: '0.62%',
    sector: 'Healthcare',
    rating: 'Strong Buy',
    description: 'Biopharmaceutical leader in metabolic, oncology, and immunology therapeutics.',
  },
  {
    id: 'XOM',
    ticker: 'XOM',
    name: 'Exxon Mobil Corporation',
    category: 'Stocks',
    exchange: 'NYSE',
    price: 118.42,
    unit: 'USD',
    decimals: 2,
    change: -1.78,
    changePercent: -1.48,
    marketOpen: true,
    badgeText: 'XO',
    badgeColor: '#ED1C24',
    open: 120.1,
    high: 120.45,
    low: 117.95,
    prevClose: 120.2,
    volume: '16.7M',
    marketCap: '518B',
    peRatio: '13.8',
    dividendYield: '3.34%',
    sector: 'Energy',
    rating: 'Neutral',
    description: 'Integrated global energy producer across upstream exploration, refining, and petrochemicals.',
  },
  {
    id: 'AVGO',
    ticker: 'AVGO',
    name: 'Broadcom Inc.',
    category: 'Stocks',
    exchange: 'NASDAQ',
    price: 214.8,
    unit: 'USD',
    decimals: 2,
    change: 7.42,
    changePercent: 3.58,
    marketOpen: true,
    badgeText: 'AV',
    badgeColor: '#CC092F',
    open: 208.1,
    high: 216.3,
    low: 207.4,
    prevClose: 207.38,
    volume: '31.5M',
    marketCap: '1.01T',
    peRatio: '39.4',
    dividendYield: '1.12%',
    sector: 'Technology',
    rating: 'Strong Buy',
    description: 'Custom AI accelerators, networking silicon, and enterprise infrastructure software.',
  },
  {
    id: 'KO',
    ticker: 'KO',
    name: 'The Coca-Cola Company',
    category: 'Stocks',
    exchange: 'NYSE',
    price: 68.92,
    unit: 'USD',
    decimals: 2,
    change: 0.44,
    changePercent: 0.64,
    marketOpen: true,
    badgeText: 'KO',
    badgeColor: '#F40009',
    open: 68.5,
    high: 69.15,
    low: 68.25,
    prevClose: 68.48,
    volume: '12.3M',
    marketCap: '297B',
    peRatio: '24.6',
    dividendYield: '2.98%',
    sector: 'Consumer Staples',
    rating: 'Buy',
    description: 'Global beverage portfolio spanning sparkling soft drinks, hydration, coffee, and tea.',
  },
];

export const CRYPTO_DATA: MarketSymbol[] = [
  {
    id: 'BTCUSD',
    ticker: 'BTCUSD',
    name: 'Bitcoin',
    category: 'Crypto',
    exchange: 'COINBASE',
    price: 96420.5,
    unit: 'USD',
    decimals: 2,
    change: 2184.2,
    changePercent: 2.32,
    marketOpen: true,
    badgeText: '₿',
    badgeColor: '#F7931A',
    open: 94236.3,
    high: 97150.0,
    low: 93890.0,
    prevClose: 94236.3,
    volume: '48.2B',
    marketCap: '1.91T',
    description: 'Decentralized digital currency and proof-of-work settlement network.',
  },
  {
    id: 'ETHUSD',
    ticker: 'ETHUSD',
    name: 'Ethereum',
    category: 'Crypto',
    exchange: 'COINBASE',
    price: 3428.15,
    unit: 'USD',
    decimals: 2,
    change: 86.4,
    changePercent: 2.59,
    marketOpen: true,
    badgeText: 'Ξ',
    badgeColor: '#627EEA',
    open: 3341.75,
    high: 3465.0,
    low: 3318.4,
    prevClose: 3341.75,
    volume: '21.6B',
    marketCap: '413B',
    description: 'Programmable smart contract blockchain powering decentralized applications and rollups.',
  },
  {
    id: 'SOLUSD',
    ticker: 'SOLUSD',
    name: 'Solana',
    category: 'Crypto',
    exchange: 'COINBASE',
    price: 242.68,
    unit: 'USD',
    decimals: 2,
    change: -4.12,
    changePercent: -1.67,
    marketOpen: true,
    badgeText: 'SO',
    badgeColor: '#14F195',
    badgeTextColor: '#131722',
    open: 246.8,
    high: 249.9,
    low: 239.4,
    prevClose: 246.8,
    volume: '7.4B',
    marketCap: '115B',
    description: 'High-throughput Layer 1 blockchain using Proof of History consensus.',
  },
  {
    id: 'XRPUSD',
    ticker: 'XRPUSD',
    name: 'XRP',
    category: 'Crypto',
    exchange: 'BITSTAMP',
    price: 1.482,
    unit: 'USD',
    decimals: 4,
    change: 0.068,
    changePercent: 4.81,
    marketOpen: true,
    badgeText: 'XP',
    badgeColor: '#23292F',
    open: 1.414,
    high: 1.505,
    low: 1.401,
    prevClose: 1.414,
    volume: '5.9B',
    marketCap: '84.8B',
    description: 'Digital asset designed for low-cost cross-border settlement on the XRP Ledger.',
  },
  {
    id: 'BNBUSD',
    ticker: 'BNBUSD',
    name: 'BNB',
    category: 'Crypto',
    exchange: 'BINANCE',
    price: 654.3,
    unit: 'USD',
    decimals: 2,
    change: 5.9,
    changePercent: 0.91,
    marketOpen: true,
    badgeText: 'BN',
    badgeColor: '#F3BA2F',
    badgeTextColor: '#131722',
    open: 648.4,
    high: 660.1,
    low: 645.2,
    prevClose: 648.4,
    volume: '2.1B',
    marketCap: '95.4B',
    description: 'Native utility and gas token of the BNB Chain ecosystem.',
  },
];

export const FUTURES_DATA: MarketSymbol[] = [
  {
    id: 'GC1',
    ticker: 'GC1!',
    name: 'Gold Futures',
    category: 'Futures',
    exchange: 'COMEX',
    price: 2684.4,
    unit: 'USD',
    decimals: 2,
    change: 22.8,
    changePercent: 0.86,
    delayed: true,
    marketOpen: true,
    badgeText: 'Au',
    badgeColor: '#D4AF37',
    badgeTextColor: '#131722',
    open: 2663.1,
    high: 2691.5,
    low: 2658.2,
    prevClose: 2661.6,
    description: 'COMEX 100-troy-ounce Gold Futures benchmark contract.',
  },
  {
    id: 'CL1',
    ticker: 'CL1!',
    name: 'Crude Oil WTI',
    category: 'Futures',
    exchange: 'NYMEX',
    price: 69.18,
    unit: 'USD',
    decimals: 2,
    change: -1.14,
    changePercent: -1.62,
    delayed: true,
    marketOpen: true,
    badgeText: 'CL',
    badgeColor: '#374151',
    open: 70.35,
    high: 70.88,
    low: 68.74,
    prevClose: 70.32,
    description: 'Light Sweet Crude Oil WTI benchmark futures contract.',
  },
  {
    id: 'SI1',
    ticker: 'SI1!',
    name: 'Silver Futures',
    category: 'Futures',
    exchange: 'COMEX',
    price: 31.42,
    unit: 'USD',
    decimals: 3,
    change: 0.48,
    changePercent: 1.55,
    delayed: true,
    marketOpen: true,
    badgeText: 'Ag',
    badgeColor: '#94A3B8',
    badgeTextColor: '#131722',
    open: 30.98,
    high: 31.65,
    low: 30.84,
    prevClose: 30.94,
    description: 'COMEX 5,000-troy-ounce Silver Futures contract.',
  },
  {
    id: 'NG1',
    ticker: 'NG1!',
    name: 'Natural Gas',
    category: 'Futures',
    exchange: 'NYMEX',
    price: 3.314,
    unit: 'USD',
    decimals: 3,
    change: 0.142,
    changePercent: 4.48,
    delayed: true,
    marketOpen: true,
    badgeText: 'NG',
    badgeColor: '#0284C7',
    open: 3.185,
    high: 3.368,
    low: 3.162,
    prevClose: 3.172,
    description: 'Henry Hub Natural Gas futures contract.',
  },
];

export const FOREX_BONDS_DATA: MarketSymbol[] = [
  {
    id: 'EURUSD',
    ticker: 'EURUSD',
    name: 'Euro / U.S. Dollar',
    category: 'Forex',
    exchange: 'FX',
    price: 1.0542,
    unit: 'USD',
    decimals: 4,
    change: 0.0028,
    changePercent: 0.27,
    marketOpen: true,
    badgeText: 'EU',
    badgeColor: '#2962FF',
    open: 1.0514,
    high: 1.0561,
    low: 1.0498,
    prevClose: 1.0514,
    description: 'Most actively traded major currency pair globally.',
  },
  {
    id: 'USDJPY',
    ticker: 'USDJPY',
    name: 'U.S. Dollar / Japanese Yen',
    category: 'Forex',
    exchange: 'FX',
    price: 152.84,
    unit: 'JPY',
    decimals: 2,
    change: -0.92,
    changePercent: -0.6,
    marketOpen: true,
    badgeText: 'JP',
    badgeColor: '#DC2626',
    open: 153.76,
    high: 154.1,
    low: 152.4,
    prevClose: 153.76,
    description: 'Key G10 interest-rate differential barometer currency pair.',
  },
  {
    id: 'GBPUSD',
    ticker: 'GBPUSD',
    name: 'British Pound / U.S. Dollar',
    category: 'Forex',
    exchange: 'FX',
    price: 1.2648,
    unit: 'USD',
    decimals: 4,
    change: 0.0034,
    changePercent: 0.27,
    marketOpen: true,
    badgeText: 'GB',
    badgeColor: '#4F46E5',
    open: 1.2614,
    high: 1.2672,
    low: 1.2595,
    prevClose: 1.2614,
    description: 'Major currency pair linking London and New York liquidity.',
  },
  {
    id: 'US10Y',
    ticker: 'US10Y',
    name: 'U.S. 10Y Treasury Yield',
    category: 'Bonds',
    exchange: 'TVC',
    price: 4.268,
    unit: '%',
    decimals: 3,
    change: -0.042,
    changePercent: -0.97,
    marketOpen: true,
    badgeText: '10Y',
    badgeColor: '#0F766E',
    open: 4.31,
    high: 4.325,
    low: 4.251,
    prevClose: 4.31,
    description: 'Benchmark 10-year U.S. Treasury note yield.',
  },
  {
    id: 'US02Y',
    ticker: 'US02Y',
    name: 'U.S. 2Y Treasury Yield',
    category: 'Bonds',
    exchange: 'TVC',
    price: 4.194,
    unit: '%',
    decimals: 3,
    change: -0.028,
    changePercent: -0.66,
    marketOpen: true,
    badgeText: '02Y',
    badgeColor: '#0369A1',
    open: 4.222,
    high: 4.238,
    low: 4.18,
    prevClose: 4.222,
    description: 'Policy-sensitive 2-year U.S. Treasury yield.',
  },
];

export const ALL_SYMBOLS: MarketSymbol[] = [
  ...INDICES_DATA,
  ...STOCKS_DATA,
  ...CRYPTO_DATA,
  ...FUTURES_DATA,
  ...FOREX_BONDS_DATA,
];

export const SECTORS_HEATMAP: SectorBlock[] = [
  {
    id: 'tech',
    name: 'Information Technology',
    changePercent: 1.48,
    marketCapWeight: 32,
    leaders: [
      { ticker: 'NVDA', changePercent: 2.71 },
      { ticker: 'AVGO', changePercent: 3.58 },
      { ticker: 'AAPL', changePercent: 0.77 },
      { ticker: 'MSFT', changePercent: -0.49 },
    ],
  },
  {
    id: 'financials',
    name: 'Financials',
    changePercent: 0.74,
    marketCapWeight: 14,
    leaders: [
      { ticker: 'JPM', changePercent: 0.82 },
      { ticker: 'V', changePercent: 0.65 },
      { ticker: 'GS', changePercent: 1.14 },
    ],
  },
  {
    id: 'healthcare',
    name: 'Health Care',
    changePercent: 1.12,
    marketCapWeight: 12,
    leaders: [
      { ticker: 'LLY', changePercent: 2.22 },
      { ticker: 'UNH', changePercent: 0.45 },
      { ticker: 'JNJ', changePercent: -0.18 },
    ],
  },
  {
    id: 'consumer-disc',
    name: 'Consumer Discretionary',
    changePercent: -0.64,
    marketCapWeight: 11,
    leaders: [
      { ticker: 'AMZN', changePercent: 1.32 },
      { ticker: 'TSLA', changePercent: -2.99 },
      { ticker: 'HD', changePercent: -0.42 },
    ],
  },
  {
    id: 'comm',
    name: 'Communication Services',
    changePercent: 0.52,
    marketCapWeight: 10,
    leaders: [
      { ticker: 'GOOGL', changePercent: 1.82 },
      { ticker: 'META', changePercent: -0.9 },
      { ticker: 'NFLX', changePercent: 1.05 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy',
    changePercent: -1.36,
    marketCapWeight: 8,
    leaders: [
      { ticker: 'XOM', changePercent: -1.48 },
      { ticker: 'CVX', changePercent: -1.12 },
    ],
  },
  {
    id: 'industrials',
    name: 'Industrials',
    changePercent: 0.34,
    marketCapWeight: 8,
    leaders: [
      { ticker: 'GE', changePercent: 0.94 },
      { ticker: 'CAT', changePercent: -0.31 },
    ],
  },
  {
    id: 'staples',
    name: 'Consumer Staples',
    changePercent: 0.41,
    marketCapWeight: 5,
    leaders: [
      { ticker: 'KO', changePercent: 0.64 },
      { ticker: 'PG', changePercent: 0.29 },
    ],
  },
];

export const MARKET_NEWS: MarketNewsItem[] = [
  {
    id: 'n1',
    title: 'S&P 500 Consolidates Near 7,180 as Treasury Yields Ease Below 4.27%',
    source: 'MarketWire',
    publishedAt: '14 mins ago',
    symbol: 'SPX',
    category: 'US Equities',
    summary: 'Large-cap equities traded mixed in late afternoon action while small caps outperformed on cooling 10-year yields.',
  },
  {
    id: 'n2',
    title: 'Russell 2000 Extends Weekly Lead With Broad Breadth Across Regional Banks',
    source: 'Dow Jones Newswires',
    publishedAt: '42 mins ago',
    symbol: 'RUT',
    category: 'Indices',
    summary: 'Small-capitalization benchmarks climbed +0.43% as cyclical sectors attracted institutional rotation.',
  },
  {
    id: 'n3',
    title: 'Semiconductor Leaders Rally Ahead of Year-End Hyperscaler CapEx Updates',
    source: 'Reuters',
    publishedAt: '1 hr ago',
    symbol: 'NVDA',
    category: 'Technology',
    summary: 'Broadcom and NVIDIA led chipmakers higher on fresh data-center networking demand signals.',
  },
  {
    id: 'n4',
    title: 'Gold Rebounds Toward $2,685/oz as Dollar Index Softens Against Yen',
    source: 'TradingView News',
    publishedAt: '2 hrs ago',
    symbol: 'GC1!',
    category: 'Commodities',
    summary: 'Spot and futures gold contracts advanced 0.86% alongside firmer European bond bids.',
  },
];

export const COMMUNITY_IDEAS: CommunityIdea[] = [
  {
    id: 'i1',
    title: 'SPX: Higher-Low Structure Holding Above 7,140 Support Zone',
    author: 'MacroQuant_Desk',
    symbol: 'SPX',
    timeframe: '4H',
    bias: 'Long',
    publishedAt: '35m ago',
    likes: 184,
    comments: 29,
    summary: 'Price action continues to respect the rising 20-EMA channel with constructive breadth in Russell 2000.',
    trendPoints: [7090, 7104, 7095, 7118, 7130, 7124, 7146, 7162, 7158, 7174, 7182.78],
  },
  {
    id: 'i2',
    title: 'BTCUSD: Compression Breakout Above $95K Resistance',
    author: 'OnChainPulse',
    symbol: 'BTCUSD',
    timeframe: '1D',
    bias: 'Long',
    publishedAt: '1h ago',
    likes: 312,
    comments: 47,
    summary: 'Spot inflows and declining exchange balances confirm clean acceptance above the multi-week range high.',
    trendPoints: [91200, 91800, 91500, 92400, 93100, 92900, 94200, 95100, 95800, 96420],
  },
  {
    id: 'i3',
    title: 'USDJPY: Testing Key 152.50 Trendline Support Into Tokyo Session',
    author: 'FX_Structure',
    symbol: 'USDJPY',
    timeframe: '1H',
    bias: 'Short',
    publishedAt: '2h ago',
    likes: 96,
    comments: 14,
    summary: 'Lower US10Y yields are applying downward pressure below 153.80 resistance.',
    trendPoints: [154.2, 154.0, 153.8, 153.9, 153.5, 153.3, 153.4, 153.0, 152.84],
  },
];

export const BLACK_FRIDAY_PLANS: BlackFridayPlan[] = [
  {
    id: 'essential',
    name: 'Essential',
    audience: 'For active chartists',
    discount: '40% OFF',
    monthlyPrice: 8.95,
    originalPrice: 14.95,
    annualSavings: 'Save $72/yr + 1 free month',
    chartsPerTab: '2 charts per tab',
    indicatorsPerChart: '5 indicators per chart',
    alerts: '20 price & technical alerts',
  },
  {
    id: 'plus',
    name: 'Plus',
    audience: 'For multi-market traders',
    discount: '60% OFF',
    monthlyPrice: 13.95,
    originalPrice: 33.95,
    annualSavings: 'Save $240/yr + 1 free month',
    chartsPerTab: '4 charts per tab',
    indicatorsPerChart: '10 indicators per chart',
    alerts: '100 price & technical alerts',
  },
  {
    id: 'premium',
    name: 'Premium',
    audience: 'For high-precision desks',
    discount: '80% OFF',
    monthlyPrice: 16.95,
    originalPrice: 67.95,
    annualSavings: 'Save $612/yr + 1 free month',
    chartsPerTab: '8 charts per tab',
    indicatorsPerChart: '25 indicators per chart',
    alerts: '400 price & technical alerts',
    highlighted: true,
  },
];

// Deterministic pseudo-random generator seeded by symbol + timeframe
function seededNoise(seedStr: string, index: number): number {
  let h = 2166136261;
  const full = `${seedStr}:${index}`;
  for (let i = 0; i < full.length; i++) {
    h ^= full.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

export function generateSeriesForSymbol(
  symbol: MarketSymbol,
  timeframe: Timeframe
): CandlePoint[] {
  const countMap: Record<Timeframe, number> = {
    '1D': 78,
    '5D': 65,
    '1M': 60,
    '6M': 72,
    'YTD': 75,
    '1Y': 84,
    '5Y': 90,
    'All': 96,
  };

  const volatilityMap: Record<Timeframe, number> = {
    '1D': 0.0022,
    '5D': 0.0045,
    '1M': 0.0085,
    '6M': 0.015,
    'YTD': 0.018,
    '1Y': 0.021,
    '5Y': 0.032,
    'All': 0.042,
  };

  const n = countMap[timeframe];
  const vol = volatilityMap[timeframe];
  const target = symbol.price;

  // Build normalized random walk first, then anchor end to symbol.price
  const rawCloses: number[] = [1];
  const driftBias =
    timeframe === '1D'
      ? symbol.changePercent >= 0
        ? 0.0005
        : 0.00025
      : 0.0018;

  for (let i = 1; i < n; i++) {
    const r = seededNoise(`${symbol.id}-${timeframe}`, i) - 0.485;
    // Add natural market wave structure (like the SPX screenshot dip then steady rally)
    const wave =
      Math.sin((i / n) * Math.PI * 3.1) * vol * 0.45 +
      Math.cos((i / n) * Math.PI * 7.4) * vol * 0.22;
    const prev = rawCloses[i - 1];
    const next = prev * (1 + r * vol * 1.45 + driftBias + wave * 0.25);
    rawCloses.push(Math.max(0.2, next));
  }

  const endRatio = target / rawCloses[rawCloses.length - 1];
  const points: CandlePoint[] = [];

  for (let i = 0; i < n; i++) {
    const close = rawCloses[i] * endRatio;
    const prevClose = i === 0 ? close * (1 - 0.0015) : points[i - 1].close;
    const r1 = seededNoise(`${symbol.id}-${timeframe}-h`, i);
    const r2 = seededNoise(`${symbol.id}-${timeframe}-l`, i);
    const wickScale = target * vol * 0.65;
    const high = Math.max(prevClose, close) + r1 * wickScale;
    const low = Math.min(prevClose, close) - r2 * wickScale;

    let label = '';
    if (timeframe === '1D') {
      const totalMins = 9 * 60 + 30 + Math.round((i / (n - 1)) * 390);
      const hh = Math.floor(totalMins / 60);
      const mm = totalMins % 60;
      label = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
    } else if (timeframe === '5D') {
      const day = Math.floor((i / n) * 5) + 1;
      label = `Day ${day}`;
    } else if (timeframe === '1M') {
      label = `Nov ${Math.max(1, Math.min(26, Math.round((i / (n - 1)) * 25) + 1))}`;
    } else if (timeframe === '6M' || timeframe === 'YTD' || timeframe === '1Y') {
      const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
      label = `${months[Math.floor((i / n) * 12) % 12]} '${i < n / 12 ? '25' : '26'}`;
    } else {
      const startYear = timeframe === '5Y' ? 2021 : 2016;
      const year = startYear + Math.floor((i / n) * (2026 - startYear));
      label = `${year}`;
    }

    points.push({
      time: label,
      open: Number(prevClose.toFixed(symbol.decimals)),
      high: Number(high.toFixed(symbol.decimals)),
      low: Number(low.toFixed(symbol.decimals)),
      close: Number(close.toFixed(symbol.decimals)),
      volume: Math.round(100 + r1 * 900),
    });
  }

  // Ensure last point matches exact price
  const last = points[points.length - 1];
  last.close = symbol.price;
  last.high = Math.max(last.high, symbol.price);
  last.low = Math.min(last.low, symbol.price);

  return points;
}

export function formatPrice(value: number, decimals: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
