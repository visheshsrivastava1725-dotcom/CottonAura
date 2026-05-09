import { motion } from 'motion/react';

const MESSAGES = [
  'COOTEN AURA — LUCKNOW SPECIAL',
  'BUDGET COMPRESSION TEES STARTING ₹799',
  'MUSCLE-HUG FIT EVERY TIME',
  'FREE DELIVERY IN LUCKNOW',
  '7-DAY EASY RETURNS',
  '100% AUTHENTIC — SWEAT-HIDING',
];

export function AnnouncementBar() {
  const repeated = [...MESSAGES, ...MESSAGES, ...MESSAGES];

  return (
    <div
      className="overflow-hidden"
      style={{ height: '36px', backgroundColor: '#4169E1', display: 'flex', alignItems: 'center' }}
    >
      <motion.div
        className="flex items-center gap-16 whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ willChange: 'transform' }}
      >
        {repeated.map((msg, i) => (
          <span
            key={i}
            className="flex items-center gap-2"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              color: '#ffffff',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            <span style={{ opacity: 0.6 }}>·</span>
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
