import React, { useState, useMemo } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleDetail from './components/ArticleDetail';
import LoginModal from './components/LoginModal';
import SearchResults from './components/SearchResults';
import CategoryFilter from './components/CategoryFilter';
import Footer from './components/Footer';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import ArticleEditor from './components/ArticleEditor';
import { mockArticles } from './data/mockData';
import { Article } from './types';

type ViewMode = 'home' | 'article' | 'search';
type ModalType = 'login' | 'profile' | 'dashboard' | 'editor' | null;

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('home');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [articles, setArticles] = useState(mockArticles);

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(articles.map(article => article.category)));
  }, [articles]);

  // Filter articles based on category
  const filteredArticles = useMemo(() => {
    const publishedArticles = articles.filter(article => article.status === 'published');
    if (!selectedCategory) return publishedArticles;
    return publishedArticles.filter(article => article.category === selectedCategory);
  }, [selectedCategory, articles]);

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase().trim();
    const publishedArticles = articles.filter(article => article.status === 'published');
    return publishedArticles.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.content.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query)) ||
      article.category.toLowerCase().includes(query)
    );
  }, [searchQuery, articles]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setViewMode('search');
    } else {
      setViewMode('home');
    }
  };

  const handleReadArticle = (article: Article) => {
    setSelectedArticle(article);
    setViewMode('article');
  };

  const handleBackToHome = () => {
    setViewMode('home');
    setSelectedArticle(null);
    setSearchQuery('');
    setSelectedCategory('');
  };

  const handleSaveArticle = (newArticle: Article) => {
    setArticles(prev => [...prev, newArticle]);
  };

  const handleBackToHomeFromSearch = () => {
    setViewMode('home');
    setSearchQuery('');
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header
          onSearch={handleSearch}
          onShowLogin={() => setActiveModal('login')}
          onShowProfile={() => setActiveModal('profile')}
          onShowDashboard={() => setActiveModal('dashboard')}
          onCreateArticle={() => setActiveModal('editor')}
          searchQuery={searchQuery}
        />

        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {viewMode === 'home' && (
            <>
              {/* Hero Section */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  TechBlog Pro
                </h1>
                <p className="text-xl md:text-2xl opacity-90 mb-6">
                  Your ultimate destination for cutting-edge technology insights and programming expertise
                </p>
                <div className="flex items-center space-x-8 space-x-reverse text-lg">
                  <span>{filteredArticles.length} Articles</span>
                  <span>{categories.length} Categories</span>
                  <span>Daily Updates</span>
                </div>
              </div>

              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onRead={handleReadArticle}
                  />
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    No articles found in this category
                  </h3>
                  <p className="text-gray-500">
                    Please select a different category
                  </p>
                </div>
              )}
            </>
          )}

          {viewMode === 'article' && selectedArticle && (
            <ArticleDetail
              article={selectedArticle}
              onBack={handleBackToHome}
            />
          )}

          {viewMode === 'search' && (
            <SearchResults
              query={searchQuery}
              results={searchResults}
              onBack={handleBackToHomeFromSearch}
              onReadArticle={handleReadArticle}
            />
          )}
        </main>

        <Footer />

        {/* Modals */}
        {activeModal === 'login' && (
          <LoginModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
          />
        )}
        
        {activeModal === 'profile' && (
          <UserProfile onClose={() => setActiveModal(null)} />
        )}
        
        {activeModal === 'dashboard' && (
          <AdminDashboard onClose={() => setActiveModal(null)} />
        )}
        
        {activeModal === 'editor' && (
          <ArticleEditor 
            onClose={() => setActiveModal(null)}
            onSave={handleSaveArticle}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;