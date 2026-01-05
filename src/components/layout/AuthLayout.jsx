import { Outlet, Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Simple Logo Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl md:text-3xl font-bold">
              <span className="text-black">k</span>
              <span className="text-blue-500">id</span>
              <span className="text-black">s</span>
              <span className="text-blue-500">&</span>
              <span className="text-pink-500">Co</span>
              <span className="text-black">.</span>
            </h1>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-8">
        <Outlet />
      </main>

      {/* Simple Footer */}
      <div className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
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
    </div>
  );
};

export default AuthLayout;

