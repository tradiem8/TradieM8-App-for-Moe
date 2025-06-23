
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const customersPath = path.join(process.cwd(), 'data', 'customers.json');

  if (req.method === 'GET') {
    try {
      if (fs.existsSync(customersPath)) {
        const data = JSON.parse(fs.readFileSync(customersPath, 'utf8'));
        res.status(200).json(data);
      } else {
        res.status(200).json({ customers: [] });
      }
    } catch (error) {
      console.error('Error reading customers:', error);
      res.status(500).json({ message: 'Error reading customers' });
    }
  } else if (req.method === 'POST') {
    try {
      const customerData = req.body;
      
      // Create customer object
      const customer = {
        id: `cust_${Date.now()}`,
        ...customerData,
        source: customerData.source || 'manual',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Load existing customers
      let customersData = { customers: [] };
      if (fs.existsSync(customersPath)) {
        customersData = JSON.parse(fs.readFileSync(customersPath, 'utf8'));
      }

      customersData.customers = customersData.customers || [];
      customersData.customers.push(customer);

      // Ensure data directory exists
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(customersPath, JSON.stringify(customersData, null, 2));

      res.status(201).json({
        message: 'Customer created successfully',
        customer
      });

    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ message: 'Error creating customer' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
