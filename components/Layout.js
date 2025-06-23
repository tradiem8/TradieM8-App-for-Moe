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
          <div style={{ display: 'flex', gap: '30px' }}>
            <a href="/" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}>Home</a>
            <a href="/dashboard" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}>Dashboard</a>
            <a href="/setup" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              fontFamily: 'Inter, sans-serif'
            }}>Setup</a>
            <a href="/leads" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              fontFamily: 'Inter, sans-serif'
            }}>Leads</a>
            <a href="/jobs" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              fontFamily: 'Inter, sans-serif'
            }}>Jobs</a>
            <a href="/invoices" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              fontFamily: 'Inter, sans-serif'
            }}>Invoices</a>
            <a href="/bookings" style={{ 
              color: '#ffffff', 
              textDecoration: 'none',
              fontWeight: '500',
              padding: '8px 16px',
              borderRadius: '5px',
              fontFamily: 'Inter, sans-serif'
            }}>Bookings</a>
          </div>
        </div>
      </nav>
      <main style={{ padding: '20px' }}>{children}</main>
    </div>
  );
}