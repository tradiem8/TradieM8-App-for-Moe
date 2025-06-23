
import Layout from '../components/Layout';

export default function Dashboard() {
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
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            Welcome to Your Dashboard
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#cccccc',
            marginBottom: '20px'
          }}>
            <span style={{ color: '#FF6600' }}>Digital Assistant</span> for Trade Professionals
          </p>
          <div style={{ 
            width: '100px', 
            height: '3px', 
            background: 'linear-gradient(90deg, #00FF00, #FFD700, #FF6600)',
            margin: '0 auto'
          }}></div>
        </div>

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
