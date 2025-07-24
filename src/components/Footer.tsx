import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <BookOpen className="h-8 w-8 text-blue-400 mr-2" />
              <h3 className="text-xl font-bold">TechBlog Pro</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              A comprehensive collection of professional articles covering various aspects of technology, 
              programming, and design. Your go-to resource for learning and staying updated with the latest trends.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
              <li><a href="#" className="hover:text-white transition-colors">React</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Backend</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Machine Learning</a></li>
              <li><a href="#" className="hover:text-white transition-colors">DevOps</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@techblogpro.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 TechBlog Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;