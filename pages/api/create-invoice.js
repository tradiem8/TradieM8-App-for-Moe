
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { customerId, ...invoiceData } = req.body;

    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Load customer data
    const customersPath = path.join(dataDir, 'customers.json');
    let customers = [];
    if (fs.existsSync(customersPath)) {
      const customersData = JSON.parse(fs.readFileSync(customersPath, 'utf8'));
      customers = customersData.customers || [];
    }

    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
      return res.status(400).json({ message: 'Customer not found' });
    }

    // Create invoice object
    const invoice = {
      id: `inv_${Date.now()}`,
      customerId,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address || '',
        serviceAddress: customer.serviceAddress || customer.address || ''
      },
      ...invoiceData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to invoices database
    const invoicesPath = path.join(dataDir, 'invoices.json');
    let invoicesData = { invoices: [] };
    
    if (fs.existsSync(invoicesPath)) {
      invoicesData = JSON.parse(fs.readFileSync(invoicesPath, 'utf8'));
    }

    invoicesData.invoices = invoicesData.invoices || [];
    invoicesData.invoices.push(invoice);

    fs.writeFileSync(invoicesPath, JSON.stringify(invoicesData, null, 2));

    res.status(201).json({
      message: 'Invoice created successfully',
      invoiceId: invoice.id,
      invoice
    });

  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: 'Error creating invoice' });
  }
}
