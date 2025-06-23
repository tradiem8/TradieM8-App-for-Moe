
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Customers() {
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
            Customer Management
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Manage your existing customers and their details
          </p>
        </div>

        <div style={{
          backgroundColor: '#2a2a2a',
          padding: '30px',
          borderRadius: '12px',
          border: '2px solid #00FF00',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
            Coming Soon
          </h3>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Customer management functionality will be available soon
          </p>
        </div>
      </div>
    </Layout>
  );
}
