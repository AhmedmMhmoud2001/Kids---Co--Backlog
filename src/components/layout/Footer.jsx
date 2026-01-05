import { Link } from 'react-router-dom';
import facebookIcon from '../../assets/logos_facebook.png';
import instagramIcon from '../../assets/skill-icons_instagram.png';

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-16">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="text-2xl font-bold">
              <span className="text-black">k</span>
              <span className="text-blue-500">id</span>
              <span className="text-black">s</span>
              <span className="text-blue-500">&</span>
              <span className="text-pink-500">Co</span>
              <span className="text-black">.</span>
            </div>
            <p className="text-sm text-gray-600">
              A premium baby and children's clothing store offering a curated selection from top international brands.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3">
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={facebookIcon} alt="Facebook" className="w-8 h-8" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity">
                <img src={instagramIcon} alt="Instagram" className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-gray-900">About us</Link></li>
              <li><Link to="/faqs" className="hover:text-gray-900">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900">Contact Us</Link></li>
              <li><Link to="/delivery" className="hover:text-gray-900">Delivery & Return</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/category/boy" className="hover:text-gray-900">Boy</Link></li>
              <li><Link to="/category/girl" className="hover:text-gray-900">Girl</Link></li>
              <li><Link to="/category/baby-boy" className="hover:text-gray-900">Baby Boy</Link></li>
              <li><Link to="/category/baby-girl" className="hover:text-gray-900">Baby Girl</Link></li>
              <li><Link to="/category/accessories" className="hover:text-gray-900">Accessories</Link></li>
              <li><Link to="/category/footwear" className="hover:text-gray-900">Footwear</Link></li>
            </ul>
          </div>

          {/* Ship to */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ship to</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Egypt</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-600">
          <p>
            All Rights Reserved © Designed by{' '}
            <a 
              href="https://www.qeematech.net/" 
              rel="dofollow"
              target="_blank"
              className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              Qeematech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

