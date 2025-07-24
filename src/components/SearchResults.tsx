import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Article } from '../types';
import ArticleCard from './ArticleCard';

interface SearchResultsProps {
  query: string;
  results: Article[];
  onBack: () => void;
  onReadArticle: (article: Article) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, onBack, onReadArticle }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-4"
        >
          <ArrowRight className="h-5 w-5 mr-1" />
          Back to Home
        </button>

        <div className="flex items-center mb-4">
          <Search className="h-6 w-6 text-gray-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <p className="text-lg text-gray-700">
            Search results for: <span className="font-bold text-blue-600">"{query}"</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {results.length} article{results.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onRead={onReadArticle}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-600 mb-2">No results found</h3>
          <p className="text-gray-500 mb-6">
            Sorry, we couldn't find any articles matching your search terms.
          </p>
          <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
            <h4 className="font-medium text-gray-900 mb-2">Suggestions:</h4>
            <ul className="text-sm text-gray-600 space-y-1 text-right">
              <li>• Check your spelling</li>
              <li>• Try using related keywords</li>
              <li>• Try a shorter search query</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;