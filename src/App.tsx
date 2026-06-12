import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown, Sparkles } from 'lucide-react';

// Sub-components
import Navbar from './components/Navbar';
import StatsDashboard from './components/StatsDashboard';
import AddDestinationForm from './components/AddDestinationForm';
import DestinationCard from './components/DestinationCard';
import TravelMasteryProgress from './components/TravelMasteryProgress';
import TestimonialsSection from './components/TestimonialsSection';
import DestinationDetailModal from './components/DestinationDetailModal';

// Static seed data
import { INITIAL_DESTINATIONS } from './data';
import { Destination, CategoryType } from './types';

export default function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Visited' | 'Wishlist'>('All');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  
  // Newsletter registration
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [footerNotice, setFooterNotice] = useState<string | null>(null);

  // Initialize from LocalStorage or seed data
  useEffect(() => {
    const saved = localStorage.getItem('wanderlist_destinations');
    if (saved) {
      try {
        setDestinations(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to parse localStorage destinations', err);
        setDestinations(INITIAL_DESTINATIONS);
      }
    } else {
      setDestinations(INITIAL_DESTINATIONS);
    }
  }, []);

  // Save to LocalStorage whenever destinations list changes
  const saveDestinations = (updatedList: Destination[]) => {
    setDestinations(updatedList);
    localStorage.setItem('wanderlist_destinations', JSON.stringify(updatedList));
  };

  // Add custom destination
  const handleAddDestination = (newDest: Omit<Destination, 'id' | 'createdAt'>) => {
    const freshItem: Destination = {
      ...newDest,
      id: Math.random().toString(36).substring(2, 9),
      createdAt: Date.now()
    };
    saveDestinations([freshItem, ...destinations]);
  };

  // Toggle visited checkbox key trigger
  const handleToggleVisited = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal opening
    const updated = destinations.map((d) => {
      if (d.id === id) {
        return { ...d, visited: !d.visited };
      }
      return d;
    });
    saveDestinations(updated);
  };

  // Toggle wishlist heart key trigger
  const handleToggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal opening
    const updated = destinations.map((d) => {
      if (d.id === id) {
        return { ...d, wishlisted: !d.wishlisted };
      }
      return d;
    });
    saveDestinations(updated);
  };

  // Update whole destination (e.g. edited details or AI caching inside modal)
  const handleUpdateDestination = (updatedItem: Destination) => {
    const updated = destinations.map((d) => (d.id === updatedItem.id ? updatedItem : d));
    saveDestinations(updated);
    
    // Sync modal view cache
    if (selectedDestination && selectedDestination.id === updatedItem.id) {
      setSelectedDestination(updatedItem);
    }
  };

  // Delete destination trigger
  const handleDeleteDestination = (id: string) => {
    const filtered = destinations.filter((d) => d.id !== id);
    saveDestinations(filtered);
    setSelectedDestination(null);
  };

  // Filter & Search computation
  const filteredDestinations = destinations.filter((dest) => {
    // 1. Search Query check
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase());

    // 2. Category selection check
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;

    // 3. Status filter check
    const matchesStatus = 
      selectedStatus === 'All' || 
      (selectedStatus === 'Visited' && dest.visited) ||
      (selectedStatus === 'Wishlist' && dest.wishlisted);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNewsletterJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  return (
    <div className="bg-[#0b1326] text-[#dae2fd] font-sans overflow-x-hidden min-h-screen selection:bg-[#8ed5ff] selection:text-[#001e2c]" id="wanderlist-app-root">
      
      {/* 1. Header Navigation Bar */}
      <Navbar onSearchChange={setSearchQuery} searchQuery={searchQuery} />

      {/* 2. Hero cinematic section */}
      <section className="relative min-h-screen md:h-screen flex items-center justify-center pt-28 pb-16 md:py-0 overflow-hidden" id="hero-banner">
        {/* Absolute high-res wide backdrop banner */}
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover select-none scale-[1.03] animate-fade-in" 
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8h_Uzb4wIBW0jFzKiDujhXH2zF43glQprlp6i3PBne-4y3mhw-4Lk37jmz9H8MccL5Zr5Iy7AARtfDbO5gDNiLMlGJ2jxjUmJ_gPpiZnhsO5FiuKG3bbhuhaEHSdrDWLcGeh_UEWH6j5b75P6U-XjS25UpgdXU4rh36UoCu2CWmUlW5bjsm_tEITsTgbbtgVtvkM2BF8RYBpqmZNWYC4fEaH0UNP7TQ_S0HHNrBxXO4V4PP9sAb6KIFlOIBIbd6SUKN3uBvYJUg"
            alt="Majestic high peaks sunrise"
          />
          {/* Deep professional overlay shadow mask */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b1326]/40 via-[#0b1326]/60 to-[#0b1326]"></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-1.5 bg-[#8ed5ff]/10 text-[#8ed5ff] border border-[#8ed5ff]/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6 select-none font-label-caps"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Welcome to Wanderlist v1.2</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-[#dae2fd] tracking-tight leading-none"
          >
            Explore Your Dream Destinations
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-base md:text-lg lg:text-xl text-[#bdc8d1] mb-8 max-w-2xl text-center leading-relaxed font-normal"
          >
            Plan, track and achieve your travel goals with a beautifully designed travel companion.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button 
              onClick={() => scrollToElement('add-destination-card')}
              className="px-8 py-4 bg-[#8ed5ff] text-[#001e2c] font-extrabold rounded-full hover:shadow-[0_0_25px_rgba(142,213,255,0.4)] transition-all transform hover:scale-104 active:scale-95 cursor-pointer w-full sm:w-52 select-none"
            >
              Start Exploring
            </button>
            <button 
              onClick={() => scrollToElement('destinations-section')}
              className="px-8 py-4 border border-white/20 text-[#dae2fd] hover:text-white font-extrabold rounded-full hover:bg-white/5 transition-all cursor-pointer w-full sm:w-52 select-none"
            >
              View Destinations
            </button>
          </motion.div>
        </div>

        {/* Scroll helper trigger */}
        <div 
          onClick={() => scrollToElement('statistics-dashboard')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center cursor-pointer opacity-75 hover:opacity-100 select-none"
        >
          <span className="text-[10px] font-bold tracking-widest text-[#bdc8d1]/60 mb-1.5 uppercase font-label-caps">SCROLL</span>
          <ChevronDown className="text-[#8ed5ff] w-5 h-5" />
        </div>
      </section>

      {/* 3. Numerical interactive Statistics Bar */}
      <StatsDashboard destinations={destinations} />

      {/* 4. Filter section, Core Form, and Destination Gallery */}
      <section className="px-6 md:px-12 py-12 max-w-7xl mx-auto" id="destinations-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT Column: Sticky glass card Form */}
          <div className="lg:col-span-1">
            <AddDestinationForm onAddDestination={handleAddDestination} />
          </div>

          {/* RIGHT Column: Search & Gallery Grid */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Search filter row and toggles */}
            <div className="space-y-4">
              
              {/* Secondary search input box */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#bdc8d1] w-5 h-5 pointer-events-none" />
                <input 
                  type="text"
                  placeholder="Search your global list (e.g. Santorini, France)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#171f33] border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm text-[#dae2fd] placeholder-[#bdc8d1]/30 focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] shadow-xl transition-all"
                  id="main-gallery-search-input"
                />
              </div>

              {/* Advanced Category Chip Rows */}
              <div className="flex flex-wrap items-center gap-2 select-none" id="filter-chip-row">
                
                {/* Categories */}
                {(['All', 'Beaches', 'Mountains', 'Cities', 'Historical'] as const).map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 text-xs font-bold tracking-wider rounded-full uppercase font-label-caps border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#8ed5ff] text-[#001e2c] border-[#8ed5ff] shadow-[0_0_15px_rgba(142,213,255,0.3)]' 
                          : 'bg-white/[0.02] text-[#bdc8d1] border-white/10 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}

                <span className="w-[1px] h-5 bg-white/10 mx-1.5 hidden sm:inline-block"></span>

                {/* Visited & Pending filters */}
                {(['All', 'Visited', 'Wishlist'] as const).map((status) => {
                  const isActive = selectedStatus === status;
                  return (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`px-5 py-2 text-xs font-bold tracking-wider rounded-full uppercase font-label-caps border transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-[#4edea3] text-[#002113] border-[#4edea3] shadow-[0_0_15px_rgba(78,222,163,0.3)]' 
                          : 'bg-white/[0.02] text-[#bdc8d1] border-white/10 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {status === 'All' ? 'All Status' : status}
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Gallery Grid wrapper */}
            {filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="gallery-cards-grid">
                <AnimatePresence mode="popLayout">
                  {filteredDestinations.map((dest) => (
                    <DestinationCard 
                      key={dest.id}
                      destination={dest}
                      onToggleVisited={handleToggleVisited}
                      onToggleWishlist={handleToggleWishlist}
                      onCardClick={setSelectedDestination}
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/10 bg-white/[0.01] rounded-[24px]">
                <p className="text-[#bdc8d1] font-semibold text-sm">No adventures match your active filter combinations.</p>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedStatus('All');
                  }}
                  className="mt-4 text-xs font-bold text-[#8ed5ff] hover:underline"
                >
                  Reset Active Filters
                </button>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 5. Circular Travel progress & Active Challenges trackers */}
      <TravelMasteryProgress destinations={destinations} />

      {/* 6. Testimonials Row */}
      <TestimonialsSection />

      {/* 7. Beautiful comprehensive footer */}
      <footer className="w-full bg-[#060e20] border-t border-white/5 select-none" id="footer-container">
        
        {/* Interactive email subscription toast overlay */}
        {newsletterSuccess && (
          <div className="fixed bottom-6 right-6 z-101 bg-[#4edea3]/90 text-[#002113] backdrop-blur border border-[#4edea3]/30 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2">
            <span className="font-bold text-sm">✓ Successfully joined Wanderlist newsletter!</span>
          </div>
        )}

        {footerNotice && (
          <div className="fixed bottom-6 right-6 z-101 bg-[#171f33]/95 text-[#dae2fd] backdrop-blur-md border border-white/10 px-5 py-4 rounded-2xl shadow-2xl flex flex-col gap-1.5 max-w-xs animate-fade-in" id="footer-notice-toast">
            <span className="font-black text-[#8ed5ff] text-[11px] uppercase tracking-wider font-label-caps">Nomad Portal Guide</span>
            <p className="text-xs text-[#bdc8d1] leading-relaxed">{footerNotice}</p>
            <button 
              onClick={() => setFooterNotice(null)} 
              className="mt-1 text-left text-[10px] font-bold text-[#4edea3] uppercase tracking-wider hover:opacity-80 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-6 md:px-12 py-12 max-w-7xl mx-auto">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="text-2xl font-black text-[#8ed5ff]">WanderList</div>
            <p className="text-xs md:text-sm text-[#bdc8d1] leading-relaxed">
              Designing the future of global exploration for the modern visionary traveler.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-[11px] font-bold tracking-wider text-[#8ed5ff] uppercase font-label-caps mb-4">Company</h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#bdc8d1]/75">
              <li><button onClick={() => setFooterNotice('About Us: WanderList Premium was crafted to simplify luxury explore planning.')} className="hover:text-[#4edea3] transition-colors cursor-pointer block text-left">About Us</button></li>
              <li><button onClick={() => setFooterNotice('Careers: Join our remote digital nomad product suite.')} className="hover:text-[#4edea3] transition-colors cursor-pointer block text-left">Careers</button></li>
              <li><button onClick={() => setFooterNotice('Press Kit: Access visual high-res branding kits.')} className="hover:text-[#4edea3] transition-colors cursor-pointer block text-left">Press Kit</button></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-[11px] font-bold tracking-wider text-[#8ed5ff] uppercase font-label-caps mb-4">Resources</h4>
            <ul className="space-y-2 text-xs md:text-sm text-[#bdc8d1]/75">
              <li><button onClick={() => setFooterNotice('Guides: Browse curated 3-day plans from Gemini.')} className="hover:text-[#4edea3] transition-colors cursor-pointer block text-left">Travel Guides</button></li>
              <li><button onClick={() => setFooterNotice('Tips: Local travel secrets, safety guidelines, and packing advice.')} className="hover:text-[#4edea3] transition-colors cursor-pointer block text-left">Safety Tips</button></li>
              <li><button onClick={() => setFooterNotice('API: WanderList uses open source client endpoints.')} className="hover:text-[#4edea3] transition-colors cursor-pointer block text-left">API Docs</button></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-wider text-[#8ed5ff] uppercase font-label-caps mb-4">Newsletter</h4>
            <p className="text-xs text-[#bdc8d1]/70 leading-normal">Subscribe to unlock premium weekly travel templates.</p>
            <form onSubmit={handleNewsletterJoin} className="flex gap-2">
              <input 
                type="email" 
                required
                placeholder="Enter your email" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-[#171f33] text-xs text-[#dae2fd] border border-white/5 rounded-xl px-4 py-2.5 w-full focus:outline-none focus:ring-1 focus:ring-[#8ed5ff]"
              />
              <button 
                type="submit"
                className="bg-[#8ed5ff] hover:bg-[#8ed5ff]/90 text-[#001e2c] font-bold px-4 py-2 text-xs rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Inner copyrights footer */}
        <div className="px-6 md:px-12 py-8 border-t border-white/5 text-center">
          <p className="text-[10px] font-bold tracking-wider text-[#bdc8d1]/40 uppercase font-label-caps">
            © 2026 WanderList Global Exploration. All rights reserved.
          </p>
        </div>
      </footer>

      {/* 8. Absolute modal details loader */}
      <AnimatePresence>
        {selectedDestination && (
          <DestinationDetailModal 
            destination={selectedDestination}
            onClose={() => setSelectedDestination(null)}
            onUpdateDestination={handleUpdateDestination}
            onDeleteDestination={handleDeleteDestination}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
