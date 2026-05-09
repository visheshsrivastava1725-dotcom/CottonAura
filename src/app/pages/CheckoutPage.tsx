import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Lock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useCart } from '../context/CartContext';

type Step = 'contact' | 'delivery' | 'payment' | 'confirmed';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', sub: 'PhonePe / Google Pay / Paytm', badge: 'INSTANT' },
  { id: 'card', label: 'Credit / Debit Card', sub: 'Visa · Mastercard · RuPay', badge: '' },
  { id: 'netbanking', label: 'Net Banking', sub: 'All major banks', badge: '' },
  { id: 'cod', label: 'Cash on Delivery', sub: '₹50 COD fee · Available across India', badge: 'COD' },
  { id: 'emi', label: 'EMI', sub: 'Simpl / Lazypay / Bajaj Finserv', badge: '0%' },
];

export function CheckoutPage() {
  const { items, subtotal, totalItems } = useCart();
  const [step, setStep] = useState<Step>('contact');
  const [promoOpen, setPromoOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    email: '',
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    shipping: 'standard',
  });

  const shippingCost = subtotal >= 999 ? 0 : 99;
  const codFee = paymentMethod === 'cod' ? 50 : 0;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + shippingCost + codFee - discount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmed');
  };

  if (step === 'confirmed') {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: '#0C0C0C', paddingTop: '100px' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-lg"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#4169E1' }}
          >
            <span style={{ fontSize: '28px', color: '#fff' }}>✓</span>
          </div>
          <h1
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '48px',
              color: '#F2F2F2',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '12px',
            }}
          >
            ORDER CONFIRMED!
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#A0A0A0', lineHeight: 1.7, marginBottom: '24px' }}>
            Your order has been placed. You'll receive a confirmation SMS and email shortly.
            Expected delivery: <strong style={{ color: '#F2F2F2' }}>3–5 business days</strong>.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 transition-all hover:brightness-110"
            style={{
              height: '48px',
              padding: '0 32px',
              backgroundColor: '#4169E1',
              borderRadius: '4px',
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0C0C0C', paddingTop: '100px', minHeight: '100vh' }}>
      <div className="max-w-[1000px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '20px',
              letterSpacing: '0.2em',
              color: '#F2F2F2',
              textDecoration: 'none',
            }}
          >
            COTTON AURA
          </Link>
          <div className="flex items-center gap-2" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#606060' }}>
            <Lock size={12} />
            SECURE CHECKOUT
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
            {/* LEFT — Form */}
            <div className="flex flex-col gap-6">
              {/* Contact */}
              <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '24px' }}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 600, color: '#F2F2F2', marginBottom: '16px' }}>
                  Contact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="tel"
                    placeholder="Phone Number (India)"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={{
                      height: '52px',
                      padding: '0 16px',
                      backgroundColor: '#1C1C1C',
                      border: '1px solid #2A2A2A',
                      borderRadius: '4px',
                      color: '#F2F2F2',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                    className="col-span-1 md:col-span-2"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={{
                      height: '52px',
                      padding: '0 16px',
                      backgroundColor: '#1C1C1C',
                      border: '1px solid #2A2A2A',
                      borderRadius: '4px',
                      color: '#F2F2F2',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '16px',
                      outline: 'none',
                    }}
                    className="col-span-1 md:col-span-2"
                  />
                </div>
              </div>

              {/* Delivery */}
              <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '24px' }}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 600, color: '#F2F2F2', marginBottom: '16px' }}>
                  Delivery Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: 'name', label: 'Full Name', span: 2, type: 'text' },
                    { key: 'address1', label: 'Address Line 1', span: 2, type: 'text' },
                    { key: 'address2', label: 'Address Line 2 (optional)', span: 2, type: 'text' },
                    { key: 'city', label: 'City', span: 1, type: 'text' },
                    { key: 'state', label: 'State', span: 1, type: 'text' },
                    { key: 'pincode', label: 'PIN Code', span: 1, type: 'text' },
                    { key: 'country', label: 'Country', span: 1, type: 'text' },
                  ].map(field => (
                    <input
                      key={field.key}
                      type={field.type}
                      placeholder={field.label}
                      value={(form as any)[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      className={`col-span-1 ${field.span === 2 ? 'md:col-span-2' : ''}`}
                      style={{
                        height: '52px',
                        padding: '0 16px',
                        backgroundColor: '#1C1C1C',
                        border: '1px solid #2A2A2A',
                        borderRadius: '4px',
                        color: '#F2F2F2',
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '16px',
                        outline: 'none',
                      }}
                    />
                  ))}
                </div>

                {/* Shipping Options */}
                <div className="mt-4 flex flex-col gap-2">
                  {[
                    { id: 'standard', label: 'Standard', sub: '3–5 business days', price: subtotal >= 999 ? 'FREE' : '₹99' },
                    { id: 'express', label: 'Express', sub: '1–2 business days', price: '₹199' },
                  ].map(opt => (
                    <label
                      key={opt.id}
                      className="flex items-center justify-between cursor-pointer p-3 rounded transition-all"
                      style={{
                        border: `1px solid ${form.shipping === opt.id ? '#4169E1' : '#2A2A2A'}`,
                        backgroundColor: form.shipping === opt.id ? 'rgba(74,123,247,0.08)' : 'transparent',
                        borderRadius: '4px',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={opt.id}
                          checked={form.shipping === opt.id}
                          onChange={() => setForm(f => ({ ...f, shipping: opt.id }))}
                          style={{ accentColor: '#4169E1' }}
                        />
                        <div>
                          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#F2F2F2' }}>{opt.label}</p>
                          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0' }}>{opt.sub}</p>
                        </div>
                      </div>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: opt.price === 'FREE' ? '#4169E1' : '#F2F2F2', fontWeight: 600 }}>
                        {opt.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', borderRadius: '8px', padding: '24px' }}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', fontWeight: 600, color: '#F2F2F2', marginBottom: '16px' }}>
                  Payment Method
                </h2>
                <div className="flex flex-col gap-2">
                  {PAYMENT_METHODS.map(method => (
                    <label
                      key={method.id}
                      className="flex items-center justify-between cursor-pointer p-3 transition-all"
                      style={{
                        border: `1px solid ${paymentMethod === method.id ? '#4169E1' : '#2A2A2A'}`,
                        backgroundColor: paymentMethod === method.id ? 'rgba(74,123,247,0.08)' : 'transparent',
                        borderRadius: '4px',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          style={{ accentColor: '#4169E1' }}
                        />
                        <div>
                          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#F2F2F2' }}>{method.label}</p>
                          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0' }}>{method.sub}</p>
                        </div>
                      </div>
                      {method.badge && (
                        <span
                          style={{
                            padding: '2px 8px',
                            borderRadius: '4px',
                            backgroundColor: method.id === 'cod' ? '#1C1C1C' : '#4169E1',
                            border: method.id === 'cod' ? '1px solid #2A2A2A' : 'none',
                            color: '#fff',
                            fontFamily: 'Space Mono, monospace',
                            fontSize: '10px',
                          }}
                        >
                          {method.badge}
                        </span>
                      )}
                    </label>
                  ))}
                </div>
                {paymentMethod === 'cod' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '12px',
                      color: '#A0A0A0',
                      marginTop: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#1C1C1C',
                      borderRadius: '4px',
                    }}
                  >
                    ₹50 COD handling fee will be added at checkout.
                  </motion.p>
                )}
              </div>

              {/* Place Order */}
              <button
                type="submit"
                className="w-full transition-all hover:brightness-110 active:scale-[0.99]"
                style={{
                  height: '60px',
                  backgroundColor: '#4169E1',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '15px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                PLACE ORDER — ₹{total.toLocaleString('en-IN')}
              </button>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#606060', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                <Lock size={10} />
                Your data is secured by 256-bit SSL encryption
              </p>
            </div>

            {/* RIGHT — Order Summary */}
            <div className="lg:sticky lg:top-[120px] self-start">
              <div
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid #2A2A2A',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', fontWeight: 600, color: '#F2F2F2', marginBottom: '16px' }}>
                  Order Summary ({totalItems} item{totalItems !== 1 ? 's' : ''})
                </h2>

                {items.length === 0 ? (
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#606060' }}>
                    Your bag is empty.{' '}
                    <Link to="/" style={{ color: '#4169E1' }}>Shop now</Link>
                  </p>
                ) : (
                  <div className="flex flex-col gap-4 mb-4">
                    {items.map(item => (
                      <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                        <div
                          style={{
                            width: '56px', height: '70px',
                            borderRadius: '4px',
                            backgroundColor: '#0C0C0C',
                            border: '1px solid #2A2A2A',
                            overflow: 'hidden',
                            flexShrink: 0,
                            position: 'relative',
                          }}
                        >
                          <img src={item.product.image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <span
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-white"
                            style={{ backgroundColor: '#4169E1', fontSize: '10px', fontFamily: 'DM Sans, sans-serif' }}
                          >
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#F2F2F2', fontWeight: 500 }}>{item.product.name}</p>
                          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#A0A0A0' }}>Size {item.size}</p>
                        </div>
                        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#F2F2F2', fontWeight: 600, flexShrink: 0 }}>
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Promo Code */}
                <div style={{ borderTop: '1px solid #2A2A2A', paddingTop: '16px', marginBottom: '16px' }}>
                  <button
                    type="button"
                    onClick={() => setPromoOpen(!promoOpen)}
                    className="flex items-center gap-2 w-full"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '13px',
                      color: '#4169E1',
                    }}
                  >
                    <ChevronDown size={14} style={{ transform: promoOpen ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                    Apply Promo Code
                  </button>
                  {promoOpen && (
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={e => setPromoCode(e.target.value)}
                        style={{
                          flex: 1,
                          height: '40px',
                          padding: '0 12px',
                          backgroundColor: '#1C1C1C',
                          border: '1px solid #2A2A2A',
                          borderRadius: '4px',
                          color: '#F2F2F2',
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '13px',
                          outline: 'none',
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => { if (promoCode === 'COOTEN10') setPromoApplied(true); }}
                        style={{
                          height: '40px',
                          padding: '0 16px',
                          backgroundColor: '#1C1C1C',
                          border: '1px solid #2A2A2A',
                          borderRadius: '4px',
                          color: '#F2F2F2',
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        APPLY
                      </button>
                    </div>
                  )}
                  {promoApplied && (
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#4169E1', marginTop: '6px' }}>
                      ✓ COOTEN10 applied — 10% off!
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="flex flex-col gap-2" style={{ borderTop: '1px solid #2A2A2A', paddingTop: '16px' }}>
                  <div className="flex justify-between">
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0' }}>Subtotal</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#F2F2F2' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0' }}>Shipping</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: shippingCost === 0 ? '#4169E1' : '#F2F2F2' }}>
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}
                    </span>
                  </div>
                  {codFee > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0' }}>COD Fee</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#F2F2F2' }}>₹{codFee}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between">
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4169E1' }}>Discount (COOTEN10)</span>
                      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4169E1' }}>−₹{discount}</span>
                    </div>
                  )}
                  <div
                    className="flex justify-between pt-2"
                    style={{ borderTop: '1px solid #2A2A2A', marginTop: '4px' }}
                  >
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#F2F2F2', fontWeight: 600 }}>Total</span>
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#F2F2F2', fontWeight: 700 }}>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
