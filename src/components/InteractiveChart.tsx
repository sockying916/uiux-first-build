import React, { useState, useMemo, useRef } from 'react';
import {
  MarketSymbol,
  Timeframe,
  generateSeriesForSymbol,
  formatPrice,
} from '../data/marketsData';
import { CandlestickChart, TrendingUp, Star, Maximize2 } from 'lucide-react';

interface InteractiveChartProps {
  symbol: MarketSymbol;
  isStarred: boolean;
  onToggleStar: (id: string) => void;
  compact?: boolean;
  onExpandFull?: () => void;
}

const TIMEFRAMES: Timeframe[] = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'All'];

export const InteractiveChart: React.FC<InteractiveChartProps> = ({
  symbol,
  isStarred,
  onToggleStar,
  compact = false,
  onExpandFull,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartMode, setChartMode] = useState<'area' | 'candles'>('area');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const series = useMemo(
    () => generateSeriesForSymbol(symbol, timeframe),
    [symbol, timeframe]
  );

  // Use TradingView's signature teal-green (#089981) for positive/neutral curves or red (#F23645) when period change is negative
  const firstClose = series[0]?.close ?? symbol.price;
  const lastClose = series[series.length - 1]?.close ?? symbol.price;
  const periodChange = lastClose - firstClose;
  const periodChangePct = firstClose > 0 ? (periodChange / firstClose) * 100 : 0;

  // For 1D on SPX (matching the screenshot where SPX chart line & price tag are #089981 green while header shows -0.25% from prev close),
  // we color the curve based on intraday open-to-last or overall period direction!
  const isChartBullish = timeframe === '1D' ? lastClose >= firstClose : periodChange >= 0;
  const lineColor = isChartBullish ? '#089981' : '#F23645';

  // Dimensions inside SVG viewBox
  const width = 1120;
  const height = compact ? 280 : 350;
  const padLeft = 12;
  const padRight = 84; // Room for right Y-axis labels & colored price badge
  const padTop = 20;
  const padBottom = 30;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const { minVal, maxVal, yTicks } = useMemo(() => {
    let min = Infinity;
    let max = -Infinity;
    for (const pt of series) {
      const lo = chartMode === 'candles' ? pt.low : pt.close;
      const hi = chartMode === 'candles' ? pt.high : pt.close;
      if (lo < min) min = lo;
      if (hi > max) max = hi;
    }
    const span = max - min || symbol.price * 0.01;
    const paddedMin = min - span * 0.14;
    const paddedMax = max + span * 0.14;
    const steps = 4;
    const ticks: number[] = [];
    for (let i = 0; i <= steps; i++) {
      ticks.push(paddedMin + ((paddedMax - paddedMin) * i) / steps);
    }
    return { minVal: paddedMin, maxVal: paddedMax, yTicks: ticks };
  }, [series, chartMode, symbol.price]);

  const toX = (i: number) =>
    padLeft + (i / Math.max(1, series.length - 1)) * plotW;

  const toY = (val: number) =>
    padTop + plotH - ((val - minVal) / Math.max(1e-9, maxVal - minVal)) * plotH;

  const areaPath = useMemo(() => {
    if (series.length === 0) return '';
    const lineParts = series.map((pt, idx) => {
      const x = toX(idx).toFixed(2);
      const y = toY(pt.close).toFixed(2);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    });
    const lastX = toX(series.length - 1).toFixed(2);
    const firstX = toX(0).toFixed(2);
    const bottomY = (padTop + plotH).toFixed(2);
    return `${lineParts.join(' ')} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [series, minVal, maxVal, plotW, plotH]);

  const linePath = useMemo(() => {
    return series
      .map((pt, idx) => {
        const x = toX(idx).toFixed(2);
        const y = toY(pt.close).toFixed(2);
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  }, [series, minVal, maxVal, plotW, plotH]);

  const activePoint =
    hoverIdx !== null && series[hoverIdx] ? series[hoverIdx] : series[series.length - 1];

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * width;
    const clampedX = Math.max(padLeft, Math.min(padLeft + plotW, relX));
    const idx = Math.round(((clampedX - padLeft) / plotW) * (series.length - 1));
    setHoverIdx(Math.max(0, Math.min(series.length - 1, idx)));
  };

  const currentY = toY(symbol.price);
  const gradientId = `tv-area-grad-${symbol.id}-${isChartBullish ? 'up' : 'dn'}`;

  // X-axis sample indices
  const xLabelIndices = useMemo(() => {
    const count = 6;
    const res: number[] = [];
    for (let i = 0; i < count; i++) {
      res.push(Math.round((i / (count - 1)) * (series.length - 1)));
    }
    return res;
  }, [series.length]);

  return (
    <div className="w-full">
      {/* Chart Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#E0E3EB]/80 dark:border-[#2A2E39]">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <div className="flex items-center gap-2.5">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{
                backgroundColor: symbol.badgeColor,
                color: symbol.badgeTextColor ?? '#FFFFFF',
              }}
            >
              {symbol.badgeText}
            </span>
            <h3 className="font-display text-lg font-bold text-[#131722] dark:text-white tracking-tight">
              {symbol.name}
            </h3>
            <span className="text-xs font-mono text-[#6A6D78] dark:text-[#868993]">
              {symbol.exchange}:{symbol.ticker}
            </span>
          </div>

          <div className="flex items-baseline gap-2.5 tabular-nums">
            <span className="text-xl font-bold text-[#131722] dark:text-white">
              {formatPrice(activePoint.close, symbol.decimals)}
            </span>
            <span className="text-xs font-medium text-[#6A6D78] dark:text-[#868993]">
              {symbol.unit}
            </span>
            <span
              className={`text-sm font-semibold ${
                symbol.changePercent >= 0 ? 'text-[#089981]' : 'text-[#F23645]'
              }`}
            >
              {symbol.change >= 0 ? '+' : ''}
              {formatPrice(symbol.change, symbol.decimals)} ({symbol.changePercent >= 0 ? '+' : ''}
              {symbol.changePercent.toFixed(2)}%)
            </span>
            {hoverIdx !== null && (
              <span className="text-xs font-mono text-[#6A6D78] dark:text-[#868993] ml-1">
                · {activePoint.time}
              </span>
            )}
          </div>
        </div>

        {/* Right Controls: Chart Type + Watchlist */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#F0F3FA] dark:bg-[#1E222D] p-0.5 rounded-lg">
            <button
              type="button"
              onClick={() => setChartMode('area')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                chartMode === 'area'
                  ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-xs'
                  : 'text-[#6A6D78] dark:text-[#868993] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Area</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode('candles')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                chartMode === 'candles'
                  ? 'bg-white dark:bg-[#2A2E39] text-[#131722] dark:text-white shadow-xs'
                  : 'text-[#6A6D78] dark:text-[#868993] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              <CandlestickChart className="w-3.5 h-3.5" />
              <span>Candles</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => onToggleStar(symbol.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
              isStarred
                ? 'border-[#2962FF] bg-[#2962FF]/10 text-[#2962FF]'
                : 'border-[#E0E3EB] dark:border-[#2A2E39] text-[#131722] dark:text-[#D1D4DC] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D]'
            }`}
            aria-label={isStarred ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-[#2962FF]' : ''}`} />
            <span>{isStarred ? 'Watchlisted' : 'Watchlist'}</span>
          </button>

          {onExpandFull && (
            <button
              type="button"
              onClick={onExpandFull}
              className="p-1.5 rounded-lg border border-[#E0E3EB] dark:border-[#2A2E39] text-[#6A6D78] dark:text-[#868993] hover:text-[#131722] dark:hover:text-white hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] transition-colors cursor-pointer"
              aria-label="Open full symbol overview"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main SVG Plot */}
      <div className="relative w-full select-none mt-2">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverIdx(null)}
          role="img"
          aria-label={`${symbol.name} interactive ${timeframe} price chart`}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lineColor} stopOpacity="0.22" />
              <stop offset="85%" stopColor={lineColor} stopOpacity="0.03" />
              <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Right Y-Axis Labels */}
          {yTicks.map((tick, idx) => {
            const y = toY(tick);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={padLeft + plotW}
                  y2={y}
                  stroke="currentColor"
                  className="text-[#E0E3EB]/70 dark:text-[#2A2E39]"
                  strokeWidth="1"
                />
                <text
                  x={padLeft + plotW + 10}
                  y={y + 4}
                  fontSize="11.5"
                  fontFamily="var(--font-mono)"
                  className="fill-[#787B86] dark:fill-[#868993] tabular-nums"
                >
                  {formatPrice(tick, symbol.decimals)}
                </text>
              </g>
            );
          })}

          {/* Dashed Reference Line at Last Price */}
          <line
            x1={padLeft}
            y1={currentY}
            x2={padLeft + plotW}
            y2={currentY}
            stroke={lineColor}
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.55"
          />

          {/* Area & Line Series OR Candlestick Series */}
          {chartMode === 'area' ? (
            <>
              <path d={areaPath} fill={`url(#${gradientId})`} />
              <path
                d={linePath}
                fill="none"
                stroke={lineColor}
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </>
          ) : (
            series.map((pt, idx) => {
              const x = toX(idx);
              const candleW = Math.max(3, Math.min(9, (plotW / series.length) * 0.62));
              const isUp = pt.close >= pt.open;
              const col = isUp ? '#089981' : '#F23645';
              const yOpen = toY(pt.open);
              const yClose = toY(pt.close);
              const yHigh = toY(pt.high);
              const yLow = toY(pt.low);
              const bodyTop = Math.min(yOpen, yClose);
              const bodyH = Math.max(1.5, Math.abs(yOpen - yClose));

              return (
                <g key={idx}>
                  <line
                    x1={x}
                    y1={yHigh}
                    x2={x}
                    y2={yLow}
                    stroke={col}
                    strokeWidth="1.2"
                  />
                  <rect
                    x={x - candleW / 2}
                    y={bodyTop}
                    width={candleW}
                    height={bodyH}
                    fill={col}
                    rx="0.8"
                  />
                </g>
              );
            })
          )}

          {/* Right Y-Axis Current Price Pill Tag (exact match to screenshot's 7,182.78 green tag) */}
          <g transform={`translate(${padLeft + plotW + 2}, ${currentY - 11})`}>
            <rect
              x="0"
              y="0"
              width="76"
              height="22"
              rx="4"
              fill={lineColor}
            />
            <text
              x="38"
              y="14.5"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="600"
              fontFamily="var(--font-mono)"
              fill="#FFFFFF"
              className="tabular-nums"
            >
              {formatPrice(symbol.price, symbol.decimals)}
            </text>
          </g>

          {/* X-Axis Timestamps */}
          {xLabelIndices.map((idx) => {
            const pt = series[idx];
            if (!pt) return null;
            return (
              <text
                key={idx}
                x={toX(idx)}
                y={height - 6}
                textAnchor="middle"
                fontSize="11"
                fontFamily="var(--font-mono)"
                className="fill-[#787B86] dark:fill-[#868993]"
              >
                {pt.time}
              </text>
            );
          })}

          {/* Interactive Crosshair on Hover */}
          {hoverIdx !== null && series[hoverIdx] && (
            <g>
              <line
                x1={toX(hoverIdx)}
                y1={padTop}
                x2={toX(hoverIdx)}
                y2={padTop + plotH}
                stroke="#787B86"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1={padLeft}
                y1={toY(series[hoverIdx].close)}
                x2={padLeft + plotW}
                y2={toY(series[hoverIdx].close)}
                stroke="#787B86"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <circle
                cx={toX(hoverIdx)}
                cy={toY(series[hoverIdx].close)}
                r="4.5"
                fill={lineColor}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Timeframe Bar & Key Session Stats */}
      <div className="mt-3 pt-3 border-t border-[#E0E3EB]/80 dark:border-[#2A2E39] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                timeframe === tf
                  ? 'bg-[#2962FF]/12 text-[#2962FF]'
                  : 'text-[#6A6D78] dark:text-[#868993] hover:bg-[#F0F3FA] dark:hover:bg-[#1E222D] hover:text-[#131722] dark:hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5 text-xs tabular-nums text-[#6A6D78] dark:text-[#868993]">
          <span>
            Open <strong className="text-[#131722] dark:text-white font-semibold ml-1">{formatPrice(symbol.open, symbol.decimals)}</strong>
          </span>
          <span>
            High <strong className="text-[#131722] dark:text-white font-semibold ml-1">{formatPrice(symbol.high, symbol.decimals)}</strong>
          </span>
          <span>
            Low <strong className="text-[#131722] dark:text-white font-semibold ml-1">{formatPrice(symbol.low, symbol.decimals)}</strong>
          </span>
          <span>
            Prev Close <strong className="text-[#131722] dark:text-white font-semibold ml-1">{formatPrice(symbol.prevClose, symbol.decimals)}</strong>
          </span>
          <span className={periodChangePct >= 0 ? 'text-[#089981] font-medium' : 'text-[#F23645] font-medium'}>
            {timeframe} Range: {periodChangePct >= 0 ? '+' : ''}
            {periodChangePct.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};
