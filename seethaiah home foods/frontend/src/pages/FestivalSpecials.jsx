import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Package, Truck, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const seasonalCollections = [
  {
    title: 'Diwali Hampers',
    badge: 'Diwali',
    description: 'Curated sweets, savory bites and ritual treats wrapped in handcrafted packaging.',
    price: 'From ₹2,950',
    image: 'https://images.unsplash.com/photo-1543478232-3f8db1673a9f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Sankranti Specials',
    badge: 'Sankranti',
    description: 'Seasonal goodness with sesame sweets, warm jaggery and thoughtful gifting boxes.',
    price: 'From ₹2,300',
    image: 'https://images.unsplash.com/photo-1547592180-2b70ab615692?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Ugadi Boxes',
    badge: 'Ugadi',
    description: 'A poetic assemblage of fragrant sweets, savory specials and festive memories.',
    price: 'From ₹2,650',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Wedding Sweet Collections',
    badge: 'Wedding',
    description: 'Regal assortments for grand weddings, bespoke for families and honored guests.',
    price: 'From ₹4,200',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Corporate Gifting',
    badge: 'Corporate',
    description: 'Premium gifting stories for partners, clients and festive team appreciation.',
    price: 'From ₹3,800',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80'
  }
];

const festivalHampers = [
  {
    title: 'Golden Diya Hamper',
    description: 'Handcrafted mithai, saffron ladoo and luxe dry fruit jars for a luminous Diwali table.',
    price: '₹3,450',
    badge: 'Premium Hamper',
    image: 'https://images.unsplash.com/photo-1604908177522-8f2c9cf64576?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Heritage Pooja Attar',
    description: 'Traditional sweets with fragrant attar candles and rich ritual essentials.',
    price: '₹2,880',
    badge: 'Sacred',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc2?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Silver Jubilee Box',
    description: 'A graceful collection of handcrafted sweets, premium nuts and artisanal gifting accessories.',
    price: '₹4,750',
    badge: 'Luxury',
    image: 'https://images.unsplash.com/photo-1510278430007-5d66fc1a7ba9?auto=format&fit=crop&w=1200&q=80'
  }
];

const giftBoxes = [
  {
    title: 'Signature Gift Box',
    copy: 'Twelve handcrafted sweets with a luxe finishing touch and elegant gold foil packaging.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Artisan Chocolate Sweets',
    copy: 'Soft cocoa-infused treats blended with almond and cardamom for a modern celebration.',
    image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=1200&q=80'
  }
];

const sweetsShowcase = [
  {
    title: 'Saffron Ladoo',
    description: 'Velvety laddoos scented with premium kesar and toasted nuts.',
    image: 'https://images.unsplash.com/photo-1516685018646-5494e98c52e5?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Pistachio Barfi',
    description: 'Creamy barfis finished with delicate silver leaf and hand-cut pistachio shards.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Rose Petal Kaju',
    description: 'Textured cashew sweets kissed with rose essence and elegant spices.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1200&q=80'
  }
];

const faqItems = [
  {
    question: 'Can gifts be personalized for each recipient?',
    answer: 'Yes — every hamper can be tailored with custom notes, packaging and curated assortments for your celebration.'
  },
  {
    question: 'How long does fresh delivery take?',
    answer: 'We dispatch same-day for metro cities and 24–48 hours for regional locations with climate-safe packaging.'
  },
  {
    question: 'Are your sweets prepared using traditional recipes?',
    answer: 'Each recipe is rooted in heritage kitchens and handmade in small batches to preserve authenticity.'
  }
];

const deliveryPromises = [
  {
    icon: <Truck size={22} />,
    title: 'Temperature-Safe Delivery',
    copy: 'Climate-controlled packaging to keep every sweet fresh and beautifully intact.'
  },
  {
    icon: <ShieldCheck size={22} />,
    title: 'Handmade Quality',
    copy: 'Every order is assembled by hand with premium ingredients and artisan care.'
  },
  {
    icon: <Package size={22} />,
    title: 'Luxury Presentation',
    copy: 'Gift boxes arrive carefully wrapped with gold embossing, ribbon and festive detail.'
  }
];

const FestivalSpecials = () => {
  return (
    <div className="festival-page">
      <section className="festival-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span className="hero-badge">Made for the Festival Table</span>
            <h1 className="serif">A Luxury <span className="text-gold">Festive</span> Table Awaits</h1>
            <p className="hero-subtitle">Seasonal collections and handcrafted stories designed for Indian celebrations, gifting rituals and intimate festive moments.</p>
            <div className="hero-actions">
              <Link to="#collections" className="btn btn-primary">Explore Collections</Link>
              <Link to="/menu" className="btn btn-outline">View Menu</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="festival-section" id="collections">
        <div className="section-header">
          <span className="hero-tagline">Seasonal Collections</span>
          <h2 className="serif">Signature Editions for Every Ritual</h2>
          <p className="section-note">From Diwali luminosity to Sankranti warmth, each collection blends artisan sweets, premium accents and festive storytelling.</p>
        </div>

        <div className="festival-grid">
          {seasonalCollections.map((item, index) => (
            <motion.article
              key={item.title}
              className="festival-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="festival-card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="festival-card-body">
                <span className="festival-card-tag">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="festival-card-footer">
                  <span className="festival-price">{item.price}</span>
                  <Link to="/menu" className="btn btn-primary">Shop Now</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="festival-section festival-hampers">
        <div className="section-header">
          <span className="hero-tagline">Festival Hampers</span>
          <h2 className="serif">Curated Hamper Stories</h2>
          <p className="section-note">Warm, rich and beautifully composed hampers for gifting, poojas and family celebrations.</p>
        </div>

        <div className="hampers-grid">
          {festivalHampers.map((item, index) => (
            <motion.article
              key={item.title}
              className="festival-card premium-card"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.12 }}
            >
              <div className="festival-card-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="festival-card-body">
                <span className="festival-card-tag">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="festival-card-footer">
                  <span className="festival-price">{item.price}</span>
                  <Link to="/menu" className="btn btn-outline">Discover</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="festival-section giftbox-section">
        <div className="section-header">
          <span className="hero-tagline">Premium Gift Boxes</span>
          <h2 className="serif">Handcrafted Boxes with Soul</h2>
          <p className="section-note">Elegant gift boxes designed for sharing warmth, gratitude and luxurious celebration.</p>
        </div>

        <div className="gift-grid">
          {giftBoxes.map((item, index) => (
            <motion.div
              key={item.title}
              className="gift-panel"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="gift-panel-media">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="gift-panel-copy">
                <span className="festival-card-tag">Gift Box</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <Link to="/menu" className="btn btn-primary">Select Box</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="festival-section sweets-showcase">
        <div className="section-header">
          <span className="hero-tagline">Traditional Sweets</span>
          <h2 className="serif">Timeless Flavours, Modern Presentation</h2>
          <p className="section-note">Experience heritage recipes with a handcrafted touch, crafted for warm welcoming moments.</p>
        </div>

        <div className="showcase-grid">
          {sweetsShowcase.map(item => (
            <motion.div
              key={item.title}
              className="showcase-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="showcase-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="showcase-copy">
                <span className="festival-card-tag">{item.title}</span>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="festival-section story-section">
        <div className="story-grid">
          <motion.div
            className="story-copy"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="hero-tagline">Festive Storytelling</span>
            <h2 className="serif">Heritage Recipes, Grandmother Traditions</h2>
            <p>Every recipe is born from festive kitchens, where handcrafted preparation and rituals blossom into gifts of warmth. We honour the slow craft of Indian sweets, the ritual of sharing, and the ceremony behind every presentation.</p>
            <ul className="story-list">
              <li>Heritage recipes passed down through family kitchens.</li>
              <li>Crafted with traditional spices, saffron and warm jaggery.</li>
              <li>Beautifully wrapped to celebrate gifting culture and rituals.</li>
            </ul>
          </motion.div>
          <motion.div
            className="story-image"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img src="https://images.unsplash.com/photo-1517059224940-d4af9eec41e8?auto=format&fit=crop&w=1200&q=80" alt="Handcrafted sweets story" />
          </motion.div>
        </div>
      </section>

      <section className="celebration-cta">
        <div className="container cta-content">
          <div>
            <span className="hero-tagline">Celebrate with Presence</span>
            <h2 className="serif">A Celebration Crafted with Warmth</h2>
            <p>Choose premium gifting that feels personal, festive and beautifully composed. Bring warmth to every table with a curated expression of story and luxury.</p>
          </div>
          <Link to="/menu" className="btn btn-primary btn-cta">Shop the Festival Edit</Link>
        </div>
      </section>

      <section className="festival-section faq-section">
        <div className="container">
          <div className="faq-grid">
            <div>
              <span className="hero-tagline">FAQ</span>
              <h2 className="serif">Festival Questions Answered</h2>
              <div className="faq-list">
                {faqItems.map(item => (
                  <article key={item.question} className="faq-item">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
            <div>
              <span className="hero-tagline">Delivery Promise</span>
              <h2 className="serif">Every Order Arrives Luxe</h2>
              <div className="promise-grid">
                {deliveryPromises.map(item => (
                  <div key={item.title} className="promise-card">
                    <div className="promise-icon">{item.icon}</div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FestivalSpecials;
