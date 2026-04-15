import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-950 p-4 text-white shadow-lg flex justify-between items-center">
      <h1 className="text-xl font-bold uppercase tracking-wider">My Billing Website</h1>
      <div className="space-x-4">
        <Link to="/admin" className="hover:bg-blue-700 px-3 py-2 rounded transition">Admin</Link>
        <Link to="/billing" className="hover:bg-blue-700 px-3 py-2 rounded transition">Billing</Link>
      </div>
    </nav>
  );
};

export default Navbar;