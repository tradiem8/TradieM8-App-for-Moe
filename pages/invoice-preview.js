
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function InvoicePreview() {
  const [businessData, setBusinessData] = useState(null);
  const [invoiceTemplate, setInvoiceTemplate] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const businessResponse = await fetch('/api/check-setup');
      const businessResult = await businessResponse.json();
      if (businessResult.isSetup) {
        setBusinessData(businessResult.business);
      }

      // Load invoice template
      const invoiceResponse = await fetch('/data/invoice-template.json');
      const invoiceResult = await invoiceResponse.json();
      setInvoiceTemplate(invoiceResult);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  if (!businessData || !invoiceTemplate) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ color: '#FFD700', fontSize: '18px', fontFamily: 'Inter, sans-serif' }}>Loading invoice template...</div>
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
            Invoice Template Preview
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            This is how your invoices will look when generated
          </p>
        </div>

        <div style={invoiceStyle}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', borderBottom: '3px solid #00FF00', paddingBottom: '20px' }}>
            <div>
              {businessData.logoPath && (
                <img 
                  src={businessData.logoPath} 
                  alt="Business Logo" 
                  style={{ maxHeight: '80px', marginBottom: '15px' }} 
                />
              )}
              <h2 style={{ 
                fontSize: '28px', 
                color: '#FFD700', 
                margin: '0 0 10px 0',
                fontFamily: 'Anton, sans-serif'
              }}>
                {businessData.businessName}
              </h2>
              <div style={{ fontSize: '14px', lineHeight: '1.5', color: '#333' }}>
                <div>ABN: {businessData.abn}</div>
                <div>Phone: {businessData.phone}</div>
                <div>Email: {businessData.email}</div>
                {businessData.website && <div>Website: {businessData.website}</div>}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <h1 style={{ 
                fontSize: '48px', 
                color: '#00FF00', 
                margin: '0',
                fontFamily: 'Anton, sans-serif',
                letterSpacing: '2px'
              }}>
                INVOICE
              </h1>
              <div style={{ fontSize: '16px', marginTop: '15px', color: '#333' }}>
                <div><strong>Invoice #:</strong> INV-001</div>
                <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                <div><strong>Due Date:</strong> {new Date(Date.now() + (invoiceTemplate.settings.paymentTerms * 24 * 60 * 60 * 1000)).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Bill To Section */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: '#FFD700', fontSize: '18px', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Bill To:</h3>
            <div style={{ backgroundColor: '#f8f8f8', padding: '15px', borderRadius: '5px', border: '1px solid #ddd' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Customer Name</div>
              <div>Customer Address</div>
              <div>City, State, Postal Code</div>
              <div>customer@email.com</div>
            </div>
          </div>

          {/* Services Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
            <thead>
              <tr style={{ backgroundColor: '#00FF00' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#000', fontFamily: 'Inter, sans-serif' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#000', fontFamily: 'Inter, sans-serif' }}>Qty</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#000', fontFamily: 'Inter, sans-serif' }}>Rate</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#000', fontFamily: 'Inter, sans-serif' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px', fontFamily: 'Inter, sans-serif' }}>Gutter Guard Installation</td>
                <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>1</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>$1,500.00</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>$1,500.00</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '12px', fontFamily: 'Inter, sans-serif' }}>Gutter Cleaning</td>
                <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>1</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>$300.00</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif' }}>$300.00</td>
              </tr>
            </tbody>
          </table>

          {/* Totals */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
            <div style={{ minWidth: '250px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: 'Inter, sans-serif' }}>
                <span>Subtotal:</span>
                <span>$1,800.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontFamily: 'Inter, sans-serif' }}>
                <span>GST (10%):</span>
                <span>$180.00</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '12px 0', 
                borderTop: '2px solid #00FF00',
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#00FF00',
                fontFamily: 'Inter, sans-serif'
              }}>
                <span>Total:</span>
                <span>$1,980.00</span>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '20px', 
            borderRadius: '5px',
            border: '1px solid #FFD700',
            marginBottom: '20px'
          }}>
            <h4 style={{ color: '#FF6600', margin: '0 0 10px 0', fontFamily: 'Inter, sans-serif' }}>Payment Terms</h4>
            <p style={{ margin: '0', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
              Payment is due within {invoiceTemplate.settings.paymentTerms} days of the invoice date.
              Late payments may incur additional charges.
            </p>
          </div>

          {/* Footer */}
          <div style={{ textAlign: 'center', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
            <p style={{ color: '#00FF00', fontSize: '16px', fontWeight: 'bold', margin: '0', fontFamily: 'Inter, sans-serif' }}>
              Thank you for your business!
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            onClick={() => window.history.back()}
            style={{
              padding: '12px 30px',
              backgroundColor: '#00FF00',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
}
