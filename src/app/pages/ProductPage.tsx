import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Minus, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { PRODUCTS, REVIEWS } from '../data/products';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

const ACCORDION_DATA = [
  {
    title: 'Product Specs',
    content: (
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '12px', color: '#A0A0A0', lineHeight: 2 }}>
        <div>Material: 88% Polyester, 12% Spandex</div>
        <div>Weight: 200 GSM</div>
        <div>Stretch: 4-Way Stretch</div>
        <div>Technology: Moisture-Wicking · Anti-Odor · Anti-Pilling</div>
        <div>Fit: Compression (2nd Skin)</div>
        <div>Neckline: Crew Neck</div>
        <div>Care: Machine Wash Cold / Do Not Tumble Dry</div>
      </div>
    ),
  },
  {
    title: 'Size & Fit Guide',
    content: (
      <div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Space Mono, monospace', fontSize: '11px', color: '#A0A0A0' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2A2A2A' }}>
              {['SIZE', 'CHEST (CM)', 'WAIST (CM)', 'LENGTH (CM)'].map(h => (
                <th key={h} style={{ padding: '8px 4px', textAlign: 'left', color: '#606060' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['XS', '82–86', '70–74', '66'],
              ['S', '87–91', '75–79', '68'],
              ['M', '92–96', '80–84', '70'],
              ['L', '97–102', '85–90', '72'],
              ['XL', '103–108', '91–96', '74'],
              ['XXL', '109–114', '97–102', '76'],
            ].map(row => (
              <tr key={row[0]} style={{ borderBottom: '1px solid #1C1C1C' }}>
                {row.map((cell, i) => (
                  <td key={i} style={{ padding: '8px 4px' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="mt-4 p-3 rounded"
          style={{ backgroundColor: '#1C1C1C', border: '1px solid #2A2A2A' }}
        >
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0' }}>
            ⚠ Model is 5'11", 78kg, wearing Size L.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: 'Shipping & Returns',
    content: (
      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0', lineHeight: 1.8 }}>
        <p>Standard: 3–5 business days. Free above ₹999, else ₹99.</p>
        <p>Express: 1–2 days — ₹199.</p>
        <p className="mt-2">Easy 7-day returns. Steps: 1. Request → 2. Pack & ship → 3. Refund in 3–5 days.</p>
        <p className="mt-2">COD charge: ₹50 (disclosed transparently).</p>
      </div>
    ),
  },
];

function AccordionItem({ title, content }: { title: string; content: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #2A2A2A' }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '14px',
          color: '#F2F2F2',
          fontWeight: 500,
        }}
      >
        {title}
        <ChevronDown
          size={16}
          style={{
            color: '#A0A0A0',
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="pb-4">{content}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  const { addToCart, toggleWishlist, wishlist } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToBag, setAddedToBag] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  const images = [product.image, product.hoverImage, product.image, product.hoverImage];

  const stockForSize = product.sizes.find(s => s.size === selectedSize)?.stock ?? null;
  const isSoldOut = product.badge === 'SOLD OUT';

  const handleAddToBag = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 2000);
      return;
    }
    addToCart(product, selectedSize);
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 1500);
  };

  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 4);

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingsPct = product.originalPrice ? Math.round((savings / product.originalPrice) * 100) : 0;

  return (
    <div style={{ backgroundColor: '#0C0C0C', paddingTop: '100px', paddingBottom: '120px' }}>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 mb-6">
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#606060' }}>
          <Link to="/" style={{ color: '#606060', textDecoration: 'none' }}>Shop</Link>
          {' / '}
          <Link to="/collections/compression-tees" style={{ color: '#606060', textDecoration: 'none' }}>Compression Tees</Link>
          {' / '}
          <span style={{ color: '#A0A0A0' }}>{product.name}</span>
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* ===== GALLERY ===== */}
          <div className="md:sticky md:top-[120px] self-start">
            {/* Main Image */}
            <div
              className="overflow-hidden relative"
              style={{
                aspectRatio: '4/5',
                backgroundColor: '#141414',
                border: '1px solid #2A2A2A',
                borderRadius: '4px',
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage]}
                  alt={product.name}
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 mt-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="overflow-hidden transition-all"
                  style={{
                    width: '60px', height: '75px',
                    borderRadius: '4px',
                    border: `2px solid ${activeImage === i ? '#F2F2F2' : '#2A2A2A'}`,
                    padding: 0,
                    cursor: 'pointer',
                    backgroundColor: '#141414',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ===== INFO PANEL ===== */}
          <div>
            {/* Section A — Identity */}
            <div style={{ marginBottom: '20px' }}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  style={{
                    padding: '3px 10px',
                    borderRadius: '4px',
                    backgroundColor: '#4A7BF7',
                    color: '#fff',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '10px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  COMPRESSION TEE
                </span>
              </div>
              <h1
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(20px, 3vw, 28px)',
                  color: '#F2F2F2',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                {product.name}
              </h1>
              <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: '#606060', marginBottom: '8px' }}>
                {product.sku}
              </p>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  color: '#A0A0A0',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  marginTop: '12px',
                  maxWidth: '90%',
                }}
              >
                Engineered for the elite. Sculpted for the gym. A second-skin compression that holds without restriction.
              </p>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{ color: i < Math.floor(product.rating) ? '#4A7BF7' : '#2A2A2A', fontSize: '13px' }}>★</span>
                  ))}
                </div>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0' }}>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Section B — Pricing */}
            <div style={{ marginBottom: '24px' }}>
              <div className="flex items-baseline gap-3">
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '26px', color: '#F2F2F2', fontWeight: 700 }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', color: '#606060', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {savings > 0 && (
                  <span
                    style={{
                      padding: '2px 8px',
                      backgroundColor: '#E03030',
                      borderRadius: '4px',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '11px',
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  >
                    SAVE {savingsPct}%
                  </span>
                )}
              </div>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', marginTop: '4px' }}>
                ₹{Math.round(product.price / 3)}/month with 0% EMI · Simpl/Lazypay
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#4A7BF7', marginTop: '4px' }}>
                ✓ Cash on Delivery Available
              </p>
            </div>

            {/* Section C — Colour */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '10px' }}>
                COLOUR: <span style={{ color: '#F2F2F2' }}>{product.name.split(' ')[0]}</span>
              </p>
              <div className="flex items-center gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    style={{
                      width: '24px', height: '24px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: i === 0 ? '2px solid #fff' : '1px solid #2A2A2A',
                      outline: i === 0 ? '2px solid transparent' : 'none',
                      boxShadow: i === 0 ? '0 0 0 3px #4A7BF7' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                    title={`Colour ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Section D — Size */}
            <div style={{ marginBottom: '24px' }}>
              <div className="flex items-center justify-between mb-2">
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  SIZE
                </p>
                <div className="flex items-center gap-4">
                  <span
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '11px',
                      color: '#4A7BF7',
                      backgroundColor: 'rgba(74, 123, 247, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '100px',
                      fontWeight: 500,
                    }}
                  >
                    ✓ TRUE TO SIZE
                  </span>
                  <Link
                    to="/sizing"
                    style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#4A7BF7', textDecoration: 'none' }}
                  >
                    Size Guide →
                  </Link>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {product.sizes.map(({ size, stock }) => {
                  const isSelected = selectedSize === size;
                  const isOos = stock === 0;
                  return (
                    <button
                      key={size}
                      onClick={() => !isOos && setSelectedSize(size)}
                      disabled={isOos}
                      style={{
                        width: '52px', height: '42px',
                        borderRadius: '4px',
                        border: `1px solid ${isSelected ? 'transparent' : sizeError && !isOos ? '#E03030' : '#2A2A2A'}`,
                        backgroundColor: isSelected ? '#F2F2F2' : isOos ? '#141414' : '#1C1C1C',
                        color: isSelected ? '#0C0C0C' : isOos ? '#3A3A3A' : '#A0A0A0',
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: isOos ? 'not-allowed' : 'pointer',
                        textDecoration: isOos ? 'line-through' : 'none',
                        transition: 'all 0.15s',
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Compression Fit Note */}
              <div
                style={{
                  padding: '10px 12px',
                  backgroundColor: '#1C1C1C',
                  borderRadius: '4px',
                  border: '1px solid #2A2A2A',
                }}
              >
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0' }}>
                  ⚠ Compression tees fit tighter than regular tees. If between sizes, size UP for comfort.
                </p>
              </div>
            </div>

            {/* Section E — Scarcity */}
            {selectedSize && stockForSize !== null && stockForSize > 0 && stockForSize <= 5 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '16px' }}
              >
                <p
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: stockForSize <= 2 ? '#E03030' : stockForSize <= 5 ? '#E03030' : '#A0A0A0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {stockForSize <= 2 && <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                  {stockForSize <= 2
                    ? `ALMOST GONE — Last ${stockForSize} in stock!`
                    : `LOW STOCK — ${stockForSize} left in size ${selectedSize}`}
                </p>
              </motion.div>
            )}

            {/* Section F — CTAs */}
            <div className="flex flex-col gap-2 mb-6">
              {sizeError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#E03030' }}
                >
                  Please select a size first
                </motion.p>
              )}
              {isSoldOut ? (
                <button
                  style={{
                    height: '56px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#1C1C1C',
                    color: '#606060',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'not-allowed',
                  }}
                >
                  SOLD OUT — NOTIFY ME
                </button>
              ) : (
                <button
                  onClick={handleAddToBag}
                  className="transition-all hover:brightness-110 active:scale-[0.99]"
                  style={{
                    height: '56px',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#4A7BF7',
                    color: '#fff',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  {addedToBag ? '✓ ADDED TO BAG' : 'ADD TO BAG'}
                </button>
              )}
              {!isSoldOut && (
                <button
                  style={{
                    height: '48px',
                    borderRadius: '4px',
                    border: '1px solid #F2F2F2',
                    backgroundColor: 'transparent',
                    color: '#F2F2F2',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  ORDER WITH COD →
                </button>
              )}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="flex items-center justify-center gap-2 transition-colors hover:text-white"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: isWishlisted ? '#4A7BF7' : '#A0A0A0',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  padding: '8px',
                }}
              >
                <Heart size={14} fill={isWishlisted ? '#4A7BF7' : 'none'} />
                {isWishlisted ? 'SAVED TO WISHLIST' : '♡ SAVE TO WISHLIST'}
              </button>
            </div>

            {/* Section G — Trust Signals */}
            <div
              className="grid grid-cols-3 gap-2 p-6 rounded"
              style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A', marginBottom: '24px' }}
            >
              {[
                { icon: '🚚', title: 'Carbon Neutral', desc: 'Shipping' },
                { icon: '🔒', title: 'Secure', desc: '256-bit SSL' },
                { icon: '🧵', title: 'Elite', desc: 'Fabric Prep' },
              ].map(item => (
                <div key={item.title} className="text-center">
                  <div style={{ fontSize: '16px', marginBottom: '4px' }}>{item.icon}</div>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '10px', color: '#F2F2F2', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {item.title}
                  </p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '9px', color: '#606060', textTransform: 'uppercase' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Product Description */}
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '15px',
                color: '#A0A0A0',
                lineHeight: 1.7,
                marginBottom: '24px',
              }}
            >
              {product.description}
            </p>

            {/* Section H — Accordions */}
            <div style={{ borderTop: '1px solid #2A2A2A' }}>
              {ACCORDION_DATA.map(item => (
                <AccordionItem key={item.title} title={item.title} content={item.content} />
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div style={{ marginTop: '80px' }}>
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '36px',
              color: '#F2F2F2',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            CUSTOMER REVIEWS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVIEWS.map(review => (
              <div
                key={review.id}
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid #2A2A2A',
                  borderRadius: '4px',
                  padding: '20px',
                }}
              >
                <div className="flex mb-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} style={{ color: '#4A7BF7', fontSize: '12px' }}>★</span>
                  ))}
                </div>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#F2F2F2', lineHeight: 1.6, marginBottom: '12px' }}>
                  "{review.text}"
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0' }}>
                  {review.name} · {review.location} · {review.date}
                  {review.verified && <span style={{ color: '#4A7BF7' }}> ✓</span>}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* You May Also Like */}
        <div style={{ marginTop: '80px' }}>
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '36px',
              color: '#F2F2F2',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            YOU MAY ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Add to Bag */}
      <div
        className="md:hidden fixed bottom-[60px] left-0 right-0 z-40 px-4 py-3"
        style={{ backgroundColor: '#141414', borderTop: '1px solid #2A2A2A' }}
      >
        <button
          onClick={handleAddToBag}
          className="w-full transition-all hover:brightness-110"
          style={{
            height: '52px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: isSoldOut ? '#1C1C1C' : '#4A7BF7',
            color: isSoldOut ? '#606060' : '#fff',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: isSoldOut ? 'not-allowed' : 'pointer',
            fontWeight: 600,
          }}
        >
          {addedToBag ? '✓ ADDED TO BAG' : isSoldOut ? 'SOLD OUT' : `ADD TO BAG — ₹${product.price.toLocaleString('en-IN')}`}
        </button>
      </div>
    </div>
  );
}
