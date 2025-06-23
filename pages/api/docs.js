
export default function handler(req, res) {
  const apiDocs = {
    title: "TradieM8 AI Agent API Documentation",
    version: "1.0.0",
    description: "API endpoints for AI agents to submit leads and integrate with TradieM8",
    endpoints: {
      "POST /api/ai-lead": {
        description: "Submit a new lead from AI agent call",
        headers: {
          "Content-Type": "application/json"
        },
        required_fields: ["name", "phone", "service"],
        optional_fields: ["email", "location", "notes", "callId", "callDuration", "aiTranscript"],
        example_request: {
          name: "John Smith",
          email: "john@example.com",
          phone: "+61400123456",
          service: "Gutter cleaning and repair",
          location: "123 Main St, Sydney NSW 2000",
          notes: "Customer mentioned gutters are blocked and may need replacement",
          callId: "call_12345",
          callDuration: "5:32",
          aiTranscript: "Customer called about gutter issues. Lives on Main St. Needs cleaning and possible repairs..."
        },
        responses: {
          201: {
            message: "AI lead captured successfully",
            lead: "Lead object with generated ID"
          },
          400: {
            message: "Missing required fields"
          },
          500: {
            message: "Error processing AI lead submission"
          }
        }
      },
      "GET /api/leads": {
        description: "Retrieve all leads",
        responses: {
          200: {
            leads: "Array of lead objects"
          }
        }
      }
    },
    webhook_url: `${req.headers.host ? `https://${req.headers.host}` : 'https://your-repl-url'}/api/ai-lead`,
    integration_notes: [
      "AI agents should POST to /api/ai-lead endpoint",
      "All leads will be automatically tagged with source: 'ai-agent'",
      "Phone numbers should include country code for international compatibility",
      "AI transcript field is optional but recommended for context"
    ]
  };

  if (req.method === 'GET') {
    res.status(200).json(apiDocs);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
