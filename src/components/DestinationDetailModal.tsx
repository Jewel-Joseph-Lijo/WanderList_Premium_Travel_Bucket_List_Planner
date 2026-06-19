import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Trash2, Edit2, Check, Landmark, Palmtree, Mountain, Building, Heart, CheckCircle } from 'lucide-react';
import { Destination, CategoryType } from '../types';

interface DestinationDetailModalProps {
  destination: Destination | null;
  onClose: () => void;
  onUpdateDestination: (updated: Destination) => void;
  onDeleteDestination: (id: string) => void;
}

export default function DestinationDetailModal({
  destination,
  onClose,
  onUpdateDestination,
  onDeleteDestination
}: DestinationDetailModalProps) {
  if (!destination) return null;

  // Tabs for modal context: 'view' vs 'edit'
  const [activeTab, setActiveTab] = useState<'view' | 'edit'>('view');

  // Edit fields
  const [editedName, setEditedName] = useState(destination.name);
  const [editedCountry, setEditedCountry] = useState(destination.country);
  const [editedCategory, setEditedCategory] = useState<CategoryType>(destination.category);
  const [editedImageUrl, setEditedImageUrl] = useState(destination.imageUrl);
  const [editedDescription, setEditedDescription] = useState(destination.description);

  // AI Itinerary state
  const [aiText, setAiText] = useState<string>(destination.itinerary || '');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Category Icon helper
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Beaches': return <Palmtree className="w-5 h-5 text-[#8ed5ff]" />;
      case 'Mountains': return <Mountain className="w-5 h-5 text-[#4edea3]" />;
      case 'Cities': return <Building className="w-5 h-5 text-[#ffc174]" />;
      case 'Historical': return <Landmark className="w-5 h-5 text-indigo-300" />;
      default: return <Landmark className="w-5 h-5 text-gray-300" />;
    }
  };

  // Submit edit form
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editedName.trim() || !editedCountry.trim()) return;

    const updatedDestination: Destination = {
      ...destination,
      name: editedName.trim(),
      country: editedCountry.trim(),
      category: editedCategory,
      imageUrl: editedImageUrl.trim() || destination.imageUrl,
      description: editedDescription.trim(),
      itinerary: aiText // preserve AI text if loaded
    };

    onUpdateDestination(updatedDestination);
    setActiveTab('view');
  };

  // Simulated premium loading text states
  const [loadingText, setLoadingText] = useState('Initiating local travel planner...');

  // High-fidelity client-side itinerary & pocket tips generator
  const generateLocalItinerary = (name: string, country: string, category: CategoryType, description: string): string => {
    const cleanDesc = description || 'A beautiful bucket-list location to explore.';
    const finalCountry = country || 'Global';

    switch (category) {
      case 'Mountains':
        return `### Insider Pocket Tips for ${name}
- **Early Ascent Privilege**: Start your ascent to the high trail at 5:00 AM. The alpine glow over the peaks of **${name}** is unmissable and you will bypass general tour crowds.
- **The Alpine Refuge Secret**: Book a reservation at the off-grid refuge halfway up the slopes for a traditional fondue or local altitude lunch surrounded by alpine meadows.
- **Aura Photography**: The clear mountain skies over **${name}** are perfect for late-night stargazing; bring a solid tripod for spectacular night landscape shots.

### Premium 3-Day Alpine Itinerary

**Day 1: Immersion & Main Icons**
- **Morning**: Begin with a gentle trek around the majestic base of **${name}**, inhaling the pine-fresh mountain breeze as alpine mist rises off the valleys.
- **Afternoon**: Board the scenic cloud-skirting panoramic cableway up to the highest viewpoint platforms. Enjoy a signature espresso at the top overlooking **${finalCountry}**'s glaciers.
- **Evening**: Unwind at a warm rustic mountain lodge. Savor slow-cooked local delicacies and listen to traditional acoustic guitar tunes by the crackling open fireplace.

**Day 2: Secret Spots & Off the Beaten Track**
- **Morning**: Hike the secret path to a hidden emerald alpine lake tucked away in the shadows of **${name}**'s high canyons. Perfect for absolute quietness and perfect mirror reflections.
- **Afternoon**: Discover a secluded wildflower valley trail with stunning gorge views, populated primarily by high-altitude fauna and native birds.
- **Evening**: Attend a private stargazing briefing with local guides, viewing deep-space constellations through high-caliber mountain astronomical telescopes.

**Day 3: Scenic Excursions & Local Culinary**
- **Morning**: Wind through the cloud-shrouded serpentine mountain roads of beautiful **${finalCountry}** on a scenic pass excursion.
- **Afternoon**: Relax at a family-run heritage mountain dairy farm. Taste organic artisanal cheeses, wild-berry tarts, and fresh spring water.
- **Evening**: Conclude your adventure with a signature geothermal spa healing session, featuring hot mineral thermal pools overlooking the majestic silhouettes of **${name}** under the stars.`;

      case 'Beaches':
        return `### Insider Pocket Tips for ${name}
- **Dawn Kayaking**: Wake up at sunrise for a peaceful sea kayaking session. The waters of **${name}** are calmest in the morning before coastal winds build up.
- **Secret Cove Access**: Walk past the smooth rock boulder formations on the southern headlands to discover a secluded sandy beach that only local fishermen know.
- **Eco-Snorkeling Secrets**: Rent specialized reef-friendly gear. The healthiest coral colonies can be found just past the main sandbar shelf.

### Premium 3-Day Beach Itinerary

**Day 1: Immersion & Main Icons**
- **Morning**: Walk along the sparkling, powdery sands of **${name}**, letting the warm turquoise waves lap at your feet while the golden sun climbs high.
- **Afternoon**: Join a private vintage wooden sailing charter around the coast. Swim with friendly manta rays and color-rich sea turtles.
- **Evening**: Book an intimate barefoot dinner right on the sand. Savor premium wood-grilled local lobster and fresh catches lit by bamboo fire torches.

**Day 2: Secret Spots & Off the Beaten Track**
- **Morning**: Board a local outrigger boat to a tiny sandbar nearby. Enjoy a sparkling champagne picnic breakfast completely surrounded by crystal ocean waters.
- **Afternoon**: Hike up the tropical cliffside trails to a hidden coastal canopy viewpoint offering an incredible overview of the **${finalCountry}** coastline.
- **Evening**: Take part in an evening bioluminescent plankton excursion under the night sky, watching the waters glow electric neon blue as you move.

**Day 3: Scenic Excursions & Local Culinary**
- **Morning**: Cycling tour around the island inlets, connecting peaceful fishing villages and pristine saltwater lagoons.
- **Afternoon**: Attend an exclusive culinary masterclass, learning the balance of preparing lime-infused ceviche and fresh tropical coconut curries.
- **Evening**: Embark on a premium sunset catamaran cruise, sipping fine local wine as the tropical sky turns deep red and orange over **${finalCountry}**.`;

      case 'Cities':
        return `### Insider Pocket Tips for ${name}
- **The Skyline Rooftop Alternative**: Skip the overcrowded observation decks. Instead, reserve a sky-high lounge table overlooking the architectural skyline of **${name}**.
- **Neighborhood Back-Alleys**: Walk through the historic vintage quarter to find family-owned leather bookbinders, independent perfume makers, and hidden vinyl vaults.
- **Pre-Dawn Gallery Access**: Secure early-bird tickets for the major museums to explore spectacular collections before crowds arrive.

### Premium 3-Day Cosmopolitan Itinerary

**Day 1: Immersion & Main Icons**
- **Morning**: Grab an artisanal espresso and explore the central tree-lined plazas, appreciating the grand neoclassical architecture of **${name}**.
- **Afternoon**: Visit the premier modern arts space. Search for world-renowned canvases and take a peaceful walk in the modern scuptured design gardens.
- **Evening**: Dine at an award-winning culinary workshop hidden in the vibrant historical center, testing seasonal ingredients of **${finalCountry}**.

**Day 2: Secret Spots & Off the Beaten Track**
- **Morning**: Embark on a private architectural walk of secret inner courtyards and contemporary modernist residential spaces hidden behind simple city walls.
- **Afternoon**: Explore a bohemian neighborhood craft market. Meet local indie publishers, vintage collectors, and listen to street jazz musicians.
- **Evening**: Enjoy a romantic, candlelit acoustic violin and cello concert held inside a beautifully converted historic warehouse loft.

**Day 3: Scenic Excursions & Local Culinary**
- **Morning**: Scenic tram ride or canal cruise around the emerald parks and outer waters of **${finalCountry}**, capturing modern skyline perspectives.
- **Afternoon**: Take part in a curated street culinary expedition. Sip local microbrews and test freshly baked artisan breads and luxury chocolates.
- **Evening**: Complete your trip with skyline sky-deck cocktails, witnessing the infinite sparkling neon grid of **${name}** illuminate the dark sky.`;

      case 'Historical':
        return `### Insider Pocket Tips for ${name}
- **Optimal Golden Hour**: Visit the historic archaeological ruins of **${name}** after 4:00 PM. The soft gold sunlight is perfect for photography and temperatures are cooler.
- **Hire a Specialized Historian**: Hire a certified local archivist or historian at the gate. Their deep cultural anecdotes exceed standard digital guide booklets.
- **Vault Archive Entry**: Search for the national historical library museum nearby; it displays the original hand-drawn excavation maps of **${finalCountry}**'s monuments.

### Premium 3-Day Archaeological Itinerary

**Day 1: Immersion & Main Icons**
- **Morning**: Step onto the ancient pathways of **${name}** as first sunlight hits the massive hand-carved stone columns and monumental arches.
- **Afternoon**: Enjoy an authentic garden lunch, featuring delicious recipes from traditional cookbooks passed down since historic eras.
- **Evening**: Participate in an exclusive twilight torch-lit run through the primary ruins, hearing historical tales under the peaceful dark starry night.

**Day 2: Secret Spots & Off the Beaten Track**
- **Morning**: Trek to the lesser-explored secondary archaeological excavations tucked behind the hills, untouched by modern tourism.
- **Afternoon**: Visit the restoration workshops. Observe local conservators using magnifying lenses to preserve ancient pottery fragments and original coins.
- **Evening**: Indulge in an exquisite, historically accurate multi-course banquet, with classical instruments and oral poetry retelling old tales of **${finalCountry}**.

**Day 3: Scenic Excursions & Local Culinary**
- **Morning**: Travel to a nearby historic village or fortified castle, observing lovely rural landscapes along the ancient road network.
- **Afternoon**: Join an ancient craft-shop workshop. Learn the fundamentals of traditional clay molding, stone sculpting, or old weaving.
- **Evening**: Conclude with a vintage wine or local beverage tasting inside an ancient vaulted stone cellar, celebrating the timeless heritage of **${name}**.`;

      default:
        return `### Insider Pocket Tips for ${name}
- **Avoid Peak Hours**: Check out the center early in the morning or late evening to discover the true spirit of **${name}** without the crowds.
- **Walk the Local Pathway**: Rely on recommendations from local artisans and tiny family bistros rather than commercial pamphlets.
- **Equip Best Lenses**: Bring a light camera with good low-light capture for high-fidelity shots of the local architecture.

### Premium 3-Day Custom Itinerary

**Day 1: Exploration & Main Discovery**
- **Morning**: Walk through the beautiful streets of **${name}**, taking in the local sights, greeting friendly residents of **${finalCountry}**.
- **Afternoon**: Discover the primary landmarks and read about the culture and architectural background of the site.
- **Evening**: Have a wonderful dinner at a highly rated local tavern, tasting fresh food prepared with high-quality local produce.

**Day 2: Hidden Corners & Local Treasures**
- **Morning**: Follow a scenic path off the main road to find custom viewpoints and peaceful natural retreats.
- **Afternoon**: Explore a local market or community center. Chat with local crafters, writers, or shop owners.
- **Evening**: Enjoy a relaxing evening listening to acoustic musical tunes or watching a traditional folklore dance presentation.

**Day 3: Immersive Experiences**
- **Morning**: Take deep-breath walks in nearby tree gardens or coastal pathways enjoying early morning breeze.
- **Afternoon**: Take part in local masterclasses or workshops, crafting a beautiful memento to bring home with you.
- **Evening**: Bid farewell to beautiful **${name}** at a gorgeous sunset spot, looking back at three spectacular days in **${finalCountry}**.`;
    }
  };

  // Trigger Local Client-Side Planner Simulation
  const handleGenerateAIPlanner = () => {
    setIsAiLoading(true);
    setAiError('');
    
    // Rotate beautiful premium messages in the background to build travel "feeling"
    const messages = [
      'Initiating premium digital travel planner...',
      `Connecting with local pocket secrets in ${destination.country}...`,
      `Sourcing elite recommendations for ${destination.name}...`,
      `Structuring high-end 3-Day itinerary program...`,
      'Compiling bespoke packing guidance and insights...',
      'Caching beautiful travel plans to Local Storage...'
    ];

    let step = 0;
    setLoadingText(messages[0]);
    
    const interval = setInterval(() => {
      step++;
      if (step < messages.length) {
        setLoadingText(messages[step]);
      }
    }, 300);

    // Simulate luxury computer layout design delay before outputting
    setTimeout(() => {
      clearInterval(interval);
      try {
        const text = generateLocalItinerary(
          destination.name,
          destination.country,
          destination.category,
          destination.description
        );

        setAiText(text);

        // Update destination locally in memory and persistent storage
        onUpdateDestination({
          ...destination,
          itinerary: text
        });
      } catch (err: any) {
        console.error(err);
        setAiError('An error occurred while generating the plan locally.');
      } finally {
        setIsAiLoading(false);
      }
    }, 1800);
  };

  // Basic markdown styles formatter
  const renderFormattedText = (text: string) => {
    if (!text) return null;
    
    // Split by lines and parse basic structures
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Headers: e.g. ### Header or **Header**
      if (trimmed.startsWith('###') || trimmed.startsWith('##') || trimmed.startsWith('#')) {
        const headerText = trimmed.replace(/^#+\s*/, '').replace(/\*\*/g, '');
        return (
          <h4 key={idx} className="text-[#8ed5ff] font-bold text-base md:text-lg mt-5 mb-2 border-b border-[#8ed5ff]/10 pb-1 font-sans">
            {headerText}
          </h4>
        );
      }
      
      // Bold block headers: e.g. **1. Name:** or **Day 1: ...**
      if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        const headerText = trimmed.replace(/\*\*/g, '');
        return (
          <h5 key={idx} className="text-[#4edea3] font-bold text-sm md:text-base mt-4 mb-2">
            {headerText}
          </h5>
        );
      }

      // Standard Bullet points
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const parsedContent = trimmed.substring(1).trim().replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        return (
          <li key={idx} className="text-xs md:text-sm text-[#bdc8d1] leading-relaxed ml-4 list-disc mb-1.5 list-outside">
            <span dangerouslySetInnerHTML={{ __html: parsedContent }} />
          </li>
        );
      }

      // Standard numbered lists
      if (/^\d+\./.test(trimmed)) {
        const parsedContent = trimmed.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
        return (
          <div key={idx} className="text-xs md:text-sm text-[#bdc8d1] leading-relaxed ml-1 mb-2">
            <span dangerouslySetInnerHTML={{ __html: parsedContent }} />
          </div>
        );
      }

      // Normal paragraph line
      if (trimmed === '') {
        return <div key={idx} className="h-2"></div>;
      }

      const inlineBold = trimmed.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
      return (
        <p key={idx} className="text-xs md:text-sm text-[#dae2fd]/80 leading-relaxed mb-2 font-normal" dangerouslySetInnerHTML={{ __html: inlineBold }} />
      );
    });
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[#060e20]/80 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Card wrapper */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        className="relative bg-[#171f33] border border-white/10 rounded-[28px] w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        id="detail-modal-container"
      >
        
        {/* Banner image with Close Trigger */}
        <div className="h-56 md:h-64 relative select-none shrink-0">
          <img 
            src={destination.imageUrl} 
            referrerPolicy="no-referrer"
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171f33] via-[#171f33]/30 to-black/20"></div>

          {/* Tag Overlay top-left */}
          <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10">
            {getCategoryIcon(destination.category)}
            <span className="text-xs font-bold text-[#dae2fd] tracking-wide font-label-caps uppercase">{destination.category}</span>
          </div>

          {/* Close button top-right */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-md hover:bg-black/60 border border-white/10 text-[#dae2fd] hover:text-white rounded-full flex items-center justify-center transition-all cursor-pointer"
            id="modal-close-trigger"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Text and Controls absolute bottom */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-3">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#dae2fd] tracking-tight">{destination.name}</h2>
              <p className="text-sm text-[#bdc8d1] font-semibold">{destination.country}</p>
            </div>

            {/* Quick Toggle Action Badges */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={(e) => {
                  onUpdateDestination({ ...destination, visited: !destination.visited });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold font-label-caps uppercase flex items-center gap-1 border cursor-pointer select-none transition-all ${
                  destination.visited 
                    ? 'bg-[#4edea3]/10 text-[#4edea3] border-[#4edea3]/30' 
                    : 'bg-white/5 text-[#bdc8d1] border-white/10 hover:bg-white/10'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{destination.visited ? 'Visited' : 'Mark Visited'}</span>
              </button>

              <button 
                onClick={(e) => {
                  onUpdateDestination({ ...destination, wishlisted: !destination.wishlisted });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold font-label-caps uppercase flex items-center gap-1 border cursor-pointer select-none transition-all ${
                  destination.wishlisted 
                    ? 'bg-[#ffc174]/10 text-[#ffc174] border-[#ffc174]/30' 
                    : 'bg-white/5 text-[#bdc8d1] border-white/10 hover:bg-white/10'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${destination.wishlisted ? 'fill-[#ffc174]' : ''}`} />
                <span>Wishlist</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-[#131b2e] border-b border-white/10 px-6 shrink-0 justify-between items-center select-none">
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveTab('view')}
              className={`py-3 text-xs md:text-sm font-bold tracking-wider uppercase font-label-caps relative cursor-pointer ${
                activeTab === 'view' ? 'text-[#8ed5ff]' : 'text-[#bdc8d1]/60 hover:text-[#dae2fd]'
              }`}
            >
              <span>Destinations Insights</span>
              {activeTab === 'view' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8ed5ff]"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('edit')}
              className={`py-3 text-xs md:text-sm font-bold tracking-wider uppercase font-label-caps relative cursor-pointer flex items-center gap-1 ${
                activeTab === 'edit' ? 'text-[#8ed5ff]' : 'text-[#bdc8d1]/60 hover:text-[#dae2fd]'
              }`}
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Modify Details</span>
              {activeTab === 'edit' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8ed5ff]"></span>
              )}
            </button>
          </div>

          {showConfirmDelete ? (
            <div className="flex items-center gap-2 py-2" id="delete-confirmation-wrapper">
              <span className="text-[11px] font-semibold text-[#ffb4ab] animate-pulse">Confirm delete?</span>
              <button
                onClick={() => {
                  onDeleteDestination(destination.id);
                  onClose();
                }}
                className="text-[11px] font-bold text-white bg-[#93000a] hover:bg-[#93000a]/80 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all active:scale-95 shadow-sm"
                id="btn-confirm-delete-yes"
              >
                Delete
              </button>
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="text-[11px] font-semibold text-[#bdc8d1]/60 hover:text-white px-2 py-1.5 rounded-lg cursor-pointer transition-all"
                id="btn-confirm-delete-cancel"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowConfirmDelete(true)}
              className="text-xs font-semibold text-[#ffb4ab] hover:text-[#ffb4ab]/80 px-2 py-1 hover:bg-[#93000a]/10 rounded-lg cursor-pointer flex items-center gap-1 active:scale-95 transition-all"
              id={`btn-delete-${destination.id}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove Place</span>
            </button>
          )}
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 min-h-0 bg-[#171f33]">
          
          <AnimatePresence mode="wait">
            
            {activeTab === 'view' ? (
              <motion.div 
                key="view-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                tabIndex={0}
                className="space-y-6 focus:outline-none"
              >
                {/* Description Column */}
                <div>
                  <h3 className="text-[11px] font-bold tracking-wider uppercase text-[#bdc8d1]/50 font-label-caps mb-1.5 text-left">About This Place</h3>
                  <p className="text-xs md:text-sm text-[#dae2fd] leading-relaxed font-normal bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
                    {destination.description}
                  </p>
                </div>

                {/* AI Planner Container */}
                <div className="border-t border-white/5 pt-6 text-left">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-[11px] font-bold tracking-wider uppercase text-[#bdc8d1]/50 font-label-caps">Advanced AI Orchestration</h3>
                      <p className="text-[10px] text-[#bdc8d1]/65">Generate bespoke packing lists and high-end 3-day itineraries with Gemini v3.5.</p>
                    </div>

                    {!aiText && !isAiLoading && (
                      <button 
                        onClick={handleGenerateAIPlanner}
                        className="py-2.5 px-4 bg-gradient-to-r from-[#8ed5ff] to-[#4edea3] text-[#001e2c] text-xs font-bold rounded-xl hover:shadow-[0_0_15px_rgba(142,213,255,0.4)] flex items-center gap-1.5 transition-all select-none cursor-pointer"
                        id="btn-gemini-planner"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Build Itinerary</span>
                      </button>
                    )}
                  </div>

                  {/* Loading status */}
                  {isAiLoading && (
                    <div className="flex flex-col items-center justify-center py-10 space-y-3 bg-[#131b2e]/40 border border-white/5 rounded-2xl select-none">
                      <div className="w-8 h-8 rounded-full border-2 border-t-transparent border-[#8ed5ff] animate-spin"></div>
                      <p className="text-xs font-semibold text-[#bdc8d1] tracking-wide animate-pulse">{loadingText}</p>
                    </div>
                  )}

                  {/* Error display */}
                  {aiError && (
                    <div className="p-4 bg-[#93000a]/20 border border-[#ffb4ab]/30 rounded-2xl text-[#ffb4ab] text-xs font-medium">
                      <p>{aiError}</p>
                      <button 
                        onClick={handleGenerateAIPlanner}
                        className="mt-3 text-xs text-[#8ed5ff] hover:underline font-bold"
                      >
                        Retry Generation
                      </button>
                    </div>
                  )}

                  {/* AI Response Text parsed */}
                  {aiText && !isAiLoading && (
                    <div className="relative bg-[#131b2e]/70 border border-white/5 p-5 md:p-6 rounded-2xl shadow-inner scroll-smooth font-body-md overflow-x-hidden">
                      <div className="absolute top-4 right-4 bg-[#8ed5ff]/10 text-[#8ed5ff] border border-[#8ed5ff]/20 rounded-full px-2.5 py-0.5 text-[9px] font-bold tracking-wide uppercase font-label-caps">
                        AI Planner Active
                      </div>
                      <div className="space-y-4">
                        {renderFormattedText(aiText)}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.form 
                key="edit-panel"
                onSubmit={handleSaveEdit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {/* Edited Name */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Destination Name</label>
                    <input 
                      type="text"
                      required
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#8ed5ff]"
                    />
                  </div>

                  {/* Edited Country */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Country</label>
                    <input 
                      type="text"
                      required
                      value={editedCountry}
                      onChange={(e) => setEditedCountry(e.target.value)}
                      className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#8ed5ff]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Category</label>
                    <select 
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value as CategoryType)}
                      className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] cursor-pointer"
                    >
                      <option className="bg-[#131b2e]" value="Mountains">Mountains</option>
                      <option className="bg-[#131b2e]" value="Beaches">Beaches</option>
                      <option className="bg-[#131b2e]" value="Cities">Cities</option>
                      <option className="bg-[#131b2e]" value="Historical">Historical</option>
                    </select>
                  </div>

                  {/* Image URL */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Image URL</label>
                    <input 
                      type="text"
                      value={editedImageUrl}
                      onChange={(e) => setEditedImageUrl(e.target.value)}
                      className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#8ed5ff]"
                    />
                  </div>
                </div>

                {/* Edited Description */}
                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Description</label>
                  <textarea 
                    rows={4}
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] resize-none"
                  ></textarea>
                </div>

                {/* Actions row */}
                <div className="flex justify-end gap-3 pt-2 select-none">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('view')}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-[#bdc8d1] text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2.5 bg-[#4edea3] hover:bg-[#4edea3]/90 text-[#002113] text-xs font-bold rounded-xl hover:shadow-[0_0_15px_rgba(78,222,163,0.3)] flex items-center gap-1 cursor-pointer select-none"
                    id="btn-edit-save-submit"
                  >
                    <Check className="w-4 h-4" />
                    <span>Apply Changes</span>
                  </button>
                </div>
              </motion.form>
            )}

          </AnimatePresence>

        </div>

      </motion.div>
    </div>
  );
}
