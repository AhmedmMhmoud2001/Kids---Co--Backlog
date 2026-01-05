import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">About Us</h1>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Welcome to Kids & Co.</h2>
            <p className="text-gray-700 leading-relaxed">
              A premium baby and children's clothing store offering a curated selection from top international brands. 
              We are dedicated to providing high-quality, stylish, and comfortable clothing for children of all ages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At Kids & Co., we believe that every child deserves to look and feel their best. 
              We carefully select each item in our collection to ensure it meets our high standards 
              for quality, style, and comfort.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Brands</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We partner with renowned international brands including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>TED Baker</li>
              <li>River Island</li>
              <li>GUCCI</li>
              <li>Golden Goose</li>
              <li>And many more premium brands</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Premium quality products from trusted international brands</li>
              <li>Fast and reliable shipping</li>
              <li>Easy returns and exchanges</li>
              <li>Excellent customer service</li>
              <li>Competitive prices</li>
            </ul>
          </section>
        </div>

        <div className="mt-8">
          <Link 
            to="/shop" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

