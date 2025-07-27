import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8" />
        <span className="text-xl font-bold">Blogify</span>
      </Link>
      <div className="space-x-4">
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
