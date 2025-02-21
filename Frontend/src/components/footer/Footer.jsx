import { Link } from "react-router-dom";

function Footer() {
    return (
      <footer className="bg-gray-900 text-white pt-10 pb-6 ">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About Us</h3>
            <p className="text-gray-400 text-sm">
              Your go-to destination for the best products at unbeatable prices. Quality & trust—delivered.
            </p>
          </div>
  
          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Shop Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Electronics</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Fashion</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home & Kitchen</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Beauty & Health</Link></li>
            </ul>
          </div>
  
          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/faq"  className="text-gray-400 hover:text-white transition">FAQs</Link></li>
              <li><Link to="/faq"  className="text-gray-400 hover:text-white transition">Return Policy</Link></li>
              <li><Link to="/cart"  className="text-gray-400 hover:text-white transition">Track Order</Link></li>
            </ul>
          </div>
  
          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4 justify-center">
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-gray-400 hover:text-white transition text-2xl"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
  
        {/* Copyright Section */}
        <div className="border-t border-gray-700 text-center text-gray-400 text-sm mt-8 pt-4">
          &copy; {new Date().getFullYear()} YourCompany. All Rights Reserved.
        </div>
      </footer>
    );
  }
  
  export default Footer;
  