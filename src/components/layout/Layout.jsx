import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import Footer from './Footer';
import BottomNav from './BottomNav';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Navigation />
      <main className="flex-grow pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Layout;

