
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function DigitalApprentice() {
  const [webhooks, setWebhooks] = useState([]);
  const [aiConfig, setAiConfig] = useState({
    enabled: false,
    callHandling: true,
    autoLeadCapture: true,
    welcomeMessage: "Hello! Thanks for calling, I'm the digital assistant for this business. How can I help you today?"
  });

  const replitUrl = typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://your-repl-url.replit.app';

  const availableWebhooks = [
    {
      name: 'AI Lead Capture',
      endpoint: '/api/ai-lead',
      description: 'Receives leads from AI phone calls',
      method: 'POST',
      active: true
    },
    {
      name: 'Make.com Integration',
      endpoint: '/api/webhook/make',
      description: 'General webhook for Make.com scenarios',
      method: 'POST',
      active: false
    },
    {
      name: 'Quote Acceptance',
      endpoint: '/api/webhook/quote-accepted',
      description: 'Triggered when customer accepts a quote',
      method: 'POST',
      active: false
    },
    {
      name: 'Invoice Payment',
      endpoint: '/api/webhook/payment-received',
      description: 'Notification for invoice payments',
      method: 'POST',
      active: false
    }
  ];

  const cardStyle = {
    padding: '25px',
    backgroundColor: '#2a2a2a',
    borderRadius: '12px',
    border: '2px solid #9D4EDD',
    marginBottom: '20px'
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#9D4EDD',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    fontWeight: '500',
    transition: 'all 0.3s ease'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1a1a1a',
    color: '#ffffff',
    border: '1px solid #444',
    borderRadius: '5px',
    fontFamily: 'Inter, sans-serif',
    marginBottom: '15px'
  };

  return (
    <Layout>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{
            fontSize: '42px',
            color: '#9D4EDD',
            fontFamily: 'Anton, sans-serif',
            marginBottom: '10px'
          }}>
            🤖 Digital Apprentice
          </h1>
          <p style={{ 
            color: '#cccccc', 
            fontFamily: 'Inter, sans-serif',
            fontSize: '18px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Your AI-powered assistant for call handling, lead capture, and business automation
          </p>
          <div style={{
            width: '100px',
            height: '3px',
            background: 'linear-gradient(90deg, #9D4EDD, #FFD700)',
            margin: '20px auto'
          }}></div>
        </div>

        {/* AI Configuration */}
        <div style={cardStyle}>
          <h2 style={{ color: '#9D4EDD', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            AI Assistant Configuration
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ color: '#cccccc', display: 'block', marginBottom: '8px', fontFamily: 'Inter, sans-serif' }}>
                Welcome Message:
              </label>
              <textarea
                value={aiConfig.welcomeMessage}
                onChange={(e) => setAiConfig({...aiConfig, welcomeMessage: e.target.value})}
                style={{
                  ...inputStyle,
                  height: '100px',
                  resize: 'vertical'
                }}
                placeholder="Enter the greeting message for AI calls..."
              />
            </div>
            <div>
              <h3 style={{ color: '#FFD700', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
                Features
              </h3>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={aiConfig.callHandling}
                    onChange={(e) => setAiConfig({...aiConfig, callHandling: e.target.checked})}
                    style={{ marginRight: '10px' }}
                  />
                  AI Call Handling
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    checked={aiConfig.autoLeadCapture}
                    onChange={(e) => setAiConfig({...aiConfig, autoLeadCapture: e.target.checked})}
                    style={{ marginRight: '10px' }}
                  />
                  Auto Lead Capture
                </label>
              </div>
              <button style={buttonStyle}>
                Save Configuration
              </button>
            </div>
          </div>
        </div>

        {/* Webhook Management */}
        <div style={cardStyle}>
          <h2 style={{ color: '#9D4EDD', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            Webhook Endpoints
          </h2>
          <p style={{ color: '#cccccc', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            Use these endpoints to integrate with Make.com, AI services, and other automation tools.
          </p>
          
          <div style={{ 
            backgroundColor: '#1a1a1a', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            border: '1px solid #444'
          }}>
            <div style={{ color: '#FFD700', fontWeight: 'bold', marginBottom: '10px', fontFamily: 'Inter, sans-serif' }}>
              Your Replit URL:
            </div>
            <div style={{ 
              color: '#00FF00', 
              fontFamily: 'Monaco, monospace', 
              fontSize: '14px',
              wordBreak: 'break-all'
            }}>
              {replitUrl}
            </div>
          </div>

          <div style={{ display: 'grid', gap: '15px' }}>
            {availableWebhooks.map((webhook, index) => (
              <div key={index} style={{
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                border: `1px solid ${webhook.active ? '#00FF00' : '#444'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      color: webhook.active ? '#00FF00' : '#FFD700', 
                      margin: '0 0 8px 0',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {webhook.name}
                    </h3>
                    <p style={{ 
                      color: '#cccccc', 
                      margin: '0 0 10px 0',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px'
                    }}>
                      {webhook.description}
                    </p>
                    <div style={{ 
                      fontFamily: 'Monaco, monospace', 
                      fontSize: '12px',
                      color: '#9D4EDD',
                      wordBreak: 'break-all'
                    }}>
                      <span style={{ color: '#FF6600' }}>{webhook.method}</span> {replitUrl}{webhook.endpoint}
                    </div>
                  </div>
                  <div style={{ 
                    padding: '5px 12px',
                    borderRadius: '20px',
                    backgroundColor: webhook.active ? '#00FF00' : '#666',
                    color: webhook.active ? '#000' : '#fff',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {webhook.active ? 'ACTIVE' : 'INACTIVE'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Make.com Integration */}
        <div style={cardStyle}>
          <h2 style={{ color: '#9D4EDD', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            Make.com Integration
          </h2>
          <p style={{ color: '#cccccc', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            Connect your TradieM8 with Make.com scenarios for advanced automation workflows.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h3 style={{ color: '#FFD700', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
                Quick Setup Guide:
              </h3>
              <ol style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
                <li>Copy the webhook URL above</li>
                <li>Create a new scenario in Make.com</li>
                <li>Add a "Webhook" trigger module</li>
                <li>Paste your webhook URL</li>
                <li>Configure your automation flow</li>
              </ol>
            </div>
            <div>
              <h3 style={{ color: '#FFD700', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
                Popular Scenarios:
              </h3>
              <ul style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif', lineHeight: '1.6' }}>
                <li>Auto-create calendar events from leads</li>
                <li>Send SMS notifications for new quotes</li>
                <li>Sync customer data with CRM</li>
                <li>Generate reports from invoice data</li>
                <li>Social media posts for completed jobs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* AI Call Logs */}
        <div style={cardStyle}>
          <h2 style={{ color: '#9D4EDD', marginBottom: '20px', fontFamily: 'Inter, sans-serif' }}>
            Recent AI Activity
          </h2>
          <div style={{
            backgroundColor: '#1a1a1a',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ color: '#666', fontFamily: 'Inter, sans-serif', fontSize: '16px' }}>
              No AI activity yet. Once your Digital Apprentice starts handling calls, activity will appear here.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
