
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const dataDir = path.join(process.cwd(), 'data');
  const leadsFile = path.join(dataDir, 'leads.json');

  // Ensure data directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Initialize leads file if it doesn't exist
  if (!fs.existsSync(leadsFile)) {
    fs.writeFileSync(leadsFile, JSON.stringify({ leads: [] }, null, 2));
  }

  try {
    const leadsData = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));

    if (req.method === 'GET') {
      // Return all leads
      res.status(200).json(leadsData);
    } 
    else if (req.method === 'POST') {
      // Add new lead
      const { name, email, phone, service, location, notes, status, source } = req.body;

      if (!name || !email || !phone || !service) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const newLead = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        service,
        location: location || '',
        notes: notes || '',
        status: status || 'new',
        source: source || 'manual', // 'manual' or 'ai-agent'
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      leadsData.leads.push(newLead);
      fs.writeFileSync(leadsFile, JSON.stringify(leadsData, null, 2));

      res.status(201).json({ message: 'Lead added successfully', lead: newLead });
    }
    else if (req.method === 'PUT') {
      // Update lead status
      const { id, status } = req.body;

      const leadIndex = leadsData.leads.findIndex(lead => lead.id === id);
      if (leadIndex === -1) {
        return res.status(404).json({ message: 'Lead not found' });
      }

      leadsData.leads[leadIndex].status = status;
      leadsData.leads[leadIndex].updatedAt = new Date().toISOString();

      fs.writeFileSync(leadsFile, JSON.stringify(leadsData, null, 2));

      res.status(200).json({ message: 'Lead updated successfully', lead: leadsData.leads[leadIndex] });
    }
    else if (req.method === 'DELETE') {
      // Delete lead
      const { id } = req.body;

      const leadIndex = leadsData.leads.findIndex(lead => lead.id === id);
      if (leadIndex === -1) {
        return res.status(404).json({ message: 'Lead not found' });
      }

      leadsData.leads.splice(leadIndex, 1);
      fs.writeFileSync(leadsFile, JSON.stringify(leadsData, null, 2));

      res.status(200).json({ message: 'Lead deleted successfully' });
    }
    else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling leads:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
