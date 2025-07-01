
import { Button } from "@/components/ui/button";
import { FileText, Settings, LogOut, User, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SuratAman</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <Link to="/kirim-surat" className="text-gray-700 hover:text-blue-600 transition-colors">
              Kirim Surat
            </Link>
            <Link to="/cek-keaslian" className="text-gray-700 hover:text-blue-600 transition-colors">
              Cek Keaslian
            </Link>
            <Link to="/cek-progress" className="text-gray-700 hover:text-blue-600 transition-colors">
              Cek Progress
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600 transition-colors">
              Blog
            </Link>
            <Link to="/bantuan" className="text-gray-700 hover:text-blue-600 transition-colors">
              Bantuan
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            <span className="text-blue-600 font-medium">Personal</span>
            <Button
              variant="outline"
              onClick={() => navigate("/business")}
              className="text-gray-700 hover:text-blue-600 border-gray-300"
            >
              Business
            </Button>
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Halo, {profile?.full_name || user.email}
                </span>
                {profile?.role === 'admin' && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate("/admin")}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Dashboard Admin</span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Keluar</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => navigate("/auth")}
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Masuk</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
