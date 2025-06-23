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
          {/* Header Section */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
            {/* Left side - Tax Invoice */}
            <div style={{ flex: '1' }}>
              <h1 style={{ 
                fontSize: '32px', 
                color: '#000', 
                margin: '0 0 20px 0',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 'bold'
              }}>
                TAX INVOICE
              </h1>
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#333', marginBottom: '20px' }}>
                <div style={{ marginBottom: '4px' }}>Oliver Krumins, 167 Brygon Creek Drive, Upper Coomera QLD 4209</div>
              </div>
            </div>

            {/* Right side - Logo and Invoice Details */}
            <div style={{ textAlign: 'right', minWidth: '300px' }}>
              {/* Logo or Placeholder */}
              <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                {businessData.logoPath ? (
                  <img 
                    src={businessData.logoPath} 
                    alt="Business Logo" 
                    style={{ maxHeight: '80px', maxWidth: '250px' }} 
                  />
                ) : (
                  <div style={{
                    width: '250px',
                    height: '80px',
                    backgroundColor: '#f0f0f0',
                    border: '2px dashed #ccc',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 'auto',
                    fontSize: '14px',
                    color: '#666',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Your Logo Here
                  </div>
                )}
              </div>

              {/* Invoice Details */}
              <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>Invoice Date</span>
                  <span>{new Date().toLocaleDateString('en-GB')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>Invoice Number</span>
                  <span>INV-1320</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>Reference</span>
                  <span>Deposit: Gutter Guard</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>ABN</span>
                  <span>{businessData.abn}</span>
                </div>
              </div>

              {/* Bill To Section */}
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>BIB QLD PTY LTD</div>
                <div style={{ fontSize: '14px', lineHeight: '1.4', color: '#333' }}>
                  <div>{businessData.businessName}</div>
                  <div>10 Pipers Point,</div>
                  <div>HELENSVALE QLD</div>
                  <div>AUSTRALIA, 4212</div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', border: '1px solid #ccc' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#000', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc', fontWeight: 'bold' }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'center', color: '#000', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc', fontWeight: 'bold' }}>Quantity</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#000', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc', fontWeight: 'bold' }}>Unit Price</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#000', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc', fontWeight: 'bold' }}>GST</th>
                <th style={{ padding: '12px', textAlign: 'right', color: '#000', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc', fontWeight: 'bold' }}>Amount AUD</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc', verticalAlign: 'top' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>DEPOSIT ONLY 30% of total line</div>
                  <br />
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Main House: Gutters (Corro Roof)</strong><br />
                    4mm Aluminium Mesh 250mm wide & Gutter Trim<br />
                    Colour: Paper Bark Mesh & Gutter Trim
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Main House: Valleys (Corro Roof)</strong><br />
                    4mm Aluminium Mesh 250mm wide & Gutter Trim<br />
                    Colour: Paper Bark Mesh
                  </div>
                  <div>
                    <strong>Rear Patio: Gutters (Corro Roof)</strong><br />
                    4mm Aluminium Mesh 250mm wide & Gutter Trim<br />
                    Colour: Wallaby Grey Mesh & Paperbark Gutter Trim
                  </div>
                </td>
                <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>1.00</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>1,557.2727</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>10%</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>1,557.27</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>Credit Card Fee 2.2%</td>
                <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>1.00</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>37.69</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>GST Free</td>
                <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>37.69</td>
              </tr>
            </tbody>
          </table>

          {/* Totals Section */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
            <div style={{ minWidth: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', borderBottom: '1px solid #eee' }}>
                <span>Subtotal</span>
                <span>1,594.96</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', borderBottom: '1px solid #eee' }}>
                <span>TOTAL GST 10%</span>
                <span>155.73</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #333', fontWeight: 'bold' }}>
                <span>TOTAL AUD</span>
                <span>1,750.69</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', borderBottom: '1px solid #eee' }}>
                <span>Less Amount Paid</span>
                <span>1,750.69</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: '16px' }}>
                <span>AMOUNT DUE AUD</span>
                <span>0.00</span>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>
              Due Date: {new Date(Date.now() + (invoiceTemplate.settings.paymentTerms * 24 * 60 * 60 * 1000)).toLocaleDateString('en-GB')}
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.5', fontFamily: 'Inter, sans-serif' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Please Make Payment into:</div>
              <div>Account Name: I.T. Pene</div>
              <div>BSB: 923100</div>
              <div>Account Number: 302324547</div>
            </div>
          </div>

          {/* Reference */}
          <div style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', color: '#666' }}>
            Reference Invoice Number and Name
          </div>
        

          {/* Bank Details */}
          {invoiceTemplate.template.footer.bankDetails && (
            <div style={{ 
              marginTop: '30px', 
              backgroundColor: '#f8f8f8', 
              padding: '20px', 
              borderRadius: '8px',
              border: '1px solid #ddd'
            }}>
              <h4 style={{ color: '#333', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>
                Payment Details
              </h4>
              <div style={{ fontSize: '14px', color: '#333', lineHeight: '1.6' }}>
                <div><strong>Account Name:</strong> {invoiceTemplate.template.footer.bankDetails.accountName}</div>
                <div><strong>BSB:</strong> {invoiceTemplate.template.footer.bankDetails.bsb}</div>
                <div><strong>Account Number:</strong> {invoiceTemplate.template.footer.bankDetails.accountNumber}</div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: '40px', borderTop: '2px solid #333', paddingTop: '20px' }}>
            <div style={{ textAlign: 'center', color: '#666', fontSize: '14px' }}>
              <p>{invoiceTemplate.template.footer.message}</p>
              <p>{invoiceTemplate.template.footer.paymentInstructions}</p>
            </div>
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