

import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Bookings() {
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
            Bookings & Jobs
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Schedule and manage your job bookings
          </p>
        </div>

        <div style={{
          backgroundColor: '#2a2a2a',
          padding: '30px',
          borderRadius: '12px',
          border: '2px solid #FF6600',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#FF6600', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
            Coming Soon
          </h3>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Job booking and scheduling functionality will be available soon
          </p>
        </div>
      </div>
    </Layout>
  );
}
