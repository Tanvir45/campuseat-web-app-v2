import React, { useState, useEffect } from 'react';
import { Phone, Check, ShieldCheck, MapPin, Navigation } from 'lucide-react';

export default function TrackingPage({ activeOrder, advanceOrderStep, completeOrder }) {
  const [driverPos, setDriverPos] = useState({ x: 109, y: 65 }); // Step 2 Picked Up coordinate

  const steps = [
    { title: "Order Confirmed", desc: "Warung Pak Din received your order" },
    { title: "Being Prepared", desc: "Your order is cooked fresh" },
    { title: "Picked Up", desc: "Ali is heading your way!" },
    { title: "Arriving Soon", desc: "Approaching delivery spot" }
  ];

  useEffect(() => {
    if (!activeOrder) return;

    // Set initial driver position based on step
    if (activeOrder.currentStep <= 1) {
      setDriverPos({ x: 45, y: 37.5 });
    } else if (activeOrder.currentStep === 2) {
      setDriverPos({ x: 109, y: 65 });
    } else if (activeOrder.currentStep === 3) {
      setDriverPos({ x: 230, y: 93 });
    }

    // Auto-advance simulation after 4 seconds
    if (activeOrder.currentStep === 2) {
      const timer = setTimeout(() => {
        advanceOrderStep(3);
        setDriverPos({ x: 230, y: 93 });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [activeOrder?.currentStep, activeOrder]);

  if (!activeOrder) {
    return (
      <div style={{ minHeight: 'calc(100vh - 68px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F9FC' }} className="pg">
        <div style={{ background: '#fff', borderRadius: 20, padding: '48px 32px', textAlign: 'center', maxWidth: 440, border: '1px solid #E0E6ED', boxShadow: '0 4px 20px rgba(26,42,58,0.07)' }}>
          <span style={{ fontSize: 54 }}>📍</span>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: '16px 0 8px', color: '#1A2A3A' }}>No Active Orders</h3>
          <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, marginBottom: 24 }}>You don't have any orders actively in progress at the moment.</p>
        </div>
      </div>
    );
  }

  const currentStep = activeOrder.currentStep;
  const eta = currentStep === 3 ? 2 : (currentStep === 2 ? 8 : (currentStep === 1 ? 14 : 20));

  return (
    <div className="pg" style={{ minHeight: 'calc(100vh - 68px)', background: '#F7F9FC', paddingTop: 32, paddingBottom: 48 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        
        {/* Tracking Header Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Navigation size={22} color="#FF6B35" />
              <h2 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 24, color: '#1A2A3A' }}>Live Delivery Tracking</h2>
            </div>
            <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>Order Reference ID: <strong style={{ color: '#1A2A3A' }}>{activeOrder.id}</strong></p>
          </div>
          <div style={{ background: 'rgba(34,197,94,0.12)', padding: '6px 14px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#22C55E', animation: 'blinkDot 1.2s infinite' }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#22C55E', textTransform: 'uppercase' }}>Ali is Active</span>
          </div>
        </div>

        {/* Desktop Split Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 500px', gap: 32, alignItems: 'start' }}>
          
          {/* LEFT COLUMN: Info, Timeline, and Receipt */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            
            {/* ETA Details Block */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E0E6ED', padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(26,42,58,0.07)' }}>
              <div>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Estimated Arrival</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: '#FF6B35', fontFamily: 'Poppins, sans-serif' }}>{eta}</span>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#FF6B35' }}>minutes</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>Drop-off Point</span>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1A2A3A', marginTop: 4 }}>{activeOrder.location.name}</div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{activeOrder.location.detail}</div>
              </div>
            </div>

            {/* Courier Driver Card */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E0E6ED', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(26,42,58,0.07)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ position: 'relative' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,107,53,0.15)', display: 'flex', alignItems: 'center', justifyItems: 'center', fontSize: 28, justifyContent: 'center' }}>👨‍🎓</div>
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: '50%', background: '#22C55E', border: '2.5px solid #fff' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1A2A3A' }}>Ali (Student Courier)</h4>
                  <p style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>2nd Year · Faculty of Computer Science 🎓</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <span style={{ color: '#FFD700', fontSize: 12 }}>★</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#1A2A3A' }}>4.95</span>
                    <span style={{ fontSize: 11, color: '#A0AEC0' }}>(187 campus orders)</span>
                  </div>
                </div>
              </div>
              <a 
                href="tel:+60123456789" 
                style={{ 
                  width: 44, 
                  height: 44, 
                  background: 'rgba(255,107,53,0.12)', 
                  border: 'none', 
                  borderRadius: 12, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer' 
                }}
                aria-label="Call Courier"
              >
                <Phone size={18} color="#FF6B35" />
              </a>
            </div>

            {/* Order Timeline Progress */}
            <div className="timeline-card-desktop">
              <h4 style={{ fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 700, color: '#1A2A3A', marginBottom: 18 }}>Order Progress</h4>
              <div className="timeline-steps-desktop">
                {steps.map((step, idx) => {
                  const isDone = currentStep >= idx;
                  const isActive = currentStep === idx;
                  const isLast = idx === steps.length - 1;

                  return (
                    <div key={idx} className="timeline-step-row-desktop">
                      <div className="timeline-connector-desktop">
                        <div className={`timeline-node-desktop ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
                          {isDone && <Check size={11} color={isActive ? '#FF6B35' : '#fff'} strokeWidth={3} />}
                        </div>
                        {!isLast && <div className={`timeline-line-desktop ${currentStep > idx ? 'done' : ''}`} />}
                      </div>
                      <div className="timeline-step-text-desktop">
                        <span className={`step-name-desktop ${isDone ? 'done' : ''}`}>{step.title}</span>
                        <span className={`step-desc-desktop ${isDone ? 'done' : ''}`}>{step.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Completed CTA Overlay */}
            {currentStep === 3 && (
              <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E0E6ED', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(34,197,94,0.15)', animation: 'slideUp 0.3s ease-out' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ShieldCheck size={24} color="#22C55E" />
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1A2A3A' }}>Ali has arrived!</h4>
                    <p style={{ fontSize: 12, color: '#64748B', marginTop: 1 }}>Please meet your driver at the drop-off spot.</p>
                  </div>
                </div>
                <button 
                  className="btn-primary" 
                  onClick={completeOrder}
                  style={{ 
                    background: '#22C55E', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: 10, 
                    padding: '10px 22px', 
                    fontWeight: 700, 
                    fontSize: 14, 
                    cursor: 'pointer' 
                  }}
                >
                  Order Received 👍
                </button>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: Large Live Map Card */}
          <div className="map-card-desktop">
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E0E6ED', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#1A2A3A' }}>Live Campus Map</span>
              <div style={{ background: 'rgba(255,107,53,0.12)', padding: '3px 9px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#FF6B35', animation: 'blinkDot 1.2s infinite' }} />
                <span style={{ fontSize: 9, fontWeight: 700, color: '#FF6B35', textTransform: 'uppercase' }}>GPS LIVE</span>
              </div>
            </div>

            <div style={{ padding: 16 }}>
              <div className="map-container-desktop" style={{ height: 380 }}>
                <svg className="campus-map-svg" viewBox="0 0 340 170" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
                  {/* Map background */}
                  <rect width="340" height="170" fill="#EEF2F7" />
                  
                  {/* Parkland Green Spaces */}
                  <ellipse cx="60" cy="130" rx="45" ry="30" fill="#C8E6C9" fillOpacity="0.75" />
                  <ellipse cx="280" cy="40" rx="35" ry="25" fill="#C8E6C9" fillOpacity="0.75" />
                  
                  {/* Road pathways */}
                  <rect x="100" y="0" width="18" height="170" fill="#D5DDE8" />
                  <rect x="0" y="84" width="340" height="18" fill="#D5DDE8" />
                  
                  {/* Building Blocks */}
                  {/* Block A */}
                  <rect x="20" y="10" width="55" height="35" rx="5" fill="#C0CFDC" />
                  <text x="47" y="27" fontSize="8" fontWeight="700" fill="#1A2A3A" textAnchor="middle">Block A</text>
                  <text x="47" y="36" fontSize="6.5" fill="#64748B" textAnchor="middle">Classes</text>
                  
                  {/* Library */}
                  <rect x="150" y="15" width="60" height="40" rx="5" fill="#C0CFDC" />
                  <text x="180" y="35" fontSize="8" fontWeight="700" fill="#1A2A3A" textAnchor="middle">Library</text>
                  <text x="180" y="44" fontSize="6.5" fill="#64748B" textAnchor="middle">Study Hub</text>

                  {/* Block C */}
                  <rect x="20" y="115" width="55" height="40" rx="5" fill="#C0CFDC" />
                  <text x="47" y="137" fontSize="8" fontWeight="700" fill="#1A2A3A" textAnchor="middle">Block C</text>
                  <text x="47" y="146" fontSize="6.5" fill="#64748B" textAnchor="middle">Admin</text>

                  {/* Engineering Lab 3 (Destination) */}
                  <rect x="240" y="115" width="75" height="42" rx="5" fill="#B8CBDB" stroke="#FF6B35" strokeWidth="1" />
                  <text x="277.5" y="132" fontSize="8" fontWeight="700" fill="#1A2A3A" textAnchor="middle">Eng Lab 3</text>
                  <text x="277.5" y="141" fontSize="6.5" fill="#64748B" textAnchor="middle">Destination</text>

                  {/* Route Dash line */}
                  <path 
                    d="M 45 37.5 L 109 37.5 L 109 93 L 277.5 93 L 277.5 115" 
                    fill="none" 
                    stroke="#FF6B35" 
                    strokeWidth="3" 
                    strokeDasharray="7,4" 
                    strokeLinecap="round" 
                  />

                  {/* Destination Pin */}
                  <g transform="translate(277.5, 115)">
                    <circle r="11" fill="rgba(255,107,53,0.22)" />
                    <circle r="6.5" fill="#FF6B35" />
                    <circle r="2.5" fill="white" />
                  </g>

                  {/* Restaurant Marker (Warung Pak Din) */}
                  <g transform="translate(45, 37.5)">
                    <circle r="8" fill="#D97706" stroke="white" strokeWidth="1.5" />
                    <text y="2.5" fontSize="7" fill="white" textAnchor="middle">🍛</text>
                  </g>

                  {/* Driver Courier Marker */}
                  <g transform={`translate(${driverPos.x}, ${driverPos.y})`}>
                    <circle r="16" fill="rgba(255,107,53,0.15)" className="driver-ping" />
                    <circle r="10" fill="#FF6B35" stroke="white" strokeWidth="2.5" />
                    <text y="3" fontSize="9" fill="white" textAnchor="middle">🛵</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
