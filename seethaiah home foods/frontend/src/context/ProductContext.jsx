import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const DEFAULT_PRODUCTS = [
    { id: 1, name: 'Royal Kaju Katli', category: 'SWEET', price: 500, unit: '500g', image: 'https://lmbsweets.com/wp-content/uploads/2024/10/kaju-katli-gift-box.jpg', description: 'Traditional diamond-shaped cashew fudge made with premium silver vark.', inStock: true, rating: 4.8, reviews: 245 },
    { id: 10, name: 'Motichoor Ladoo', category: 'SWEET', price: 150, unit: '500g', image: 'https://agrasweetsbanjara.com/cdn/shop/files/Motichur-Laddu_1000x1000_3e7ea798-5518-4fc5-a8be-7e5d6b1843d5_grande.jpg?v=1715144170', description: 'Soft, melt-in-mouth pearls of gram flour fried in pure desi ghee.', inStock: true, rating: 4.7, reviews: 182 },
    { id: 3, name: 'Special Kalakand', category: 'sweet', price: 380, unit: '500g', image: 'https://chandrasweets.com/wp-content/uploads/2025/01/front-image-1-scaled-1.webp', description: 'Handcrafted pastry filled with sweet kova and aromatic dry fruits.', inStock: false, rating: 4.6, reviews: 94 },
    { id: 4, name: 'Spicy Murukulu', category: 'HOT', price: 60, unit: '250g', image: 'https://mariasmenu.com/wp-content/uploads/Butter-Murukku.png', description: 'Crunchy, savory snack perfectly spiced for tea-time cravings.', inStock: true, rating: 4.5, reviews: 312 },
    { id: 13, name: 'Karapusa', category: 'HOT', price: 60, unit: '250g', image: 'https://www.vjmfoods.com/wp-content/uploads/2023/08/Vampusa.jpg', description: 'Premium roasted cashews tossed in a secret spicy masala blend.', inStock: true, rating: 4.9, reviews: 156 },
    { id: 14, name: 'Karakhara Mixture', category: 'HOT', price: 60, unit: '250g', image: 'https://i.ytimg.com/vi/lwrG7NntGLE/maxresdefault.jpg', description: 'Classic South Indian savory mix with peanuts, curry leaves, and spices.', inStock: true, rating: 4.4, reviews: 210 },
    { id: 5, name: 'Dry Fruit Halwa', category: 'SWEET', price: 320, unit: '500g', image: 'https://media-assets.swiggy.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/RX_THUMBNAIL/IMAGES/VENDOR/2025/7/23/be5f52be-ea65-4c42-93d2-a33b68cfa1cf_1115339.JPG', description: 'Rich and dense halwa packed with almonds, cashews, and dates.', inStock: true, rating: 4.8, reviews: 128 },
    { id: 16, name: 'Malai Laddu', category: 'SWEET', price: 280, unit: '500g', image: 'https://www.nestleprofessional.in/sites/default/files/2022-08/Malai-Laddoo.jpg', description: 'Creamy and rich milk-based laddoos made with condensed milk and saffron.', inStock: true, rating: 4.8, reviews: 142 },
    { id: 17, name: 'Special Bobbatlu', category: 'SWEET', price: 220, unit: '500g', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4mdQTj7TFVu6f5Wg79E--d3EfyMx1PC8qA&s', description: 'Traditional Telugu sweet flatbread stuffed with a sweet lentil and jaggery filling.', inStock: true, rating: 4.9, reviews: 215 },
    { id: 18, name: 'Sunnundalu', category: 'SWEET', price: 300, unit: '500g', image: 'https://m.media-amazon.com/images/I/7110tHD8BwL._AC_UF350,350_QL80_.jpg', description: 'Classic roasted urad dal laddoos made with pure jaggery and desi ghee.', inStock: true, rating: 4.7, reviews: 188 },
    { id: 19, name: 'Pootharekulu', category: 'SWEET', price: 400, unit: '10 pieces', image: 'https://delicacysweets.com/public/uploads/all/MoLdZCBulcz9YTT7mQIyOpIvjsMYjvbwHoPbVW6Y.jpg', description: 'Paper-thin wafers made from rice starch, layered with sugar/jaggery and ghee.', inStock: true, rating: 5.0, reviews: 340 },
    { id: 6, name: 'Anjeer Kova Roll', category: 'SWEET', price: 480, unit: '500g', image: 'https://i.ytimg.com/vi/-CmbLuiGwQI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCTH5dHkWqP6n1CDQNfYjl1Vyrx3A', description: 'Nutritious fig rolls layered with creamy kova and nuts.', inStock: false, rating: 4.7, reviews: 85 },
    { id: 7, name: 'Soft Gulab Jamun', category: 'SWEET', price: 220, unit: '500g', image: 'https://stewshare.s3.amazonaws.com/uploads/recipe/primary_image/194/square_51c75d9a-c59c-4d59-90d6-405d5864e91f.jpg', description: 'Berry-sized balls made with milk solids, soaked in rose-flavored sugar syrup.', inStock: true, rating: 4.9, reviews: 540 },
    { id: 8, name: 'White Rasgulla', category: 'SWEET', price: 220, unit: '500g', image: 'https://easysavorymeals.com/wp-content/uploads/2025/09/homemade-Rasgulla-Recipe-500x375.jpg', description: 'Spongy cottage cheese balls soaked in a light, refreshing syrup.', inStock: true, rating: 4.6, reviews: 167 },
    { id: 9, name: 'Ghee Mysore Pak', category: 'SWEET', price: 270, unit: '500g', image: 'https://www.shreemithai.com/cdn/shop/products/spl-mysore-pak-206182.jpg?v=1707820107&width=1024', description: 'The famous Southern Indian sweet that melts in your mouth with pure ghee goodness.', inStock: true, rating: 4.8, reviews: 422 },
    { id: 2, name: 'Kalakand', category: 'sweet', price: 280, unit: '500g', image: 'https://agrasweetsbanjara.com/cdn/shop/files/Ajmeri-Kalakand_1000x1000_752b0c02-90bf-45a4-94c0-4e1f7e5640b2.jpg?v=1715143748', description: 'Traditional grainy milk cake made with condensed milk and cottage cheese.', inStock: true, rating: 4.7, reviews: 156 },
    { id: 11, name: 'Kaja', category: 'SWEET', price: 260, unit: '500g', image: 'https://www.jiosweet.com/images/thumbs/0000632_tapeswaram-madatha-kaja_550.jpeg', description: 'Classic thickened milk fudge seasoned with cardamom and saffron.', inStock: true, rating: 4.5, reviews: 118 },
    { id: 12, name: 'Crispy Jangiri', category: 'SWEET', price: 130, unit: '500g', image: 'https://goldenbakerymusiri.com/wp-content/uploads/2025/10/Jangiri.jpg', description: 'Deep-fried swirls of batter soaked in sugar syrup—crispy on the outside, juicy on the inside.', inStock: true, rating: 4.6, reviews: 89 },
    { id: 15, name: 'Dry Fruit Laddu', category: 'SWEET', price: 320, unit: '500g', image: 'https://southindianstore.com/wp-content/uploads/2020/11/Dry-fruit-laddu.jpg', description: 'Healthy and delicious energy balls made with assorted dry fruits and nuts.', inStock: true, rating: 4.9, reviews: 203 },
    { id: 22, name: 'Special Chekkalu', category: 'HOT', price: 140, unit: '250g', image: 'https://www.vjmfoods.com/wp-content/uploads/2023/12/Special-Chekkalu.jpg', description: 'Crispy and savory rice crackers flavored with chana dal and curry leaves.', inStock: true, rating: 4.8, reviews: 167 },
    { id: 23, name: 'Onion Pakodi', category: 'HOT', price: 100, unit: '250g', image: 'https://mariasmenu.com/wp-content/uploads/Onion-Pakoda.png', description: 'Crunchy and flavorful deep-fried onion fritters with a hint of spice.', inStock: true, rating: 4.7, reviews: 215 },
    { id: 24, name: 'Corn Mixture', category: 'HOT', price: 120, unit: '250g', image: 'https://5.imimg.com/data5/SELLER/Default/2025/10/457956461/QG/WD/ID/14234567/corn-flakes-mixture-500x500.jpg', description: 'A spicy and crunchy mix of corn flakes, peanuts, and traditional spices.', inStock: true, rating: 4.6, reviews: 128 },
    { id: 25, name: 'Ribbon Murukku', category: 'HOT', price: 130, unit: '250g', image: 'https://i.ytimg.com/vi/V8BwK9uB2nQ/maxresdefault.jpg', description: 'Flat, ribbon-like crunchy snacks made from gram flour and rice flour.', inStock: true, rating: 4.8, reviews: 94 },
    { id: 26, name: 'Kara Boondi', category: 'HOT', price: 90, unit: '200g', image: 'https://mariasmenu.com/wp-content/uploads/Kara-Boondi.png', description: 'Crispy, spiced chickpea flour pearls mixed with peanuts and curry leaves.', inStock: true, rating: 4.7, reviews: 112 }
];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const saved = localStorage.getItem('shf_products');
        const savedProducts = saved ? JSON.parse(saved) : [];

        // Merge DEFAULT_PRODUCTS with saved state
        // This ensures that if the developer changes prices in DEFAULT_PRODUCTS, 
        // they are reflected in the app, but administrative changes (like inStock) are preserved.
        return DEFAULT_PRODUCTS.map(defaultProd => {
            const savedProd = savedProducts.find(p => p.id === defaultProd.id);
            if (savedProd) {
                return {
                    ...defaultProd,
                    // Preserve administrative overrides
                    inStock: savedProd.inStock,
                    // If the price was manually changed in the Admin UI, keep it
                    // Otherwise, use the new price from DEFAULT_PRODUCTS
                    price: savedProd.manualPriceOverride ? savedProd.price : defaultProd.price,
                    manualPriceOverride: savedProd.manualPriceOverride || false
                };
            }
            return defaultProd;
        });
    });

    useEffect(() => {
        localStorage.setItem('shf_products', JSON.stringify(products));
    }, [products]);

    const updateProduct = (id, updates) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates, manualPriceOverride: updates.price !== undefined } : p));
    };

    const toggleStock = (id) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
    };

    const resetToDefaults = () => {
        setProducts(DEFAULT_PRODUCTS);
        localStorage.removeItem('shf_products');
    };

    const importFromCSV = (csvData) => {
        // Simple CSV parser logic could go here
        // For now, we'll focus on the UI and internal state
    };

    const exportToCSV = () => {
        const headers = ['id', 'name', 'category', 'price', 'inStock', 'description'];
        const rows = products.map(p => [p.id, p.name, p.category, p.price, p.inStock, p.description]);
        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "shf_products.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <ProductContext.Provider value={{ products, updateProduct, toggleStock, exportToCSV, importFromCSV, resetToDefaults }}>
            {children}
        </ProductContext.Provider>
    );
};
