import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 border border-[var(--border)] mt-16">

      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">
             {import.meta.env.VITE_APP_NAME}
          </h2>

          <p className="text-sm leading-6">
             {import.meta.env.VITE_APP_NAME} is your trusted online shopping destination for
            electronics, fashion, home essentials, accessories and much more.
            We provide quality products at affordable prices.
          </p>

          <div className="flex gap-4 mt-6">

            <a href="#" className="hover:text-blue-500">
              <FaFacebookF />
            </a>

            <a href="#" className="hover:text-pink-500">
              <FaInstagram />
            </a>

            <a href="#" className="hover:text-sky-500">
              <FaTwitter />
            </a>

            <a href="#" className="hover:text-blue-400">
              <FaLinkedinIn />
            </a>

            <a href="#" className="hover:text-white">
              <FaGithub />
            </a>

          </div>
        </div>

        {/* Quick Links */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/shop" className="hover:text-white">
                Shop
              </Link>
            </li>

            <li>
              <Link to="/categories" className="hover:text-white">
                Categories
              </Link>
            </li>

            <li>
              <Link to="/wishlist" className="hover:text-white">
                Wishlist
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>

          </ul>

        </div>

        {/* Customer Service */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Customer Service
          </h3>

          <ul className="space-y-3">

            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>

            <li>
              <Link to="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>

            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link to="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>

            <li>
              <Link to="/returns" className="hover:text-white">
                Return Policy
              </Link>
            </li>

          </ul>

        </div>

        {/* Contact */}
        <div>

          <h3 className="text-xl font-semibold text-white mb-5">
            Contact
          </h3>

          <div className="space-y-4">

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-500" />
              <span>Ranchi, Jharkhand, India</span>
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-500" />
              <span>+91 9876543210</span>
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-red-500" />
              <span>support@shopsphere.com</span>
            </div>

          </div>

          {/* Newsletter */}

          <div className="mt-6">

            <h4 className="font-semibold text-white mb-3">
              Newsletter
            </h4>

            <form className="flex">

              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-l-md text-black outline-none"
              />

              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-md text-white"
              >
                <FaPaperPlane />
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* Bottom Footer */}

      <div className="border-t border-gray-700">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between">

          <p className="text-sm text-center md:text-left">
            © {currentYear} ShopSphere. All rights reserved.
          </p>

          <div className="flex gap-6 mt-4 md:mt-0">

            <Link to="/privacy-policy" className="hover:text-white text-sm">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-white text-sm">
              Terms
            </Link>

            <Link to="/contact" className="hover:text-white text-sm">
              Contact
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;

