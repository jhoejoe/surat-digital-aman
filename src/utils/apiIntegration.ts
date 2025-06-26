
// Utility functions for API integrations

interface IntegrationConfig {
  name: string;
  endpoint: string;
  apiKey: string;
  headers?: Record<string, string>;
}

export class ApiIntegrationService {
  private config: IntegrationConfig;

  constructor(config: IntegrationConfig) {
    this.config = config;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.config.apiKey}`,
      ...this.config.headers
    };
  }

  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.endpoint}/health`, {
        method: 'GET',
        headers: this.getHeaders()
      });
      
      return response.ok;
    } catch (error) {
      console.error(`Connection test failed for ${this.config.name}:`, error);
      return false;
    }
  }

  async sendDocument(documentData: any): Promise<any> {
    try {
      const response = await fetch(`${this.config.endpoint}/documents`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(documentData)
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Document send failed for ${this.config.name}:`, error);
      throw error;
    }
  }

  async verifySignature(documentId: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.endpoint}/verify/${documentId}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Verification request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Signature verification failed for ${this.config.name}:`, error);
      throw error;
    }
  }

  async getSignatureStatus(documentId: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.endpoint}/status/${documentId}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Status request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Status check failed for ${this.config.name}:`, error);
      throw error;
    }
  }
}

// Privy.id integration specific functions
export class PrivyIntegration extends ApiIntegrationService {
  constructor(apiKey: string) {
    super({
      name: 'Privy',
      endpoint: 'https://api.privy.id/v1',
      apiKey,
      headers: {
        'X-API-Version': '1.0'
      }
    });
  }

  async createSignatureRequest(documentData: {
    file: File;
    signers: Array<{ email: string; name: string }>;
    subject: string;
    message?: string;
  }): Promise<any> {
    const formData = new FormData();
    formData.append('file', documentData.file);
    formData.append('signers', JSON.stringify(documentData.signers));
    formData.append('subject', documentData.subject);
    if (documentData.message) {
      formData.append('message', documentData.message);
    }

    try {
      const response = await fetch(`${this.config.endpoint}/signature-requests`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          // Don't set Content-Type for FormData, browser will set it automatically
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Privy signature request failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Privy signature request failed:', error);
      throw error;
    }
  }
}

// Factory function to create appropriate integration service
export function createIntegrationService(type: string, config: any): ApiIntegrationService {
  switch (type.toLowerCase()) {
    case 'privy':
      return new PrivyIntegration(config.apiKey);
    default:
      return new ApiIntegrationService(config);
  }
}

// Webhook handler utilities
export async function handleWebhook(webhookData: any, source: string) {
  console.log(`Received webhook from ${source}:`, webhookData);
  
  // Process webhook based on source
  switch (source) {
    case 'privy':
      return handlePrivyWebhook(webhookData);
    default:
      console.log('Unknown webhook source:', source);
      return { success: false, error: 'Unknown webhook source' };
  }
}

async function handlePrivyWebhook(data: any) {
  try {
    // Process Privy webhook events
    const { event_type, signature_request } = data;
    
    switch (event_type) {
      case 'signature_request_signed':
        // Update document status to signed
        console.log('Document signed:', signature_request.id);
        break;
      case 'signature_request_completed':
        // Update document status to completed
        console.log('Signature process completed:', signature_request.id);
        break;
      case 'signature_request_declined':
        // Update document status to declined
        console.log('Signature declined:', signature_request.id);
        break;
      default:
        console.log('Unknown Privy event:', event_type);
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error processing Privy webhook:', error);
    return { success: false, error: error.message };
  }
}
