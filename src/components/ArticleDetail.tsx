import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Heart, MessageCircle, Tag, User } from 'lucide-react';
import { Article } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  const { isAuthenticated, user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(article.comments);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && isAuthenticated && user) {
      const comment = {
        id: Date.now(),
        author: user.name,
        content: newComment.trim(),
        date: new Date().toISOString().split('T')[0]
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">$1</h3>')
      .replace(/#### (.*)/g, '<h4 class="text-lg font-medium text-gray-700 mt-4 mb-2">$1</h4>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/- (.*)/g, '<li class="mb-1">$1</li>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h') || paragraph.includes('<li') || paragraph.includes('<pre')) {
          return paragraph;
        }
        return paragraph.trim() ? `<p class="mb-4 leading-relaxed">${paragraph}</p>` : '';
      })
      .join('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
        >
          <ArrowRight className="h-5 w-5 mr-1" />
          Back to Home
        </button>
      </div>

      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end">
            <div className="p-8 text-white">
              <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                {article.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center space-x-6 space-x-reverse text-sm">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {article.author}
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(article.publishDate).toLocaleDateString('en-US')}
                </span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {article.readTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>

          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-lg transition-colors ${
                liked
                  ? 'bg-red-100 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              <span>{article.likes + (liked ? 1 : 0)} پسند</span>
              <span>{article.likes + (liked ? 1 : 0)} like{article.likes + (liked ? 1 : 0) !== 1 ? 's' : ''}</span>
            </button>

            <div className="flex items-center text-gray-600">
              <MessageCircle className="h-5 w-5 mr-1" />
              <span>{comments.length} comment{comments.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="bg-white rounded-xl shadow-lg mt-8 p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>

        {/* Add Comment Form */}
        {isAuthenticated ? (
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                rows={4}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-gray-600">Please sign in to post a comment</p>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-center mb-2">
                <div className="bg-blue-100 p-2 rounded-full ml-3">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{comment.author}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString('en-US')}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed ml-11">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;