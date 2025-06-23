
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export default function Setup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    businessName: '',
    abn: '',
    phone: '',
    email: '',
    website: '',
    services: '',
    invoiceTerms: '30',
    logo: null
  });
  const [logoPreview, setLogoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        logo: file
      }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });

      const response = await fetch('/api/setup-business', {
        method: 'POST',
        body: submitData
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        alert('Error setting up business profile');
      }
    } catch (error) {
      console.error('Setup error:', error);
      alert('Error setting up business profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2a2a2a',
    border: '2px solid #00FF00',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'Inter, sans-serif'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    color: '#FFD700',
    fontWeight: '600',
    fontFamily: 'Inter, sans-serif'
  };

  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '48px',
            margin: '20px 0',
            color: '#FFD700',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
            fontFamily: 'Anton, sans-serif',
            fontWeight: '400',
            letterSpacing: '1px'
          }}>
            Business Setup
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#cccccc',
            marginBottom: '20px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          }}>
            Configure your business details for invoices and quotes
          </p>
          <div style={{
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, #00FF00, #FFD700, #FF6600)',
            margin: '0 auto'
          }}></div>
        </div>

        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#2a2a2a',
          padding: '40px',
          borderRadius: '12px',
          border: '2px solid #00FF00'
        }}>
          <div style={{ display: 'grid', gap: '25px' }}>
            <div>
              <label style={labelStyle}>Business Name *</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                style={inputStyle}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>ABN *</label>
              <input
                type="text"
                name="abn"
                value={formData.abn}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="12 345 678 901"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Business Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{
                  ...inputStyle,
                  padding: '8px'
                }}
              />
              {logoPreview && (
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    style={{
                      maxWidth: '200px',
                      maxHeight: '100px',
                      borderRadius: '8px',
                      border: '2px solid #FFD700'
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label style={labelStyle}>Services Offered *</label>
              <textarea
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  minHeight: '100px',
                  resize: 'vertical'
                }}
                placeholder="List your main services (e.g., Plumbing, Electrical, Carpentry)"
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Preferred Invoice Terms *</label>
              <select
                name="invoiceTerms"
                value={formData.invoiceTerms}
                onChange={handleInputChange}
                style={inputStyle}
                required
              >
                <option value="7">7 Days</option>
                <option value="14">14 Days</option>
                <option value="30">30 Days</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '16px 40px',
                background: isSubmitting ? '#666' : 'linear-gradient(135deg, #FFD700, #FF6600)',
                color: '#000000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontFamily: 'Inter, sans-serif',
                marginTop: '20px'
              }}
            >
              {isSubmitting ? 'Setting Up...' : 'Complete Setup'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
