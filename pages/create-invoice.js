
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function CreateInvoice() {
  const router = useRouter();
  const [businessData, setBusinessData] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    reference: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, gst: '10%' }],
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
    generateInvoiceNumber();
  }, []);

  const loadData = async () => {
    try {
      // Load business data
      const businessResponse = await fetch('/api/check-setup');
      const businessResult = await businessResponse.json();
      if (businessResult.isSetup) {
        setBusinessData(businessResult.business);
        
        // Calculate due date based on payment terms
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + (businessResult.business.invoiceTerms || 30));
        setInvoiceData(prev => ({
          ...prev,
          dueDate: dueDate.toISOString().split('T')[0]
        }));
      }

      // Load customers
      const customersResponse = await fetch('/api/customers');
      if (customersResponse.ok) {
        const customersResult = await customersResponse.json();
        setCustomers(customersResult.customers || []);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const generateInvoiceNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: `INV-${timestamp}`
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setInvoiceData(prev => ({
      ...prev,
      items: newItems
    }));
  };

  const addItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, gst: '10%' }]
    }));
  };

  const removeItem = (index) => {
    if (invoiceData.items.length > 1) {
      const newItems = invoiceData.items.filter((_, i) => i !== index);
      setInvoiceData(prev => ({
        ...prev,
        items: newItems
      }));
    }
  };

  const calculateSubtotal = () => {
    return invoiceData.items.reduce((total, item) => {
      return total + (item.quantity * item.unitPrice);
    }, 0);
  };

  const calculateGST = () => {
    return invoiceData.items.reduce((total, item) => {
      const itemTotal = item.quantity * item.unitPrice;
      return item.gst === '10%' ? total + (itemTotal * 0.1) : total;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateGST();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomer) {
      alert('Please select a customer');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerId: selectedCustomer,
          ...invoiceData,
          subtotal: calculateSubtotal(),
          gst: calculateGST(),
          total: calculateTotal()
        })
      });

      if (response.ok) {
        const result = await response.json();
        router.push(`/invoice-preview?id=${result.invoiceId}`);
      } else {
        throw new Error('Failed to create invoice');
      }
    } catch (error) {
      console.error('Error creating invoice:', error);
      alert('Error creating invoice. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2a2a2a',
    border: '2px solid #333',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif'
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#00FF00',
    color: '#000',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif'
  };

  if (!businessData) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <div style={{ color: '#FFD700', fontSize: '18px', fontFamily: 'Inter, sans-serif' }}>Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '36px',
            color: '#FFD700',
            fontFamily: 'Anton, sans-serif',
            marginBottom: '10px'
          }}>
            Create New Invoice
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Generate a professional invoice for your customer
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ backgroundColor: '#2a2a2a', padding: '30px', borderRadius: '12px', border: '2px solid #FFD700' }}>
          {/* Customer Selection */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
              Select Customer *
            </label>
            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              style={inputStyle}
              required
            >
              <option value="">Choose a customer...</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.email}
                </option>
              ))}
            </select>
          </div>

          {/* Invoice Details */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                Invoice Number *
              </label>
              <input
                type="text"
                name="invoiceNumber"
                value={invoiceData.invoiceNumber}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                Invoice Date *
              </label>
              <input
                type="date"
                name="invoiceDate"
                value={invoiceData.invoiceDate}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                Due Date *
              </label>
              <input
                type="date"
                name="dueDate"
                value={invoiceData.dueDate}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>
          </div>

          {/* Reference */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
              Reference
            </label>
            <input
              type="text"
              name="reference"
              value={invoiceData.reference}
              onChange={handleInputChange}
              style={inputStyle}
              placeholder="Job reference or description"
            />
          </div>

          {/* Invoice Items */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '15px', color: '#FFD700', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Inter, sans-serif' }}>
              Invoice Items
            </label>
            
            {invoiceData.items.map((item, index) => (
              <div key={index} style={{ 
                backgroundColor: '#333', 
                padding: '20px', 
                borderRadius: '8px', 
                marginBottom: '15px',
                border: '1px solid #555'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '15px', alignItems: 'end' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontFamily: 'Inter, sans-serif' }}>
                      Description *
                    </label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                      placeholder="Describe the service or product"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontFamily: 'Inter, sans-serif' }}>
                      Quantity *
                    </label>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)}
                      style={inputStyle}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontFamily: 'Inter, sans-serif' }}>
                      Unit Price ($) *
                    </label>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                      style={inputStyle}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#ccc', fontFamily: 'Inter, sans-serif' }}>
                      GST
                    </label>
                    <select
                      value={item.gst}
                      onChange={(e) => handleItemChange(index, 'gst', e.target.value)}
                      style={inputStyle}
                    >
                      <option value="10%">10%</option>
                      <option value="GST Free">GST Free</option>
                    </select>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      style={{
                        padding: '12px',
                        backgroundColor: '#FF6600',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      disabled={invoiceData.items.length === 1}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addItem}
              style={{
                ...buttonStyle,
                backgroundColor: '#FF6600',
                marginBottom: '20px'
              }}
            >
              + Add Item
            </button>
          </div>

          {/* Totals Display */}
          <div style={{ 
            backgroundColor: '#333', 
            padding: '20px', 
            borderRadius: '8px', 
            marginBottom: '25px',
            border: '1px solid #555'
          }}>
            <h3 style={{ color: '#FFD700', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>Invoice Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>Subtotal:</span>
              <span style={{ color: '#fff', fontFamily: 'Inter, sans-serif' }}>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>GST:</span>
              <span style={{ color: '#fff', fontFamily: 'Inter, sans-serif' }}>${calculateGST().toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #555', paddingTop: '10px' }}>
              <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Inter, sans-serif' }}>Total:</span>
              <span style={{ color: '#FFD700', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Inter, sans-serif' }}>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          {/* Notes */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={invoiceData.notes}
              onChange={handleInputChange}
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
              placeholder="Any additional notes or terms..."
            />
          </div>

          {/* Submit Buttons */}
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                ...buttonStyle,
                backgroundColor: '#666',
                color: '#fff'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={buttonStyle}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Invoice'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
