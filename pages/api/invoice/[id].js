
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const dataDir = path.join(process.cwd(), 'data');
    const invoicesPath = path.join(dataDir, 'invoices.json');

    if (!fs.existsSync(invoicesPath)) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const invoicesData = JSON.parse(fs.readFileSync(invoicesPath, 'utf8'));
    const invoice = invoicesData.invoices.find(inv => inv.id === id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({
      success: true,
      invoice
    });

  } catch (error) {
    console.error('Error fetching invoice:', error);
    res.status(500).json({ message: 'Error fetching invoice' });
  }
}
