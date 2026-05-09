import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle } from 'lucide-react';

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    window.open('https://wa.me/919999999999?text=Hi%20Cooten Aura!%20I%20need%20help%20with%20my%20order.', '_blank');
  };

  return (
    <div className="fixed bottom-20 md:bottom-8 right-4 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-lg p-4 w-64"
            style={{
              backgroundColor: '#141414',
              border: '1px solid #2A2A2A',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 600, color: '#F2F2F2' }}>
                Chat with us
              </p>
              <button
                onClick={() => setOpen(false)}
                style={{ color: '#606060', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </div>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', lineHeight: 1.6, marginBottom: '12px' }}>
              Need help with sizing, orders, or bulk pricing? We're on WhatsApp.
            </p>
            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 transition-all hover:brightness-110"
              style={{
                height: '40px',
                backgroundColor: '#25D366',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <MessageCircle size={14} />
              CHAT ON WHATSAPP
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: '52px', height: '52px',
          backgroundColor: '#25D366',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.button>
    </div>
  );
}
