export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  colors: string[];
  selectedColor: string;
  sizes: { size: string; stock: number }[];
  badge?: 'NEW' | 'BESTSELLER' | 'LOW STOCK' | 'SOLD OUT' | 'SEASON 1';
  rating: number;
  reviewCount: number;
  image: string;
  hoverImage: string;
  description: string;
  category: string;
  isNew?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'ca-ct-blk-001',
    name: 'Cooten Black Compression',
    sku: 'CA-CT-BLK-001',
    price: 899,
    originalPrice: 1499,
    colors: ['#0C0C0C', '#001F3F', '#3A3A3A', '#0055FF', '#800000'],
    selectedColor: '#0C0C0C',
    sizes: [
      { size: 'XS', stock: 8 },
      { size: 'S', stock: 15 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 3 },
      { size: 'XL', stock: 0 },
      { size: 'XXL', stock: 6 },
    ],
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewCount: 412,
    image: 'https://images.unsplash.com/photo-1754475118668-64ac3f3b2559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1628935291759-bbaf33a66dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    description: 'Muscle-hug fit. Sweat-hiding tech. Photo-ready finish. Cooten Aura budget compression for the Lucknow grind. 200 GSM performance fabric.',
    category: 'Compression Tees',
    isNew: false,
  },
  {
    id: 'ca-ct-nvy-002',
    name: 'Cooten Navy Compression',
    sku: 'CA-CT-NVY-002',
    price: 899,
    colors: ['#001F3F', '#0C0C0C', '#3A3A3A'],
    selectedColor: '#001F3F',
    sizes: [
      { size: 'XS', stock: 4 },
      { size: 'S', stock: 9 },
      { size: 'M', stock: 7 },
      { size: 'L', stock: 2 },
      { size: 'XL', stock: 5 },
      { size: 'XXL', stock: 3 },
    ],
    badge: 'SEASON 1',
    rating: 4.8,
    reviewCount: 248,
    image: 'https://images.unsplash.com/photo-1677165608544-617fe007e2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1564787897216-3570df048eb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    description: 'Deep Navy. Budget-friendly. Premium look. Engineered for the Lucknow gym culture. Sweat-hiding and muscle-defining.',
    category: 'Compression Tees',
    isNew: true,
  },
  {
    id: 'ca-ct-char-003',
    name: 'Cooten Charcoal Compression',
    sku: 'CA-CT-CHR-003',
    price: 899,
    originalPrice: 1299,
    colors: ['#3A3A3A', '#0C0C0C', '#001F3F'],
    selectedColor: '#3A3A3A',
    sizes: [
      { size: 'XS', stock: 2 },
      { size: 'S', stock: 1 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 4 },
      { size: 'XL', stock: 8 },
      { size: 'XXL', stock: 6 },
    ],
    badge: 'LOW STOCK',
    rating: 4.7,
    reviewCount: 186,
    image: 'https://images.unsplash.com/photo-1754475096386-b7a2a45a91fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1690731033723-ad718c6e585a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    description: 'The ultimate sweat-hiding Charcoal. Compression that looks premium, priced for Lucknow. Muscle-hug fit for maximum definition.',
    category: 'Compression Tees',
    isNew: false,
  },
  {
    id: 'ca-ct-blue-004',
    name: 'Cooten Electric Blue',
    sku: 'CA-CT-BLU-004',
    price: 999,
    colors: ['#0055FF', '#0C0C0C', '#001F3F'],
    selectedColor: '#0055FF',
    sizes: [
      { size: 'XS', stock: 10 },
      { size: 'S', stock: 14 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 9 },
      { size: 'XL', stock: 7 },
      { size: 'XXL', stock: 5 },
    ],
    badge: 'SEASON 1',
    rating: 4.6,
    reviewCount: 134,
    image: 'https://images.unsplash.com/photo-1716952029045-feb119b58583?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1740904259044-fad0ae515343?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    description: 'Electric Royal Blue. Performance-coded. Cooten Aura flagship color for Launch Season 1. Gym to Street style.',
    category: 'Compression Tees',
    isNew: true,
  },
  {
    id: 'ca-ct-mar-005',
    name: 'Cooten Maroon Compression',
    sku: 'CA-CT-MAR-005',
    price: 999,
    originalPrice: 1299,
    colors: ['#800000', '#0C0C0C'],
    selectedColor: '#800000',
    sizes: [
      { size: 'S', stock: 6 },
      { size: 'M', stock: 0 },
      { size: 'L', stock: 0 },
      { size: 'XL', stock: 3 },
      { size: 'XXL', stock: 8 },
    ],
    badge: 'SEASON 1',
    rating: 4.8,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1758875570127-b6ff35e42436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    hoverImage: 'https://images.unsplash.com/photo-1758875570127-b6ff35e42436?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
    description: 'Bold Maroon. Deep compression. Priced for Lucknow. Cooten Aura high-tension fabric for elite definition.',
    category: 'Compression Tees',
    isNew: false,
  },
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Rahul L.',
    location: 'Hazratganj, Lucknow',
    rating: 5,
    text: 'Best compression tee in Lucknow for this price. Fits like a second skin. Gym to street ready.',
    product: 'Black Compression · Size L',
    verified: true,
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'Arjun S.',
    location: 'Gomti Nagar, Lucknow',
    rating: 5,
    text: 'Sweat-hiding is real. Electric Blue looks amazing in gym mirrors. Photo-ready always.',
    product: 'Electric Blue · Size M',
    verified: true,
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Vikram K.',
    location: 'Aliganj, Lucknow',
    rating: 5,
    text: 'Budget-friendly but looks premium. Cooten Aura is the new gym standard in Lucknow.',
    product: 'Charcoal Compression · Size L',
    verified: true,
    date: '3 weeks ago',
  },
];

export const UGC_IMAGES = [
  'https://images.unsplash.com/photo-1754475118668-64ac3f3b2559?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  'https://images.unsplash.com/photo-1628935291759-bbaf33a66dc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  'https://images.unsplash.com/photo-1770616756218-f0abe20da404?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  'https://images.unsplash.com/photo-1718474552749-b39aef858d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  'https://images.unsplash.com/photo-1677165608544-617fe007e2e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
  'https://images.unsplash.com/photo-1754475096386-b7a2a45a91fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400',
];
