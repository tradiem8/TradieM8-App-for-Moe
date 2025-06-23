
const { Client } = require('@replit/object-storage');
const yauzl = require('yauzl');
const fs = require('fs');
const path = require('path');

async function extractAndUploadZip() {
  try {
    const client = new Client();
    const zipPath = './attached_assets/tradiem8-replit-ready_1750696825096.zip';
    
    console.log('Starting ZIP extraction and upload to Object Storage...');
    
    if (!fs.existsSync(zipPath)) {
      console.error('ZIP file not found at:', zipPath);
      return;
    }
    
    return new Promise((resolve, reject) => {
      yauzl.open(zipPath, { lazyEntries: true }, (err, zipfile) => {
        if (err) {
          console.error('Error opening ZIP file:', err);
          reject(err);
          return;
        }
        
        let fileCount = 0;
        let uploadedCount = 0;
        
        zipfile.readEntry();
        
        zipfile.on('entry', (entry) => {
          if (/\/$/.test(entry.fileName)) {
            // Directory entry, skip
            console.log(`Skipping directory: ${entry.fileName}`);
            zipfile.readEntry();
          } else {
            fileCount++;
            // File entry
            zipfile.openReadStream(entry, (err, readStream) => {
              if (err) {
                console.error(`Error reading ${entry.fileName}:`, err);
                zipfile.readEntry();
                return;
              }
              
              const chunks = [];
              readStream.on('data', (chunk) => chunks.push(chunk));
              readStream.on('end', async () => {
                try {
                  const buffer = Buffer.concat(chunks);
                  const objectName = `tradiem8/${entry.fileName}`;
                  
                  await client.uploadFromBytes(objectName, buffer);
                  uploadedCount++;
                  console.log(`✓ Uploaded (${uploadedCount}/${fileCount}): ${objectName}`);
                  
                  zipfile.readEntry();
                } catch (uploadErr) {
                  console.error(`✗ Error uploading ${entry.fileName}:`, uploadErr);
                  zipfile.readEntry();
                }
              });
              
              readStream.on('error', (err) => {
                console.error(`Stream error for ${entry.fileName}:`, err);
                zipfile.readEntry();
              });
            });
          }
        });
        
        zipfile.on('end', () => {
          console.log(`\n🎉 Extraction completed! ${uploadedCount} files uploaded to Object Storage.`);
          console.log('Files are stored under the "tradiem8/" prefix in your bucket.');
          resolve();
        });
        
        zipfile.on('error', (err) => {
          console.error('ZIP file processing error:', err);
          reject(err);
        });
      });
    });
    
  } catch (error) {
    console.error('Error during extraction process:', error);
  }
}

// Run the extraction
extractAndUploadZip().catch(console.error);
