import { Link } from 'react-router-dom';
import facebookIcon from '../../assets/logos_facebook.webp';
import instagramIcon from '../../assets/skill-icons_instagram.webp';
import logo from '../../assets/logo.webp';

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-8 lg:mt-16">
      <div className="container mx-auto py-16 text-sm px-4 sm:px-6 md:px-10 lg:px-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Logo and Description */}
          <div className="space-y-4 text-center md:text-left">
            <img src={logo} alt="Logo" className="" />
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto md:mx-0">
              A premium baby and children's clothing store offering a curated selection from top international brands.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-4 justify-center md:justify-start">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Facebook"
              >
                <img src={facebookIcon} alt="Facebook" className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <img src={instagramIcon} alt="Instagram" className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Links - Hidden on small mobile, shown from md */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-900 mb-4 text-base lg:text-lg">Links</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-gray-900 transition-colors">About us</Link></li>
              <li><Link to="/faqs" className="hover:text-gray-900 transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="hover:text-gray-900 transition-colors">Contact Us</Link></li>
              <li><Link to="/delivery" className="hover:text-gray-900 transition-colors">Delivery & Return</Link></li>
              <li><Link to="/brands" className="hover:text-gray-900 transition-colors">Our Brands</Link></li>
            </ul>
          </div>

          {/* Ship to */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold text-gray-900 mb-4 text-base lg:text-lg">Ship to</h3>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mx-auto md:mx-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Egypt</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile-only Links Section */}
        <div className="md:hidden mt-8 pt-8 border-t">
          <div className="grid grid-cols-2 gap-4 text-center">
            <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900 py-2">About us</Link>
            <Link to="/faqs" className="text-sm text-gray-600 hover:text-gray-900 py-2">FAQs</Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900 py-2">Contact Us</Link>
            <Link to="/delivery" className="text-sm text-gray-600 hover:text-gray-900 py-2">Delivery</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-6 pb-16 lg:pb-0 text-center">
          <p className="text-xs lg:text-sm text-gray-600">
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
