import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router';

const FREE_SHIPPING_THRESHOLD = 999;

export function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, subtotal } = useCart();
  const navigate = useNavigate();
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 flex flex-col w-full md:w-[440px]"
            style={{ backgroundColor: '#141414', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: '1px solid #2A2A2A' }}
            >
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 600, color: '#F2F2F2' }}>
                YOUR BAG ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </span>
              <button
                onClick={closeCart}
                style={{ color: '#A0A0A0', background: 'none', border: 'none', cursor: 'pointer' }}
                className="hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Shipping Progress */}
            <div className="px-6 py-3" style={{ borderBottom: '1px solid #2A2A2A' }}>
              {amountToFreeShipping > 0 ? (
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', marginBottom: '8px' }}>
                  Add <span style={{ color: '#4A7BF7' }}>₹{amountToFreeShipping}</span> more for free shipping
                </p>
              ) : (
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#4A7BF7', marginBottom: '8px' }}>
                  ✓ You've unlocked free shipping!
                </p>
              )}
              <div style={{ height: '4px', backgroundColor: '#2A2A2A', borderRadius: '2px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  style={{ height: '100%', backgroundColor: '#4A7BF7', borderRadius: '2px' }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#A0A0A0' }}>
                    Your bag is empty
                  </p>
                  <button
                    onClick={() => { closeCart(); navigate('/collections/compression-tees'); }}
                    className="px-6 py-3 text-white transition-all"
                    style={{
                      backgroundColor: '#4A7BF7',
                      border: 'none',
                      borderRadius: '4px',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '13px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    SHOP NOW
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                      <div
                        className="shrink-0 overflow-hidden"
                        style={{
                          width: '72px', height: '90px',
                          borderRadius: '4px',
                          backgroundColor: '#0C0C0C',
                          border: '1px solid #2A2A2A',
                        }}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#F2F2F2', fontWeight: 500 }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', marginTop: '2px' }}>
                          Size {item.size}
                        </p>
                        <div className="flex items-center justify-between mt-3">
                          <div
                            className="flex items-center"
                            style={{ border: '1px solid #2A2A2A', borderRadius: '4px', overflow: 'hidden' }}
                          >
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                              style={{
                                width: '28px', height: '28px',
                                background: 'none', border: 'none',
                                color: '#A0A0A0', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                              className="hover:text-white"
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              style={{
                                width: '28px',
                                textAlign: 'center',
                                fontFamily: 'DM Sans, sans-serif',
                                fontSize: '13px',
                                color: '#F2F2F2',
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                              style={{
                                width: '28px', height: '28px',
                                background: 'none', border: 'none',
                                color: '#A0A0A0', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                              }}
                              className="hover:text-white"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#F2F2F2', fontWeight: 600 }}>
                            ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.size)}
                        style={{ color: '#606060', background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '2px' }}
                        className="hover:text-white transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Summary + CTA */}
            {items.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: '1px solid #2A2A2A' }}>
                <div className="flex justify-between items-center mb-4">
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#A0A0A0' }}>Subtotal</span>
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#F2F2F2', fontWeight: 600 }}>
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <button
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full flex items-center justify-center transition-all hover:brightness-110 mb-2"
                  style={{
                    height: '52px',
                    backgroundColor: '#4A7BF7',
                    border: 'none',
                    borderRadius: '4px',
                    color: '#fff',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  CHECKOUT ONLINE →
                </button>
                <button
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full flex items-center justify-center transition-all hover:bg-white/5"
                  style={{
                    height: '44px',
                    backgroundColor: 'transparent',
                    border: '1px solid #F2F2F2',
                    borderRadius: '4px',
                    color: '#F2F2F2',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  CHECKOUT WITH COD →
                </button>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#4A7BF7', textAlign: 'center', marginTop: '8px' }}>
                  ✓ Cash on Delivery Available
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
