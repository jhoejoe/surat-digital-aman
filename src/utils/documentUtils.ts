
import CryptoJS from 'crypto-js';

export const generateTicketNumber = (): string => {
  const prefix = "TKT";
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

export const generateQRCode = (): string => {
  const prefix = "QR";
  const random = Math.random().toString(36).substr(2, 8).toUpperCase();
  return `${prefix}${random}`;
};

export const calculateFileHash = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
        const hash = CryptoJS.SHA256(wordArray).toString();
        resolve(hash);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

export const simulateDocumentVerification = (fileName: string) => {
  // Simulate PDF signature verification
  const mockResults = [
    {
      certificateValidity: "VALID" as const,
      documentIntegrity: "ASLI" as const,
      signerName: "Dr. Ahmad Wijaya, S.Kom., M.T.",
      signatureLocation: "Jakarta, Indonesia",
      signatureCount: 1,
    },
    {
      certificateValidity: "VALID" as const,
      documentIntegrity: "ASLI" as const,
      signerName: "Prof. Sarah Melinda, Ph.D., Ir. Budi Santoso, M.Eng.",
      signatureLocation: "Bandung, Indonesia",
      signatureCount: 2,
    },
    {
      certificateValidity: "INVALID" as const,
      documentIntegrity: "SUDAH DIMODIFIKASI" as const,
      signerName: "Unknown Signer",
      signatureLocation: null,
      signatureCount: 0,
    },
  ];
  
  // Return random result for simulation
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};
