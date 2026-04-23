import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <header style={{ padding: '80px 0', background: 'var(--bg-anchor)', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'var(--text-on-dark)', fontSize: '3.5rem', marginBottom: '16px' }}>
            Get in <span style={{ color: '#60a5fa' }}>Touch</span>
          </h1>
          <p style={{ color: '#bfdbfe', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            We're here to answer your queries about taxation, audit, and advisory services.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <section style={{ padding: '80px 0', background: '#7eb6ff', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'stretch' }}>
            
            {/* Contact Details Card */}
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '16px', color: '#1e293b' }}>
              <div style={{ width: '48px', height: '48px', background: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <MapPin color="white" size={24} />
              </div>
              
              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#0f172a' }}>Our Office</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#3b82f6', marginBottom: '8px', fontSize: '1rem' }}>S.M. Ratnani & Co</h4>
                <p style={{ lineHeight: '1.6', color: '#475569', fontSize: '0.95rem' }}>
                  120 Demo Business Avenue,<br />
                  Sample City, Maharashtra - 400001
                </p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#0f172a', marginBottom: '8px', fontSize: '1rem' }}>Email Us</h4>
                <a href="mailto:info@demo-cafirm.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                  <Mail size={16} /> info@demo-cafirm.com
                </a>
              </div>

              <div>
                <h4 style={{ color: '#0f172a', marginBottom: '12px', fontSize: '1rem' }}>Call Us</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <a href="tel:+919876543210" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                    <Phone size={16} /> +91 98765 43210
                  </a>
                  <a href="tel:+919812345678" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                    <Phone size={16} /> +91 98123 45678
                  </a>
                  <a href="tel:+919900112233" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                    <Phone size={16} /> +91 99001 12233
                  </a>
                </div>
              </div>
            </div>

            {/* Map Card */}
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.9)', borderRadius: '16px', overflow: 'hidden', padding: '0', minHeight: '400px' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14981.393433621415!2d78.1257!3d20.3953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd3e8e123456789%3A0xabcdef1234567890!2sDatta%20Chowk%2C%20Yavatmal%2C%20Maharashtra%20445001!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '100%' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Demo CA Firm Office Location"
              ></iframe>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;