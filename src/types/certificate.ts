
export interface Certificate {
  id: string;
  subject_name: string;
  common_name?: string;
  issuer_name?: string;
  serial_number: string;
  status: 'VALID' | 'EXPIRED' | 'REVOKED' | 'PENDING';
  valid_from?: string;
  valid_until?: string;
  certificate_data?: string;
  public_key?: string;
  fingerprint?: string;
  key_usage?: string[];
  extended_key_usage?: string[];
  subject_alternative_names?: string[];
  created_at: string;
  updated_at: string;
}

export interface CertificateInsert {
  subject_name: string;
  common_name?: string;
  issuer_name?: string;
  serial_number: string;
  status?: 'VALID' | 'EXPIRED' | 'REVOKED' | 'PENDING';
  valid_from?: string;
  valid_until?: string;
  certificate_data?: string;
  public_key?: string;
  fingerprint?: string;
  key_usage?: string[];
  extended_key_usage?: string[];
  subject_alternative_names?: string[];
}
