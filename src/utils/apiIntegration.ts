
export interface ApiIntegrationConfig {
  name: string;
  endpoint: string;
  apiKey: string;
  isActive: boolean;
  description?: string;
}

export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  signature?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  statusCode?: number;
}

export class ApiIntegrationService {
  public config: ApiIntegrationConfig;

  constructor(config: ApiIntegrationConfig) {
    this.config = config;
  }

  // Test connection to the API
  async testConnection(): Promise<ApiResponse> {
    if (!this.config.isActive) {
      return {
        success: false,
        error: "Integration is not active"
      };
    }

    try {
      const response = await fetch(`${this.config.endpoint}/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        return {
          success: true,
          data: await response.json(),
          statusCode: response.status
        };
      } else {
        return {
          success: false,
          error: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Send document for verification
  async verifyDocument(documentData: {
    fileName: string;
    fileHash: string;
    recipientName: string;
    subject: string;
  }): Promise<ApiResponse> {
    if (!this.config.isActive) {
      return {
        success: false,
        error: "Integration is not active"
      };
    }

    try {
      const response = await fetch(`${this.config.endpoint}/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(documentData)
      });

      const responseData = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: responseData,
          statusCode: response.status
        };
      } else {
        return {
          success: false,
          error: responseData.message || `HTTP ${response.status}`,
          statusCode: response.status
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Handle webhook from external service
  static async handleWebhook(payload: WebhookPayload): Promise<ApiResponse> {
    try {
      console.log('Received webhook:', payload);
      
      // Validate webhook signature if provided
      if (payload.signature) {
        // In production, validate the signature here
        // For now, we'll just log it
        console.log('Webhook signature:', payload.signature);
      }

      // Process different event types
      switch (payload.event) {
        case 'document.verified':
          return this.handleDocumentVerified(payload.data);
        case 'document.rejected':
          return this.handleDocumentRejected(payload.data);
        default:
          console.log('Unknown webhook event:', payload.event);
          return {
            success: true,
            data: { message: 'Event received but not processed' }
          };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Webhook processing failed'
      };
    }
  }

  private static async handleDocumentVerified(data: any): Promise<ApiResponse> {
    // Update document status in database
    console.log('Document verified:', data);
    return {
      success: true,
      data: { message: 'Document verification processed' }
    };
  }

  private static async handleDocumentRejected(data: any): Promise<ApiResponse> {
    // Update document status in database
    console.log('Document rejected:', data);
    return {
      success: true,
      data: { message: 'Document rejection processed' }
    };
  }

  // Update integration configuration
  updateConfig(newConfig: Partial<ApiIntegrationConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current status
  getStatus(): 'connected' | 'disconnected' | 'error' {
    if (!this.config.isActive) {
      return 'disconnected';
    }
    
    // In a real implementation, you might check the last successful connection
    return 'connected';
  }
}

// Privy Integration Service
export class PrivyIntegrationService extends ApiIntegrationService {
  constructor(apiKey: string) {
    super({
      name: 'Privy',
      endpoint: 'https://api.privy.id/v1',
      apiKey,
      isActive: true,
      description: 'Privy digital signature service'
    });
  }

  async signDocument(documentId: string, signerEmail: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.config.endpoint}/documents/${documentId}/sign`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signer_email: signerEmail,
          callback_url: `${window.location.origin}/api/webhooks/privy`
        })
      });

      return {
        success: response.ok,
        data: await response.json(),
        statusCode: response.status
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Signing request failed'
      };
    }
  }
}

// Factory function to create integration services
export function createIntegrationService(
  type: 'generic' | 'privy',
  config: ApiIntegrationConfig
): ApiIntegrationService {
  switch (type) {
    case 'privy':
      return new PrivyIntegrationService(config.apiKey);
    default:
      return new ApiIntegrationService(config);
  }
}
