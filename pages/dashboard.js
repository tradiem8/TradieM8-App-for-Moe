
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Dashboard() {
  const router = useRouter();
  const [businessData, setBusinessData] = useState(null);
  const [isSetup, setIsSetup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSetupStatus();
  }, []);

  const checkSetupStatus = async () => {
    try {
      const response = await fetch('/api/check-setup');
      const data = await response.json();
      
      if (data.isSetup) {
        setIsSetup(true);
        setBusinessData(data.business);
      } else {
        router.push('/setup');
      }
    } catch (error) {
      console.error('Error checking setup:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh' 
        }}>
          <div style={{ color: '#FFD700', fontSize: '18px' }}>Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isSetup) {
    return null; // Will redirect to setup
  }
  const cardStyle = {
    padding: '25px',
    backgroundColor: '#2a2a2a',
    borderRadius: '12px',
    border: '2px solid #00FF00',
    boxShadow: '0 4px 15px rgba(0, 255, 0, 0.1)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const linkStyle = {
    color: '#FFD700',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px'
  };

  return (
    <Layout>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '48px', 
            margin: '20px 0',
            color: '#FFD700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontFamily: 'Anton, sans-serif',
            fontWeight: '400',
            letterSpacing: '1px'
          }}>
            Welcome back, {businessData?.businessName}!
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cccccc',
            marginBottom: '20px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          }}>
            Your <span style={{ color: '#FF6600' }}>Digital Assistant</span> is ready to help manage your business
          </p>
          {businessData?.logoPath && (
            <div style={{ marginBottom: '20px' }}>
              <img 
                src={businessData.logoPath} 
                alt="Business Logo" 
                style={{ 
                  maxHeight: '80px', 
                  borderRadius: '8px',
                  border: '2px solid #00FF00'
                }} 
              />
            </div>
          )}
          <div style={{ 
            width: '100px', 
            height: '3px', 
            background: 'linear-gradient(90deg, #00FF00, #FFD700, #FF6600)',
            margin: '0 auto'
          }}></div>
        </div>

        {/* Setup Status Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px', 
          marginBottom: '40px' 
        }}>
          <div style={{
            ...cardStyle,
            border: '2px solid #00FF00',
            backgroundColor: '#1a3a1a'
          }}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px' }}>✅ Invoice Template Ready</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5' }}>
              Your professional invoice template is configured with your business details
            </p>
            <div style={{ color: '#00FF00', fontWeight: 'bold' }}>Ready to use</div>
          </div>

          <div style={{
            ...cardStyle,
            border: '2px solid #FFD700',
            backgroundColor: '#3a3a1a'
          }}>
            <h3 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '15px' }}>✅ Quote Template Ready</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5' }}>
              Professional quote template ready for sending to clients
            </p>
            <div style={{ color: '#FFD700', fontWeight: 'bold' }}>Ready to use</div>
          </div>

          <div style={{
            ...cardStyle,
            border: '2px solid #FF6600',
            backgroundColor: '#3a1a1a'
          }}>
            <h3 style={{ color: '#FF6600', fontSize: '24px', marginBottom: '15px' }}>🚀 Let's Start Using TradieM8</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5' }}>
              Everything is set up! Start managing your leads, jobs, and invoices
            </p>
            <div style={{ color: '#FF6600', fontWeight: 'bold' }}>All systems go!</div>
          </div>
        </div>

        {/* Main Feature Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '25px', 
          marginTop: '40px' 
        }}>
          <div style={cardStyle}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px' }}>📋 Leads</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5' }}>
              Manage your sales leads and track potential customers
            </p>
            <a href="/leads" style={linkStyle}>View Leads →</a>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px' }}>🔧 Jobs</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5' }}>
              Track your active projects and job progress
            </p>
            <a href="/jobs" style={linkStyle}>View Jobs →</a>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px' }}>💰 Invoices</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5' }}>
              Manage billing and payment tracking
            </p>
            <a href="/invoices" style={linkStyle}>View Invoices →</a>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px' }}>📅 Bookings</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5' }}>
              Schedule appointments and manage calendar
            </p>
            <a href="/bookings" style={linkStyle}>View Bookings →</a>
          </div>
        </div>

        <div style={{ 
          marginTop: '50px', 
          padding: '30px',
          backgroundColor: '#2a2a2a',
          borderRadius: '12px',
          border: '2px solid #FF6600',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#FF6600', marginBottom: '15px' }}>Quick Stats</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '32px', color: '#FFD700', fontWeight: 'bold' }}>0</div>
              <div style={{ color: '#cccccc' }}>Active Leads</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', color: '#00FF00', fontWeight: 'bold' }}>0</div>
              <div style={{ color: '#cccccc' }}>Ongoing Jobs</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', color: '#FF6600', fontWeight: 'bold' }}>$0</div>
              <div style={{ color: '#cccccc' }}>Monthly Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
