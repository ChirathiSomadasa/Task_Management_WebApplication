import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SendIcon from "@mui/icons-material/Send";

function Footer() {
  // Get current year for copyright
  const currentYear = new Date().getFullYear();

  // Quick links for task management
  const quickLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Task List", path: "/tasks" },
    { name: "Settings", path: "/settings" },
    { name: "Contact Support", path: "/contact" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main footer content */}
      <div className="container mx-auto px-6 pt-10 pb-6">
        <div className="flex flex-wrap">
          {/* Brand and description */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <div className="flex items-center mb-4">

              <span className="text-xl font-bold">TaskEase</span>
            </div>
            <p className="text-gray-400 mb-4">
              Manage tasks efficiently with TaskManager.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com " className="text-gray-400 hover:text-blue-400 transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://twitter.com " className="text-gray-400 hover:text-blue-400 transition-colors">
                <TwitterIcon />
              </a>
              <a href="https://instagram.com " className="text-gray-400 hover:text-blue-400 transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://youtube.com " className="text-gray-400 hover:text-blue-400 transition-colors">
                <YouTubeIcon />
              </a>
              <a href="https://linkedin.com " className="text-gray-400 hover:text-blue-400 transition-colors">
                <LinkedInIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Section */}
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Support</h3>
            <p className="text-gray-400 mb-4">
              Need help? Contact our support team.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 text-gray-200 px-4 py-2 rounded-l outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button className="bg-[#046bba] hover:bg-blue-600 px-4 py-2 rounded-r transition-colors">
                <SendIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom footer */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">© {currentYear} TaskManager. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link to="/about" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;