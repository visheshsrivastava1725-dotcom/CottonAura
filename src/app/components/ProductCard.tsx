import { useState } from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const BADGE_STYLES: Record<string, { bg: string; color: string }> = {
  'NEW': { bg: '#4A7BF7', color: '#fff' },
  'BESTSELLER': { bg: '#333', color: '#fff' },
  'LOW STOCK': { bg: '#E03030', color: '#fff' },
  'SOLD OUT': { bg: '#1C1C1C', color: '#606060' },
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggleWishlist, wishlist, addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [quickAddVisible, setQuickAddVisible] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);
  const isWishlisted = wishlist.includes(product.id);

  const availableSizes = product.sizes.filter(s => s.stock > 0);

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size);
    setAddedSize(size);
    setTimeout(() => setAddedSize(null), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
    >
      <Link
        to={`/products/${product.id}`}
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setQuickAddVisible(false); }}
      >
        {/* Image Container */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: '4/5',
            backgroundColor: '#141414',
            border: '1px solid #2A2A2A',
            borderRadius: '4px',
          }}
          onMouseEnter={() => setQuickAddVisible(true)}
          onMouseLeave={() => setQuickAddVisible(false)}
        >
          {/* Primary Image */}
          <motion.img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              position: 'absolute', inset: 0,
            }}
            animate={{ opacity: hovered ? 0 : 1, scale: hovered ? 1.02 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Hover Image */}
          <motion.img
            src={product.hoverImage}
            alt={product.name}
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              position: 'absolute', inset: 0,
            }}
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1.02 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Badge */}
          {product.badge && (
            <div
              className="absolute top-4 left-4"
              style={{
                padding: '4px 10px',
                borderRadius: '2px',
                backgroundColor: BADGE_STYLES[product.badge].bg,
                color: BADGE_STYLES[product.badge].color,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '9px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              {product.badge}
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
            className="absolute top-3 right-3 flex items-center justify-center transition-colors"
            style={{
              width: '36px', height: '36px',
              background: 'rgba(12,12,12,0.7)',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              color: isWishlisted ? '#4A7BF7' : '#A0A0A0',
            }}
          >
            <Heart size={14} fill={isWishlisted ? '#4A7BF7' : 'none'} />
          </button>

          {/* Quick Add Panel */}
          {product.badge !== 'SOLD OUT' && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3"
              style={{
                height: '52px',
                backgroundColor: 'rgba(12,12,12,0.92)',
              }}
              initial={{ y: '100%' }}
              animate={{ y: quickAddVisible ? 0 : '100%' }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-1">
                {availableSizes.slice(0, 5).map(s => (
                  <button
                    key={s.size}
                    onClick={(e) => handleQuickAdd(s.size, e)}
                    className="transition-all hover:bg-white hover:text-black"
                    style={{
                      width: '28px', height: '26px',
                      border: '1px solid #2A2A2A',
                      borderRadius: '4px',
                      backgroundColor: addedSize === s.size ? '#4A7BF7' : 'transparent',
                      color: addedSize === s.size ? '#fff' : '#A0A0A0',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
              <button
                style={{
                  backgroundColor: '#4A7BF7',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#fff',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  padding: '6px 10px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                QUICK ADD
              </button>
            </motion.div>
          )}
        </div>

        {/* Card Info */}
        <div style={{ padding: '12px 0 20px 0' }}>
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '14px',
                  color: '#F2F2F2',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {product.name}
              </p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', marginTop: '2px' }}>
                {product.colors.length} colours
              </p>
            </div>
            <div className="text-right shrink-0">
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '18px', color: '#F2F2F2', fontWeight: 600 }}>
                ₹{product.price.toLocaleString('en-IN')}
              </div>
              {product.originalPrice && (
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#606060', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} style={{ color: i < Math.floor(product.rating) ? '#4A7BF7' : '#2A2A2A', fontSize: '11px' }}>★</span>
            ))}
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#606060', marginLeft: '4px' }}>
              ({product.reviewCount})
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
