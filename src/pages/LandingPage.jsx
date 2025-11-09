import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, MessageSquare, TrendingUp } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 fixed z-50 w-full top-0 ">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div>
                <div className="text-lg font-bold text-gray-900">Catalyst System UAD</div>
              </div>
            </div>
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Log In
            </button>
          </div>
        </div>
      </nav>

    {/* Hero Section */}
    <div className="relative max-w-7xl mx-auto px-6 py-20 mt-16 border-b border-red-200 h-[90vh]" style={{backgroundImage: 'url("testt.jpg")', backgroundSize: 'cover', backgroundPosition: 'center'}}>
        {/* Strong dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        
        <div className="text-center max-w-3xl mx-auto mt-10 relative z-10">
            <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            CUSTOMER RELATIONSHIP MANAGEMENT <span className="text-blue-500">4</span> WDC
            </h1>
            <p className="text-xl text-gray-100 mb-10 drop-shadow-md">
            Manage students, track tickets, and provide exceptional advisory services all in one unified platform.
            </p>
            <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-xl"
            >
            Log In to Get Started
            </button>
        </div>
    </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-blue-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Student Management</h3>
            <p className="text-gray-600 text-sm">
              Track and manage all student information, onboarding status, and engagement metrics in one place.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="text-purple-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Advisory Sessions</h3>
            <p className="text-gray-600 text-sm">
              View detailed session reports, track conversations across multiple channels, and manage follow-ups.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm">
              Monitor key metrics, track performance, and gain insights with comprehensive analytics and reporting.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-orange-600" size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ticket Management</h3>
            <p className="text-gray-600 text-sm">
              Prioritize and resolve student inquiries efficiently with intelligent ticket routing and tracking.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-black-700">Catalyst UAD</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Catalyst. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;