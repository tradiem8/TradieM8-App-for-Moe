export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#ffffff' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton:wght@400&family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>
      <nav style={{ 
        padding: '1rem 2rem', 
        backgroundColor: '#000000',
        borderBottom: '3px solid #00FF00',
        marginBottom: '0'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src="/logo-rect.png" alt="Tradiem8" style={{ height: '50px', width: 'auto' }} />
            <h2 style={{ 
              margin: 0, 
              fontSize: '28px',
              fontFamily: 'Anton, sans-serif',
              fontWeight: '400',
              letterSpacing: '1px'
            }}>
              <span style={{ color: '#FFD700' }}>TRADIE</span>
              <span style={{ color: '#00FF00' }}>M8</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="/dashboard" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}>Home</a>
            
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button 
                style={{ 
                  color: '#ffffff', 
                  background: 'transparent',
                  border: 'none',
                  fontWeight: '500',
                  padding: '8px 16px',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                onMouseEnter={(e) => {
                  e.target.nextElementSibling.style.display = 'block';
                }}
              >
                Contacts ▼
              </button>
              <div 
                style={{
                  display: 'none',
                  position: 'absolute',
                  top: '100%',
                  left: '0',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #00FF00',
                  borderRadius: '5px',
                  minWidth: '150px',
                  zIndex: 1000,
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.display = 'none';
                }}
              >
                <a href="/leads" style={{
                  display: 'block',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '10px 16px',
                  fontFamily: 'Inter, sans-serif',
                  borderBottom: '1px solid #444'
                }}>Leads</a>
                <a href="/customers" style={{
                  display: 'block',
                  color: '#ffffff',
                  textDecoration: 'none',
                  padding: '10px 16px',
                  fontFamily: 'Inter, sans-serif'
                }}>Customers</a>
              </div>
            </div>

            <a href="/quotes" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}>Quotes</a>
            <a href="/invoices" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}>Invoices</a>
            <a href="/bookings" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}>Bookings/Jobs</a>
            <a href="/setup" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}>Settings</a>
          </div>
        </div>
      </nav>
      <main style={{ padding: '20px' }}>{children}</main>
    </div>
  );
}