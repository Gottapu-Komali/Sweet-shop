require('dotenv').config();
const connectDB = require('./database');
const Product = require('./models/Product');

const sweetItems = [
    {
        name: "Kaju Katli Royale",
        price: "₹600",
        unit: "500g",
        description: "Exquisite diamond-shaped cashew fudge made with premium Grade-A nuts and fine silver vark.",
        image: "/kaju_katli_luxury_1768191580496.png",
        badge: "Bestseller",
        category: "SWEET"
    },
    {
        name: "Kaju Pista Roll",
        price: "₹650",
        unit: "500g",
        description: "Silky cashew fudge rolled with a rich, nutty pistachio filling. A classic celebration treat.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPZYJ_Vv5yU3zIQgqD2hCFM9npqt7UzZNqLA&s",
        category: "SWEET"
    },
    {
        name: "Kaju Sandwich",
        price: "₹680",
        unit: "500g",
        description: "Triple-layered delight with pistachio filling between smooth cashew nut layers.",
        image: "https://i.ytimg.com/vi/aBG86ATSRJU/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLDFWByWCKrSqZgrTk29qBLzRiijWQ",
        category: "SWEET"
    },
    {
        name: "Kaju Custard Apple",
        price: "₹700",
        unit: "500g",
        description: "Handcrafted cashew sweet shaped like a custard apple (Sitaphal), featuring a rich, authentic flavor.",
        image: "https://i.ytimg.com/vi/BHlLwWf4fV4/maxresdefault.jpg",
        badge: "Exotic",
        category: "SWEET"
    },
    {
        name: "Kaju Carrot",
        price: "₹720",
        unit: "500g",
        description: "Artistically handcrafted carrot-shaped cashew fudge, naturally colored and topped with a pistachio stem.",
        image: "https://pushmycart.com/cdn/shop/products/Carrot-Peda_1200x1200.jpg?v=1742292288",
        category: "SWEET"
    },
    {
        name: "Kaju Flower",
        price: "₹700",
        unit: "500g",
        description: "Elegant cashew sweet molded into a delicate flower shape with fine craftsmanship.",
        image: "https://mirchi.com/os/cdn/content/images/cashew%20flower%20athithigruha%20foods_medium_0817981.webp",
        category: "SWEET"
    },
    {
        name: "Kaju Anjeer Roll",
        price: "₹650",
        unit: "500g",
        description: "Nutritious roll made with premium cashews and a rich fig (anjeer) center.",
        image: "https://api.vivaanfood.com/uploads/product/1643960017-Anjeer-Roll.jpg",
        category: "SWEET"
    },
    {
        name: "Kaju Apple",
        price: "₹700",
        unit: "500g",
        description: "Adorable apple-shaped cashew sweets with a natural fruit look and delightful taste.",
        image: "https://www.orderyourchoice.com/10415-large_default/pune-kaju-apple.jpg",
        category: "SWEET"
    },
    {
        name: "Royal Kalakand",
        price: "₹280",
        unit: "500g",
        description: "Traditional white milk cake with a grainy texture, slow-cooked to perfection with cardamom.",
        image: "https://img.freepik.com/premium-photo/kalakand-is-indian-sweet-is-made-from-solidified-sweetened-milk-paneer-served-bowl-with-dry-fruit-toppingsselective-focus_726363-896.jpg",
        badge: "Fresh",
        category: "SWEET"
    },
    {
        name: "Ajmeri Kalakand",
        price: "₹320",
        unit: "500g",
        description: "Deeply caramelized and rich brown milk cake, offering a dense, nutty flavor profile.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB3u3lEYVPimKhFusKDFdV4qJmflD5li_ghQ&s",
        category: "SWEET"
    },
    {
        name: "Kesar Kalakand",
        price: "₹320",
        unit: "500g",
        description: "Saffron-infused milk cake with a royal aroma and a vibrant golden hue.",
        image: "https://5.imimg.com/data5/SELLER/Default/2022/10/YV/EX/MT/110515152/kesar-kalakand.jpg",
        category: "SWEET"
    },
    {
        name: "Chocolate Kalakand",
        price: "₹340",
        unit: "500g",
        description: "Delicious fusion of traditional grainy milk cake and rich Belgian chocolate cocoa.",
        image: "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/Pooja_Thakur/Chocolate_Kalakand_Recipe-1.jpg",
        category: "SWEET"
    },
    {
        name: "Motichoor Laddu",
        price: "₹280",
        unit: "500g",
        description: "Fine-grained pearls of gram flour fried in ghee and soaked in sugar syrup. A festive favorite.",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/3/296889557/HF/MX/EK/78941564/boondi-laddu.jpg",
        badge: "Festive",
        category: "SWEET"
    },
    {
        name: "Besan Laddu",
        price: "₹240",
        unit: "500g",
        description: "Roasted gram flour with pure desi ghee and crunchy nuts. High protein and delicious.",
        image: "https://sangamsweets.in/cdn/shop/files/BesanLadduNew.webp?v=1745229887",
        category: "SWEET"
    },
    {
        name: "Dry Fruit Laddu",
        price: "₹450",
        unit: "500g",
        description: "Nutritious traditional sweet made with a mix of premium dry fruits, nuts, and organic jaggery.",
        image: "https://aartimadan.com/wp-content/uploads/2023/10/Dry-Fruit-Ladoo.jpg",
        category: "SWEET"
    },
    {
        name: "Malai Laddu",
        price: "₹300",
        unit: "500g",
        description: "Creamy white laddoos made with fresh paneer (chhena) and thickened milk.",
        image: "https://i.ytimg.com/vi/Zd-9tVsITFg/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCvv3t_3QKYOx9TvLHgvRrrMeSo0Q",
        category: "SWEET"
    },
    {
        name: "Premium Gulab Jamun",
        price: "₹250",
        unit: "500g",
        description: "Luxurious khoya dumplings, gold-leafed and soaked in aromatic saffron-rose syrup.",
        image: "/premium_gulab_jamun_1768191563615.png",
        badge: "Royal",
        category: "SWEET"
    },
    {
        name: "Saffron Rasmalai",
        price: "₹180",
        unit: "2 pcs",
        description: "Soft cottage cheese discs immersed in thickened, saffron-infused milk and pistachios.",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/08/rasmalai-recipe.jpg",
        category: "SWEET"
    },
    {
        name: "Special Mysore Pak",
        price: "₹350",
        unit: "500g",
        description: "The legendary South Indian royal sweet made with gram flour and an abundance of pure ghee.",
        image: "https://www.anandsweets.in/cdn/shop/products/MysorePak.png?v=1742813469&width=1946",
        category: "SWEET"
    },
    {
        name: "Ukadiche Modak",
        price: "₹240",
        unit: "5 pcs",
        description: "Steamed rice flour dumplings with a sweet coconut and jaggery filling. Ganesha's favorite.",
        image: "https://t3.ftcdn.net/jpg/04/55/93/78/360_F_455937862_uI69IqonHn3I0mX1d6JvF9n3mN1YqNfT.jpg",
        category: "SWEET"
    },
    {
        name: "Peanut Chikki",
        price: "₹140",
        unit: "500g",
        description: "Crunchy traditional candy made with roasted peanuts and sugar/jaggery. A healthy snack.",
        image: "https://m.media-amazon.com/images/I/81Qxp3-lVnL._AC_UF894,1000_QL80_.jpg",
        category: "SWEET"
    },
    {
        name: "Saffron Jalebi",
        price: "₹160",
        unit: "500g",
        description: "Crispy, deep-fried spirals soaked in saffron-scented sugar syrup. Best enjoyed warm.",
        image: "https://images.halaal.recipes/04-03-18/2018-03-04-13-36-30-kQfhg.jpg",
        category: "SWEET"
    },
    {
        name: "Bengali Rasgulla",
        price: "₹150",
        unit: "6 pcs",
        description: "Spongy, snow-white spheres of fresh chhena soaked in light sugar syrup.",
        image: "https://newdilpasand.com/wp-content/uploads/2022/03/IMG_9218.jpg",
        category: "SWEET"
    },
    {
        name: "Gajar Ka Halwa",
        price: "₹300",
        unit: "500g",
        description: "Slow-cooked carrot pudding with milk, sugar, and dry fruits. A winter specialty.",
        image: "https://www.yummytummyaarthi.com/wp-content/uploads/2017/10/1-1.jpg",
        category: "SWEET"
    },
    {
        name: "Malpua with Rabri",
        price: "₹250",
        unit: "2 pcs",
        description: "Deep-fried Indian pancakes topped with a layer of thick, creamy heavenly rabri.",
        image: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/06/malpua-recipe-1.jpg",
        category: "SWEET"
    },
    {
        name: "Boondi Laddu",
        price: "₹280",
        unit: "500g",
        description: "Classic sweet made from deep-fried gram flour pearls (boondi) soaked in sugar syrup.",
        image: "https://2.bp.blogspot.com/-4IpmBaflvA0/V6hpYGxvlsI/AAAAAAAAAzU/gK9BgJZ9DCckTlXJy8sAJ14obFh958UgACLcB/s1600/boondi%2Bladoo.jpg",
        category: "SWEET"
    },
    {
        name: "Sana Boondi Laddu",
        price: "₹300",
        unit: "500g",
        description: "Delicate variation of the classic laddu made with tiny (sana) boondi pearls for a finer texture.",
        image: "https://5.imimg.com/data5/RR/JW/GLADMIN-11305752/boondi-ladu-500x500.png",
        category: "SWEET"
    },
    {
        name: "Sunnundalu",
        price: "₹320",
        unit: "500g",
        description: "Healthy and delicious Andhra specialty made with roasted urad dal and ghee.",
        image: "https://www.awesomecuisine.com/wp-content/uploads/2013/10/Sunnundalu_Urad_Dal_Ladoo.jpg",
        category: "SWEET"
    }
];

const kovaItems = [
    {
        name: "Authentic Palkova",
        price: "₹300",
        unit: "500g",
        description: "Pure milk reduced to a rich, fudgy consistency with just the right amount of sweetness.",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/07/palkova-recipe.jpg",
        badge: "Pure Milk",
        category: "KOVA"
    },
    {
        name: "Kova Puri",
        price: "₹350",
        unit: "500g",
        description: "Soft, golden-fried pastries filled with a luscious, aromatic kova (khoya) stuffing.",
        image: "https://vaya.in/recipes/wp-content/uploads/2018/02/Kova-Puri.jpg",
        category: "KOVA"
    },
    {
        name: "Kova Gujiya",
        price: "₹280",
        unit: "500g",
        description: "Classic festive dumplings filled with sweetened kova, dry fruits, and green cardamom.",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/1/EH/XY/XQ/15867160/kova-gujiya.jpg",
        category: "KOVA"
    },
    {
        name: "Dry Fruit Kova",
        price: "₹380",
        unit: "500g",
        description: "Rich kova base blended with premium finely chopped almonds, cashews, and pistachios.",
        image: "https://5.imimg.com/data5/SELLER/Default/2023/1/NR/XN/OM/15867160/dry-fruit-khoya.jpg",
        category: "KOVA"
    },
    {
        name: "Malai Cham Cham",
        price: "₹220",
        unit: "6 pcs",
        description: "Traditional Bengali sweet made from fresh paneer, colored and filled with flavored kova.",
        image: "https://newdilpasand.com/wp-content/uploads/2022/03/Cham-Cham.jpg",
        category: "KOVA"
    }
];

const hotItems = [
    {
        name: "Special Spicy Mixture",
        price: "₹180",
        unit: "500g",
        description: "A crunchy blend of gram flour noodles, peanuts, and fried lentils with spicy seasoning.",
        image: "https://m.media-amazon.com/images/I/81Qxp3-lVnL._AC_UF894,1000_QL80_.jpg",
        badge: "Best Seller",
        category: "HOT"
    },
    {
        name: "Butter Murukulu",
        price: "₹160",
        unit: "500g",
        description: "Traditional crunchy spirals made with rice flour and a touch of fresh butter.",
        image: "https://m.media-amazon.com/images/I/71uV2qT471L._AC_UF1000,1000_QL80_.jpg",
        category: "HOT"
    },
    {
        name: "Pappu Chekkalu",
        price: "₹170",
        unit: "500g",
        description: "Crispy rice crackers embedded with chana dal, curry leaves, and green chilies.",
        image: "https://pushmycart.in/cdn/shop/files/maxresdefault_30b29a6d-7eae-4d69-a4be-20a73646f62d.jpg?v=1726814001&width=1445",
        category: "HOT"
    },
    {
        name: "Kara Boondi",
        price: "₹150",
        unit: "500g",
        description: "Deep-fried gram flour pearls tossed with cashews, curry leaves, and red chili powder.",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/10/kara-boondi-recipe.jpg",
        category: "HOT"
    },
    {
        name: "Hot Samosa",
        price: "₹80",
        unit: "4 pcs",
        description: "Crispy triangular pastries filled with spiced potato and pea filling.",
        image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2019/11/samosa-recipe.jpg",
        category: "HOT"
    },
    {
        name: "Onion Pakoda",
        price: "₹120",
        unit: "500g",
        description: "Crispy, deep-fried onion fritters seasoned with turmeric and green chilies.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP__sYm6NlQXCLMb_5BdYmikVyrE6IBhqE3g&s",
        category: "HOT"
    },
    {
        name: "Classic Boondi",
        price: "₹140",
        unit: "500g",
        description: "Crispy salted boondi pearls, perfect for snacking.",
        image: "https://3.bp.blogspot.com/-RhkgH7ls3Kg/UJ0-5GUBxkI/AAAAAAAAWfQ/PvhAHApiciE/w1200-h630-p-k-no-nu/DSC_0063.jpg",
        category: "HOT"
    },
    {
        name: "Karapusa",
        price: "₹160",
        unit: "500g",
        description: "Spicy and crunchy sev strings made from gram flour, a perfect teatime snack.",
        image: "https://www.vjmfoods.com/wp-content/uploads/2023/08/Vampusa.jpg",
        category: "HOT"
    },
    {
        name: "Chegodilu",
        price: "₹180",
        unit: "500g",
        description: "Golden ring-shaped crackers made with rice flour and sesame seeds. Irresistibly crunchy.",
        image: "https://vismaifood.com/storage/app/uploads/public/bc2/99a/743/thumb__700_0_0_0_auto.jpg",
        category: "HOT"
    }
];

const allItems = [...sweetItems, ...kovaItems, ...hotItems];

const seed = async () => {
    try {
        await connectDB();

        // Clear existing products
        await Product.deleteMany({});
        console.log('Cleared existing products.');

        const productsToInsert = allItems.map(item => {
            const priceInt = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
            return {
                name: item.name,
                slug: item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                price: priceInt,
                unit: item.unit,
                description: item.description,
                image: item.image,
                badge: item.badge || null,
                category: item.category,
                stockStatus: 'IN_STOCK'
            };
        });

        await Product.insertMany(productsToInsert);
        console.log(`Seeded ${productsToInsert.length} products.`);
        process.exit();
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seed();
