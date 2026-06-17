import React, { useState } from 'react';
import { X, MapPin, CreditCard, ShoppingBag, Loader2 } from 'lucide-react';

export default function CheckoutModal({ isOpen, onClose, cart, menuItems, locations, payments, onPlaceOrder }) {
  const [selectedLoc, setSelectedLoc] = useState(locations[0]?.id || 1);
  const [selectedPay, setSelectedPay] = useState(payments[0]?.id || 1);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // Calculate cart details
  const cartItems = Object.entries(cart).map(([id, qty]) => {
    const item = menuItems.find(i => i.id === +id);
    return item ? { ...item, qty } : null;
  }).filter(Boolean);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const deliveryFee = 0.00;
  const platformFee = 0.00;
  const total = subtotal + deliveryFee + platformFee;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const locObj = locations.find(l => l.id === selectedLoc) || locations[0];
      const payObj = payments.find(p => p.id === selectedPay) || payments[0];
      onPlaceOrder({
        location: locObj,
        payment: payObj,
        total: total
      });
      onClose();
    }, 1500); // Dynamic checkout loading simulation
  };

  return (
    <div className="desktop-modal-overlay" onClick={onClose}>
      <div className="desktop-modal-box" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header-desk">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} color="#FF6B35" />
            <h3 className="modal-title-desk">Checkout Details</h3>
          </div>
          <button className="modal-close-btn-desk" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body-desk hs" style={{ overflowY: 'auto', maxHeight: '78vh' }}>
          {/* Order Summary */}
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1A2A3A', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>Items Summary</h4>
            <div style={{ background: '#F7F9FC', borderRadius: 12, padding: '14px 18px', border: '1px solid #E0E6ED' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 }}>
                  <span style={{ color: '#64748B' }}>{item.emoji} {item.name} <strong style={{ color: '#1A2A3A' }}>× {item.qty}</strong></span>
                  <span style={{ fontWeight: 600, color: '#1A2A3A' }}>RM {(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Spot Selection */}
          <div style={{ marginBottom: 20 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1A2A3A', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>Select Delivery Spot</h4>
            <div>
              {locations.map(loc => (
                <div 
                  key={loc.id} 
                  className={`location-select-card ${selectedLoc === loc.id ? 'active' : ''}`}
                  onClick={() => setSelectedLoc(loc.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18 }}>{loc.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1A2A3A' }}>{loc.name}</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{loc.detail}</div>
                    </div>
                  </div>
                  <div className="card-radio-circle">
                    <div className="card-radio-dot" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Selection */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, color: '#1A2A3A', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 12 }}>Select Payment Method</h4>
            <div>
              {payments.map(pay => (
                <div 
                  key={pay.id} 
                  className={`payment-select-card ${selectedPay === pay.id ? 'active' : ''}`}
                  onClick={() => setSelectedPay(pay.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18 }}>{pay.icon}</span>
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1A2A3A' }}>{pay.name}</div>
                      <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>{pay.detail}</div>
                    </div>
                  </div>
                  <div className="card-radio-circle">
                    <div className="card-radio-dot" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bill breakdown */}
          <div style={{ background: '#F7F9FC', padding: '16px 20px', borderRadius: 14, borderTop: '1px solid #E0E6ED', marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#64748B' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: '#1A2A3A' }}>RM {subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, color: '#64748B' }}>
              <span>Delivery Fee</span>
              <span style={{ fontWeight: 600, color: '#22C55E' }}>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13, color: '#64748B' }}>
              <span>Platform Fee</span>
              <span style={{ fontWeight: 600, color: '#1A2A3A' }}>RM 0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #E0E6ED', paddingTop: 12, marginTop: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: '#1A2A3A' }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#FF6B35' }}>RM {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action button */}
          <button 
            className="btn-primary" 
            onClick={handleCheckout} 
            disabled={loading || cartItems.length === 0}
            style={{ 
              width: '100%', 
              height: 52, 
              background: '#FF6B35', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 12, 
              fontSize: 15, 
              fontWeight: 700, 
              cursor: loading ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="spin-animation" style={{ animation: 'spin 1s linear infinite' }} />
                Verifying Payment...
              </>
            ) : (
              `Pay & Place Order · RM ${total.toFixed(2)}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
