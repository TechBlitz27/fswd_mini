import React, { useEffect, useState } from 'react';
import { CheckCircle, ChartLine, FileText, Receipt, Book, Landmark, Lightbulb, Calendar } from 'lucide-react';
import { getPublicDueDates } from '../services/dueDateService';

const Home = () => {
  const [dueDates, setDueDates] = useState([]);

  useEffect(() => {
    const fetchDueDates = async () => {
      try {
        const data = await getPublicDueDates();
        setDueDates(data.dueDates || []);
      } catch (err) {
        console.error('Error fetching due dates:', err);
      }
    };
    fetchDueDates();
  }, []);

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <header style={{ padding: '80px 0', background: 'var(--bg-anchor)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div>
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
              marginBottom: '24px'
            }}>
              <CheckCircle size={14} /> Chartered Accountants
            </span>
            <h1 style={{ color: 'var(--text-on-dark)', fontSize: '3.5rem', marginBottom: '24px' }}>
              Your Trusted <br /> <span style={{ color: '#60a5fa' }}>Financial Partner</span>
            </h1>
            <p style={{ color: '#bfdbfe', marginBottom: '32px', maxWidth: '500px' }}>
              Expert in subsidy, finance, audit, taxation, GST, and compliance services for all corporate and non-corporate entities.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <img 
              src="https://plus.unsplash.com/premium_photo-1679923813998-6603ee2466c5?auto=format&fit=crop&q=80&w=1170" 
              alt="Business team" 
              style={{ width: '100%', borderRadius: '12px', border: '4px solid rgba(255,255,255,0.15)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
            />
          </div>
        </div>
      </header>

      {/* Public Due Dates Section */}
      <section style={{ padding: '60px 0', background: 'var(--bg-card)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Upcoming Due Dates</h2>
            <p style={{ color: 'var(--text-muted)' }}>Stay updated with compliance deadlines.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {dueDates.length > 0 ? dueDates.map((date) => (
              <div key={date._id} className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
                <Calendar size={32} color="var(--accent-vibrant)" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{date.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontWeight: 700 }}>
                  {new Date(date.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <span style={{ fontSize: '0.85rem', color: '#1d4ed8' }}>{date.category}</span>
              </div>
            )) : (
               <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>No upcoming due dates found.</p>
            )}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--text-on-light)' }}>Our Professional Services</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            <ServiceCard icon={<ChartLine />} title="Finance & Subsidy" desc="We assist businesses in government subsidies, project finance, and financial compliance." />
            <ServiceCard icon={<FileText />} title="Direct & Indirect Tax" desc="Comprehensive tax planning, filing, and representation to minimize liabilities." />
            <ServiceCard icon={<Receipt />} title="GST Advisory" desc="All-in-one GST services including registration, returns, and reconciliation." />
            <ServiceCard icon={<Book />} title="Accounting" desc="Accurate bookkeeping, financial statements, and cloud accounting systems." />
            <ServiceCard icon={<Landmark />} title="Corporate Compliance" desc="Company incorporations, ROC filings, and board meeting support." />
            <ServiceCard icon={<Lightbulb />} title="Business Advisory" desc="Financial modelling, due diligence, and strategic business planning." />
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceCard = ({ icon, title, desc }) => (
  <div className="glass-card" style={{ padding: '40px 32px', transition: '0.3s' }}>
    <div style={{
      width: '64px',
      height: '64px',
      background: '#60a5fa',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      fontSize: '1.75rem',
      color: '#ffffff'
    }}>
      {icon}
    </div>
    <h3 style={{ marginBottom: '12px' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{desc}</p>
  </div>
);

export default Home;
