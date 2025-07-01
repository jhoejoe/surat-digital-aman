
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Building, 
  Shield, 
  Users, 
  CheckCircle,
  Star,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";

const EnterprisePlan = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Unlimited Digital Signatures",
      description: "Get unlimited e-signatures for your team, create unlimited documents and send them to all your clients. Get access to audit trails, custom branding and advanced settings.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      icon: FileText,
      title: "More Complete Document Workflow",
      description: "Your e-signature flow can be designed to be as user-friendly as possible. Allow users to fill out forms or documents via mobile, desktop, or PDF and send reminders about pending signatures.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      icon: Building,
      title: "Centralized Document Management & All-in-One Admin Center",
      description: "Manage your organization don't worry about individual setup or training. All documents are stored centrally by organization & domain. Built-in dashboard that the organization can use to track usage and manage user accesses.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      icon: Users,
      title: "Choose Your Digital Certificate",
      description: "We provide you with a choice of digital certificate providers in Indonesia. So it can give you the best choice so you can make an informed decision.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    }
  ];

  const whyChooseFeatures = [
    {
      icon: Shield,
      title: "The Leading Digital Signature & Digital Identity Provider",
      description: "SuratAman is the leading Digital Signature & Digital Identity platform in Indonesia with most number of digital certificates and users."
    },
    {
      icon: Building,
      title: "Ensure Legality",
      description: "Digital signatures created using SuratAman are legally binding and can be legally used in courts and other formal settings."
    },
    {
      icon: CheckCircle,
      title: "Protected From Threats",
      description: "Your documents and digital certificates are fully protected. Documents that have been digitally signed will have a secure digital certificate which makes them tamper-proof."
    }
  ];

  const certifications = [
    "ISO 27001", "ISO 9001", "WebTrust", "KOMINFO", "BSSN", "PSrE"
  ];

  const memberships = [
    "AFPI", "FINTECH", "FINTECH", "IRLA", "APJII", "CLOUD SIGNATURE CONSORTIUM"
  ];

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/business" className="hover:text-red-500">Business</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">Enterprise Plan</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Enterprise <span className="text-red-500">Plan</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Digital signatures along with complete workflow for your
                company's comprehensive needs with Enterprise Plans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-red-500 hover:bg-red-600 text-white px-8"
                  onClick={() => navigate("/demo")}
                >
                  Start Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-50"
                >
                  Contact Sales
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-2xl p-6 max-w-md ml-auto">
                <img 
                  src="/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png" 
                  alt="Enterprise Dashboard" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get More Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get More with the New SuratAman Enterprise Plan
            </h2>
            <p className="text-xl text-gray-600">
              Get New & Enjoy more benefits for your Employee Account and immediately
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How to make Enterprise account */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How to make Enterprise account
            </h2>
            <p className="text-xl text-gray-600">
              No integration is needed - just start trial and step wise
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Want SuratAman personal account
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Register with your thought or company's representative</p>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Data will be verified SuratAman within 1x24 working hours</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gray-100 rounded-full flex items-center justify-center">
                <img 
                  src="/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png" 
                  alt="Account Setup" 
                  className="w-64 h-64 object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose SuratAman */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose SuratAman?
            </h2>
            <p className="text-xl text-gray-600">
              There are few reasons why you should use SuratAman. Here they are:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trial Offer */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <div className="text-center">
              <Badge className="bg-red-100 text-red-600 mb-4">Enterprise Plan</Badge>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Enjoy a 14-day free Trial and IDR 2,100,000 / Employee account per year
                afterward.
              </h2>
              <p className="text-gray-600 mb-8">
                From basic templates to advanced document automation, we have the tools to help you accelerate your business.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Unlimited document</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Get audit trails standard</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">Dedicated account manager</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-red-500 hover:bg-red-600 text-white px-8"
                onClick={() => navigate("/demo")}
              >
                Start Free Trial
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Certification and Acknowledgment
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60 mb-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">{cert}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Membership</h4>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            {memberships.map((membership, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Building className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600">{membership}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnterprisePlan;
