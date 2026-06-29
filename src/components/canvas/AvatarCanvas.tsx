import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const J = { type: 'spring', mass: 0.8, stiffness: 200, damping: 20 };

const ue = {
  S: { x: 0.92, y: 0.97 },
  M: { x: 1, y: 1 },
  L: { x: 1.1, y: 1.05 }
};

const Y = {
  Headwear: { top: '3%', left: '39.5%', width: '21%', height: '13%', radius: '50% 50% 46% 46%' },
  Top: { top: '20%', left: '26%', width: '48%', height: '30%', radius: '44% 44% 38% 38% / 60% 60% 40% 40%' },
  Bottoms: { top: '50%', left: '30%', width: '40%', height: '30%', radius: '40% 40% 46% 46% / 22% 22% 60% 60%' },
  Shoes: { top: '86%', left: '31%', width: '38%', height: '11%', radius: '40% 40% 50% 50% / 60% 60% 100% 100%' }
};

interface AvatarCanvasProps {
  outfit: Record<string, string>;
  activeZone: string;
  onZoneTap: (zone: string) => void;
  size?: 'S' | 'M' | 'L';
  getItemById?: (id: string) => any;
}

export function AvatarCanvas({ outfit, activeZone, onZoneTap, size = 'M', getItemById }: AvatarCanvasProps) {
  const a = ue[size];

  return (
    <div 
      className="relative mx-auto aspect-[3/5] w-full max-w-[300px] overflow-hidden rounded-[32px] border border-white/20 bg-white/10"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 20px 50px -24px rgba(0,0,0,0.6)'
      }}
    >
      <span 
        aria-hidden={true} 
        className="absolute inset-0 -z-10 rounded-[40px]"
        style={{ background: 'radial-gradient(60% 45% at 50% 32%, var(--tint), transparent 70%)' }}
      />
      <span 
        aria-hidden={true} 
        className="absolute inset-x-[18%] bottom-[5%] h-[4%] rounded-[50%] blur-md"
        style={{ background: 'rgba(0,0,0,0.28)' }}
      />
      
      <svg viewBox="0 0 100 167" className="absolute inset-0 size-full" aria-hidden={true} fill="none">
        <defs>
          <linearGradient id="mq-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--mq-top)" />
            <stop offset="1" stopColor="var(--mq-bottom)" />
          </linearGradient>
          <linearGradient id="mq-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="0.4" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <path 
          d="M50 4 C58 4 63 10 63 17 C63 23 59 27 55 29 C61 30 66 32 70 36 C75 41 77 49 78 58 C79 67 77 76 73 84 C71 88 70 92 70 97 L67 128 C66 138 65 146 63 156 C62 161 59 163 55 163 C52 163 50 161 50 157 C50 161 48 163 45 163 C41 163 38 161 37 156 C35 146 34 138 33 128 L30 97 C30 92 29 88 27 84 C23 76 21 67 22 58 C23 49 25 41 30 36 C34 32 39 30 45 29 C41 27 37 23 37 17 C37 10 42 4 50 4 Z" 
          fill="url(#mq-fill)" 
          stroke="var(--mq-stroke)" 
          strokeWidth="0.6" 
        />
        <path 
          d="M50 4 C42 4 37 10 37 17 C37 23 41 27 45 29 C39 30 34 32 30 36 C25 41 23 49 22 58 C21 67 23 76 27 84 C29 88 30 92 30 97 L33 128" 
          stroke="url(#mq-sheen)" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
        />
      </svg>

      {Object.keys(Y).map(i => {
        const o = (Y as any)[i];
        const itemId = outfit[i];
        const s = itemId && getItemById ? getItemById(itemId) : undefined;
        const c = activeZone === i;

        return (
          <button 
            key={i}
            type="button" 
            onClick={() => onZoneTap(i)} 
            aria-label={`${i}${s ? `: ${s.name}` : ' (empty)'}`} 
            aria-pressed={c} 
            className="absolute" 
            style={{ top: o.top, left: o.left, width: o.width, height: o.height }}
          >
            {s && (
              <motion.span 
                layout={true} 
                initial={{ opacity: 0, scaleX: 0.92, scaleY: 0.92 }} 
                animate={{ opacity: 1, scaleX: i === 'Headwear' ? 1 : a.x, scaleY: i === 'Headwear' ? 1 : a.y }} 
                transition={J} 
                className="absolute inset-0 overflow-hidden border border-white/20" 
                style={{ borderRadius: o.radius, transformOrigin: 'top center', willChange: 'transform, opacity', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 22px -10px rgba(0,0,0,0.55)' }}
              >
                <img src={s.image} alt="" className="size-full object-cover" draggable={false} />
                <span aria-hidden={true} className="pointer-events-none absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.28), transparent 42%)' }} />
              </motion.span>
            )}
            {c && (
              <motion.span 
                layoutId="avatar-zone-ring" 
                transition={J} 
                aria-hidden={true} 
                className="pointer-events-none absolute -inset-2 border border-white/30 backdrop-blur-md" 
                style={{ borderRadius: o.radius, WebkitBackdropFilter: 'blur(12px)', boxShadow: '0 0 0 1.5px rgba(255,255,255,0.4), 0 12px 34px -12px rgba(0,0,0,0.55)' }} 
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
