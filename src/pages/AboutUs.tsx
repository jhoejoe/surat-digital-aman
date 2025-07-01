
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  FileText, 
  Shield, 
  Users,
  Award,
  Globe,
  ChevronRight,
  Building,
  Heart,
  Target
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BusinessHeader from "@/components/business/BusinessHeader";
import Footer from "@/components/Footer";

const AboutUs = () => {
  const navigate = useNavigate();
  const [currentYear, setCurrentYear] = useState(2016);

  const milestones = [
    {
      year: 2016,
      title: "Supported by KOMINFO, SuratAman started to socialize the legality benefits of digital signature to relevant stakeholders across Indonesia.",
      description: "The beginning of our journey to digitalize Indonesia's document signing process.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2016,
      title: "SuratAman secured Bussan Auto Finance as the first financial institution client to implement digital signature within motorcycle leasing contract",
      description: "Our first major client implementation marking the start of financial sector adoption.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2017,
      title: "Enterprise Suite launch: online docs management, sign on Web, Android, and iOS, parallel & serial workflow, multiparty chat, & real-time docs tracking",
      description: "Comprehensive platform launch expanding our digital signature capabilities.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2017,
      title: "1st place in Echelon Asia Summit 2017 Top 100 Startup award, Fintech category. Marshall Pribadi, SuratAman's CEO was listed in Forbes Asia's 30 Under 30.",
      description: "International recognition for our innovation and leadership in fintech.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2018,
      title: "SuratAman successfully launched API suite to enable seamless user identity verification & document signing embedded natively on clients app",
      description: "API integration capabilities enhancing client integration possibilities.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2018,
      title: "SuratAman got certified for ISO 27001:2013 on Information Security Management System from TuV Rheinland, cementing further security for digital identity",
      description: "International security certification validating our commitment to data protection.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2018,
      title: "SuratAman became the first digital identity company to obtain acknowledgment from KOMINFO as one of Digital Certificate providers (PSrE) in Indonesia.",
      description: "Official government recognition as a certified digital certificate provider.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2018,
      title: "Registered at Bank Indonesia & admitted into regulatory sandbox program to provide online credit card application to 6 Indonesian major banks",
      description: "Banking sector recognition and regulatory approval for financial services.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2022,
      title: "Witnessed by President Joko Widodo, SuratAman's CEO, Marshall Pribadi, was awarded as 'Penggerak Fintech Dalam Mendukung Program Pemulihan Ekonomi Nasional' by OJK",
      description: "Presidential recognition for contributing to national economic recovery through fintech innovation.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2022,
      title: "Accredited Webtrust for Certification Authority (CA) to improve SuratAman's digital signature evidentiary power as well as the user information security",
      description: "International accreditation strengthening our certification authority capabilities.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2022,
      title: "SuratAman launched e-Meterai attachment feature on electronic document to further improve the seamlessness of document legality with regulation compliancy",
      description: "E-Meterai integration enhancing document legal compliance and authenticity.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      year: 2022,
      title: "Held the first SuratAman Golf Tournament with close partner & client and soft launching Digital Identity experience for airport & hotel check-in",
      description: "Community building and expansion into hospitality sector digital identity solutions.",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    }
  ];

  const teamMembers = [
    {
      name: "Marshall Pribadi",
      position: "CEO",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      name: "Guntur Adi Saputra",
      position: "CTO", 
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    },
    {
      name: "Krishna Chandra",
      position: "COO",
      image: "/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png"
    }
  ];

  const visionMission = {
    vision: "Becoming a global leader in the field of electronic identification and authorization services.",
    mission: "Creating a universally-accepted digital identity system that is fully integrated into the digital ecosystem."
  };

  return (
    <div className="min-h-screen bg-white">
      <BusinessHeader />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/business" className="hover:text-red-500">Business</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-red-500">SuratAman</span>, the prime digital identity solution
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Designed for security and convenience. With electronic certificate, digital signature, and other digital service, SuratAman is the answer to your identity challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-500 hover:bg-red-600 text-white px-8"
              onClick={() => navigate("/contact")}
            >
              Contact Sales
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-red-500 text-red-500 hover:bg-red-50"
              onClick={() => navigate("/demo")}
            >
              Request Demo
            </Button>
          </div>
        </div>
      </section>

      {/* What is SuratAman Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What is <span className="text-red-500">SuratAman</span>
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                SuratAman is revolutionizing the way people are identified in cyberspace into the most robust transaction. We believe that it could lead identity and electronic transaction on the foundations of a healthy cyber transaction ecosystem.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Since we embarked on this Journey in 2016, we have raised $5 million from Softbank and an Indonesian Telco company, SuratAman is growing to lead by having 34+ million users and 3,600+ enterprise customers in seven years.
              </p>
              <p className="text-lg text-gray-600">
                As the digital leader of digital identity and digital signature provided in Indonesia, we empowered economic growth by giving the same business, real value creation with the goal-oriented results you see the best behavioral fit into the economy.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/2ac1f5c2-3516-4748-b1e3-86c74d5c0c1c.png" 
                alt="SuratAman workspace" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-500">Vision and Mission</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {visionMission.vision}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {visionMission.mission}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-500">Milestone</span>
            </h2>
            <p className="text-lg text-gray-600">
              Journey of innovation and growth in digital identity solutions
            </p>
          </div>

          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent className="-ml-2 md:-ml-4">
                {milestones.map((milestone, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="h-full border-l-4 border-red-500">
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {milestone.year}
                          </span>
                        </div>
                        <div className="mb-4">
                          <img 
                            src={milestone.image} 
                            alt={`Milestone ${milestone.year}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-3 text-sm leading-tight">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-pink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-red-500">Team</span>
            </h2>
            <p className="text-lg text-gray-600">
              Leadership team driving digital transformation in Indonesia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-red-500 font-medium">{member.position}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">
            You know what SuratAman is all about, now learn about our #LifeAtSuratAman—and the people who make our journey possible
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-red-500 hover:bg-gray-100 px-8"
              onClick={() => navigate("/contact")}
            >
              Career
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-500 px-8"
            >
              Life at SuratAman
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
