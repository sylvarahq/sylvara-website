"use client";

import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full py-6 text-sm text-gray-500 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-zinc-800 mt-auto">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:justify-between px-4">
        {/* Left: Copyright */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <span>&copy; {new Date().getFullYear()} Smart Plant. All rights reserved.</span>
        </div>
        {/* Right: Social icons */}
        <div className="flex items-center space-x-6">
          <a
            href="https://www.instagram.com/hisylvara/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-transform duration-200 transform hover:scale-110"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://x.com/aakarshgar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-transform duration-200 transform hover:scale-110"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://www.linkedin.com/company/hisylvara/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-transform duration-200 transform hover:scale-110"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
