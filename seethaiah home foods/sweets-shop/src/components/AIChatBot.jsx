import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

// ── Festival Calendar (approximate Gregorian ranges) ────────────────────────
const FESTIVALS = [
  { name: 'Makar Sankranti', emoji: '🪁', discount: '15%', code: 'SANKRANTI15', from: [1,13], to: [1,16], note: 'Celebrate the harvest festival!' },
  { name: 'Holi',            emoji: '🎨', discount: '12%', code: 'HOLI12',      from: [3, 5], to: [3,15], note: 'Colours of celebration!' },
  { name: 'Ugadi',           emoji: '🌸', discount: '15%', code: 'UGADI15',     from: [3,20], to: [4,15], note: 'Happy Telugu New Year!' },
  { name: 'Ganesh Chaturthi',emoji: '🐘', discount: '15%', code: 'GANESH15',    from: [8,22], to: [9,12], note: 'Ganpati Bappa Morya!' },
  { name: 'Navratri & Dasara',emoji:'🏹',discount: '15%', code: 'DASARA15',    from: [9,25], to: [10,25],note: 'Victory of good over evil!' },
  { name: 'Diwali',          emoji: '🪔', discount: '20%', code: 'DIWALI20',    from: [10,26],to: [11,14],note: 'Festival of lights – our biggest sale!' },
  { name: 'Christmas',       emoji: '🎄', discount: '12%', code: 'XMAS12',      from: [12,23],to: [12,27],note: 'Merry Christmas from our family to yours!' },
  { name: 'New Year',        emoji: '🎉', discount: '15%', code: 'NEWYEAR15',   from: [12,29],to: [1, 3], note: 'Ring in the New Year with our sweets!' },
];

/**
 * Returns the currently active festival object, or null if none.
 * Handles year-wrap (e.g. New Year spans Dec→Jan).
 */
function getCurrentFestival() {
  const now = new Date();
  const m = now.getMonth() + 1; // 1-12
  const d = now.getDate();
  const curr = m * 100 + d;

  for (const f of FESTIVALS) {
    const start = f.from[0] * 100 + f.from[1];
    const end   = f.to[0]   * 100 + f.to[1];
    if (start <= end) {
      if (curr >= start && curr <= end) return f;
    } else {
      // Wraps across year boundary (e.g. Dec 29 → Jan 3)
      if (curr >= start || curr <= end) return f;
    }
  }
  return null;
}

/** Next upcoming festival (for out-of-season message) */
function getNextFestival() {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const curr = m * 100 + d;

  // Find first festival whose start is after today (same year)
  for (const f of FESTIVALS) {
    const start = f.from[0] * 100 + f.from[1];
    if (start > curr) return f;
  }
  // Wrap to first festival of next year
  return FESTIVALS[0];
}

function getFestivalResponse() {
  const active = getCurrentFestival();
  if (active) {
    return (
      `${active.emoji} **${active.name} Special is LIVE!**\n\n` +
      `${active.note}\n\n` +
      `🎁 **Exclusive Festival Offers:**\n` +
      `• **${active.discount} OFF** on all orders – use code **${active.code}**\n` +
      `• Premium gift boxes with festive packaging\n` +
      `• Bulk orders (5 kg+): extra 5% stacked discount\n` +
      `• Free delivery on orders above ₹500\n\n` +
      `⚠️ Festival orders fill up fast – place yours **at least 3 days in advance**!\n\n` +
      `📞 For large or custom orders: **+91 99517 34437**`
    );
  }

  const next = getNextFestival();
  return (
    `📅 **No Festival Season Right Now**\n\n` +
    `There's no active festival sale at the moment, but don't worry – great deals are coming soon!\n\n` +
    `🔔 **Next Up: ${next.emoji} ${next.name}**\n` +
    `Watch this space for **${next.discount} off** and exclusive gift packs.\n\n` +
    `**Year-round specials:**\n` +
    `• 🎁 Wedding & event orders – custom quantities\n` +
    `• 🏢 Corporate gifting – branded packaging\n` +
    `• 📦 Bulk orders (5 kg+): **10% off** always\n` +
    `• 🆕 First order: use code **WELCOME10**\n\n` +
    `📞 For bulk/custom orders: **+91 99517 34437**`
  );
}

// ── Knowledge Base ────────────────────────────────────────────────────────────
const knowledgeBase = [
  // Greetings
  {
    patterns: ['hello', 'hi', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'helo'],
    answer: "🙏 Namaste! Welcome to **Seethaiah Home Foods**! I'm your personal food assistant. I can help you with:\n\n• 🍬 Our product range & prices\n• 🚚 Delivery & shipping info\n• 📦 Order tracking\n• 🧑‍🍳 Ingredients & preparation\n• 📞 Contact & location details\n\nWhat would you like to know?",
  },
  // Products & Menu
  {
    patterns: ['product', 'menu', 'items', 'what do you sell', 'food', 'sweets', 'what you have', 'available'],
    answer: "🍯 **Our Signature Delicacies:**\n\n**Traditional Sweets**\n• Kaju Katli – ₹599/250g\n• Motichoor Ladoo – ₹349/250g\n• Mysore Pak – ₹449/250g\n\n**Savouries & Snacks**\n• Murukku – ₹299/500g\n• Chakli – ₹249/500g\n• Mixture – ₹199/250g\n\n**Pickles & Preserves**\n• Mango Avakaya – ₹399/500g\n• Gongura Pachadi – ₹349/500g\n\nVisit our **Menu** page for the full catalogue! 😊",
  },
  // Price
  {
    patterns: ['price', 'cost', 'rate', 'how much', 'rupee', 'rs', '₹', 'expensive', 'cheap', 'affordable'],
    answer: "💰 **Pricing at Seethaiah Home Foods:**\n\nOur products are priced between **₹199 – ₹799** depending on the item and quantity.\n\n🎁 We offer special discounts on:\n• Bulk orders (5 kg+): **10% off**\n• Festival packs: **15% off**\n• First-time orders: Use code **WELCOME10** for 10% off!\n\nAll prices are inclusive of packaging. Shipping is free above ₹500. 🚀",
  },
  // Delivery & Shipping
  {
    patterns: ['delivery', 'shipping', 'ship', 'courier', 'how long', 'when will i get', 'dispatch', 'arrive', 'track'],
    answer: "🚚 **Delivery Information:**\n\n• **Local (Kaikalur & nearby):** Same day or next day\n• **Andhra Pradesh:** 2–3 business days\n• **Pan India:** 3–5 business days\n\n📦 Orders are packed fresh and dispatched within **24 hours** of confirmation.\n\n🆓 **Free shipping** on orders above ₹500!\n\nYou can track your order using the **Track Order** page on our website. 🔍",
  },
  // Ingredients / Homemade
  {
    patterns: ['ingredient', 'homemade', 'fresh', 'natural', 'artificial', 'preservative', 'healthy', 'pure', 'ghee'],
    answer: "🌿 **Quality Promise:**\n\nAll Seethaiah Home Foods products are:\n\n✅ Made with **pure desi ghee**\n✅ **No artificial colours** or flavours\n✅ **No preservatives** – 100% natural\n✅ Prepared in a **hygienic home kitchen**\n✅ Recipes passed down through **generations**\n\nWe source the finest ingredients directly from local farmers in Kaikalur, Andhra Pradesh. 🙏",
  },
  // Order Placement
  {
    patterns: ['order', 'buy', 'purchase', 'how to order', 'place order', 'add to cart', 'checkout'],
    answer: "🛒 **How to Place an Order:**\n\n1. Browse our **Menu** page\n2. Click **Add to Cart** on your favourite items\n3. Go to **Cart** and review your order\n4. Click **Checkout** & fill in delivery details\n5. Choose payment method & confirm!\n\n💳 We accept:\n• UPI (GPay, PhonePe, Paytm)\n• Net Banking\n• Credit / Debit Cards\n• Cash on Delivery (local areas)\n\nNeed help? Just ask! 😊",
  },
  // Location & Contact
  {
    patterns: ['location', 'address', 'where', 'kaikalur', 'andhra', 'contact', 'phone', 'call', 'reach', 'number'],
    answer: "📍 **Find Us:**\n\n**Seethaiah Home Foods**\nKaikalur, Krishna District\nAndhra Pradesh – 521333\n\n📞 **Phone:** +91 99517 34437\n📧 **Email:** seethaiahhomefoods@gmail.com\n\n⏰ **Available:** Mon–Sat, 9 AM – 7 PM\n\nYou can also visit our **About** page for more details! 🗺️",
  },
  // Festival / Special Orders – handled dynamically by getFestivalResponse()
  {
    patterns: ['festival', 'diwali', 'ugadi', 'sankranti', 'holi', 'ganesh', 'navratri', 'dasara', 'christmas', 'new year', 'special', 'gift', 'bulk', 'wedding', 'event', 'occasion', 'custom', 'offer', 'discount', 'sale'],
    answer: '__FESTIVAL__',   // sentinel replaced at runtime
  },
  // Payment
  {
    patterns: ['payment', 'pay', 'upi', 'card', 'cod', 'cash', 'gpay', 'phonepe', 'paytm', 'online'],
    answer: "💳 **Payment Options:**\n\nWe accept all major payment methods:\n\n• 📱 **UPI** – Google Pay, PhonePe, Paytm\n• 💳 **Cards** – Visa, Mastercard, RuPay\n• 🏦 **Net Banking**\n• 💵 **Cash on Delivery** (within Kaikalur & nearby areas)\n\nAll online transactions are **100% secure & encrypted**. 🔒",
  },
  // Return / Refund
  {
    patterns: ['return', 'refund', 'exchange', 'replace', 'damaged', 'wrong order', 'complaint', 'issue', 'problem'],
    answer: "🔄 **Returns & Refunds:**\n\nYour satisfaction is our priority!\n\n✅ **Damaged or wrong item?** – Contact us within **24 hours** of delivery\n✅ We'll arrange a **free replacement or full refund**\n✅ Fresh products cannot be returned due to perishable nature\n\n📞 Call us at **+91 99517 34437** or email **seethaiahhomefoods@gmail.com** with your order ID and photo.\n\nWe promise to resolve every issue quickly! 🙏",
  },
  // About the brand
  {
    patterns: ['about', 'story', 'history', 'who', 'brand', 'family', 'founder', 'seethaiah', 'legacy'],
    answer: "🏡 **Our Story:**\n\n**Seethaiah Home Foods** was born from a grandmother's kitchen in the heart of **Kaikalur, Andhra Pradesh**.\n\nFor over **3 generations**, our family has crafted traditional Telugu sweets and savouries using time-honoured recipes with pure, natural ingredients.\n\nWhat started as sharing food with neighbours has grown into a beloved home brand, delivering the authentic taste of home across India. 🇮🇳\n\n*\"Every bite carries the love of a mother's kitchen.\"* 🧡",
  },
  // Shelf life / Storage
  {
    patterns: ['shelf life', 'expiry', 'expire', 'last', 'store', 'storage', 'how long', 'best before', 'days'],
    answer: "🗓️ **Shelf Life & Storage:**\n\n| Product | Shelf Life |\n|---------|------------|\n| Dry Sweets (Kaju Katli, Barfi) | 15–20 days |\n| Ladoos | 10–15 days |\n| Murukku / Chakli | 20–30 days |\n| Pickles | 3–6 months |\n\n📌 **Storage Tips:**\n• Store in a cool, dry place\n• Keep away from direct sunlight\n• Refrigerate pickles after opening\n• Use clean, dry spoons",
  },
  // Thank you
  {
    patterns: ['thank', 'thanks', 'thank you', 'thx', 'tysm', 'great', 'awesome', 'perfect', 'helpful'],
    answer: "🙏 You're most welcome! We're so glad we could help!\n\nDon't hesitate to reach out anytime. Enjoy your shopping at **Seethaiah Home Foods**! 🍬\n\n*Happy eating & happy ordering!* 😊",
  },
];

const SUGGESTED_QUESTIONS = [
  "What sweets do you sell?",
  "How much does delivery cost?",
  "Are your products homemade?",
  "How can I place an order?",
];

function getBotResponse(input) {
  const lower = input.toLowerCase().trim();
  if (!lower) return null;

  for (const entry of knowledgeBase) {
    if (entry.patterns.some((p) => lower.includes(p))) {
      // Dynamic festival response
      if (entry.answer === '__FESTIVAL__') return getFestivalResponse();
      return entry.answer;
    }
  }

  return "🤔 I didn't quite catch that! Could you rephrase?\n\nOr try asking about:\n• **Products & menu**\n• **Delivery & shipping**\n• **How to order**\n• **Contact & location**\n• **Festival offers & discounts**";
}

// Renders markdown-like bold (**text**) and line breaks
function MessageBubble({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span style={{ whiteSpace: 'pre-wrap' }}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
}

export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'bot',
      text: "🙏 Namaste! I'm **Seethaiah AI** – your personal food assistant!\n\nAsk me anything about our sweets, delivery, orders, or ingredients. I'm here to help! 🍬",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const interval = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(interval);
  }, []);

  function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');

    const userMsg = { id: Date.now(), from: 'user', text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(msg);
      const botMsg = { id: Date.now() + 1, from: 'bot', text: response };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 900 + Math.random() * 600);
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      <button
        id="ai-chat-toggle"
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #800000 0%, #A00000 60%, #D4AF37 100%)',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(128,0,0,0.45)',
          zIndex: 9999,
          transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transform: open ? 'scale(0.92) rotate(15deg)' : 'scale(1)',
        }}
        aria-label="Open AI Chat"
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}

        {/* Pulse ring when closed */}
        {!open && (
          <span style={{
            position: 'absolute',
            inset: '-4px',
            borderRadius: '50%',
            border: '2px solid rgba(212,175,55,0.6)',
            animation: 'chatPulse 2s ease-in-out infinite',
          }} />
        )}

        {/* Unread dot */}
        {!open && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '14px',
            height: '14px',
            background: '#D4AF37',
            borderRadius: '50%',
            border: '2px solid white',
            fontSize: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#800000',
            fontWeight: '900',
          }}>✦</span>
        )}
      </button>

      {/* ── Chat Panel ── */}
      <div style={{
        position: 'fixed',
        bottom: '108px',
        right: '30px',
        width: '370px',
        maxHeight: '540px',
        background: '#fff',
        borderRadius: '24px',
        boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(212,175,55,0.15)',
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        pointerEvents: open ? 'all' : 'none',
        transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #800000 0%, #A00000 100%)',
          padding: '1.2rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.25) 0%, transparent 60%)',
          }} />
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4AF37, #F4DF4E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            position: 'relative',
          }}>
            <Bot size={22} color="#800000" />
            <span style={{
              position: 'absolute', bottom: '2px', right: '2px',
              width: '10px', height: '10px', background: '#4CAF50',
              borderRadius: '50%', border: '2px solid white',
            }} />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              color: 'white', fontWeight: '700', fontSize: '1rem',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              Seethaiah AI <Sparkles size={14} color="#D4AF37" />
            </div>
            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', marginTop: '1px' }}>
              Your personal food assistant • Online
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          background: '#FFFBF5',
        }}>
          {messages.map((m) => (
            <div key={m.id} style={{
              display: 'flex',
              flexDirection: m.from === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: '8px',
            }}>
              {/* Avatar */}
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                background: m.from === 'bot'
                  ? 'linear-gradient(135deg, #800000, #D4AF37)'
                  : 'linear-gradient(135deg, #D4AF37, #F4DF4E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}>
                {m.from === 'bot'
                  ? <Bot size={15} color="white" />
                  : <User size={15} color="#800000" />}
              </div>

              {/* Bubble */}
              <div style={{
                maxWidth: '78%',
                background: m.from === 'bot' ? 'white' : 'linear-gradient(135deg, #800000, #A00000)',
                color: m.from === 'bot' ? '#1A1A1A' : 'white',
                padding: '10px 14px',
                borderRadius: m.from === 'bot' ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
                fontSize: '0.88rem',
                lineHeight: '1.6',
                boxShadow: m.from === 'bot'
                  ? '0 2px 12px rgba(0,0,0,0.06)'
                  : '0 4px 15px rgba(128,0,0,0.3)',
                border: m.from === 'bot' ? '1px solid rgba(212,175,55,0.12)' : 'none',
              }}>
                <MessageBubble text={m.text} />
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #800000, #D4AF37)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bot size={15} color="white" />
              </div>
              <div style={{
                background: 'white', padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid rgba(212,175,55,0.12)',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: '#D4AF37',
                    animation: `typingDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                    display: 'inline-block',
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Suggested questions (only at start) */}
          {messages.length === 1 && !isTyping && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginTop: '8px' }}>
              <p style={{ fontSize: '0.75rem', color: '#999', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Quick Questions
              </p>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button key={q} onClick={() => sendMessage(q)} style={{
                  background: 'white',
                  border: '1px solid rgba(212,175,55,0.35)',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  color: '#800000',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                }}>
                  💬 {q}
                </button>
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div style={{
          padding: '1rem 1.2rem',
          borderTop: '1px solid rgba(212,175,55,0.15)',
          background: 'white',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}>
          <input
            id="ai-chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about sweets, delivery..."
            style={{
              flex: 1,
              padding: '10px 15px',
              borderRadius: '20px',
              border: '1.5px solid rgba(212,175,55,0.3)',
              fontSize: '0.88rem',
              outline: 'none',
              background: '#FFFBF5',
              color: '#1A1A1A',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#D4AF37'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(212,175,55,0.3)'}
          />
          <button
            id="ai-chat-send"
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            style={{
              width: '42px', height: '42px', borderRadius: '50%',
              background: input.trim()
                ? 'linear-gradient(135deg, #800000, #A00000)'
                : '#eee',
              border: 'none',
              color: input.trim() ? 'white' : '#ccc',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.25s',
              flexShrink: 0,
              boxShadow: input.trim() ? '0 4px 12px rgba(128,0,0,0.3)' : 'none',
            }}
          >
            <Send size={17} />
          </button>
        </div>

        {/* Branding footer */}
        <div style={{
          textAlign: 'center', padding: '6px',
          fontSize: '0.7rem', color: '#bbb',
          background: 'white',
          borderTop: '1px solid #f5f5f5',
        }}>
          ✦ Powered by Seethaiah Home Foods AI
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes chatPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.18); opacity: 0; }
        }
        @keyframes typingDot {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
