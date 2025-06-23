
import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Parse form data
    const form = formidable({
      uploadDir: path.join(process.cwd(), 'public'),
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);

    // Extract form data
    const businessData = {
      businessName: fields.businessName[0],
      abn: fields.abn[0],
      phone: fields.phone[0],
      email: fields.email[0],
      website: fields.website?.[0] || '',
      services: fields.services[0],
      invoiceTerms: parseInt(fields.invoiceTerms[0]),
      logoPath: null,
      bankAccountName: fields.bankAccountName[0],
      bankBSB: fields.bankBSB[0],
      bankAccountNumber: fields.bankAccountNumber[0],
      createdAt: new Date().toISOString()
    };

    // Handle logo upload
    if (files.logo && files.logo[0]) {
      const logoFile = files.logo[0];
      const logoFileName = `logo-${Date.now()}${path.extname(logoFile.originalFilename)}`;
      const logoPath = path.join(process.cwd(), 'public', logoFileName);
      
      // Move file to public directory
      fs.renameSync(logoFile.filepath, logoPath);
      businessData.logoPath = `/${logoFileName}`;
    }

    // Save business profile
    const profilePath = path.join(dataDir, 'profile.json');
    fs.writeFileSync(profilePath, JSON.stringify(businessData, null, 2));

    // Generate invoice template
    const invoiceTemplate = {
      business: {
        name: businessData.businessName,
        abn: businessData.abn,
        phone: businessData.phone,
        email: businessData.email,
        website: businessData.website,
        logoPath: businessData.logoPath
      },
      settings: {
        paymentTerms: businessData.invoiceTerms,
        currency: 'AUD',
        taxRate: 0.10
      },
      template: {
        header: {
          title: 'INVOICE',
          color: '#FFD700'
        },
        footer: {
          message: 'Thank you for your business!',
          paymentInstructions: `Payment due within ${businessData.invoiceTerms} days`,
          bankDetails: {
            accountName: businessData.bankAccountName,
            bsb: businessData.bankBSB,
            accountNumber: businessData.bankAccountNumber
          }
        }
      }
    };

    const invoiceTemplatePath = path.join(dataDir, 'invoice-template.json');
    fs.writeFileSync(invoiceTemplatePath, JSON.stringify(invoiceTemplate, null, 2));

    // Generate quote template
    const quoteTemplate = {
      business: {
        name: businessData.businessName,
        abn: businessData.abn,
        phone: businessData.phone,
        email: businessData.email,
        website: businessData.website,
        logoPath: businessData.logoPath
      },
      settings: {
        validityPeriod: 30, // days
        currency: 'AUD',
        taxRate: 0.10
      },
      template: {
        header: {
          title: 'QUOTE',
          color: '#00FF00'
        },
        footer: {
          message: 'We appreciate the opportunity to quote for your project!',
          validityMessage: `This quote is valid for ${30} days from the date of issue`
        }
      }
    };

    const quoteTemplatePath = path.join(dataDir, 'quote-template.json');
    fs.writeFileSync(quoteTemplatePath, JSON.stringify(quoteTemplate, null, 2));

    res.status(200).json({
      message: 'Business setup completed successfully',
      business: businessData
    });

  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({ message: 'Error setting up business profile' });
  }
}
