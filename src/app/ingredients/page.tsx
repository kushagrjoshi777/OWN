'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate, PanInfo, AnimatePresence } from 'framer-motion';
import './ingredients.css';

/* ─────────────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────────────── */
const INGREDIENTS = [
  {
    id: 'cherry',
    name: 'Dark Cherry',
    latin: 'Prunus avium',
    profile: 'Before the Moment',
    tag: 'Top Note',
    description:
      'A seductive, juicy top note that cascades into warmth. Hand-harvested for an intoxicatingly primal sweetness that opens every ritual.',
    accent: '#C850A0',
    bg: 'linear-gradient(135deg, #2a0a3c 0%, #5c0d3c 50%, #8b1a4a 100%)',
    overlayColor: 'rgba(200,80,160,0.18)',
    cardGradient: 'linear-gradient(160deg, #3d0a2e 0%, #7a1456 60%, #c850a0 100%)',
    number: '01',
  },
  {
    id: 'lotus',
    name: 'Water Lotus',
    latin: 'Nelumbo nucifera',
    profile: 'After Dark',
    tag: 'Heart Note',
    description:
      'Crisp, aquatic, and deeply calming. Extracted at dawn to capture the pure essence of quiet midnight waters. It breathes stillness.',
    accent: '#3BA8D4',
    bg: 'linear-gradient(135deg, #001a2c 0%, #003a5c 50%, #005a8a 100%)',
    overlayColor: 'rgba(59,168,212,0.18)',
    cardGradient: 'linear-gradient(160deg, #001e35 0%, #004d75 60%, #3ba8d4 100%)',
    number: '02',
  },
  {
    id: 'amber',
    name: 'Liquid Amber',
    latin: 'Liquidambar styraciflua',
    profile: 'The Main Character',
    tag: 'Base Note',
    description:
      'A golden resinous core that demands the room. It lingers on the skin, leaving an unapologetic trail of confidence and raw, golden heat.',
    accent: '#E8A320',
    bg: 'linear-gradient(135deg, #1a0a00 0%, #4a1f00 50%, #8a3c00 100%)',
    overlayColor: 'rgba(232,163,32,0.18)',
    cardGradient: 'linear-gradient(160deg, #1e0c00 0%, #5c2800 60%, #e8a320 100%)',
    number: '03',
  },
  {
    id: 'salt',
    name: 'Sea Salt',
    latin: 'Sodium chloride — Atlantic',
    profile: 'After Dark',
    tag: 'Accord',
    description:
      'Raw, mineral intimacy. Sea salt opens the fragrance, grounding floral notes with an earthy, skin-close texture that makes it unforgettable.',
    accent: '#9EA8D4',
    bg: 'linear-gradient(135deg, #060818 0%, #111832 50%, #1e2850 100%)',
    overlayColor: 'rgba(158,168,212,0.18)',
    cardGradient: 'linear-gradient(160deg, #080a1e 0%, #161d42 60%, #9ea8d4 100%)',
    number: '04',
  },
  {
    id: 'vanilla',
    name: 'Warm Vanilla',
    latin: 'Vanilla planifolia',
    profile: 'Before the Moment',
    tag: 'Base Note',
    description:
      'Not overly sweet, but complex and woody. Madagascar vanilla beans wrap the senses in an elegant, comforting veil that stays.',
    accent: '#D4956A',
    bg: 'linear-gradient(135deg, #1a0a06 0%, #3d1a10 50%, #6b2c18 100%)',
    overlayColor: 'rgba(212,149,106,0.18)',
    cardGradient: 'linear-gradient(160deg, #1e0c08 0%, #4a1e12 60%, #d4956a 100%)',
    number: '05',
  },
];

/* ─────────────────────────────────────────────────────────────
   Card Stack — Framer mechanic re-implemented natively
───────────────────────────────────────────────────────────── */
const OFFSET_PCT = 9;
const SCALE_STEP = 0.065;
const DIM_STEP   = 0.18;
const SPRING     = { type: 'spring', stiffness: 180, damping: 28 } as const;

interface IngredientCard {
  id: string;
  name: string;
  latin: string;
  profile: string;
  tag: string;
  description: string;
  accent: string;
  bg: string;
  overlayColor: string;
  cardGradient: string;
  number: string;
}

function CardStack({ cards, onFront }: { cards: IngredientCard[]; onFront: (card: IngredientCard) => void }) {
  const [order, setOrder] = useState<string[]>(cards.map((c) => c.id));

  const dismiss = () => {
    setOrder((prev) => {
      const next = [...prev.slice(1), prev[0]];
      const frontCard = cards.find((c) => c.id === next[0]);
      if (frontCard) onFront(frontCard);
      return next;
    });
  };

  return (
    <div className="card-stack-root">
      <ul>
        {order.map((id, i) => {
          const card = cards.find((c) => c.id === id)!;
          const isFront = i === 0;
          const brightness = Math.max(0.15, 1 - i * DIM_STEP);
          const zIndex = order.length - i;

          return (
            <DraggableCard
              key={id}
              card={card}
              isFront={isFront}
              index={i}
              total={order.length}
              brightness={brightness}
              zIndex={zIndex}
              onDismiss={dismiss}
            />
          );
        })}
      </ul>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Individual Draggable Card
───────────────────────────────────────────────────────────── */
function DraggableCard({
  card,
  isFront,
  index,
  brightness,
  zIndex,
  onDismiss,
}: {
  card: IngredientCard;
  isFront: boolean;
  index: number;
  total: number;
  brightness: number;
  zIndex: number;
  onDismiss: () => void;
}) {
  const y = useMotionValue(0);
  const rotate = useTransform(y, [-200, 200], [-8, 8]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.y) > 60 || Math.abs(info.velocity.y) > 400) {
      animate(y, info.offset.y > 0 ? 500 : -500, {
        duration: 0.3,
        onComplete: () => {
          y.set(0);
          onDismiss();
        },
      });
    } else {
      animate(y, 0, SPRING);
    }
  };

  return (
    <motion.li
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 24,
        overflow: 'hidden',
        zIndex,
        cursor: isFront ? 'grab' : 'auto',
        touchAction: 'none',
        y,
        rotate: isFront ? rotate : 0,
      }}
      animate={{
        top: `${index * -OFFSET_PCT}%`,
        scale: 1 - index * SCALE_STEP,
        filter: `brightness(${brightness})`,
      }}
      transition={SPRING}
      drag={isFront ? 'y' : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.4}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1 - index * SCALE_STEP + 0.02, cursor: 'grabbing' }}
    >
      {/* Gradient background */}
      <div style={{ position: 'absolute', inset: 0, background: card.cardGradient }} />

      {/* Noise texture */}
      <div className="card-noise" />

      {/* Glow orb */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: '70%',
          aspectRatio: '1',
          borderRadius: '50%',
          background: card.accent,
          filter: 'blur(80px)',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* Card content */}
      <div className="card-inner">
        <div className="card-top-row">
          <span className="card-number">{card.number}</span>
          <span className="card-tag" style={{ borderColor: card.accent, color: card.accent }}>
            {card.tag}
          </span>
        </div>

        <div className="card-name-block">
          <p className="card-latin">{card.latin}</p>
          <h2 className="card-name" style={{ color: card.accent }}>
            {card.name}
          </h2>
        </div>

        <div className="card-divider" style={{ background: `linear-gradient(90deg, ${card.accent}80, transparent)` }} />

        <div className="card-body">
          <p className="card-profile" style={{ color: card.accent }}>
            {card.profile}
          </p>
          <p className="card-desc">{card.description}</p>
        </div>

        {isFront && (
          <motion.div
            className="card-drag-hint"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span>drag to explore</span>
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
              <path d="M1 1L8 8L15 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.li>
  );
}

/* ─────────────────────────────────────────────────────────────
   Page
───────────────────────────────────────────────────────────── */
export default function IngredientsPage() {
  const [frontCard, setFrontCard] = useState<IngredientCard>(INGREDIENTS[0]);

  return (
    <div className="ing-page">
      {/* Ambient backgrounds crossfade */}
      {INGREDIENTS.map((ing) => (
        <div
          key={ing.id}
          className="ing-bg-glow"
          style={{
            background: ing.bg,
            opacity: frontCard.id === ing.id ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            pointerEvents: 'none'
          }}
        />
      ))}

      {/* Film-grain noise */}
      <div className="ing-noise" />

      {/* Main grid */}
      <div className="ing-grid">
        {/* LEFT — Info panel */}
        <motion.div
          className="ing-info"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="ing-eyebrow">The Formulation</p>

          <h1 className="ing-title">
            Naked<br />
            <em>Truth.</em>
          </h1>

          <p className="ing-subtitle">
            Pure, unapologetic ingredients — every molecule chosen for potency and sensation.
          </p>

          <div
            className="ing-divider"
            style={{ 
              background: `linear-gradient(90deg, ${frontCard.accent}90, transparent)`,
              transition: 'background 0.5s ease'
            }} 
          />

          {/* Active ingredient detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={frontCard.id + '-detail'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="ing-detail"
            >
            <div className="ing-detail-header">
              <span className="ing-detail-num" style={{ color: frontCard.accent }}>{frontCard.number}</span>
              <span className="ing-detail-tag" style={{ borderColor: frontCard.accent + '60', color: frontCard.accent }}>
                {frontCard.tag}
              </span>
            </div>
            <h3 className="ing-detail-name" style={{ color: frontCard.accent }}>{frontCard.name}</h3>
            <p className="ing-detail-latin">{frontCard.latin}</p>
            <p className="ing-detail-desc">{frontCard.description}</p>
            </motion.div>
          </AnimatePresence>

          {/* Progress dots */}
          <div className="ing-dots">
            {INGREDIENTS.map((ing) => (
              <div
                key={ing.id}
                className="ing-dot"
                style={{
                  transform: frontCard.id === ing.id ? 'scale(1)' : 'scale(0.6)',
                  opacity: frontCard.id === ing.id ? 1 : 0.35,
                  backgroundColor: frontCard.id === ing.id ? ing.accent : 'rgba(255,255,255,0.3)',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* RIGHT — Card Stack */}
        <div className="ing-stack-wrap">
          <CardStack
            cards={INGREDIENTS}
            onFront={(card) => setFrontCard(card)}
          />
        </div>
      </div>
    </div>
  );
}
