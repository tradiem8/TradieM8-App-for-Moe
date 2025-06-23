
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Invoices() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const response = await fetch('/api/invoices');
      if (response.ok) {
        const data = await response.json();
        setInvoices(data.invoices || []);
      }
    } catch (error) {
      console.error('Error loading invoices:', error);
    } finally {
      setLoading(false);
    }
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
            Invoice Management
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Create, send, and track your invoices
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #00FF00',
            textAlign: 'center',
            maxWidth: '400px',
            width: '100%'
          }}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
              Create New Invoice
            </h3>
            <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}>
              Generate a new invoice for your customer
            </p>
            <a href="/create-invoice" style={{
              color: '#fff',
              backgroundColor: '#00FF00',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}>
              + Create Invoice
            </a>
          </div>
        </div>

        {/* Invoice List */}
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ color: '#FFD700', fontSize: '28px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            Your Invoices
          </h2>
          
          {loading ? (
            <div style={{ textAlign: 'center', color: '#cccccc', padding: '40px' }}>
              Loading invoices...
            </div>
          ) : invoices.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#cccccc', padding: '40px' }}>
              No invoices created yet. Create your first invoice above!
            </div>
          ) : (
            <div style={{ 
              backgroundColor: '#2a2a2a', 
              borderRadius: '12px', 
              overflow: 'hidden',
              border: '2px solid #333'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#333' }}>
                    <th style={{ padding: '15px', textAlign: 'left', color: '#FFD700', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #555' }}>Invoice #</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: '#FFD700', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #555' }}>Customer</th>
                    <th style={{ padding: '15px', textAlign: 'left', color: '#FFD700', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #555' }}>Date</th>
                    <th style={{ padding: '15px', textAlign: 'right', color: '#FFD700', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #555' }}>Amount</th>
                    <th style={{ padding: '15px', textAlign: 'center', color: '#FFD700', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #555' }}>Status</th>
                    <th style={{ padding: '15px', textAlign: 'center', color: '#FFD700', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #555' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={invoice.id} style={{ 
                      backgroundColor: index % 2 === 0 ? '#2a2a2a' : '#333',
                      borderBottom: '1px solid #555'
                    }}>
                      <td style={{ padding: '15px', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
                        {invoice.invoiceNumber}
                      </td>
                      <td style={{ padding: '15px', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
                        {invoice.customer.name}
                      </td>
                      <td style={{ padding: '15px', color: '#fff', fontFamily: 'Inter, sans-serif' }}>
                        {new Date(invoice.invoiceDate).toLocaleDateString('en-GB')}
                      </td>
                      <td style={{ padding: '15px', color: '#fff', fontFamily: 'Inter, sans-serif', textAlign: 'right' }}>
                        ${invoice.total.toFixed(2)}
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 12px',
                          borderRadius: '15px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: invoice.status === 'paid' ? '#00FF00' : '#FF6600',
                          color: '#000',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {invoice.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <button
                          onClick={() => router.push(`/invoice-preview?id=${invoice.id}`)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#00FF00',
                            color: '#000',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
