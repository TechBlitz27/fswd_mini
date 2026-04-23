import React from 'react';
import { Shield, Lightbulb, Users, FileText } from 'lucide-react';

const About = () => {
  return (
    <div className="fade-in">
      {/* Hero Section */}
      <header style={{ padding: '80px 0', background: 'var(--bg-anchor)', textAlign: 'center' }}>
        <div className="container">
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid #60a5fa',
            color: '#eff6ff',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '20px'
          }}>
            <FileText size={14} /> Our Firm
          </span>
          <h1 style={{ color: 'var(--text-on-dark)', fontSize: '3.5rem', marginBottom: '16px' }}>
            About <br /> <span style={{ color: '#60a5fa' }}>Demo CA Firm</span>
          </h1>
          <p style={{ color: '#bfdbfe', marginBottom: '32px', fontSize: '1.1rem' }}>
            Integrity • Expertise • Commitment to Excellence
          </p>
          <a href="/contact" style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            transition: '0.3s'
          }}>
            Get In Touch
          </a>
        </div>
      </header>

      {/* Main Content Section */}
      <section style={{ padding: '80px 0', background: '#7eb6ff', minHeight: '100vh' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Who We Are */}
          <div className="glass-card" style={{ background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '16px', marginBottom: '40px', color: '#1e293b' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '16px', color: '#0f172a' }}>Who We Are</h2>
            <p style={{ marginBottom: '12px', lineHeight: '1.6' }}>
              As a firm of qualified Chartered Accountants (CA), we at Demo CA Firm act with a passion for helping businesses grow smarter, stronger, and more financially secure. We specialize in delivering strategic accounting, tax planning, and financial advisory solutions that drive real results.
            </p>
            <p style={{ marginBottom: '24px', lineHeight: '1.6' }}>
              Over the years, we've worked with entrepreneurs, startups, and established companies across industries—helping them streamline finances, optimize tax efficiency, ensure compliance, and make informed business decisions with clarity and confidence.
            </p>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: '#0f172a' }}>Core Expertise:</h3>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Accounting & Financial Reporting</li>
              <li>Finance & Subsidy</li>
              <li>Tax Planning & Compliance (Direct & Indirect)</li>
              <li>Business Advisory & Financial Strategy</li>
              <li>Audit & Assurance</li>
              <li>Budgeting, Forecasting & Cash Flow Management</li>
            </ul>
          </div>

          {/* Mission & Values */}
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#0f172a', marginBottom: '30px' }}>Our Mission & Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.9)', padding: '30px', borderRadius: '16px', color: '#1e293b' }}>
              <Shield color="#3b82f6" size={32} style={{ marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '12px', color: '#0f172a' }}>Integrity</h3>
              <p style={{ fontSize: '0.95rem' }}>We uphold the highest professional and ethical standards in every engagement.</p>
            </div>
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.9)', padding: '30px', borderRadius: '16px', color: '#1e293b' }}>
              <Lightbulb color="#3b82f6" size={32} style={{ marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '12px', color: '#0f172a' }}>Expertise</h3>
              <p style={{ fontSize: '0.95rem' }}>Our team brings deep domain knowledge and up-to-date understanding of financial laws and regulations.</p>
            </div>
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.9)', padding: '30px', borderRadius: '16px', color: '#1e293b' }}>
              <Users color="#3b82f6" size={32} style={{ marginBottom: '16px' }} />
              <h3 style={{ marginBottom: '12px', color: '#0f172a' }}>Client Commitment</h3>
              <p style={{ fontSize: '0.95rem' }}>We partner with clients for long-term growth, ensuring timely advice and continuous support.</p>
            </div>
          </div>

          {/* Leadership */}
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#0f172a', marginBottom: '30px' }}>Our Leadership</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', justifyContent: 'center' }}>
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '16px', textAlign: 'center', color: '#1e293b' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#cbd5e1', margin: '0 auto 20px', overflow: 'hidden' }}>
                <img src="https://ui-avatars.com/api/?name=Sanjay+Ratnani&background=0D8ABC&color=fff&size=100" alt="CA Sanjay Ratnani" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ color: '#0f172a', marginBottom: '4px' }}>CA Raj Mehta</h3>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#64748b' }}>Founder & Partner</p>
            </div>
            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.9)', padding: '40px', borderRadius: '16px', textAlign: 'center', color: '#1e293b' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#cbd5e1', margin: '0 auto 20px', overflow: 'hidden' }}>
                <img src="https://ui-avatars.com/api/?name=Neha+Singh&background=0D8ABC&color=fff&size=100" alt="CA Neha Singh" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ color: '#0f172a', marginBottom: '4px' }}>CA Neha Singh</h3>
              <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#64748b' }}>Partner</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;