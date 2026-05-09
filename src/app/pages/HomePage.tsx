import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, REVIEWS, UGC_IMAGES } from '../data/products';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1754475118668-64ac3f3b2559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400';
const HERO_IMAGE_2 = 'https://images.unsplash.com/photo-1628935291759-bbaf33a66dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400';

export function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const bestsellers = PRODUCTS.filter(p => p.badge === 'BESTSELLER' || p.rating >= 4.8).slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  return (
    <div style={{ backgroundColor: '#0C0C0C' }}>
      {/* ===== HERO ===== */}
      <section className="relative w-full" style={{ height: '100dvh', minHeight: '600px' }}>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="Cotton Aura Hero"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* Vignette */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.7) 100%), linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 40%, rgba(0,0,0,0.8) 100%)',
            }}
          />
        </div>

        {/* Hero Text */}
        <div className="absolute bottom-16 left-6 md:left-16 max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 12 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              color: '#4A7BF7',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            NEW ARRIVAL — DROP 07
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 24 }}
            transition={{ delay: 0.35, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(60px, 10vw, 140px)',
              color: '#F2F2F2',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            BUILT FOR
            <br />
            THE GYM.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: '#A0A0A0',
              marginBottom: '28px',
            }}
          >
            Compression tees that fit like a second skin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.95 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="flex items-center gap-3"
          >
            <Link
              to="/collections/compression-tees"
              className="flex items-center gap-2 transition-all hover:brightness-110"
              style={{
                height: '48px',
                padding: '0 28px',
                backgroundColor: '#4A7BF7',
                borderRadius: '4px',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              SHOP NOW
              <ArrowRight size={14} style={{ marginLeft: '6px' }} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section
        className="w-full overflow-x-auto"
        style={{ backgroundColor: '#141414', height: '64px', borderBottom: '1px solid #2A2A2A' }}
      >
        <div className="flex items-center justify-center md:justify-between h-full px-6 max-w-[1400px] mx-auto gap-4 md:gap-0">
          {[
            { icon: '🚚', text: 'FREE DELIVERY ABOVE ₹999' },
            { icon: '💳', text: 'COD AVAILABLE' },
            { icon: '🔄', text: '7-DAY EASY RETURNS' },
            { icon: '⭐', text: '4.8★ RATED (2,400+ REVIEWS)' },
            { icon: '🔒', text: '100% SECURE CHECKOUT' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              <span style={{ fontSize: '14px' }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '11px',
                  color: '#F2F2F2',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section className="py-16 w-full overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-end justify-between mb-8">
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: '#F2F2F2',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
          >
            NEW ARRIVALS
          </h2>
          <Link
            to="/collections/compression-tees"
            className="flex items-center gap-1 hover:gap-2 transition-all"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: '#4A7BF7',
              textDecoration: 'none',
              letterSpacing: '0.04em',
            }}
          >
            VIEW ALL <ChevronRight size={14} />
          </Link>
        </div>
        </div>

        {/* Feature Cards + Grid */}
        <div className="w-full px-6 md:px-0 mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0">
            {[HERO_IMAGE, HERO_IMAGE_2].map((img, i) => (
            <Link
              key={i}
              to="/collections/compression-tees"
              className="relative overflow-hidden group flex"
              style={{ borderRadius: '4px', backgroundColor: '#141414' }}
            >
              <img
                src={img}
                alt="New Drop"
                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                style={{ objectPosition: 'center' }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <p
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '11px',
                      color: '#4A7BF7',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    DROP 0{7 + i}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: '32px',
                      color: '#F2F2F2',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {i === 0 ? 'COMPRESSION TEES' : 'COMPRESSION VESTS'}
                  </p>
                </div>
                <span
                  className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '12px',
                    color: '#fff',
                    backgroundColor: '#4A7BF7',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}
                >
                  SHOP NOW
                </span>
              </div>
            </Link>
          ))}
        </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {newArrivals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
          </div>
        </div>
      </section>

      {/* ===== BESTSELLERS ===== */}
      <section style={{ backgroundColor: '#0C0C0C' }} className="py-16">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <h2
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(36px, 5vw, 72px)',
                color: '#F2F2F2',
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
              }}
            >
              BESTSELLERS
            </h2>
            <Link
              to="/collections/compression-tees"
              className="flex items-center gap-1 hover:gap-2 transition-all"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: '#4A7BF7',
                textDecoration: 'none',
              }}
            >
              SHOP ALL <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {bestsellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY COTTON AURA ===== */}
      <section
        style={{ backgroundColor: '#141414', padding: '96px 0' }}
      >
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(32px, 5vw, 56px)',
              color: '#F2F2F2',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
          >
            WHY COTTON AURA?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: '🧵',
                title: 'PREMIUM COMPRESSION FABRIC',
                desc: 'High-GSM polyester-spandex blend. Holds shape after 100+ washes.',
              },
              {
                icon: '💪',
                title: 'FIT TESTED IN THE GYM',
                desc: 'Every tee tested by actual gym-goers before it ships. No compromise on fit.',
              },
              {
                icon: '🚀',
                title: 'FAST NATIONWIDE DELIVERY',
                desc: 'Delivered in 3–5 days. COD available. Easy returns.',
              },
              {
                icon: '📐',
                title: 'PHYSIQUE-DEFINING CUT',
                desc: 'Tapered sleeves. Contoured torso. Built to show your progress.',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="text-center"
              >
                <div style={{ fontSize: '36px', marginBottom: '16px' }}>{feature.icon}</div>
                <h3
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '15px',
                    color: '#F2F2F2',
                    fontWeight: 600,
                    marginBottom: '8px',
                    letterSpacing: '0.04em',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#A0A0A0',
                    lineHeight: 1.7,
                  }}
                >
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FABRIC & SPECS ===== */}
      <section style={{ backgroundColor: '#0C0C0C', padding: '96px 0' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(32px, 4vw, 52px)',
              color: '#F2F2F2',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
            }}
          >
            WHAT IT'S MADE OF.
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                title: '4-WAY STRETCH FABRIC',
                specs: '88% Polyester · 12% Spandex · 200 GSM',
                desc: 'Moves in every direction without resistance or stretch-out.',
              },
              {
                title: 'MOISTURE-WICKING TECHNOLOGY',
                specs: 'Sweat evaporation rate: 3× faster than cotton',
                desc: 'Stay dry through your hardest sets. No wet patches. No distractions.',
              },
              {
                title: 'COMPRESSION GRADIENT',
                specs: 'Targeted zones: chest, torso, upper arms',
                desc: 'Supports active muscle groups. Enhances blood flow. Looks incredible.',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid #2A2A2A',
                  borderRadius: '4px',
                  padding: '32px',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '14px',
                    color: '#4A7BF7',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '12px',
                    color: '#A0A0A0',
                    marginBottom: '12px',
                    lineHeight: 1.7,
                  }}
                >
                  {card.specs}
                </p>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#606060',
                    lineHeight: 1.7,
                  }}
                >
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SIZE & FIT GUIDE TEASER ===== */}
      <section style={{ backgroundColor: '#141414', padding: '80px 0' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Diagram Left */}
            <div
              className="flex items-center justify-center"
              style={{
                backgroundColor: '#0C0C0C',
                border: '1px solid #2A2A2A',
                borderRadius: '4px',
                padding: '48px',
                minHeight: '300px',
              }}
            >
              <div className="relative w-32 h-48">
                {/* Simple tee outline illustration */}
                <svg viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path
                    d="M10 30 L0 60 L25 65 L25 150 L95 150 L95 65 L120 60 L110 30 L80 20 Q60 5 40 20 Z"
                    stroke="#2A2A2A"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path d="M40 20 Q60 35 80 20" stroke="#2A2A2A" strokeWidth="1.5" fill="none" />
                  {/* Measurement arrows */}
                  <line x1="130" y1="20" x2="130" y2="150" stroke="#4A7BF7" strokeWidth="1" strokeDasharray="3,3" />
                  <line x1="25" y1="160" x2="95" y2="160" stroke="#4A7BF7" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="135" y="90" fill="#4A7BF7" fontSize="7" fontFamily="Space Mono">LENGTH</text>
                  <text x="50" y="172" fill="#4A7BF7" fontSize="7" fontFamily="Space Mono">CHEST</text>
                </svg>
              </div>
            </div>

            {/* Text Right */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  color: '#F2F2F2',
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  lineHeight: 0.95,
                }}
              >
                FIND YOUR FIT.
              </motion.h2>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#A0A0A0',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                Compression tees fit differently from regular tees.
                Our size guide shows exact measurements — not just S/M/L.
                When in doubt, go one size up for comfort.
              </p>
              <Link
                to="/sizing"
                className="inline-flex items-center gap-2 transition-all hover:gap-3"
                style={{
                  padding: '12px 24px',
                  border: '1px solid #4A7BF7',
                  borderRadius: '4px',
                  color: '#4A7BF7',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                VIEW SIZE GUIDE <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== UGC / INSTAGRAM GRID ===== */}
      <section style={{ backgroundColor: '#0C0C0C', padding: '80px 0' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  color: '#F2F2F2',
                  textTransform: 'uppercase',
                  lineHeight: 0.9,
                  letterSpacing: '-0.01em',
                  marginBottom: '8px',
                }}
              >
                WORN IN THE GYM.
              </h2>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  color: '#4A7BF7',
                }}
              >
                @thecottonaura on Instagram — tag us to be featured
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-0">
            {UGC_IMAGES.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="relative overflow-hidden group"
                style={{ aspectRatio: '1/1' }}
              >
                <img
                  src={img}
                  alt={`Community ${i + 1}`}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#fff', letterSpacing: '0.06em' }}>
                    @gymgoer_{i + 1}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#A0A0A0', marginTop: '4px' }}>
                    VIEW POST
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <a
              href="https://instagram.com/thecottonaura"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: '#4A7BF7',
                textDecoration: 'none',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              TAG @THECOTTONAURA →
            </a>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section style={{ backgroundColor: '#141414', padding: '80px 0' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(32px, 4vw, 56px)',
                color: '#F2F2F2',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 0.9,
                marginBottom: '8px',
              }}
            >
              WHAT THEY'RE SAYING.
            </motion.h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#A0A0A0' }}>
              4.8 ★ from 2,400+ reviews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {REVIEWS.slice(0, 4).map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                style={{
                  backgroundColor: '#0C0C0C',
                  border: '1px solid #2A2A2A',
                  borderRadius: '4px',
                  padding: '20px',
                }}
              >
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} style={{ color: '#4A7BF7', fontSize: '13px' }}>★</span>
                  ))}
                </div>
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '14px',
                    color: '#F2F2F2',
                    lineHeight: 1.6,
                    marginBottom: '16px',
                  }}
                >
                  "{review.text}"
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0' }}>
                  {review.name} · {review.location}
                  {review.verified && <span style={{ color: '#4A7BF7', marginLeft: '4px' }}>✓ Verified</span>}
                </p>
                <p
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '10px',
                    color: '#3A3A3A',
                    marginTop: '8px',
                    backgroundColor: '#141414',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    display: 'inline-block',
                  }}
                >
                  {review.product}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BULK / TEAM ORDERS ===== */}
      <section
        style={{
          backgroundColor: '#4A7BF7',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(48px, 7vw, 80px)',
              color: '#fff',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            ORDERING FOR
            <br />
            YOUR TEAM?
          </h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '15px',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            Custom bulk orders for gyms, sports teams, and fitness clubs.
            <br />
            Minimum 10 pieces. Custom sizing. Discounted rates.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/bulk-orders"
              className="transition-all hover:shadow-lg"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '52px',
                padding: '0 32px',
                backgroundColor: '#fff',
                borderRadius: '4px',
                color: '#4A7BF7',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 700,
              }}
            >
              GET BULK PRICING →
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%20need%20bulk%20pricing%20for%20Cotton%20Aura%20tees."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-all hover:opacity-80"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '52px',
                padding: '0 32px',
                backgroundColor: 'transparent',
                border: '2px solid rgba(255,255,255,0.4)',
                borderRadius: '4px',
                color: '#fff',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                gap: '8px',
              }}
            >
              OR WHATSAPP US DIRECTLY →
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section
        style={{
          backgroundColor: '#0C0C0C',
          padding: '96px 24px',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="max-w-2xl mx-auto text-center w-full">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(48px, 8vw, 96px)',
              color: '#F2F2F2',
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            DON'T MISS THE
            <br />
            NEXT DROP.
          </motion.h2>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              color: '#A0A0A0',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            New colourways. Limited restocks. Exclusive early access.
            <br />
            No spam — only drops.
          </p>
          {subscribed ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#4A7BF7', fontWeight: 600 }}
            >
              ✓ You're on the list. Watch your inbox for Drop 08.
            </motion.p>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}
              className="flex flex-col sm:flex-row gap-2 max-w-[440px] mx-auto mb-4"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1"
                style={{
                  height: '48px',
                  padding: '0 16px',
                  backgroundColor: '#1C1C1C',
                  border: '1px solid #2A2A2A',
                  borderRadius: '4px',
                  color: '#F2F2F2',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="shrink-0 transition-all hover:brightness-110"
                style={{
                  height: '48px',
                  padding: '0 24px',
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
                GET NOTIFIED
              </button>
            </form>
          )}
          <a
            href="https://wa.me/919999999999?text=Please%20add%20me%20to%20your%20drop%20list!"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 transition-opacity hover:opacity-80"
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              color: '#4A7BF7',
              textDecoration: 'none',
              marginTop: '12px',
            }}
          >
            Or join our WhatsApp drop list →
          </a>
        </div>
      </section>
    </div>
  );
}