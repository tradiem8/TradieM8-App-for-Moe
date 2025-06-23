
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id } = req.query;
    
    const dataDir = path.join(process.cwd(), 'data');
    const quotesPath = path.join(dataDir, 'quotes.json');
    
    if (!fs.existsSync(quotesPath)) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    const quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
    const quote = quotesData.quotes.find(q => q.id === id);
    
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    // Load business profile
    const profilePath = path.join(dataDir, 'profile.json');
    let businessData = {};
    if (fs.existsSync(profilePath)) {
      businessData = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
    }

    res.status(200).json({ quote, business: businessData });
  } catch (error) {
    console.error('Error fetching quote:', error);
    res.status(500).json({ message: 'Error fetching quote' });
  }
}
