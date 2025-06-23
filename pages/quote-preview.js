
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function QuotePreview() {
  const router = useRouter();
  const { id } = router.query;
  const [quote, setQuote] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchQuoteData();
    }
  }, [id]);

  const fetchQuoteData = async () => {
    try {
      const response = await fetch(`/api/quote/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setQuote(data.quote);
        setBusinessData(data.business);
      } else {
        console.error('Quote not found');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const acceptQuote = async () => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteId: id, status: 'accepted' }),
      });

      if (response.ok) {
        alert('Quote accepted successfully!');
        fetchQuoteData(); // Refresh data
      }
    } catch (error) {
      console.error('Error accepting quote:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1 style={{ color: '#FFD700', fontFamily: 'Anton, sans-serif' }}>Loading quote...</h1>
        </div>
      </Layout>
    );
  }

  if (!quote || !businessData) {
    return (
      <Layout>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1 style={{ color: '#FF4444', fontFamily: 'Anton, sans-serif' }}>Quote not found</h1>
        </div>
      </Layout>
    );
  }

  const invoiceStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    fontFamily: 'Inter, sans-serif'
  };

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
            Quote Preview
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Professional quote for your customer
          </p>
        </div>

        <div style={invoiceStyle}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            <div>
              {businessData.logoPath && (
                <img 
                  src={businessData.logoPath} 
                  alt="Logo" 
                  style={{ height: '80px', marginBottom: '20px' }}
                />
              )}
              <h1 style={{ 
                fontSize: '32px', 
                margin: '0 0 10px 0', 
                color: '#FFD700',
                fontFamily: 'Anton, sans-serif'
              }}>
                {businessData.businessName}
              </h1>
              <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#666' }}>
                <div>ABN: {businessData.abn}</div>
                <div>Phone: {businessData.phone}</div>
                <div>Email: {businessData.email}</div>
                {businessData.website && <div>Website: {businessData.website}</div>}
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <h2 style={{ 
                fontSize: '36px', 
                margin: '0 0 20px 0', 
                color: '#FFD700',
                fontFamily: 'Anton, sans-serif'
              }}>
                QUOTE
              </h2>
              <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
                <div><strong>Quote #:</strong> {quote.quoteNumber}</div>
                <div><strong>Date:</strong> {new Date(quote.quoteDate).toLocaleDateString('en-GB')}</div>
                <div><strong>Valid Until:</strong> {new Date(quote.validUntil).toLocaleDateString('en-GB')}</div>
                {quote.reference && <div><strong>Reference:</strong> {quote.reference}</div>}
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333', fontWeight: 'bold' }}>
              Quote To:
            </h3>
            <div style={{ fontSize: '16px', lineHeight: '1.5' }}>
              <div style={{ fontWeight: 'bold' }}>{quote.customer.name}</div>
              {quote.customer.address && <div>{quote.customer.address}</div>}
              <div>Phone: {quote.customer.phone}</div>
              <div>Email: {quote.customer.email}</div>
              {quote.customer.serviceAddress && quote.customer.serviceAddress !== quote.customer.address && (
                <div style={{ marginTop: '10px' }}>
                  <strong>Service Address:</strong><br />
                  {quote.customer.serviceAddress}
                </div>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div style={{ marginBottom: '30px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #333' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold' }}>Qty</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>Unit Price</th>
                  <th style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {quote.items.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{item.description}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>${item.unitPrice.toFixed(2)}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>${(item.quantity * item.unitPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
            <div style={{ width: '250px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '16px' }}>
                <span>Subtotal:</span>
                <span>${quote.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '16px' }}>
                <span>GST (10%):</span>
                <span>${quote.gst.toFixed(2)}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '10px 0', 
                fontSize: '20px', 
                fontWeight: 'bold',
                borderTop: '2px solid #333',
                color: '#FFD700'
              }}>
                <span>Total:</span>
                <span>${quote.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {quote.notes && (
            <div style={{ marginBottom: '30px' }}>
              <h4 style={{ fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>Notes:</h4>
              <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#666' }}>{quote.notes}</p>
            </div>
          )}

          {/* Accept Quote Button (only if status is 'sent') */}
          {quote.status === 'sent' && (
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <button
                onClick={acceptQuote}
                style={{
                  padding: '15px 30px',
                  backgroundColor: '#00FF00',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                Accept This Quote
              </button>
            </div>
          )}

          {/* Status Display */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <span style={{
              padding: '10px 20px',
              borderRadius: '5px',
              backgroundColor: quote.status === 'accepted' ? '#00FF00' : quote.status === 'sent' ? '#FFD700' : '#666',
              color: quote.status === 'sent' || quote.status === 'accepted' ? '#000' : '#fff',
              fontSize: '16px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontFamily: 'Inter, sans-serif'
            }}>
              Status: {quote.status}
            </span>
          </div>

          {/* Bank Details */}
          <div style={{ 
            marginTop: '30px', 
            backgroundColor: '#f8f8f8', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #ddd'
          }}>
            <h4 style={{ color: '#333', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>
              Payment Details (Upon Acceptance)
            </h4>
            <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.6' }}>
              <div><strong>Account Name:</strong> {businessData.bankAccountName}</div>
              <div><strong>BSB:</strong> {businessData.bankBSB}</div>
              <div><strong>Account Number:</strong> {businessData.bankAccountNumber}</div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: '40px', borderTop: '2px solid #333', paddingTop: '20px' }}>
            <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
              <p>Thank you for considering our services!</p>
              <p>This quote is valid until {new Date(quote.validUntil).toLocaleDateString('en-GB')}</p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <a href="/quotes" style={{
            padding: '12px 24px',
            backgroundColor: '#FFD700',
            color: '#000',
            textDecoration: 'none',
            borderRadius: '5px',
            fontWeight: 'bold',
            fontFamily: 'Inter, sans-serif'
          }}>
            ← Back to Quotes
          </a>
        </div>
      </div>
    </Layout>
  );
}
