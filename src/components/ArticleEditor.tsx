import React, { useState } from 'react';
import { 
  X, 
  Save, 
  Eye, 
  Upload, 
  Bold, 
  Italic, 
  Link, 
  List, 
  Code,
  Image as ImageIcon,
  Hash
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { categories } from '../data/mockData';

interface ArticleEditorProps {
  onClose: () => void;
  onSave?: (article: any) => void;
}

const ArticleEditor: React.FC<ArticleEditorProps> = ({ onClose, onSave }) => {
  const { user } = useAuth();
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    image: '',
    featured: false,
    status: 'draft' as 'draft' | 'published'
  });

  const handleSave = () => {
    const article = {
      id: Date.now(),
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      author: user?.name || 'Anonymous',
      publishDate: new Date().toISOString().split('T')[0],
      readTime: Math.ceil(formData.content.split(' ').length / 200),
      likes: 0,
      views: 0,
      comments: []
    };
    
    onSave?.(article);
    onClose();
  };

  const insertMarkdown = (syntax: string, placeholder: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = selectedText || placeholder;
    
    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `**${replacement}**`;
        break;
      case 'italic':
        newText = `*${replacement}*`;
        break;
      case 'link':
        newText = `[${replacement || 'link text'}](url)`;
        break;
      case 'code':
        newText = `\`${replacement}\``;
        break;
      case 'list':
        newText = `- ${replacement || 'list item'}`;
        break;
      case 'heading':
        newText = `## ${replacement || 'heading'}`;
        break;
      case 'image':
        newText = `![alt text](image-url)`;
        break;
      default:
        newText = replacement;
    }

    const newContent = 
      formData.content.substring(0, start) + 
      newText + 
      formData.content.substring(end);
    
    setFormData({ ...formData, content: newContent });
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const formatContent = (content: string) => {
    return content
      .replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
      .replace(/### (.*)/g, '<h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>')
      .replace(/- (.*)/g, '<li class="mb-1">$1</li>')
      .split('\n\n')
      .map(paragraph => {
        if (paragraph.includes('<h') || paragraph.includes('<li')) {
          return paragraph;
        }
        return paragraph.trim() ? `<p class="mb-4 leading-relaxed">${paragraph}</p>` : '';
      })
      .join('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Article</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isPreview 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eye className="h-4 w-4 mr-2" />
              {isPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Article
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {isPreview ? (
            /* Preview Mode */
            <div className="h-full overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                {/* Preview Header */}
                <div className="mb-8">
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt={formData.title}
                      className="w-full h-64 object-cover rounded-lg mb-6"
                    />
                  )}
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {formData.title || 'Article Title'}
                  </h1>
                  <p className="text-xl text-gray-600 mb-4">
                    {formData.excerpt || 'Article excerpt will appear here...'}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {user?.name}</span>
                    <span>•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{Math.ceil(formData.content.split(' ').length / 200)} min read</span>
                  </div>
                </div>

                {/* Preview Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: formatContent(formData.content || 'Start writing your article content...') 
                  }}
                />
              </div>
            </div>
          ) : (
            /* Edit Mode */
            <div className="h-full flex">
              {/* Form */}
              <div className="w-1/3 border-r border-gray-200 p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter article title..."
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Excerpt *
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Brief description of the article..."
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category...</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tag1, tag2, tag3..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                  </div>

                  {/* Featured Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Featured Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Featured article</span>
                    </label>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Editor */}
              <div className="flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="border-b border-gray-200 p-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => insertMarkdown('bold', 'bold text')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('italic', 'italic text')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('heading', 'Heading')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      title="Heading"
                    >
                      <Hash className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('link')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      title="Link"
                    >
                      <Link className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('list', 'list item')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      title="List"
                    >
                      <List className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('code', 'code')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      title="Code"
                    >
                      <Code className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => insertMarkdown('image')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
                      title="Image"
                    >
                      <ImageIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Content Editor */}
                <div className="flex-1 p-4">
                  <textarea
                    id="content-editor"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full h-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
                    placeholder="Start writing your article content here...

You can use Markdown syntax:
- **bold text**
- *italic text*
- ## Headings
- [links](url)
- `code`
- - lists"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;