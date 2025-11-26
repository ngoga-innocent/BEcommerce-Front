import {NAME} from "@/Name";
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-2 text-white">ShopEase</h2>
          <p className="text-gray-400 text-sm">
            Your one-stop shop for the latest products at unbeatable prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Quick Links</h3>
          <ul className="space-y-1 text-gray-400 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-2 text-white">Contact</h3>
          <p className="text-gray-400 text-sm">Email: support@shopease.com</p>
          <p className="text-gray-400 text-sm">Phone: +123 456 7890</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} {NAME}. All rights reserved.
      </div>
    </footer>
  );
}
