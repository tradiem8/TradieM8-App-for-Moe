
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      const quotesPath = path.join(dataDir, 'quotes.json');
      
      if (!fs.existsSync(quotesPath)) {
        return res.status(200).json({ quotes: [] });
      }

      const quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
      
      // Check for expired quotes and update status
      const now = new Date();
      let updated = false;
      
      quotesData.quotes = quotesData.quotes.map(quote => {
        if (quote.status === 'sent' && new Date(quote.validUntil) < now) {
          updated = true;
          return { ...quote, status: 'expired', updatedAt: new Date().toISOString() };
        }
        return quote;
      });
      
      // Save if any quotes were expired
      if (updated) {
        fs.writeFileSync(quotesPath, JSON.stringify(quotesData, null, 2));
      }
      
      res.status(200).json(quotesData);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      res.status(500).json({ message: 'Error fetching quotes' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { quoteId, status } = req.body;
      
      const dataDir = path.join(process.cwd(), 'data');
      const quotesPath = path.join(dataDir, 'quotes.json');
      
      if (!fs.existsSync(quotesPath)) {
        return res.status(404).json({ message: 'Quotes file not found' });
      }

      const quotesData = JSON.parse(fs.readFileSync(quotesPath, 'utf8'));
      const quoteIndex = quotesData.quotes.findIndex(q => q.id === quoteId);
      
      if (quoteIndex === -1) {
        return res.status(404).json({ message: 'Quote not found' });
      }

      quotesData.quotes[quoteIndex].status = status;
      quotesData.quotes[quoteIndex].updatedAt = new Date().toISOString();
      
      fs.writeFileSync(quotesPath, JSON.stringify(quotesData, null, 2));
      
      res.status(200).json({ 
        message: 'Quote status updated successfully',
        quote: quotesData.quotes[quoteIndex]
      });
    } catch (error) {
      console.error('Error updating quote:', error);
      res.status(500).json({ message: 'Error updating quote' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
