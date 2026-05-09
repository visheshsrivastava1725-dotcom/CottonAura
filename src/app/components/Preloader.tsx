import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100);
    }, 100);
    const done = setTimeout(() => {
      onComplete();
    }, 1400);
    return () => { clearTimeout(timer); clearTimeout(done); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{ backgroundColor: '#0C0C0C' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="tracking-[0.3em] text-white"
            style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px' }}
          >
            COTTON AURA
          </div>
          <div
            className="w-[200px] rounded-full overflow-hidden"
            style={{ height: '2px', backgroundColor: '#2A2A2A' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: '#4A7BF7' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </div>
          <div
            className="tracking-[0.1em] uppercase"
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#606060' }}
          >
            COMPRESSION · PERFORMANCE · CULTURE
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
