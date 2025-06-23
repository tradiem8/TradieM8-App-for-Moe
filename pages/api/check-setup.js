
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const profilePath = path.join(process.cwd(), 'data', 'profile.json');
    
    if (fs.existsSync(profilePath)) {
      const profileData = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
      res.status(200).json({
        isSetup: true,
        business: profileData
      });
    } else {
      res.status(200).json({
        isSetup: false
      });
    }
  } catch (error) {
    console.error('Check setup error:', error);
    res.status(500).json({ message: 'Error checking setup status' });
  }
}
