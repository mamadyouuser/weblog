import React, { useState } from 'react';
import { Search, User, LogOut, Menu, X, BookOpen, Settings, PlusCircle, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onShowLogin: () => void;
  searchQuery: string;
  onShowProfile?: () => void;
  onShowDashboard?: () => void;
  onCreateArticle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  onShowLogin, 
  searchQuery, 
  onShowProfile,
  onShowDashboard,
  onCreateArticle 
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleLoginClick = () => {
    onShowLogin();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-blue-600 ml-2" />
            <h1 className="text-2xl font-bold text-gray-900">TechBlog Pro</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <div className="flex items-center space-x-3">
                  {(user?.role === 'admin' || user?.role === 'editor' || user?.role === 'author') && (
                    <button
                      onClick={() => onCreateArticle?.()}
                      className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      New Article
                    </button>
                  )}
                  
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                </div>
                
                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <button
                      onClick={() => {
                        onShowProfile?.();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </button>
                    
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => {
                          onShowDashboard?.();
                          setShowUserMenu(false);
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Dashboard
                      </button>
                    )}
                    
                    <hr className="my-1" />
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                <User className="h-4 w-4 mr-1" />
                Sign In
                </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative mb-2">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Mobile User Menu */}
            {isAuthenticated ? (
              <div className="space-y-2">
                <div className="flex items-center text-gray-700 font-medium py-2">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="h-6 w-6 rounded-full object-cover mr-2"
                  />
                  {user?.name}
                </div>
                
                {(user?.role === 'admin' || user?.role === 'editor' || user?.role === 'author') && (
                  <button
                    onClick={() => {
                      onCreateArticle?.();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <PlusCircle className="h-4 w-4 mr-1" />
                    New Article
                  </button>
                )}
                
                <button
                  onClick={() => {
                    onShowProfile?.();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors py-2"
                >
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </button>
                
                {user?.role === 'admin' && (
                  <button
                    onClick={() => {
                      onShowDashboard?.();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors py-2"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Dashboard
                  </button>
                )}
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center text-red-600 hover:text-red-700 transition-colors py-2"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <User className="h-4 w-4 mr-1" />
                Sign In
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  );
};

export default Header;