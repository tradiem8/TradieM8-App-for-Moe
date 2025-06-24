
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        textAlign: 'center',
        padding: '60px 20px'
      }}>
        <div style={{ marginBottom: '60px' }}>
          <h1 style={{ 
            fontSize: '64px', 
            margin: '20px 0',
            lineHeight: '1.2',
            fontFamily: 'Anton, sans-serif',
            fontWeight: '400',
            letterSpacing: '2px'
          }}>
            Welcome to <span style={{ color: '#FFD700' }}>TRADIE</span><span style={{ color: '#00FF00' }}>M8</span>
          </h1>
          <p style={{ 
            fontSize: '24px', 
            color: '#cccccc',
            marginBottom: '30px',
            maxWidth: '600px',
            margin: '0 auto 30px auto',
            lineHeight: '1.5',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          }}>
            Your all-in-one <span style={{ color: '#FF6600' }}>Digital Assistant</span> for managing trades business operations
          </p>
          <div style={{ 
            width: '150px', 
            height: '4px', 
            background: 'linear-gradient(90deg, #00FF00, #FFD700, #FF6600)',
            margin: '30px auto'
          }}></div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '30px',
          marginBottom: '60px'
        }}>
          <div style={{ 
            padding: '30px',
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '2px solid #00FF00'
          }}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Anton, sans-serif', fontWeight: '400', letterSpacing: '1px' }}>📊 Lead Management</h3>
            <p style={{ color: '#cccccc', lineHeight: '1.6', fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
              Track and convert potential customers into profitable jobs
            </p>
          </div>

          <div style={{ 
            padding: '30px',
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '2px solid #FFD700'
          }}>
            <h3 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '15px', fontFamily: 'Anton, sans-serif', fontWeight: '400', letterSpacing: '1px' }}>🔧 Job Tracking</h3>
            <p style={{ color: '#cccccc', lineHeight: '1.6', fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
              Monitor project progress and manage multiple jobs efficiently
            </p>
          </div>

          <div style={{ 
            padding: '30px',
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '2px solid #FF6600'
          }}>
            <h3 style={{ color: '#FF6600', fontSize: '24px', marginBottom: '15px', fontFamily: 'Anton, sans-serif', fontWeight: '400', letterSpacing: '1px' }}>💰 Smart Invoicing</h3>
            <p style={{ color: '#cccccc', lineHeight: '1.6', fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
              Generate professional invoices and track payments seamlessly
            </p>
          </div>

          <div style={{ 
            padding: '30px',
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '2px solid #9D4EDD'
          }}>
            <h3 style={{ color: '#9D4EDD', fontSize: '24px', marginBottom: '15px', fontFamily: 'Anton, sans-serif', fontWeight: '400', letterSpacing: '1px' }}>🤖 Digital Apprentice</h3>
            <p style={{ color: '#cccccc', lineHeight: '1.6', fontFamily: 'Inter, sans-serif', fontWeight: '400' }}>
              AI-powered assistant that handles calls and automates lead capture
            </p>
          </div>
        </div>

        <div style={{ marginTop: '60px' }}>
          <a href="/dashboard" style={{ 
            display: 'inline-block',
            padding: '18px 40px', 
            background: 'linear-gradient(135deg, #FFD700, #FF6600)',
            color: '#000000', 
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '20px',
            fontWeight: 'bold',
            boxShadow: '0 6px 20px rgba(255, 215, 0, 0.3)',
            transition: 'all 0.3s ease',
            border: '2px solid #00FF00',
            fontFamily: 'Anton, sans-serif',
            letterSpacing: '1px'
          }}>
            🚀 Launch Dashboard
          </a>
          <p style={{ 
            color: '#cccccc', 
            marginTop: '20px',
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          }}>
            Start managing your trade business like a pro
          </p>
        </div>
      </div>
    </Layout>
  );
}
