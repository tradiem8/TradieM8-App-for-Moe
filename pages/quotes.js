
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes');
      const data = await response.json();
      setQuotes(data.quotes || []);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (quoteId, newStatus) => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteId, status: newStatus }),
      });

      if (response.ok) {
        fetchQuotes(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating quote status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return '#666';
      case 'sent': return '#FFD700';
      case 'accepted': return '#00FF00';
      case 'rejected': return '#FF4444';
      case 'expired': return '#FF6600';
      default: return '#666';
    }
  };

  const getStatusCount = (status) => {
    return quotes.filter(quote => quote.status === status).length;
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1 style={{ color: '#FFD700', fontFamily: 'Anton, sans-serif' }}>Loading quotes...</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '36px',
            color: '#FFD700',
            fontFamily: 'Anton, sans-serif',
            marginBottom: '10px'
          }}>
            Quotes Management
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Create and manage quotes for your clients
          </p>
        </div>

        {/* Status Summary */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: '15px', 
          marginBottom: '30px' 
        }}>
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #666',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', color: '#666', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
              {getStatusCount('draft')}
            </div>
            <div style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>Draft</div>
          </div>
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #FFD700',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
              {getStatusCount('sent')}
            </div>
            <div style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>Sent</div>
          </div>
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #00FF00',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', color: '#00FF00', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
              {getStatusCount('accepted')}
            </div>
            <div style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>Accepted</div>
          </div>
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #FF4444',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', color: '#FF4444', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
              {getStatusCount('rejected')}
            </div>
            <div style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>Rejected</div>
          </div>
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #FF6600',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', color: '#FF6600', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
              {getStatusCount('expired')}
            </div>
            <div style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>Expired</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #FFD700',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
              Create New Quote
            </h3>
            <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}>
              Generate professional quotes for your customers
            </p>
            <a href="/create-quote" style={{
              color: '#FFD700',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
              padding: '12px 24px',
              border: '2px solid #FFD700',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}>
              + Create Quote
            </a>
          </div>
        </div>

        {/* Quotes List */}
        {quotes.length > 0 ? (
          <div style={{
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '2px solid #555',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#333',
              padding: '20px',
              borderBottom: '1px solid #555'
            }}>
              <h3 style={{ color: '#FFD700', margin: 0, fontFamily: 'Inter, sans-serif' }}>Recent Quotes</h3>
            </div>
            
            <div style={{ padding: '20px' }}>
              {quotes.map((quote) => (
                <div key={quote.id} style={{
                  backgroundColor: '#333',
                  padding: '20px',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  border: `2px solid ${getStatusColor(quote.status)}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ color: '#fff', margin: '0 0 5px 0', fontFamily: 'Inter, sans-serif' }}>
                        {quote.quoteNumber}
                      </h4>
                      <p style={{ color: '#ccc', margin: '0 0 5px 0', fontFamily: 'Inter, sans-serif' }}>
                        Customer: {quote.customer.name}
                      </p>
                      <p style={{ color: '#ccc', margin: '0', fontFamily: 'Inter, sans-serif' }}>
                        Amount: ${quote.total?.toFixed(2) || '0.00'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        padding: '5px 10px',
                        borderRadius: '5px',
                        backgroundColor: getStatusColor(quote.status),
                        color: quote.status === 'sent' ? '#000' : '#fff',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {quote.status}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      href={`/quote-preview?id=${quote.id}`}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#FFD700',
                        color: '#000',
                        textDecoration: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px'
                      }}
                    >
                      View Quote
                    </a>
                    
                    {quote.status === 'draft' && (
                      <button
                        onClick={() => updateQuoteStatus(quote.id, 'sent')}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#00FF00',
                          color: '#000',
                          border: 'none',
                          borderRadius: '5px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px'
                        }}
                      >
                        Mark as Sent
                      </button>
                    )}
                    
                    {quote.status === 'sent' && (
                      <>
                        <button
                          onClick={() => updateQuoteStatus(quote.id, 'accepted')}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#00FF00',
                            color: '#000',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px'
                          }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateQuoteStatus(quote.id, 'rejected')}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#FF4444',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px'
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                  
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#888', fontFamily: 'Inter, sans-serif' }}>
                    Created: {new Date(quote.createdAt).toLocaleDateString()} | 
                    Valid Until: {new Date(quote.validUntil).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '40px',
            borderRadius: '12px',
            border: '2px solid #555',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#ccc', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>No quotes yet</h3>
            <p style={{ color: '#888', fontFamily: 'Inter, sans-serif' }}>Create your first quote to get started</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
