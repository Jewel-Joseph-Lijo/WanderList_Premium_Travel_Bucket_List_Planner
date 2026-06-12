import React, { useState } from 'react';
import { Search, Bell, Globe, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export default function Navbar({ onSearchChange, searchQuery }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0b1326]/85 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all duration-300">
      <div className="flex justify-between items-center w-full px-6 md:px-12 py-4 max-w-7xl mx-auto">
        
        {/* Brand logo */}
        <div 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMobileMenuOpen(false);
          }}
          className="flex items-center space-x-2 text-2xl font-bold tracking-tight text-[#8ed5ff] cursor-pointer select-none"
          id="nav-logo"
        >
          <Globe className="w-6 h-6 text-[#8ed5ff] animate-pulse" />
          <span>WanderList</span>
        </div>

        {/* Navigation Items - Desktop */}
        <div className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
            className="text-[#8ed5ff] font-semibold text-xs tracking-wider uppercase border-b-2 border-[#8ed5ff] pb-1 cursor-pointer hover:opacity-90 font-label-caps"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('destinations-section')}
            className="text-[#bdc8d1] hover:text-[#8ed5ff] transition-colors font-semibold text-xs tracking-wider uppercase cursor-pointer font-label-caps"
          >
            Destinations
          </button>
          <button 
            onClick={() => scrollToSection('mastery-section')}
            className="text-[#bdc8d1] hover:text-[#8ed5ff] transition-colors font-semibold text-xs tracking-wider uppercase cursor-pointer font-label-caps"
          >
            Statistics
          </button>
          <button 
            onClick={() => scrollToSection('challenges-section')}
            className="text-[#bdc8d1] hover:text-[#8ed5ff] transition-colors font-semibold text-xs tracking-wider uppercase cursor-pointer font-label-caps"
          >
            Challenges
          </button>
          <button 
            onClick={() => scrollToSection('nomads-section')}
            className="text-[#bdc8d1] hover:text-[#8ed5ff] transition-colors font-semibold text-xs tracking-wider uppercase cursor-pointer font-label-caps"
          >
            Nomads
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdc8d1] w-4.5 h-4.5" />
            <input 
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="bg-[#171f33] border border-white/5 rounded-full pl-10 pr-4 py-1.5 text-sm text-[#dae2fd] placeholder-[#bdc8d1]/60 focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] w-48 transition-all focus:w-56"
              id="nav-search-input"
            />
          </div>

          <button className="p-2 hover:bg-white/5 rounded-full transition-all duration-300 text-[#bdc8d1] hover:text-[#8ed5ff] relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4edea3] rounded-full"></span>
          </button>

          <div className="w-9 h-9 rounded-full bg-[#222a3d] border border-white/10 overflow-hidden shadow-inner select-none cursor-pointer">
            <img 
              alt="User profile avatar" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4hFZ-Qm4KgEM08vETqryppekesHRLwHEUwE9gmcUkcP7DRStCLl953Hjhfaer2ITuFX8q7uXZBBxkJowP7MISHJ_Zq7hsAyhTo_hwy0C08BdR-v6Fw_R3YY4TSOISUkjYSIcXtGpVPbHRDBFq_le5Qab47YxZLll51o0lyGP7fIlVjujT3vatUVpnVGrdw0UlJEMPFF13dyYurMruRGm6YPejcQOBAhpyEP4z03mOB63sBshmqjaP9SjHtdYFpQFoWlmViezF7Q"
            />
          </div>

          {/* Hamburger Menu Toggle - Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-white/5 rounded-full transition-all text-[#bdc8d1] hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#8ed5ff]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown list */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-[#0d172e] border-b border-white/10 overflow-hidden px-6 pb-6 pt-2 space-y-4 shadow-xl"
            id="mobile-navigation-drawer"
          >
            {/* Mobile Search input */}
            <div className="relative sm:hidden py-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdc8d1] w-4.5 h-4.5" />
              <input 
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#171f33] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#dae2fd] placeholder-[#bdc8d1]/60 focus:outline-none focus:ring-1 focus:ring-[#8ed5ff]"
                id="nav-search-input-mobile"
              />
            </div>

            {/* Nav list */}
            <div className="flex flex-col space-y-3 font-medium text-sm">
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-[#8ed5ff] py-2 border-b border-white/5 font-semibold text-xs tracking-wider uppercase font-label-caps"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('destinations-section')}
                className="text-left text-[#bdc8d1] hover:text-white py-2 border-b border-white/5 font-semibold text-xs tracking-wider uppercase font-label-caps"
              >
                Destinations
              </button>
              <button 
                onClick={() => scrollToSection('mastery-section')}
                className="text-left text-[#bdc8d1] hover:text-white py-2 border-b border-white/5 font-semibold text-xs tracking-wider uppercase font-label-caps"
              >
                Statistics
              </button>
              <button 
                onClick={() => scrollToSection('challenges-section')}
                className="text-left text-[#bdc8d1] hover:text-white py-2 border-b border-white/5 font-semibold text-xs tracking-wider uppercase font-label-caps"
              >
                Challenges
              </button>
              <button 
                onClick={() => scrollToSection('nomads-section')}
                className="text-left text-[#bdc8d1] hover:text-white py-2 border-b border-white/5 font-semibold text-xs tracking-wider uppercase font-label-caps"
              >
                Nomads
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
