import { useState } from 'react';
import { motion } from 'motion/react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const SORT_OPTIONS = ['Newest', 'Bestselling', 'Price: Low to High', 'Price: High to Low'];
const COLORS = [
  { name: 'Black', value: '#0C0C0C' },
  { name: 'Navy', value: '#1a2744' },
  { name: 'Charcoal', value: '#3A3A3A' },
  { name: 'White', value: '#f0f0f0' },
  { name: 'Olive', value: '#4a5a2a' },
  { name: 'Red', value: '#8B1A1A' },
];

const COLLECTION_HERO = 'https://images.unsplash.com/photo-1770616756218-f0abe20da404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400';
const EDITORIAL_BANNER = 'https://images.unsplash.com/photo-1564787897216-3570df048eb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1400';

export function CollectionPage() {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Bestselling');
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  let filtered = [...PRODUCTS];

  if (selectedSizes.length > 0) {
    filtered = filtered.filter(p =>
      p.sizes.some(s => selectedSizes.includes(s.size) && s.stock > 0)
    );
  }

  if (sortBy === 'Price: Low to High') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'Newest') {
    filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  }

  // Insert editorial banner every 8 products
  const renderGrid = () => {
    const result: JSX.Element[] = [];
    filtered.forEach((product, i) => {
      if (i === 4) {
        result.push(
          <div key="editorial" className="col-span-2 md:col-span-4 overflow-hidden rounded" style={{ height: '240px', position: 'relative' }}>
            <img src={EDITORIAL_BANNER} alt="Editorial" className="w-full h-full object-cover object-center brightness-75" />
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(24px, 4vw, 48px)', color: '#F2F2F2', letterSpacing: '0.1em' }}>
                COMPRESSION. PERFORMANCE. CULTURE.
              </p>
            </div>
          </div>
        );
      }
      result.push(<ProductCard key={product.id} product={product} index={i % 8} />);
    });
    return result;
  };

  return (
    <div style={{ backgroundColor: '#0C0C0C', paddingTop: '100px' }}>
      {/* Collection Hero */}
      <div className="relative w-full overflow-hidden" style={{ height: '40vh', minHeight: '280px' }}>
        <img src={COLLECTION_HERO} alt="Compression Tees" className="w-full h-full object-cover object-top brightness-50" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '8vw',
              color: '#F2F2F2',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
            }}
          >
            COMPRESSION TEES
          </motion.h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#A0A0A0', marginTop: '8px' }}>
            Built for every body. Every lift.
          </p>
        </div>
        <div
          className="absolute bottom-4 right-8"
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '0.04em' }}
        >
          {filtered.length} PRODUCTS
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div
        className="sticky top-[100px] z-30 flex items-center gap-4 px-6 overflow-x-auto"
        style={{
          height: '52px',
          backgroundColor: '#141414',
          borderBottom: '1px solid #2A2A2A',
        }}
      >
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="flex items-center gap-2 shrink-0 transition-colors hover:text-white"
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '13px',
            color: '#A0A0A0',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          <SlidersHorizontal size={14} />
          FILTER
          {(selectedSizes.length + selectedColors.length) > 0 && (
            <span
              style={{
                width: '18px', height: '18px',
                borderRadius: '50%',
                backgroundColor: '#4A7BF7',
                color: '#fff',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selectedSizes.length + selectedColors.length}
            </span>
          )}
        </button>

        {/* Size Filters */}
        <div className="flex items-center gap-2 border-l pl-4 border-[#2A2A2A]">
          {SIZES.map(size => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              style={{
                padding: '4px 10px',
                borderRadius: '4px',
                border: `1px solid ${selectedSizes.includes(size) ? '#4A7BF7' : '#2A2A2A'}`,
                backgroundColor: selectedSizes.includes(size) ? '#4A7BF7' : 'transparent',
                color: selectedSizes.includes(size) ? '#fff' : '#A0A0A0',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="ml-auto shrink-0 relative">
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #2A2A2A',
              borderRadius: '4px',
              color: '#A0A0A0',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              padding: '6px 12px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              outline: 'none',
            }}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt} value={opt} style={{ backgroundColor: '#141414', color: '#F2F2F2' }}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {renderGrid()}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24">
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '32px', color: '#3A3A3A' }}>
              NO PRODUCTS FOUND
            </p>
            <button
              onClick={() => { setSelectedSizes([]); setSelectedColors([]); }}
              style={{
                marginTop: '16px',
                color: '#4A7BF7',
                background: 'none',
                border: 'none',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
