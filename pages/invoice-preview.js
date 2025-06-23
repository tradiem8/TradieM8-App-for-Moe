import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function InvoicePreview() {
  const router = useRouter();
  const { id } = router.query;
  const [businessData, setBusinessData] = useState(null);
  const [invoiceTemplate, setInvoiceTemplate] = useState(null);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    try {
      const businessResponse = await fetch('/api/check-setup');
      const businessResult = await businessResponse.json();
      if (businessResult.isSetup) {
        setBusinessData(businessResult.business);
      }

      // Use business data as template
      setInvoiceTemplate({
        template: {
          footer: {
            message: "Thank you for your business!",
            paymentInstructions: "Payment due within payment terms",
            bankDetails: {
              accountName: "I.T. Pene",
              bsb: "923100", 
              accountNumber: "302324547"
            }
          }
        }
      });

      // Load specific invoice
      const invoiceDataResponse = await fetch(`/api/invoice/${id}`);
      if (invoiceDataResponse.ok) {
        const invoiceData = await invoiceDataResponse.json();
        setInvoice(invoiceData.invoice);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    const invoiceHTML = document.getElementById('invoice-content').innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice ${invoice?.invoiceNumber || 'Preview'}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ccc; padding: 12px; text-align: left; }
            th { background-color: #f5f5f5; }
            .header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .totals { margin-top: 20px; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body onload="window.print(); window.close();">
          ${invoiceHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!businessData || !invoice) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ color: '#FFD700', fontSize: '18px', fontFamily: 'Inter, sans-serif' }}>
            {!id ? 'No invoice ID provided' : 'Loading invoice...'}
          </div>
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

        <div id="invoice-content" style={invoiceStyle}>
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
                <div style={{ marginBottom: '4px' }}>{businessData.businessName}</div>
                <div style={{ marginBottom: '4px' }}>{businessData.address}</div>
                <div style={{ marginBottom: '4px' }}>{businessData.phone}</div>
                <div style={{ marginBottom: '4px' }}>{businessData.email}</div>
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
                  <span>{new Date(invoice.invoiceDate).toLocaleDateString('en-GB')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>Invoice Number</span>
                  <span>{invoice.invoiceNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>Reference</span>
                  <span>{invoice.reference || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 'bold' }}>ABN</span>
                  <span>{businessData.abn}</span>
                </div>
              </div>

              {/* Bill To Section */}
              <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>BILL TO:</div>
                <div style={{ fontSize: '14px', lineHeight: '1.4', color: '#333' }}>
                  <div>{invoice.customer.name}</div>
                  <div>{invoice.customer.email}</div>
                  <div>{invoice.customer.phone}</div>
                  <div>{invoice.customer.serviceAddress}</div>
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
              {invoice.items.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '12px', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc', verticalAlign: 'top' }}>
                    {item.description}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>{item.quantity}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>${item.unitPrice.toFixed(2)}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>{item.gst}</td>
                  <td style={{ padding: '12px', textAlign: 'right', fontFamily: 'Inter, sans-serif', border: '1px solid #ccc' }}>${(item.quantity * item.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals Section */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
            <div style={{ minWidth: '300px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', borderBottom: '1px solid #eee' }}>
                <span>Subtotal</span>
                <span>${invoice.subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', borderBottom: '1px solid #eee' }}>
                <span>TOTAL GST 10%</span>
                <span>${invoice.gst.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', borderBottom: '2px solid #333', fontWeight: 'bold' }}>
                <span>TOTAL AUD</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', fontFamily: 'Inter, sans-serif', fontWeight: 'bold', fontSize: '16px' }}>
                <span>AMOUNT DUE AUD</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
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
              Payment Details
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
              <p>Thank you for your business!</p>
              <p>Payment due within {businessData.invoiceTerms} days</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            onClick={generatePDF}
            style={{
              padding: '12px 30px',
              backgroundColor: '#FFD700',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            Download PDF
          </button>
          <button 
            onClick={() => router.push('/invoices')}
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
            Back to Invoices
          </button>
        </div>
      </div>
    </Layout>
  );
}