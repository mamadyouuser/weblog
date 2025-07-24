import React, { useState } from 'react';
import { 
  X, 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Eye, 
  Heart, 
  MessageCircle,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { mockArticles, mockUsers } from '../data/mockData';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [timeRange, setTimeRange] = useState('7d');

  // Calculate statistics
  const totalArticles = mockArticles.length;
  const totalUsers = mockUsers.length;
  const totalViews = mockArticles.reduce((sum, article) => sum + article.views, 0);
  const totalLikes = mockArticles.reduce((sum, article) => sum + article.likes, 0);
  const totalComments = mockArticles.reduce((sum, article) => sum + article.comments.length, 0);

  // Get top articles by views
  const topArticles = [...mockArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // Get recent articles
  const recentArticles = [...mockArticles]
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 5);

  // Category distribution
  const categoryStats = mockArticles.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Articles</p>
                  <p className="text-3xl font-bold">{totalArticles}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Total Users</p>
                  <p className="text-3xl font-bold">{totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Views</p>
                  <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="h-8 w-8 text-purple-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Likes</p>
                  <p className="text-3xl font-bold">{totalLikes}</p>
                </div>
                <Heart className="h-8 w-8 text-red-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Total Comments</p>
                  <p className="text-3xl font-bold">{totalComments}</p>
                </div>
                <MessageCircle className="h-8 w-8 text-orange-200" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Articles */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Top Articles by Views
              </h3>
              <div className="space-y-4">
                {topArticles.map((article, index) => (
                  <div key={article.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {article.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {article.views.toLocaleString()} views • {article.likes} likes
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-green-600" />
                Articles by Category
              </h3>
              <div className="space-y-4">
                {Object.entries(categoryStats)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(count / totalArticles) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recent Articles */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Recent Articles
              </h3>
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article.id} className="flex items-start space-x-4">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {article.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {article.author} • {new Date(article.publishDate).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500 flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {article.views}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {article.likes}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          {article.comments.length}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User Statistics */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-600" />
                User Statistics
              </h3>
              <div className="space-y-4">
                {mockUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.role} • {user.articlesCount} articles
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{user.followersCount}</p>
                      <p className="text-xs text-gray-500">followers</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;