import { NAME } from "@/Name";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 pt-12 pb-3">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-extrabold mb-3 text-yellow-400">{NAME}</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for the latest products at unbeatable prices. 
            Quality, reliability, and style all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-yellow-400 transition-colors">Home</a>
            </li>
            
            <li>
              <a href="/upload" className="hover:text-yellow-400 transition-colors">Upload Product</a>
            </li>
            
          </ul>
        </div>

        {/* Support Links */}
       

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
          <p className="text-gray-400 text-sm mb-2">Email: support@nextmarket.com</p>
          <p className="text-gray-400 text-sm mb-4">Phone: +257 69 08 97 33</p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {NAME}. All rights reserved.
      </div>
    </footer>
  );
}
