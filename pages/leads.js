
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    status: 'New',
    notes: '',
    address: '',
    estimatedValue: ''
  });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = () => {
    try {
      const savedLeads = localStorage.getItem('tradiem8_leads');
      if (savedLeads) {
        setLeads(JSON.parse(savedLeads));
      }
    } catch (error) {
      console.error('Error loading leads:', error);
    }
  };

  const saveLeads = (updatedLeads) => {
    try {
      localStorage.setItem('tradiem8_leads', JSON.stringify(updatedLeads));
      setLeads(updatedLeads);
    } catch (error) {
      console.error('Error saving leads:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lead = {
      ...newLead,
      id: Date.now(),
      dateCreated: new Date().toLocaleDateString()
    };
    const updatedLeads = [...leads, lead];
    saveLeads(updatedLeads);
    setNewLead({
      name: '',
      email: '',
      phone: '',
      service: '',
      status: 'New',
      notes: '',
      address: '',
      estimatedValue: ''
    });
    setShowAddForm(false);
  };

  const updateLeadStatus = (leadId, newStatus) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId ? { ...lead, status: newStatus } : lead
    );
    saveLeads(updatedLeads);
  };

  const deleteLead = (leadId) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      const updatedLeads = leads.filter(lead => lead.id !== leadId);
      saveLeads(updatedLeads);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return '#FFD700';
      case 'Contacted': return '#00FF00';
      case 'Quoted': return '#FF6600';
      case 'Won': return '#00AA00';
      case 'Lost': return '#FF0000';
      default: return '#cccccc';
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    backgroundColor: '#2a2a2a',
    border: '2px solid #444',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif'
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#00FF00',
    color: '#000000',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.3s ease'
  };

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
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

        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              ...buttonStyle,
              backgroundColor: showAddForm ? '#FF6600' : '#00FF00'
            }}
          >
            {showAddForm ? 'Cancel' : '+ Add New Lead'}
          </button>
        </div>

        {showAddForm && (
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #00FF00',
            marginBottom: '30px'
          }}>
            <h3 style={{ color: '#00FF00', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
              Add New Lead
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div>
                  <label style={{ color: '#cccccc', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newLead.name}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label style={{ color: '#cccccc', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={newLead.email}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label style={{ color: '#cccccc', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={newLead.phone}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label style={{ color: '#cccccc', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                    Service Required
                  </label>
                  <input
                    type="text"
                    name="service"
                    value={newLead.service}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="e.g., Plumbing, Electrical, etc."
                  />
                </div>

                <div>
                  <label style={{ color: '#cccccc', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={newLead.address}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="Job address"
                  />
                </div>

                <div>
                  <label style={{ color: '#cccccc', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    name="estimatedValue"
                    value={newLead.estimatedValue}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="Estimated job value"
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label style={{ color: '#cccccc', display: 'block', marginBottom: '5px', fontFamily: 'Inter, sans-serif' }}>
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={newLead.notes}
                  onChange={handleInputChange}
                  style={{
                    ...inputStyle,
                    height: '100px',
                    resize: 'vertical'
                  }}
                  placeholder="Additional notes about this lead..."
                />
              </div>

              <button type="submit" style={buttonStyle}>
                Add Lead
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
          <h3 style={{ color: '#FFD700', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            Current Leads ({leads.length})
          </h3>

          {leads.length === 0 ? (
            <p style={{ color: '#cccccc', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
              No leads yet. Add your first lead to get started!
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #444' }}>
                    <th style={{ color: '#FFD700', padding: '12px', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Name</th>
                    <th style={{ color: '#FFD700', padding: '12px', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Contact</th>
                    <th style={{ color: '#FFD700', padding: '12px', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Service</th>
                    <th style={{ color: '#FFD700', padding: '12px', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Value</th>
                    <th style={{ color: '#FFD700', padding: '12px', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Status</th>
                    <th style={{ color: '#FFD700', padding: '12px', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Date</th>
                    <th style={{ color: '#FFD700', padding: '12px', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} style={{ borderBottom: '1px solid #444' }}>
                      <td style={{ color: '#ffffff', padding: '12px', fontFamily: 'Inter, sans-serif' }}>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{lead.name}</div>
                          {lead.address && <div style={{ fontSize: '14px', color: '#cccccc' }}>{lead.address}</div>}
                        </div>
                      </td>
                      <td style={{ color: '#ffffff', padding: '12px', fontFamily: 'Inter, sans-serif' }}>
                        <div>{lead.phone}</div>
                        {lead.email && <div style={{ fontSize: '14px', color: '#cccccc' }}>{lead.email}</div>}
                      </td>
                      <td style={{ color: '#ffffff', padding: '12px', fontFamily: 'Inter, sans-serif' }}>{lead.service}</td>
                      <td style={{ color: '#ffffff', padding: '12px', fontFamily: 'Inter, sans-serif' }}>
                        {lead.estimatedValue ? `$${lead.estimatedValue}` : '-'}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          style={{
                            backgroundColor: '#1a1a1a',
                            color: getStatusColor(lead.status),
                            border: `2px solid ${getStatusColor(lead.status)}`,
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 'bold'
                          }}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>
                      <td style={{ color: '#ffffff', padding: '12px', fontFamily: 'Inter, sans-serif' }}>{lead.dateCreated}</td>
                      <td style={{ padding: '12px' }}>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#FF0000',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {leads.length > 0 && (
          <div style={{
            marginTop: '30px',
            padding: '20px',
            backgroundColor: '#2a2a2a',
            borderRadius: '12px',
            border: '2px solid #00FF00'
          }}>
            <h4 style={{ color: '#00FF00', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
              Lead Summary
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', color: '#FFD700', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  {leads.filter(l => l.status === 'New').length}
                </div>
                <div style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>New Leads</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', color: '#00FF00', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  {leads.filter(l => l.status === 'Contacted').length}
                </div>
                <div style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>Contacted</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', color: '#FF6600', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  {leads.filter(l => l.status === 'Quoted').length}
                </div>
                <div style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>Quoted</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', color: '#00AA00', fontWeight: 'bold', fontFamily: 'Inter, sans-serif' }}>
                  {leads.filter(l => l.status === 'Won').length}
                </div>
                <div style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>Won</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
