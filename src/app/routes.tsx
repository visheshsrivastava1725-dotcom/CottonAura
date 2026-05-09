import { createBrowserRouter, Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { HomePage } from './pages/HomePage';
import { CollectionPage } from './pages/CollectionPage';
import { ProductPage } from './pages/ProductPage';
import { SizingPage } from './pages/SizingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { NotFoundPage } from './pages/NotFoundPage';

function Root() {
  return (
    <div style={{ backgroundColor: '#0C0C0C', minHeight: '100vh' }}>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppWidget />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'collections/:slug', Component: CollectionPage },
      { path: 'products/:id', Component: ProductPage },
      { path: 'sizing', Component: SizingPage },
      { path: 'checkout', Component: CheckoutPage },
      { path: 'bulk-orders', Component: () => (
        <div style={{ backgroundColor: '#0C0C0C', paddingTop: '140px', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="text-center max-w-lg px-6">
            <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '48px', color: '#4A7BF7', textTransform: 'uppercase' }}>BULK ORDERS</p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#A0A0A0', marginTop: '12px' }}>
              Contact us on WhatsApp for custom bulk pricing.
            </p>
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%27m%20interested%20in%20bulk%20orders%20for%20Cotton%20Aura%20tees."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginTop: '24px',
                height: '48px',
                padding: '0 28px',
                backgroundColor: '#25D366',
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
              WHATSAPP US →
            </a>
          </div>
        </div>
      )},
      { path: '*', Component: NotFoundPage },
    ],
  },
]);