"use client";
import React, { useState } from "react";
import Button from "./Button";

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = "" }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`bg-header-1 rounded-b-3xl px-4 sm:px-6 lg:px-10 py-4 lg:py-6 shadow-sm ${className}`}>
      <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src="/images/img_header_logo.svg"
            alt="EduVibe Logo"
            className="w-8 h-6 sm:w-10 sm:h-8 lg:w-12 lg:h-10"
          />
        </div>

        {/* Hamburger Menu Icon (Mobile only) */}
        <button
          className="block lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6 text-global-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          <button className="text-lg xl:text-xl font-normal text-global-1 hover:text-button-1 transition-colors duration-200 px-2 py-1">
            Home
          </button>
          <button className="text-lg xl:text-xl font-normal text-global-1 hover:text-button-1 transition-colors duration-200 px-2 py-1">
            Sessions
          </button>
          <button className="text-lg xl:text-xl font-normal text-global-1 hover:text-button-1 transition-colors duration-200 px-2 py-1">
            About
          </button>
        </nav>

        {/* Get Started Button - Desktop */}
        <div className="hidden lg:block">
          <Button
            variant="primary"
            className="text-lg xl:text-xl font-medium text-button-3 bg-button-1 rounded-lg px-6 py-2 hover:bg-button-2 transition-all duration-200">
            Get Started
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${menuOpen ? "block" : "hidden"} lg:hidden mt-4 border-t border-gray-200 pt-4`}>
        <nav className="flex flex-col gap-4">
          <button className="text-left text-base font-normal text-global-1 hover:text-button-1 transition-colors duration-200 py-2">
            Home
          </button>
          <button className="text-left text-base font-normal text-global-1 hover:text-button-1 transition-colors duration-200 py-2">
            Sessions
          </button>
          <button className="text-left text-base font-normal text-global-1 hover:text-button-1 transition-colors duration-200 py-2">
            About
          </button>
          <div className="pt-2">
            <Button
              variant="primary"
              fullWidth
              className="text-base font-medium text-button-3 bg-button-1 rounded-lg py-3 hover:bg-button-2 transition-colors">
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
