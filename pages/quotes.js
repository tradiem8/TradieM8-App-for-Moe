
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Quotes() {
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
            Quotes Management
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Create and manage quotes for your clients
          </p>
        </div>

        <div style={{
          backgroundColor: '#2a2a2a',
          padding: '30px',
          borderRadius: '12px',
          border: '2px solid #FFD700',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
            Coming Soon
          </h3>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Quote management functionality will be available soon
          </p>
        </div>
      </div>
    </Layout>
  );
}
