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

  // Trigger Gemini API call
  const handleGenerateAIPlanner = async () => {
    setIsAiLoading(true);
    setAiError('');
    try {
      const response = await fetch('/api/gemini/tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: destination.name,
          country: destination.country,
          category: destination.category,
          description: destination.description
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate itinerary. Please try again.');
      }

      setAiText(data.text);
      
      // Update destination state in parent to cache the itinerary
      onUpdateDestination({
        ...destination,
        itinerary: data.text
      });
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Error parsing server-side travel planner output.');
    } finally {
      setIsAiLoading(false);
    }
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
                      <p className="text-xs font-semibold text-[#bdc8d1] tracking-wide animate-pulse">Orchestrating premium adventure plan with Gemini...</p>
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
