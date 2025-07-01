
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    company: "",
    website: "",
    product: "",
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      product: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      agreeToTerms: checked
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phoneNumber || !formData.company) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Silakan lengkapi semua field yang wajib diisi.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.agreeToTerms) {
      toast({
        title: "Persetujuan Diperlukan",
        description: "Anda harus menyetujui syarat dan ketentuan untuk melanjutkan.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pesan Berhasil Dikirim!",
      description: "Tim sales kami akan menghubungi Anda segera.",
    });

    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      company: "",
      website: "",
      product: "",
      agreeToTerms: false
    });
  };

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/6281123456789", "_blank");
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Telepon",
      details: ["+62 21 1234 5678", "+62 811 2345 6789"]
    },
    {
      icon: Mail,
      title: "Email",
      details: ["sales@surataman.com", "support@surataman.com"]
    },
    {
      icon: MapPin,
      title: "Alamat",
      details: ["Jl. Sudirman No. 123", "Jakarta Pusat 10220"]
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      details: ["Senin - Jumat: 09:00 - 18:00", "Sabtu: 09:00 - 15:00"]
    }
  ];

  const productOptions = [
    "Digital Signature",
    "e-Meterai",
    "Enterprise Solution",
    "API Integration",
    "On Premise Solution",
    "Customer Onboarding",
    "Digital Certificate",
    "Lainnya"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-orange-50">
      <BusinessHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Connect with Our Sales Team for Product Inquiries
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get SuratAman Business's digital solution or tailor them to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Description and WhatsApp */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Looking for the right-fit solution?
              </h2>
              <Button 
                onClick={handleWhatsAppContact}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Contact via WhatsApp</span>
              </Button>
            </div>

            {/* Contact Information Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-sm text-gray-600">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl">Fill out this form to inquire about our products</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Name*</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Type Your Name"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email*</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Type Your Email"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="text-sm font-medium">Phone Number*</Label>
                  <div className="flex mt-1">
                    <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                      <span className="text-sm text-gray-600">🇮🇩 +62</span>
                    </div>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="812345678"
                      required
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium">Company Name*</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Type Your Company"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="website" className="text-sm font-medium">Company Website*</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="Type Your Company Website"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="product" className="text-sm font-medium">Which SuratAman Business product do you need?</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productOptions.map((product) => (
                        <SelectItem key={product} value={product}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Checkbox Concern*</Label>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={formData.agreeToTerms}
                      onCheckedChange={handleCheckboxChange}
                      className="mt-1"
                    />
                    <div className="text-sm text-gray-600">
                      <p>
                        By completing and submitting this form, you confirm that you have read{" "}
                        <a href="#" className="text-red-500 hover:underline">SuratAman Business Privacy Notice</a> and{" "}
                        <a href="#" className="text-red-500 hover:underline">Term of Use</a> and consent to the processing of your data accordingly.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
