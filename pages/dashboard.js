
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
    loadDashboardData();
  }, []);

  const [dashboardData, setDashboardData] = useState({
    activeLeads: 0,
    newLeads: 0,
    monthlyRevenue: 0
  });

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        const leads = data.leads || [];
        const activeLeads = leads.filter(lead => ['new', 'contacted', 'quoted'].includes(lead.status)).length;
        const newLeads = leads.filter(lead => lead.status === 'new').length;
        
        setDashboardData({
          activeLeads,
          newLeads,
          monthlyRevenue: 0 // Will be calculated from jobs/invoices later
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

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
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>✅ Invoice Template Ready</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              Your professional invoice template is configured with your business details
            </p>
            <a href="/invoice-preview" style={{
              color: '#00FF00',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
              padding: '8px 16px',
              border: '1px solid #00FF00',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}>
              Preview Template →
            </a>
          </div>

          <div style={{
            ...cardStyle,
            border: '2px solid #FFD700',
            backgroundColor: '#3a3a1a'
          }}>
            <h3 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>✅ Quote Template Ready</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              Professional quote template ready for sending to clients
            </p>
            <div style={{ color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>Ready to use</div>
          </div>

          <div style={{
            ...cardStyle,
            border: '2px solid #FF6600',
            backgroundColor: '#3a1a1a'
          }}>
            <h3 style={{ color: '#FF6600', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>🚀 Let's Start Using TradieM8</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              Everything is set up! Start managing your leads, jobs, and invoices
            </p>
            <div style={{ color: '#FF6600', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>All systems go!</div>
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
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>📋 Leads</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              Manage your sales leads and track potential customers
            </p>
            <a href="/leads" style={{...linkStyle, fontFamily: 'Inter, sans-serif'}}>View Leads →</a>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>🔧 Jobs</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              Track your active projects and job progress
            </p>
            <a href="/jobs" style={{...linkStyle, fontFamily: 'Inter, sans-serif'}}>View Jobs →</a>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>💰 Invoices</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              Manage billing and payment tracking
            </p>
            <a href="/invoices" style={{...linkStyle, fontFamily: 'Inter, sans-serif'}}>View Invoices →</a>
          </div>

          <div style={cardStyle}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>📅 Bookings</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              Schedule appointments and manage calendar
            </p>
            <a href="/bookings" style={{...linkStyle, fontFamily: 'Inter, sans-serif'}}>View Bookings →</a>
          </div>

          <div style={{
            ...cardStyle,
            border: '2px solid #9D4EDD',
            background: 'linear-gradient(135deg, #2a1a3a, #1a1a2a)'
          }}>
            <h3 style={{ color: '#9D4EDD', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>🤖 Digital Apprentice</h3>
            <p style={{ color: '#cccccc', marginBottom: '20px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              AI assistant for calls, webhooks, and automation
            </p>
            <a href="/digital-apprentice" style={{
              color: '#9D4EDD',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif'
            }}>Manage AI Assistant →</a>
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
          <h2 style={{ color: '#FF6600', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>Quick Stats</h2>
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ fontSize: '32px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>{dashboardData.activeLeads}</div>
              <div style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>Active Leads</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', color: '#00FF00', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>0</div>
              <div style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>Ongoing Jobs</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', color: '#FF6600', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>$0</div>
              <div style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>Monthly Revenue</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
