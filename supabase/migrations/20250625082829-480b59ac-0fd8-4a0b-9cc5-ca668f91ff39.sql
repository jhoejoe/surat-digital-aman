
-- Create table for document submissions
CREATE TABLE public.documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ticket_number TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_hash TEXT NOT NULL,
  subject TEXT NOT NULL,
  recipient TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED')),
  qr_code TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for verification results
CREATE TABLE public.verification_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  signature_count INTEGER NOT NULL DEFAULT 0,
  certificate_validity TEXT NOT NULL CHECK (certificate_validity IN ('VALID', 'INVALID')),
  signer_name TEXT,
  signature_time TIMESTAMP WITH TIME ZONE,
  valid_until DATE,
  document_integrity TEXT NOT NULL CHECK (document_integrity IN ('ASLI', 'SUDAH DIMODIFIKASI')),
  signature_location TEXT,
  verification_completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_documents_ticket_number ON public.documents(ticket_number);
CREATE INDEX idx_documents_qr_code ON public.documents(qr_code);
CREATE INDEX idx_documents_status ON public.documents(status);
CREATE INDEX idx_verification_results_document_id ON public.verification_results(document_id);

-- Enable Row Level Security (for future authentication if needed)
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_results ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public service)
CREATE POLICY "Allow public read access to documents" ON public.documents
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to documents" ON public.documents
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to documents" ON public.documents
  FOR UPDATE USING (true);

CREATE POLICY "Allow public read access to verification results" ON public.verification_results
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert to verification results" ON public.verification_results
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update to verification results" ON public.verification_results
  FOR UPDATE USING (true);
