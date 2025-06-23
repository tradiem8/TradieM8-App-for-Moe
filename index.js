const { Client } = require('@replit/object-storage');
const fs = require('fs');
const path = require('path');

async function downloadProjectFiles() {
  try {
    const client = new Client();

    console.log('📦 Downloading project files from Object Storage...');

    // List all objects with the tradiem8/ prefix
    const objects = await client.list();
    const tradiem8Objects = objects.filter(obj => obj.key.startsWith('tradiem8/'));
    console.log(`Found ${tradiem8Objects.length} files to download`);

    for (const obj of tradiem8Objects) {
      const fileName = obj.key.replace('tradiem8/', '');
      const filePath = path.join('.', fileName);

      // Create directory if it doesn't exist
      const dir = path.dirname(filePath);
      if (dir !== '.' && !fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Download file
      const buffer = await client.downloadAsBytes(obj.key);
      fs.writeFileSync(filePath, buffer);

      console.log(`✓ Downloaded: ${fileName}`);
    }

    console.log('\n🎉 All files downloaded successfully!');
    console.log('📋 Next steps:');
    console.log('1. Run: npm install');
    console.log('2. Run: npm run dev');
    console.log('3. Start building your app!');

  } catch (error) {
    console.error('Error downloading files:', error);
  }
}

downloadProjectFiles().catch(console.error);