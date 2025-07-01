
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface VerificationRequest {
  file_hash: string;
  file_name: string;
  document_id: string;
}

interface VerificationResponse {
  signatureCount: number;
  certificateValidity: "VALID" | "INVALID";
  signerName: string;
  documentIntegrity: "ASLI" | "SUDAH DIMODIFIKASI";
  signatureLocation?: string;
  verificationTime: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting document verification process...');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { file_hash, file_name, document_id }: VerificationRequest = await req.json();
    
    console.log('Verifying document:', { file_hash, file_name, document_id });

    // Simulate PDF signature verification process
    // In a real implementation, you would:
    // 1. Retrieve the PDF file from storage
    // 2. Use a PDF library to extract signature information
    // 3. Verify certificate validity against a CA
    // 4. Check document integrity

    // For now, we'll implement a more sophisticated simulation
    // that can be later replaced with actual PDF verification logic
    const verificationResult = await performPDFVerification(file_hash, file_name);

    console.log('Verification completed:', verificationResult);

    return new Response(
      JSON.stringify(verificationResult),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in document verification:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Verification failed', 
        message: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

async function performPDFVerification(fileHash: string, fileName: string): Promise<VerificationResponse> {
  console.log('Performing PDF verification for:', fileName);
  
  // Simulate PDF analysis delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Advanced simulation based on file characteristics
  const isLikelyValid = !fileName.toLowerCase().includes('invalid') && 
                       !fileName.toLowerCase().includes('corrupted') &&
                       fileHash.length > 50; // Assuming proper hash length

  // Simulate different verification scenarios based on file name patterns
  if (fileName.toLowerCase().includes('unsigned')) {
    return {
      signatureCount: 0,
      certificateValidity: "INVALID",
      signerName: "No digital signature found",
      documentIntegrity: "SUDAH DIMODIFIKASI",
      verificationTime: new Date().toISOString(),
    };
  }

  if (fileName.toLowerCase().includes('multi')) {
    return {
      signatureCount: 2,
      certificateValidity: "VALID",
      signerName: "Dr. Ahmad Wijaya, S.Kom., M.T.; Prof. Sarah Melinda, Ph.D.",
      documentIntegrity: "ASLI",
      signatureLocation: "Jakarta, Indonesia",
      verificationTime: new Date().toISOString(),
    };
  }

  // Default case - single signature
  const signerNames = [
    "Dr. Ahmad Wijaya, S.Kom., M.T.",
    "Prof. Sarah Melinda, Ph.D.",
    "Ir. Budi Santoso, M.Eng.",
    "Dr. Siti Nurhaliza, M.Sc.",
    "Prof. Dr. Andi Pratama, S.T., M.T."
  ];

  const locations = [
    "Jakarta, Indonesia",
    "Bandung, Indonesia", 
    "Surabaya, Indonesia",
    "Yogyakarta, Indonesia",
    "Medan, Indonesia"
  ];

  const randomSigner = signerNames[Math.floor(Math.random() * signerNames.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];

  return {
    signatureCount: 1,
    certificateValidity: isLikelyValid ? "VALID" : "INVALID",
    signerName: randomSigner,
    documentIntegrity: isLikelyValid ? "ASLI" : "SUDAH DIMODIFIKASI",
    signatureLocation: randomLocation,
    verificationTime: new Date().toISOString(),
  };
}
