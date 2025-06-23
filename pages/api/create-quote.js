
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { customerId, ...quoteData } = req.body;

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

    // Create quote object
    const quote = {
      id: `quo_${Date.now()}`,
      customerId,
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address || '',
        serviceAddress: customer.serviceAddress || customer.address || ''
      },
      ...quoteData,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Load existing quotes
    const quotesPath = path.join(dataDir, 'quotes.json');
    let quotesData = { quotes: [] };
    if (fs.existsSync(quotesPath)) {
      quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
    }

    // Add new quote
    quotesData.quotes = quotesData.quotes || [];
    quotesData.quotes.push(quote);

    // Save quotes
    fs.writeFileSync(quotesPath, JSON.stringify(quotesData, null, 2));

    res.status(200).json({
      message: 'Quote created successfully',
      quoteId: quote.id,
      quote
    });

  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ message: 'Error creating quote' });
  }
}
