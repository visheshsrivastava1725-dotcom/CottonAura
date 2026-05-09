import { useState, useCallback } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './context/CartContext';
import { Preloader } from './components/Preloader';

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleComplete = useCallback(() => setLoading(false), []);

  return (
    <CartProvider>
      {loading && <Preloader onComplete={handleComplete} />}
      {!loading && <RouterProvider router={router} />}
    </CartProvider>
  );
}
