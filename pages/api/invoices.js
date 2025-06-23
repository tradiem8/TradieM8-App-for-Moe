
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const dataDir = path.join(process.cwd(), 'data');
    const invoicesPath = path.join(dataDir, 'invoices.json');

    if (!fs.existsSync(invoicesPath)) {
      return res.status(200).json({ invoices: [] });
    }

    const invoicesData = JSON.parse(fs.readFileSync(invoicesPath, 'utf8'));
    
    // Sort invoices by creation date (newest first)
    const sortedInvoices = (invoicesData.invoices || []).sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.status(200).json({
      success: true,
      invoices: sortedInvoices
    });

  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ message: 'Error fetching invoices' });
  }
}
