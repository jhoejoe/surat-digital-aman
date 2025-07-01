
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  Building, 
  Shield, 
  Users, 
  CheckCircle,
  X,
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

  const planFeatures = [
    { name: "Web and Mobile App", personal: true, enterprise: true },
    { name: "Document List experience", personal: true, enterprise: true, isNew: true },
    { name: "Upload & Share Document", personal: true, enterprise: true },
    { name: "Custom Position QR Code", personal: false, enterprise: true, isNew: true },
    { name: "Combined Document Action Order", personal: false, enterprise: true, isNew: true },
    { name: "Set Up and Modify Signature", personal: true, enterprise: true },
    { name: "Request Sign from Others", personal: true, enterprise: true },
    { name: "Sign with e-Meterai", personal: true, enterprise: true },
    { name: "Quick Action", personal: true, enterprise: true, isNew: true },
    { name: "Sign with Notes", personal: false, enterprise: true },
    { name: "E-Seal", personal: false, enterprise: true },
    { name: "E-Stamp", personal: false, enterprise: true, isNew: true },
    { name: "Group Recipient", personal: false, enterprise: true },
    { name: "Expired Document", personal: false, enterprise: true, isNew: true },
    { name: "Reminder Document", personal: false, enterprise: true, isNew: true },
    { name: "Bulk Download", personal: false, enterprise: true },
    { name: "Bundle Download Document", personal: true, enterprise: true, isNew: true },
    { name: "Revoke Certificate", personal: true, enterprise: true },
    { name: "Set Up and Manage Roles", personal: false, enterprise: true },
    { name: "24/7 Customer Support", personal: true, enterprise: true }
  ];

  const whyChooseFeatures = [
    {
      icon: Shield,
      title: "The Leading Digital Signature & Digital Identity Provider",
      description: "SuratAman Business is the leading Digital Signature & Digital Identity platform in Indonesia with most number of digital certificates and users."
    },
    {
      icon: Building,
      title: "Ensure Legality",
      description: "Digital signatures created using SuratAman Business are legally binding and can be legally used in courts and other formal settings."
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
            <span className="text-gray-900">Compare Plan</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Find The Perfect <span className="text-red-500">Plan</span><br />
            for Your Needs
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Discover your solution and complete your workflow.
          </p>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Description Column */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Discover your solution and complete your workflow.
              </h3>
            </div>

            {/* Plans Comparison */}
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Personal Plan */}
                <Card className="relative">
                  <CardHeader className="text-center bg-orange-50">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Personal Plan</CardTitle>
                    <div className="text-3xl font-bold text-gray-900 mt-4">
                      IDR 54,000<span className="text-base font-normal">/month</span>
                    </div>
                    <p className="text-sm text-gray-600">or IDR 390,000/year (Save 39%)</p>
                    <Button 
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => navigate("/demo")}
                    >
                      Upgrade to Personal Plan
                    </Button>
                  </CardHeader>
                </Card>

                {/* Enterprise Plan */}
                <Card className="relative border-red-200 bg-gradient-to-br from-purple-50 to-blue-50">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Enterprise Plan</CardTitle>
                    <div className="text-3xl font-bold text-gray-900 mt-4">
                      IDR 175,000<span className="text-base font-normal">/month</span>
                    </div>
                    <p className="text-sm text-gray-600">Per enterprise account</p>
                    <Button 
                      className="mt-4 bg-red-500 hover:bg-red-600 text-white"
                      onClick={() => navigate("/contact")}
                    >
                      Contact Sales
                    </Button>
                  </CardHeader>
                </Card>
              </div>

              {/* Features Comparison Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Features</th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Personal Plan</th>
                        <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Enterprise Plan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {planFeatures.map((feature, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="flex items-center space-x-2">
                              <span>{feature.name}</span>
                              {feature.isNew && (
                                <Badge variant="secondary" className="bg-blue-100 text-blue-600 text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feature.personal ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {feature.enterprise ? (
                              <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                            ) : (
                              <X className="w-5 h-5 text-red-500 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">
            Additional information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Digital Signature</h3>
              <p className="text-gray-600">
                Active Employee Accounts (EA) with Enterprise Plan can sign 
                and request signatures without limit, at additional fee. This benefit 
                is limited to, but not limited between EA within the same company, 
                as well as with EA from other companies and personal users.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">e-Meterai</h3>
              <p className="text-gray-600">
                SuratAman Business in partnership with Peruri, provides e-Meterai to boost 
                document authority. Can be used along with Digital Signature.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tailor Made Solution */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Tailor Made Solution</h2>
              <p className="text-lg mb-8">
                Offers a unique and personalized approach to product customization, allowing customers to create 
                their ideal product that perfectly fits their needs and preferences.
              </p>
              <Button 
                variant="outline" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => navigate("/contact")}
              >
                Learn More
              </Button>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png" 
                alt="Tailor Made Solution" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why choose SuratAman Business */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose SuratAman Business?
            </h2>
            <p className="text-xl text-gray-600">
              There are few reasons why you should use SuratAman Business. Here they are:
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
