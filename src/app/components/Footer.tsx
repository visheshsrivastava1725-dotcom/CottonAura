import { Link } from 'react-router';
import { Instagram, Youtube, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{ backgroundColor: '#0A0A0A', borderTop: '1px solid #2A2A2A' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '20px',
                letterSpacing: '0.2em',
                color: '#F2F2F2',
                marginBottom: '8px',
              }}
            >
              COOTEN AURA
            </div>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '13px',
                color: '#606060',
                marginBottom: '20px',
                lineHeight: 1.6,
              }}
            >
              Budget Compression Tees. Lucknow's Best.
              <br />
              Muscle-Hug Fit. Sweat-Hiding.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/cootenaura"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#606060' }}
                className="hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                style={{ color: '#606060' }}
                className="hover:text-white transition-colors"
              >
                <Youtube size={18} />
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#606060' }}
                className="hover:text-white transition-colors"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: '#F2F2F2',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Shop
            </h4>
            <div className="flex flex-col gap-3">
              {['Season 1 Drop', 'Compression Tees', 'Men Only', 'Budget Deals', 'Bulk (Gyms)'].map(item => (
                <Link
                  key={item}
                  to="/collections/compression-tees"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#606060',
                    textDecoration: 'none',
                  }}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: '#F2F2F2',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Help
            </h4>
            <div className="flex flex-col gap-3">
              {['Size Guide', 'Lucknow Delivery', 'Returns & Exchange', 'FAQs', 'Track Order', 'Contact'].map(item => (
                <Link
                  key={item}
                  to={item === 'Size Guide' ? '/sizing' : '/'}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#606060',
                    textDecoration: 'none',
                  }}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h4
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '12px',
                color: '#F2F2F2',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              About
            </h4>
            <div className="flex flex-col gap-3">
              {['Lucknow Hustle', 'Why Cooten Aura', 'Instagram', 'Affiliate'].map(item => (
                <Link
                  key={item}
                  to="/"
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '13px',
                    color: '#606060',
                    textDecoration: 'none',
                  }}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div
          className="flex flex-wrap items-center justify-center gap-8 py-6"
          style={{ borderTop: '1px solid #1C1C1C', borderBottom: '1px solid #1C1C1C' }}
        >
          {[
            { icon: '💳', label: 'COD Available' },
            { icon: '🔒', label: 'Secure Payment' },
            { icon: '🔄', label: '7-Day Returns' },
            { icon: '🚚', label: 'Free Delivery Lucknow+' },
            { icon: '✓', label: '100% Authentic' },
          ].map(badge => (
            <div key={badge.label} className="flex items-center gap-2">
              <span style={{ fontSize: '14px' }}>{badge.icon}</span>
              <span
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '11px',
                  color: '#606060',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Legal Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '12px',
              color: '#606060',
            }}
          >
            © 2026 Cooten Aura · <a href="#" style={{ color: '#606060', textDecoration: 'none' }}>Privacy Policy</a> · <a href="#" style={{ color: '#606060', textDecoration: 'none' }}>Terms</a> · <a href="#" style={{ color: '#606060', textDecoration: 'none' }}>Refund Policy</a>
          </p>
          <div className="flex items-center gap-3">
            {['UPI', 'RuPay', 'Visa', 'Mastercard', 'PayPal'].map(method => (
              <span
                key={method}
                className="px-2 py-1 rounded"
                style={{
                  backgroundColor: '#1C1C1C',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  color: '#606060',
                  border: '1px solid #2A2A2A',
                }}
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
