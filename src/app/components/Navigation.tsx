import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Search, Heart, ShoppingBag, Menu, X, Home, Grid2x2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { AnnouncementBar } from './AnnouncementBar';

const NAV_LINKS = [
  { label: 'Shop', path: '/collections/compression-tees' },
  { label: 'Collections', path: '/collections/compression-tees' },
  { label: 'Bestsellers', path: '/collections/bestsellers' },
  { label: 'About', path: '/about' },
];

export function Navigation() {
  const { totalItems, wishlist, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <AnnouncementBar />
        <nav
          className="transition-all duration-300"
          style={{
            height: '64px',
            backgroundColor: 'rgba(12,12,12,0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #2A2A2A',
            boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '18px',
                letterSpacing: '0.2em',
                color: '#F2F2F2',
                textDecoration: 'none',
              }}
            >
              COOTEN AURA
            </Link>

            {/* Center Nav - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="relative group"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    letterSpacing: '0.06em',
                    color: location.pathname === link.path ? '#4A7BF7' : '#F2F2F2',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                  }}
                >
                  {link.label}
                  <span
                    className="absolute bottom-[-4px] left-0 h-[1px] transition-all duration-200"
                    style={{
                      backgroundColor: '#4169E1',
                      width: location.pathname === link.path ? '100%' : '0',
                    }}
                  />
                </Link>
              ))}
              <Link
                to="/bulk-orders"
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.06em',
                  color: '#4A7BF7',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                }}
              >
                Bulk Orders
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button
                style={{ color: '#A0A0A0', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                className="hover:text-white transition-colors hidden md:flex"
                onClick={() => navigate('/search')}
              >
                <Search size={18} />
              </button>
              <button
                style={{ color: '#A0A0A0', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                className="hover:text-white transition-colors hidden md:flex relative"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span
                    className="absolute -top-1 -right-1 rounded-full flex items-center justify-center"
                    style={{
                      width: '14px', height: '14px',
                      backgroundColor: '#4169E1',
                      fontSize: '9px', color: '#fff',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button
                onClick={openCart}
                className="relative hover:text-white transition-colors"
                style={{ color: '#A0A0A0', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span
                    className="absolute -top-1 -right-1 rounded-full flex items-center justify-center"
                    style={{
                      width: '16px', height: '16px',
                      backgroundColor: '#4169E1',
                      fontSize: '9px', color: '#fff',
                      fontFamily: 'DM Sans, sans-serif',
                      fontWeight: 600,
                    }}
                  >
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                className="md:hidden"
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ color: '#F2F2F2', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: '#141414', top: '100px' }}
          >
            <div className="flex flex-col gap-8 p-8 pt-12">
              {['SHOP', 'COLLECTIONS', 'BESTSELLERS'].map(link => (
                <Link
                  key={link}
                  to="/collections/compression-tees"
                  style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '36px',
                    color: '#F2F2F2',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  {link}
                </Link>
              ))}
              <div className="flex flex-col gap-4 mt-4">
                {['About', 'Bulk Orders', 'Size Guide', 'Contact'].map(link => (
                  <Link
                    key={link}
                    to="/"
                    style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '14px',
                      color: '#A0A0A0',
                      textDecoration: 'none',
                    }}
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            <div
              className="mt-auto p-8 flex items-center gap-6"
              style={{ borderTop: '1px solid #2A2A2A' }}
            >
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: '#A0A0A0',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                ✓ LUCKNOW SPECIAL
              </span>
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '12px',
                  color: '#A0A0A0',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                🚚 FREE DELIVERY LUCKNOW
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around"
        style={{
          height: '60px',
          backgroundColor: '#141414',
          borderTop: '1px solid #2A2A2A',
        }}
      >
        <Link
          to="/"
          className="flex flex-col items-center gap-1"
          style={{ color: location.pathname === '/' ? '#4169E1' : '#A0A0A0', textDecoration: 'none' }}
        >
          <Home size={20} />
          <span style={{ fontSize: '10px', fontFamily: 'DM Sans, sans-serif' }}>Home</span>
        </Link>
        <Link
          to="/collections/compression-tees"
          className="flex flex-col items-center gap-1"
          style={{ color: location.pathname.startsWith('/collections') ? '#4169E1' : '#A0A0A0', textDecoration: 'none' }}
        >
          <Grid2x2 size={20} />
          <span style={{ fontSize: '10px', fontFamily: 'DM Sans, sans-serif' }}>Shop</span>
        </Link>
        <Link
          to="/search"
          className="flex flex-col items-center gap-1"
          style={{ color: '#A0A0A0', textDecoration: 'none' }}
        >
          <Search size={20} />
          <span style={{ fontSize: '10px', fontFamily: 'DM Sans, sans-serif' }}>Search</span>
        </Link>
        <button
          onClick={openCart}
          className="flex flex-col items-center gap-1 relative"
          style={{ height: '36px', backgroundColor: '#4169E1', display: 'flex', alignItems: 'center' }}
        >
          <ShoppingBag size={20} />
          <span style={{ fontSize: '10px', fontFamily: 'DM Sans, sans-serif' }}>Bag</span>
          {totalItems > 0 && (
            <span
              className="absolute -top-1 right-3 rounded-full flex items-center justify-center"
              style={{
                width: '14px', height: '14px',
                backgroundColor: '#4A7BF7',
                fontSize: '8px', color: '#fff',
              }}
            >
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </>
  );
}