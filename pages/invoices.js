
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Invoices() {
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
            Invoice Management
          </h1>
          <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif' }}>
            Create, send, and track your invoices
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #00FF00',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#00FF00', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
              Create New Invoice
            </h3>
            <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}>
              Generate a new invoice for your customer
            </p>
            <a href="/create-invoice" style={{
              color: '#fff',
              backgroundColor: '#00FF00',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}>
              + Create Invoice
            </a>
          </div>

          <div style={{
            backgroundColor: '#2a2a2a',
            padding: '30px',
            borderRadius: '12px',
            border: '2px solid #FFD700',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#FFD700', fontSize: '24px', marginBottom: '15px', fontFamily: 'Inter, sans-serif' }}>
              Preview Template
            </h3>
            <p style={{ color: '#cccccc', fontFamily: 'Inter, sans-serif', marginBottom: '20px' }}>
              View your invoice template design
            </p>
            <a href="/invoice-preview" style={{
              color: '#FFD700',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
              padding: '12px 24px',
              border: '2px solid #FFD700',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}>
              Preview Template →
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
