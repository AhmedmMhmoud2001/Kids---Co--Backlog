import { Link } from 'react-router-dom';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="mb-6 text-sm text-gray-500">
      {items.map((item, index) => (
        <span key={index}>
          {item.path ? (
            <Link to={item.path} className="hover:text-gray-900">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="mx-2">›</span>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;

