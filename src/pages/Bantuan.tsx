import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Bantuan = () => {
  const navigate = useNavigate();

  const faqData = [
    {
      question: "Apa itu SuratAman?",
      answer:
        "SuratAman adalah platform tanda tangan digital yang memungkinkan Anda menandatangani dokumen secara elektronik dengan aman dan sah.",
    },
    {
      question: "Bagaimana cara kerja tanda tangan digital di SuratAman?",
      answer:
        "Kami menggunakan teknologi enkripsi terkini untuk memastikan bahwa tanda tangan digital Anda aman dan tidak dapat dipalsukan.",
    },
    {
      question: "Apakah tanda tangan digital di SuratAman sah secara hukum?",
      answer:
        "Ya, tanda tangan digital yang dihasilkan melalui SuratAman sah secara hukum dan diakui di Indonesia.",
    },
    {
      question: "Dokumen apa saja yang dapat ditandatangani di SuratAman?",
      answer:
        "Anda dapat menandatangani berbagai jenis dokumen, termasuk kontrak, perjanjian, surat pernyataan, dan dokumen legal lainnya.",
    },
    {
      question: "Bagaimana cara memverifikasi keaslian dokumen yang ditandatangani di SuratAman?",
      answer:
        "Anda dapat menggunakan fitur verifikasi dokumen di platform kami untuk memastikan keaslian dan integritas dokumen yang telah ditandatangani.",
    },
    {
      question: "Apakah SuratAman aman digunakan?",
      answer:
        "Ya, SuratAman sangat aman digunakan. Kami menggunakan protokol keamanan terkini untuk melindungi data dan dokumen Anda.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Button>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pusat Bantuan
          </h1>
          <p className="text-gray-600">
            Temukan jawaban atas pertanyaan umum dan panduan penggunaan
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Pertanyaan Umum (FAQ)
          </h2>
          <Accordion type="single" collapsible>
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Contact Support Section */}
        <section className="bg-gray-100 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Hubungi Kami
          </h2>
          <p className="text-gray-600 mb-4">
            Jika Anda memiliki pertanyaan lebih lanjut atau memerlukan bantuan
            tambahan, jangan ragu untuk menghubungi tim dukungan kami.
          </p>
          <Button>Kirim Pesan</Button>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Bantuan;
