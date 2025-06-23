import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    notes: '',
    status: 'new'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          location: '',
          notes: '',
          status: 'new'
        });
        setShowForm(false);
        loadLeads();
      }
    } catch (error) {
      console.error('Error submitting lead:', error);
    }
    setIsSubmitting(false);
  };

  const updateLeadStatus = async (leadId, newStatus) => {
    try {
      const response = await fetch('/api/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });

      if (response.ok) {
        loadLeads();
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3a3a3a',
    border: '2px solid #555',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '15px'
  };

  const buttonStyle = {
    backgroundColor: '#00FF00',
    color: '#000000',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease'
  };

  const statusColors = {
    new: '#00FF00',
    contacted: '#FFD700',
    quoted: '#FF6600',
    converted: '#00BFFF',
    lost: '#FF4444'
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
              Leads Management
            </h1>
            <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
              Manage your potential customers and follow up opportunities
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            style={{
              ...buttonStyle,
              backgroundColor: showForm ? '#FF4444' : '#00FF00'
            }}
          >
            {showForm ? 'Cancel' : '+ Add Lead'}
          </button>
        </div>

        {showForm && (
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #00FF00',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
              Add New Lead
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name *"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
                <input
                  type="text"
                  name="service"
                  placeholder="Service Required *"
                  value={formData.service}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              <input
                type="text"
                name="location"
                placeholder="Location/Address"
                value={formData.location}
                onChange={handleInputChange}
                style={inputStyle}
              />
              <textarea
                name="notes"
                placeholder="Additional Notes"
                value={formData.notes}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  minHeight: '100px',
                  resize: 'vertical'
                }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  ...buttonStyle,
                  opacity: isSubmitting ? 0.6 : 1
                }}
              >
                {isSubmitting ? 'Adding Lead...' : 'Add Lead'}
              </button>
            </form>
          </div>
        )}

        <div style={{
          backgroundColor: '#2a2a2a',
          padding: '30px',
          borderRadius: '12px',
          border: '2px solid #FFD700'
        }}>
          <h3 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            Current Leads ({leads.length})
          </h3>

          {leads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
              No leads yet. Add your first lead or wait for AI agent calls.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '15px' }}>
              {leads.map((lead, index) => (
                <div key={lead.id || index} style={{
                  backgroundColor: '#3a3a3a',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `2px solid ${statusColors[lead.status] || '#555'}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '20px', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                        {lead.name}
                      </h4>
                      <p style={{ color: '#cccccc', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                        📧 {lead.email} | 📞 {lead.phone}
                      </p>
                      <p style={{ color: '#cccccc', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                        🔧 {lead.service}
                      </p>
                      {lead.location && (
                        <p style={{ color: '#cccccc', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                          📍 {lead.location}
                        </p>
                      )}
                      {lead.notes && (
                        <p style={{ color: '#cccccc', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>
                          "{lead.notes}"
                        </p>
                      )}
                    </div>
                    <select
                      value={lead.status}
                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                      style={{
                        backgroundColor: statusColors[lead.status],
                        color: '#000000',
                        border: 'none',
                        padding: '8px 12px',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="quoted">Quoted</option>
                      <option value="converted">Converted</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                  <div style={{ fontSize: '12px', color: '#888', fontFamily: 'Inter, sans-serif' }}>
                    Added: {new Date(lead.createdAt).toLocaleDateString()}
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