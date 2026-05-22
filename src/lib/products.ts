export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  weight: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  features: string[];
  rating: number;
  tags: string[];
  ingredients: string[];
  shelfLife: string;
  storage: string;
  variants: ProductVariant[];
};

export const catalog: Product[] = [
  {
    id: 'boondi-laddu',
    name: 'Boondi Laddu',
    category: 'temple-sweets',
    description: 'Golden boondi pearls bound in saffron syrup and pure cow ghee, finished with a whisper of cardamom.',
    shortDescription: 'Golden boondi pearls bound in saffron syrup and pure cow ghee.',
    features: ['Bestseller', 'Most Popular', 'Handrolled'],
    rating: 4.9,
    tags: ['Bestseller', 'Most Popular'],
    ingredients: ['Besan', 'Pure ghee', 'Saffron', 'Cardamom', 'Sugar'],
    shelfLife: '14 days',
    storage: 'Store in an airtight container at room temperature.',
    variants: [
      { id: 'boondi-250', name: '250g', price: 260, weight: '250g' },
      { id: 'boondi-500', name: '500g', price: 480, weight: '500g' },
      { id: 'boondi-1000', name: '1kg', price: 920, weight: '1kg' },
    ],
  },
  {
    id: 'mysore-pak',
    name: 'Mysore Pak',
    category: 'temple-sweets',
    description: 'Soft, melting bricks of besan and ghee — a temple-town classic with warm nostalgia.',
    shortDescription: 'Soft, melting bricks of besan and ghee — a temple-town classic.',
    features: ['Traditional', 'Festive Favorite'],
    rating: 4.8,
    tags: ['Bestseller'],
    ingredients: ['Besan', 'Pure ghee', 'Sugar', 'Cardamom'],
    shelfLife: '12 days',
    storage: 'Keep in a cool, dry place away from direct sunlight.',
    variants: [
      { id: 'mysore-250', name: '250g', price: 240, weight: '250g' },
      { id: 'mysore-500', name: '500g', price: 450, weight: '500g' },
      { id: 'mysore-1000', name: '1kg', price: 860, weight: '1kg' },
    ],
  },
  {
    id: 'kaju-katli',
    name: 'Kaju Katli',
    category: 'temple-sweets',
    description: 'Diamond-cut cashew fudge layered with edible silver leaf for a refined festive delight.',
    shortDescription: 'Diamond-cut cashew fudge layered with edible silver leaf.',
    features: ['Premium', 'Gift Ready'],
    rating: 4.7,
    tags: ['Bestseller'],
    ingredients: ['Cashews', 'Sugar', 'Ghee', 'Silver vark'],
    shelfLife: '10 days',
    storage: 'Chill in an airtight tin for best freshness.',
    variants: [
      { id: 'kaju-250', name: '250g', price: 360, weight: '250g' },
      { id: 'kaju-500', name: '500g', price: 680, weight: '500g' },
      { id: 'kaju-1000', name: '1kg', price: 1320, weight: '1kg' },
    ],
  },
  {
    id: 'murukku',
    name: 'Murukku',
    category: 'festive-savories',
    description: 'Coiled rice-flour spirals, fried in cold-pressed groundnut oil for the perfect crunch.',
    shortDescription: 'Coiled rice-flour spirals, fried in cold-pressed groundnut oil.',
    features: ['Crunchy', 'Tea Time'],
    rating: 4.6,
    tags: ['Handcrafted'],
    ingredients: ['Rice flour', 'Urad dal flour', 'Ghee', 'Sesame seeds'],
    shelfLife: '21 days',
    storage: 'Keep in an airtight pouch in a cool place.',
    variants: [
      { id: 'murukku-250', name: '250g', price: 220, weight: '250g' },
      { id: 'murukku-500', name: '500g', price: 420, weight: '500g' },
    ],
  },
  {
    id: 'gongura-pachadi',
    name: 'Gongura Pachadi',
    category: 'summer-pickles',
    description: 'Tangy gongura leaves married with spices and oil for a bold Andhra pickle experience.',
    shortDescription: 'Tangy gongura pickle with rich Andhra spices.',
    features: ['Tangy', 'Seasonal'],
    rating: 4.5,
    tags: ['Authentic'],
    ingredients: ['Gongura leaves', 'Chili', 'Mustard', 'Garlic', 'Oil'],
    shelfLife: '30 days',
    storage: 'Refrigerate after opening for best shelf life.',
    variants: [
      { id: 'gongura-250', name: '250g', price: 180, weight: '250g' },
      { id: 'gongura-500', name: '500g', price: 340, weight: '500g' },
    ],
  },
  {
    id: 'milagai-podi',
    name: 'Milagai Podi',
    category: 'daily-podis',
    description: 'Aromatic spice blend that brings traditional Telugu flavor to every dosa and rice meal.',
    shortDescription: 'Spice-packed podi made for everyday meals.',
    features: ['Everyday', 'Savory'],
    rating: 4.6,
    tags: ['Daily Essential'],
    ingredients: ['Red chili', 'Urad dal', 'Sesame', 'Curry leaf'],
    shelfLife: '90 days',
    storage: 'Store in a cool, dry container after opening.',
    variants: [
      { id: 'podi-200', name: '200g', price: 160, weight: '200g' },
      { id: 'podi-500', name: '500g', price: 360, weight: '500g' },
    ],
  },
];

export const categories = [
  {
    id: 'temple-sweets',
    title: 'Temple sweets',
    description: 'Rich festive sweets made for celebrations and offerings.',
  },
  {
    id: 'festive-savories',
    title: 'Festive savories',
    description: 'Crunchy, savory snacks for gatherings and tea time.',
  },
  {
    id: 'summer-pickles',
    title: 'Summer pickles',
    description: 'Bold, preserved flavors sealed in seasonal tradition.',
  },
  {
    id: 'daily-podis',
    title: 'Daily podis',
    description: 'Flavor-packed spice blends for everyday meals.',
  },
];
