
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    billingAddress: '',
    serviceAddress: '',
    sameAddress: true,
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (response.ok) {
        const data = await response.json();
        setCustomers(data.customers || []);
      }
    } catch (error) {
      console.error('Error loading customers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const customerData = {
        ...formData,
        serviceAddress: formData.sameAddress ? formData.billingAddress : formData.serviceAddress
      };

      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Customer created successfully!');
        setShowForm(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          billingAddress: '',
          serviceAddress: '',
          sameAddress: true,
          notes: ''
        });
        loadCustomers();
      } else {
        const error = await response.json();
        alert('Error creating customer: ' + error.message);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Error creating customer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1a1a1a',
    border: '2px solid #444',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'Inter, sans-serif'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#FFD700',
    fontWeight: 'bold',
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

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div>
            <h1 style={{
              fontSize: '36px',
              color: '#FFD700',
              fontFamily: 'Anton, sans-serif',
              marginBottom: '10px'
            }}>
              Customer Management
            </h1>
            <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
              Manage your existing customers and their details
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              ...buttonStyle,
              backgroundColor: showForm ? '#FF4444' : '#00FF00'
            }}
          >
            {showForm ? 'Cancel' : '+ Add Customer'}
          </button>
        </div>

        {showForm && (
          <div style={{ marginBottom: '40px' }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#2a2a2a', padding: '30px', borderRadius: '12px', border: '2px solid #00FF00' }}>
              <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '25px', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
                Add New Customer
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Customer Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="email@example.com"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="0400 000 000"
                    required
                  />
                </div>

                <div>
                  <label style={labelStyle}>Company (Optional)</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Billing Address *</label>
                <textarea
                  name="billingAddress"
                  value={formData.billingAddress}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  placeholder="Street Address, City, State, Postcode"
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    name="sameAddress"
                    checked={formData.sameAddress}
                    onChange={handleInputChange}
                    style={{ width: 'auto' }}
                  />
                  Service address is same as billing address
                </label>
              </div>

              {!formData.sameAddress && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Service Address *</label>
                  <textarea
                    name="serviceAddress"
                    value={formData.serviceAddress}
                    onChange={handleInputChange}
                    style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                    placeholder="Street Address, City, State, Postcode"
                    required={!formData.sameAddress}
                  />
                </div>
              )}

              <div style={{ marginBottom: '25px' }}>
                <label style={labelStyle}>Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                  placeholder="Any additional notes about this customer..."
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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
                  {isSubmitting ? 'Creating...' : 'Create Customer'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Customer List */}
        <div style={{ backgroundColor: '#2a2a2a', padding: '30px', borderRadius: '12px', border: '2px solid #00FF00' }}>
          <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '25px', fontFamily: 'Inter, sans-serif', textAlign: 'center' }}>
            Customer List ({customers.length})
          </h3>

          {customers.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
              No customers found. Add your first customer above.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {customers.map(customer => (
                <div key={customer.id} style={{
                  backgroundColor: '#1a1a1a',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #444'
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ color: '#FFD700', margin: '0 0 5px 0', fontFamily: 'Inter, sans-serif' }}>
                        {customer.name}
                      </h4>
                      <p style={{ color: '#cccccc', margin: '0 0 5px 0', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                        {customer.email}
                      </p>
                      {customer.company && (
                        <p style={{ color: '#999', margin: '0', fontSize: '12px', fontFamily: 'Inter, sans-serif' }}>
                          {customer.company}
                        </p>
                      )}
                    </div>
                    <div>
                      <p style={{ color: '#cccccc', margin: '0', fontSize: '14px', fontFamily: 'Inter, sans-serif' }}>
                        {customer.phone}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        color: customer.source === 'ai' ? '#FF6600' : '#00FF00',
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 'bold'
                      }}>
                        {customer.source === 'ai' ? 'AI Generated' : 'Manual Entry'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
