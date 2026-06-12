import React from 'react';
import { motion } from 'motion/react';
import { Heart, CheckCircle, HelpCircle } from 'lucide-react';
import { Destination } from '../types';

interface DestinationCardProps {
  key?: string;
  destination: Destination;
  onToggleVisited: (id: string, e: React.MouseEvent) => void;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onCardClick: (destination: Destination) => void;
}

export default function DestinationCard({ 
  destination, 
  onToggleVisited, 
  onToggleWishlist, 
  onCardClick 
}: DestinationCardProps) {
  
  // Custom styling colors based on category
  const categoryColors: Record<string, string> = {
    Beaches: 'bg-[#8ed5ff]/10 text-[#8ed5ff] border-[#8ed5ff]/20',
    Mountains: 'bg-[#4edea3]/10 text-[#4edea3] border-[#4edea3]/20',
    Cities: 'bg-[#ffc174]/10 text-[#ffc174] border-[#ffc174]/20',
    Historical: 'bg-indigo-400/10 text-indigo-300 border-indigo-400/20'
  };

  const currentCategoryClass = categoryColors[destination.category] || 'bg-white/10 text-[#dae2fd] border-white/20';

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      onClick={() => onCardClick(destination)}
      className="group bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-[24px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full"
      id={`destination-card-${destination.id}`}
    >
      {/* Absolute image parent */}
      <div className="h-48 relative overflow-hidden select-none">
        {/* Actual image */}
        <img 
          src={destination.imageUrl} 
          referrerPolicy="no-referrer"
          alt={destination.name} 
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          id={`img-${destination.id}`}
        />
        
        {/* Soft dark shadow gradient over bottom of image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Category tag badge left */}
        <div className={`absolute top-4 left-4 px-3 py-1 backdrop-blur-md rounded-full border text-[10px] tracking-wider uppercase font-bold font-label-caps ${currentCategoryClass}`}>
          {destination.category}
        </div>

        {/* Wishlist triggers right */}
        <button 
          onClick={(e) => onToggleWishlist(destination.id, e)}
          className="absolute top-4 right-4 w-9 h-9 bg-black/30 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-black/50 transition-all text-white group-active:scale-90"
          id={`btn-wishlist-toggle-${destination.id}`}
        >
          <Heart 
            className={`w-4 h-4 transition-all duration-300 ${destination.wishlisted ? 'fill-[#ffb4ab] text-[#ffb4ab] scale-110' : 'text-white/80 hover:text-white'}`} 
          />
        </button>
      </div>

      {/* Info context */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-[#dae2fd] tracking-tight hover:text-[#8ed5ff] transition-colors">{destination.name}</h4>
              <p className="text-xs text-[#bdc8d1] font-medium">{destination.country}</p>
            </div>
          </div>
          <p className="text-xs text-[#bdc8d1]/70 leading-relaxed font-normal line-clamp-2 mt-2">
            {destination.description}
          </p>
        </div>

        {/* Visited status action */}
        <div className="mt-5">
          {destination.visited ? (
            <button 
              onClick={(e) => onToggleVisited(destination.id, e)}
              className="w-full py-2 border border-[#4edea3] text-[#4edea3] bg-[#4edea3]/5 hover:bg-[#4edea3]/12 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all outline-none"
              id={`btn-visited-toggle-${destination.id}`}
            >
              <CheckCircle className="w-4.5 h-4.5 fill-[#131b2e] stroke-[#4edea3]" />
              <span>Visited</span>
            </button>
          ) : (
            <button 
              onClick={(e) => onToggleVisited(destination.id, e)}
              className="w-full py-2 border border-white/15 text-[#bdc8d1] bg-white/[0.01] hover:bg-white/5 hover:text-[#dae2fd] rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition-all outline-none"
              id={`btn-visited-toggle-${destination.id}`}
            >
              <HelpCircle className="w-4.5 h-4.5 opacity-60" />
              <span>Mark as Visited</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
