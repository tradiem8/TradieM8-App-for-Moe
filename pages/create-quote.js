
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function CreateQuote() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    quoteNumber: `QUO-${Math.floor(Math.random() * 1000000)}`,
    quoteDate: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days from now
    reference: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, gst: '10%' }],
    notes: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      setCustomers(data.customers || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, gst: '10%' }]
    }));
  };

  const removeItem = (index) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const updateItem = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => {
      return sum + (item.quantity * item.unitPrice);
    }, 0);
    
    const gst = subtotal * 0.1; // 10% GST
    const total = subtotal + gst;
    
    return { subtotal, gst, total };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { subtotal, gst, total } = calculateTotals();
      
      const quoteData = {
        ...formData,
        subtotal,
        gst,
        total
      };

      console.log('Submitting quote:', quoteData);

      const response = await fetch('/api/create-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteData),
      });

      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok) {
        alert('Quote created successfully!');
        window.location.href = '/quotes';
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error creating quote:', error);
      alert('Error creating quote');
    } finally {
      setLoading(false);
    }
  };

  const { subtotal, gst, total } = calculateTotals();

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{
            fontSize: '36px',
            color: '#FFD700',
            fontFamily: 'Anton, sans-serif',
            marginBottom: '10px'
          }}>
            Create New Quote
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Generate a professional quote for your customer
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#2a2a2a',
          padding: '30px',
          borderRadius: '12px',
          border: '2px solid #FFD700'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#FFD700', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                Customer *
              </label>
              <select
                value={formData.customerId}
                onChange={(e) => setFormData(prev => ({ ...prev, customerId: e.target.value }))}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif'
                }}
              >
                <option value="">Select a customer</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ color: '#FFD700', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                Quote Number
              </label>
              <input
                type="text"
                value={formData.quoteNumber}
                onChange={(e) => setFormData(prev => ({ ...prev, quoteNumber: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ color: '#FFD700', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                Quote Date
              </label>
              <input
                type="date"
                value={formData.quoteDate}
                onChange={(e) => setFormData(prev => ({ ...prev, quoteDate: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{ color: '#FFD700', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                Valid Until
              </label>
              <input
                type="date"
                value={formData.validUntil}
                onChange={(e) => setFormData(prev => ({ ...prev, validUntil: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            <div>
              <label style={{ color: '#FFD700', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                Reference
              </label>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData(prev => ({ ...prev, reference: e.target.value }))}
                placeholder="Job reference"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '5px',
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#FFD700', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>Quote Items</h3>
            
            {formData.items.map((item, index) => (
              <div key={index} style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
                gap: '10px',
                marginBottom: '10px',
                alignItems: 'end'
              }}>
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #555',
                    backgroundColor: '#333',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #555',
                    backgroundColor: '#333',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
                <input
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(index, 'unitPrice', parseFloat(e.target.value) || 0)}
                  style={{
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #555',
                    backgroundColor: '#333',
                    color: '#fff',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
                <div style={{ 
                  padding: '10px', 
                  color: '#fff', 
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'right',
                  minWidth: '80px'
                }}>
                  ${(item.quantity * item.unitPrice).toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  style={{
                    padding: '10px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addItem}
              style={{
                padding: '10px 20px',
                backgroundColor: '#FFD700',
                color: '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontFamily: 'Inter, sans-serif',
                marginTop: '10px'
              }}
            >
              Add Item
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: '#FFD700', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes or terms"
              rows={3}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #555',
                backgroundColor: '#333',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{
            backgroundColor: '#333',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ color: '#FFD700', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>Quote Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>Subtotal:</span>
              <span style={{ color: '#fff', fontFamily: 'Inter, sans-serif' }}>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ color: '#ccc', fontFamily: 'Inter, sans-serif' }}>GST (10%):</span>
              <span style={{ color: '#fff', fontFamily: 'Inter, sans-serif' }}>${gst.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #555', paddingTop: '5px' }}>
              <span style={{ color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>Total:</span>
              <span style={{ color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: loading ? '#666' : '#FFD700',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            {loading ? 'Creating Quote...' : 'Create Quote'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
