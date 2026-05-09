import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(80px, 15vw, 180px)', color: '#1C1C1C', lineHeight: 0.9 }}>
        404
      </p>
      <h1
        style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(32px, 6vw, 72px)',
          color: '#F2F2F2',
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          marginTop: '8px',
          marginBottom: '12px',
        }}
      >
        WRONG TURN.
      </h1>
      <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#A0A0A0', marginBottom: '32px' }}>
        Back to the gym floor.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 transition-all hover:brightness-110"
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
        }}
      >
        SHOP NOW <ArrowRight size={14} />
      </Link>
    </div>
  );
}
