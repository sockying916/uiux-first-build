import React, { useState, useEffect } from 'react';
import { X, Check, ArrowLeft } from 'lucide-react';
import { BLACK_FRIDAY_PLANS } from '../data/marketsData';

interface BlackFridayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlackFridayModal: React.FC<BlackFridayModalProps> = ({
  isOpen,
  onClose,
}) => {
  // Initialize countdown matching screenshot: 02 DAYS 05 HOURS 48 MINS 28 SECS
  const [secondsLeft, setSecondsLeft] = useState(
    2 * 86400 + 5 * 3600 + 48 * 60 + 28
  );
  const [showOffers, setShowOffers] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('premium');
  const [claimedPlan, setClaimedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const days = Math.floor(secondsLeft / 86400);
  const hours = Math.floor((secondsLeft % 86400) / 3600);
  const mins = Math.floor((secondsLeft % 3600) / 60);
  const secs = secondsLeft % 60;

  const countdownBlocks = [
    { value: String(days).padStart(2, '0'), label: 'DAYS' },
    { value: String(hours).padStart(2, '0'), label: 'HOURS' },
    { value: String(mins).padStart(2, '0'), label: 'MINS' },
    { value: String(secs).padStart(2, '0'), label: 'SECS' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="bf-modal-title"
    >
      <div
        className="relative w-full max-w-[740px] rounded-2xl overflow-hidden bg-[#06070B] text-white shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cosmic Black Hole / Accretion Disk Art Backdrop (SVG + Radial Gradients) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {/* Deep starfield */}
          <div
            className="absolute inset-0 opacity-75"
            style={{
              backgroundImage:
                'radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.7), transparent), radial-gradient(1px 1px at 26% 72%, rgba(255,220,180,0.6), transparent), radial-gradient(1.5px 1.5px at 78% 24%, rgba(255,255,255,0.8), transparent), radial-gradient(1px 1px at 88% 66%, rgba(255,190,140,0.6), transparent), radial-gradient(1px 1px at 42% 12%, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 64% 84%, rgba(255,255,255,0.5), transparent)',
            }}
          />
          {/* Fiery elliptical accretion glow */}
          <div
            className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[920px] h-[340px] -rotate-[16deg] rounded-full blur-2xl opacity-80"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,0,0,0.95) 26%, rgba(255,165,64,0.85) 38%, rgba(242,68,35,0.75) 50%, rgba(168,32,16,0.35) 66%, transparent 78%)',
            }}
          />
          {/* Secondary upper photon ring */}
          <div
            className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full blur-md opacity-70"
            style={{
              background:
                'radial-gradient(circle at center, #030407 48%, rgba(255,188,92,0.88) 54%, rgba(255,82,36,0.62) 60%, transparent 72%)',
            }}
          />
          {/* Fine plasma swirl rings */}
          <svg
            viewBox="0 0 800 500"
            className="absolute inset-0 w-full h-full opacity-75 mix-blend-screen"
            preserveAspectRatio="xMidYMid slice"
          >
            <g transform="translate(400,260) rotate(-16)">
              <ellipse cx="0" cy="0" rx="330" ry="72" fill="none" stroke="rgba(255,130,45,0.45)" strokeWidth="2.5" />
              <ellipse cx="0" cy="0" rx="285" ry="56" fill="none" stroke="rgba(255,190,95,0.65)" strokeWidth="1.5" strokeDasharray="14 8" />
              <ellipse cx="0" cy="0" rx="235" ry="42" fill="none" stroke="rgba(255,75,45,0.55)" strokeWidth="2" />
              <circle cx="0" cy="0" r="102" fill="#040508" stroke="rgba(255,196,112,0.75)" strokeWidth="2" />
            </g>
          </svg>
          {/* Contrast scrim for guaranteed text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/75" />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close Black Friday offer"
        >
          <X className="w-5 h-5" />
        </button>

        {!showOffers ? (
          /* Main Hero Black Friday View (Exact match to screenshot) */
          <div className="relative z-10 px-6 sm:px-12 py-12 sm:py-16 flex flex-col items-center text-center">
            <h2
              id="bf-modal-title"
              className="font-display text-5xl sm:text-[62px] font-extrabold tracking-tight leading-none bg-gradient-to-r from-[#FF2A4B] via-[#FF5A2A] to-[#FF9B19] bg-clip-text text-transparent drop-shadow-sm"
            >
              Black Friday
            </h2>

            <p className="mt-5 font-display text-3xl sm:text-[40px] font-bold tracking-tight text-white leading-tight">
              Up to 80% off
            </p>
            <p className="mt-1.5 text-lg sm:text-[21px] font-bold text-[#FF5722]">
              +1 free month
            </p>

            <p className="mt-7 text-sm font-medium text-white/90">
              Sale ends in
            </p>

            <div className="mt-3 grid grid-cols-4 gap-2.5 sm:gap-3.5">
              {countdownBlocks.map((block) => (
                <div
                  key={block.label}
                  className="w-16 sm:w-[74px] py-2.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/12 flex flex-col items-center justify-center"
                >
                  <span className="font-display text-2xl sm:text-[26px] font-bold text-white tabular-nums leading-none">
                    {block.value}
                  </span>
                  <span className="mt-1.5 text-[10px] font-medium tracking-wider text-white/65">
                    {block.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setShowOffers(true)}
              className="mt-8 px-8 py-3 rounded-lg bg-gradient-to-r from-[#FF2752] via-[#FF4D29] to-[#FF7B00] hover:brightness-110 active:scale-[0.99] text-white font-semibold text-base shadow-lg shadow-[#FF4D29]/25 transition-all cursor-pointer"
            >
              Explore offers
            </button>
          </div>
        ) : (
          /* Plan Comparison View inside the modal */
          <div className="relative z-10 px-6 sm:px-8 py-8">
            <button
              type="button"
              onClick={() => {
                setShowOffers(false);
                setClaimedPlan(null);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-white/75 hover:text-white mb-4 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Black Friday countdown
            </button>

            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-white">
                  Choose your Black Friday plan
                </h2>
                <p className="text-sm text-white/70 mt-0.5">
                  Annual billing with 1 bonus month included automatically.
                </p>
              </div>
              <div className="text-xs font-mono tabular-nums text-[#FF8A3D]">
                Ends in {countdownBlocks[0].value}d {countdownBlocks[1].value}h {countdownBlocks[2].value}m {countdownBlocks[3].value}s
              </div>
            </div>

            {claimedPlan ? (
              <div className="rounded-xl bg-white/10 backdrop-blur-md border border-white/15 p-6 text-center">
                <div className="w-10 h-10 rounded-full bg-[#089981]/20 text-[#089981] flex items-center justify-center mx-auto mb-3">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-bold text-white">
                  {claimedPlan} Offer Selected
                </h3>
                <p className="text-sm text-white/75 mt-1 max-w-md mx-auto">
                  Your Black Friday discount and +1 free month trial allocation have been staged for checkout.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 px-6 py-2.5 rounded-lg bg-[#2962FF] hover:bg-[#1E53E5] text-white text-sm font-semibold cursor-pointer"
                >
                  Return to Markets
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {BLACK_FRIDAY_PLANS.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`rounded-xl p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-white/14 border-[#FF6B2C] shadow-lg'
                          : 'bg-black/55 border-white/12 hover:border-white/25'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-display font-bold text-base text-white">
                            {plan.name}
                          </span>
                          <span className="text-[11px] font-bold text-[#FF7B3A]">
                            {plan.discount}
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5">{plan.audience}</p>

                        <div className="mt-3 flex items-baseline gap-2 tabular-nums">
                          <span className="text-2xl font-bold text-white">
                            ${plan.monthlyPrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-white/50 line-through">
                            ${plan.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-white/60">/mo</span>
                        </div>
                        <p className="text-[11px] text-[#089981] font-medium mt-1">
                          {plan.annualSavings}
                        </p>

                        <ul className="mt-4 space-y-1.5 text-xs text-white/80">
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#FF7B3A] shrink-0" />
                            <span>{plan.chartsPerTab}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#FF7B3A] shrink-0" />
                            <span>{plan.indicatorsPerChart}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#FF7B3A] shrink-0" />
                            <span>{plan.alerts}</span>
                          </li>
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setClaimedPlan(plan.name);
                        }}
                        className={`mt-5 w-full py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          plan.highlighted || isSelected
                            ? 'bg-gradient-to-r from-[#FF2752] to-[#FF7B00] text-white hover:brightness-110'
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        Get {plan.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
