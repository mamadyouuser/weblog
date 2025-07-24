import React from 'react';
import { Clock, Eye, Heart, MessageCircle, Calendar, Tag } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  onRead: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onRead }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Article Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
          {article.tags.length > 3 && (
            <span className="text-gray-500 text-xs">+{article.tags.length - 3} more</span>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(article.publishDate).toLocaleDateString('en-US')}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {article.readTime} min
            </span>
          </div>
          <span className="font-medium text-gray-700">{article.author}</span>
        </div>

        {/* Stats and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-500">
            <span className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              {article.likes}
            </span>
            <span className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1" />
              {article.comments.length}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-1" />
              {article.views}
            </span>
          </div>
          <button
            onClick={() => onRead(article)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
          >
            <Eye className="h-4 w-4 mr-1" />
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;