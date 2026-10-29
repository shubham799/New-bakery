import { AnimatePresence, motion } from 'motion/react';
import { useOrder } from '../lib/order';
import { HeartIcon } from './Icons';

export default function Toast() {
  const { toast } = useOrder();
  return (
    <div className="toast-region" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            className="toast"
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1, transition: { type: 'spring', bounce: 0.5, duration: 0.5 } }}
            exit={{ y: 20, opacity: 0, transition: { duration: 0.2 } }}
          >
            <HeartIcon width="16" height="16" />
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
