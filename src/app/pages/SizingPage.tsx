import { motion } from 'motion/react';
import { Link } from 'react-router';
import { MessageCircle } from 'lucide-react';

const SIZE_CHART = [
  { size: 'XS', chest: '82–86', waist: '70–74', length: '66', sleeve: '18' },
  { size: 'S', chest: '87–91', waist: '75–79', length: '68', sleeve: '19' },
  { size: 'M', chest: '92–96', waist: '80–84', length: '70', sleeve: '20' },
  { size: 'L', chest: '97–102', waist: '85–90', length: '72', sleeve: '21' },
  { size: 'XL', chest: '103–108', waist: '91–96', length: '74', sleeve: '22' },
  { size: 'XXL', chest: '109–114', waist: '97–102', length: '76', sleeve: '23' },
];

export function SizingPage() {
  return (
    <div style={{ backgroundColor: '#0C0C0C', paddingTop: '100px', paddingBottom: '120px' }}>
      <div className="max-w-[900px] mx-auto px-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: 'clamp(48px, 8vw, 96px)',
              color: '#F2F2F2',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            FIND YOUR FIT.
          </h1>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#A0A0A0' }}>
            GET THE RIGHT COMPRESSION — NOT JUST THE RIGHT SIZE.
          </p>
        </motion.div>

        {/* How to Measure */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '32px',
              color: '#F2F2F2',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            HOW TO MEASURE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '01', title: 'CHEST', desc: 'Measure around the fullest part of your chest. Keep the tape snug but not tight. Arms relaxed at sides.' },
              { step: '02', title: 'WAIST', desc: 'Measure around your natural waist, roughly 1 inch above your belly button. Don\'t suck in.' },
              { step: '03', title: 'LENGTH', desc: 'From the highest point of your shoulder to where you want the tee to end. Mid-hip is standard.' },
            ].map(item => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid #2A2A2A',
                  borderRadius: '4px',
                  padding: '24px',
                }}
              >
                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: '24px', color: '#4A7BF7', marginBottom: '8px' }}>
                  {item.step}
                </p>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#F2F2F2', fontWeight: 600, marginBottom: '8px' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Size Chart */}
        <section style={{ marginBottom: '64px' }}>
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '32px',
              color: '#F2F2F2',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}
          >
            SIZE CHART
          </h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0', marginBottom: '16px' }}>
            All measurements in centimetres (cm). For inches, divide by 2.54.
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                backgroundColor: '#141414',
                border: '1px solid #2A2A2A',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <thead>
                <tr style={{ backgroundColor: '#1C1C1C' }}>
                  {['SIZE', 'CHEST (CM)', 'WAIST (CM)', 'LENGTH (CM)', 'SLEEVE (CM)'].map(h => (
                    <th
                      key={h}
                      style={{
                        padding: '14px 16px',
                        textAlign: 'left',
                        fontFamily: 'Space Mono, monospace',
                        fontSize: '11px',
                        color: '#A0A0A0',
                        borderBottom: '1px solid #2A2A2A',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row, i) => (
                  <tr
                    key={row.size}
                    style={{ borderBottom: i < SIZE_CHART.length - 1 ? '1px solid #1C1C1C' : 'none' }}
                  >
                    <td
                      style={{
                        padding: '14px 16px',
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '14px',
                        color: '#F2F2F2',
                        fontWeight: 600,
                      }}
                    >
                      {row.size}
                    </td>
                    {[row.chest, row.waist, row.length, row.sleeve].map((val, j) => (
                      <td
                        key={j}
                        style={{
                          padding: '14px 16px',
                          fontFamily: 'Space Mono, monospace',
                          fontSize: '12px',
                          color: '#A0A0A0',
                        }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Compression Fit Explainer */}
        <section
          style={{
            backgroundColor: '#141414',
            border: '1px solid #2A2A2A',
            borderRadius: '4px',
            padding: '32px',
            marginBottom: '48px',
          }}
        >
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '28px',
              color: '#4A7BF7',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '16px',
            }}
          >
            THE COMPRESSION FIT RULE
          </h2>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#A0A0A0', lineHeight: 1.8 }}>
            <p className="mb-3">
              Compression tees are designed to fit tighter than regular tees. <strong style={{ color: '#F2F2F2' }}>This is intentional</strong> — the compression supports your muscles and enhances definition.
            </p>
            <p className="mb-3">
              <strong style={{ color: '#F2F2F2' }}>Rule:</strong> If you're between sizes, go <span style={{ color: '#4169E1', fontWeight: 600 }}>UP one size for comfort</span>.
            </p>
            <p>
              If you want <strong style={{ color: '#F2F2F2' }}>maximum Muscle-Hug effect</strong>, stay true to size. If you prefer a slightly less restrictive feel while still looking defined, size up.
            </p>
          </div>
        </section>

        {/* Body Type Guide */}
        <section style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              fontSize: '28px',
              color: '#F2F2F2',
              textTransform: 'uppercase',
              letterSpacing: '-0.01em',
              marginBottom: '20px',
            }}
          >
            BODY TYPE GUIDE
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { type: 'BROADER SHOULDERS?', advice: 'Size up from your chest measurement. Our tapered cut will give you the best shoulder definition without restricting arm movement.' },
              { type: 'LONGER TORSO?', advice: 'Stick to your chest measurement. Our tees are cut with extra length to ensure full coverage during overhead movements.' },
              { type: 'MORE CHEST?', advice: 'Go by your chest measurement, not your waist. The spandex blend will conform to your torso without feeling restrictive.' },
            ].map(item => (
              <div
                key={item.type}
                style={{
                  backgroundColor: '#141414',
                  border: '1px solid #2A2A2A',
                  borderRadius: '4px',
                  padding: '20px',
                }}
              >
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#4A7BF7', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '8px' }}>
                  {item.type}
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0', lineHeight: 1.7 }}>
                  {item.advice}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WhatsApp CTA */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 rounded"
          style={{ backgroundColor: '#141414', border: '1px solid #2A2A2A' }}
        >
          <div>
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', color: '#F2F2F2', textTransform: 'uppercase' }}>
              STILL NOT SURE?
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: '#A0A0A0' }}>
              Our team will help you pick the perfect size.
            </p>
          </div>
          <a
            href="https://wa.me/919999999999?text=Hi!%20I%20need%20help%20finding%20my%20size%20for%20Cooten Aura%20compression%20tees."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 transition-all hover:brightness-110 shrink-0"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              backgroundColor: '#25D366',
              border: 'none',
              borderRadius: '4px',
              color: '#fff',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '13px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            <MessageCircle size={14} />
            CHAT WITH US →
          </a>
        </div>
      </div>
    </div>
  );
}
