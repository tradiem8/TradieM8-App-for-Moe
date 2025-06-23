
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
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

    const leadsData = JSON.parse(fs.readFileSync(leadsFile, 'utf8'));

    // Extract data from AI agent call
    const { 
      name, 
      email, 
      phone, 
      service, 
      location, 
      notes, 
      callId,
      callDuration,
      aiTranscript 
    } = req.body;

    // Validate required fields
    if (!name || !phone || !service) {
      return res.status(400).json({ 
        message: 'Missing required fields: name, phone, and service are required' 
      });
    }

    // Create new lead from AI agent data
    const newLead = {
      id: Date.now().toString(),
      name,
      email: email || '',
      phone,
      service,
      location: location || '',
      notes: notes || '',
      status: 'new',
      source: 'ai-agent',
      callId: callId || '',
      callDuration: callDuration || '',
      aiTranscript: aiTranscript || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add enhanced notes for AI-generated leads
    if (aiTranscript) {
      newLead.notes = `AI Call Summary: ${notes || ''}\n\nCall Transcript: ${aiTranscript}`.trim();
    }

    leadsData.leads.push(newLead);
    fs.writeFileSync(leadsFile, JSON.stringify(leadsData, null, 2));

    // Log successful AI lead capture
    console.log(`🤖 AI Agent Lead Captured: ${name} - ${service}`);

    res.status(201).json({ 
      message: 'AI lead captured successfully', 
      lead: newLead,
      leadId: newLead.id
    });

  } catch (error) {
    console.error('Error processing AI lead:', error);
    res.status(500).json({ message: 'Error processing AI lead submission' });
  }
}
