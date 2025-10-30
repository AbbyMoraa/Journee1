export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#F8E7C9] to-[#D1F0E1] text-amber-900 shadow-inner mt-0">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Journee. All rights reserved.
        </p>

        <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-3 md:mt-0 text-sm">
          <a
            href="https://www.pexels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-teal-700 transition-colors"
          >
            Images by Pexels
          </a>
          <a href="#" className="hover:text-teal-700 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-teal-700 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}