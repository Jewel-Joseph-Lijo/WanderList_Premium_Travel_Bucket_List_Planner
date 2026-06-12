import React, { useState } from 'react';
import { PlusCircle, Image as ImageIcon } from 'lucide-react';
import { Destination, CategoryType } from '../types';

interface AddDestinationFormProps {
  onAddDestination: (destination: Omit<Destination, 'id' | 'createdAt'>) => void;
}

const CATEGORY_IMAGE_FALLBACKS: Record<CategoryType, string> = {
  Beaches: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800',
  Mountains: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800',
  Cities: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=800',
  Historical: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=800'
};

export default function AddDestinationForm({ onAddDestination }: AddDestinationFormProps) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState<CategoryType>('Mountains');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide a destination name.');
      return;
    }

    if (!country.trim()) {
      setError('Please provide a country name.');
      return;
    }

    // Determine secure visual image link (or fallback based on category)
    const finalImage = imageUrl.trim() || CATEGORY_IMAGE_FALLBACKS[category];

    onAddDestination({
      name: name.trim(),
      country: country.trim(),
      category,
      imageUrl: finalImage,
      description: description.trim() || `Explore the majestic landscapes of ${name} in ${country}.`,
      visited: false,
      wishlisted: true // Default added items are on the wishlist / pending
    });

    // Clear state
    setName('');
    setCountry('');
    setImageUrl('');
    setDescription('');
  };

  return (
    <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl lg:sticky lg:top-28" id="add-destination-card">
      <h2 className="text-xl md:text-2xl font-bold text-[#dae2fd] mb-4 tracking-tight">Add New Destination</h2>
      
      {error && (
        <div className="mb-4 text-xs font-semibold text-[#ffb4ab] bg-[#93000a]/20 border border-[#ffb4ab]/30 p-3 rounded-xl">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase block font-label-caps">Destination Name</label>
          <input 
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Machu Picchu"
            className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] placeholder-[#bdc8d1]/30 focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] transition-all"
            id="input-destination-name"
          />
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase block font-label-caps">Country</label>
          <input 
            type="text"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. Peru"
            className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] placeholder-[#bdc8d1]/30 focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] transition-all"
            id="input-destination-country"
          />
        </div>

        {/* Grid row: Category & Image URL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase block font-label-caps">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] transition-all appearance-none cursor-pointer"
              id="select-destination-category"
            >
              <option className="bg-[#131b2e] text-[#dae2fd]" value="Mountains">Mountains</option>
              <option className="bg-[#131b2e] text-[#dae2fd]" value="Beaches">Beaches</option>
              <option className="bg-[#131b2e] text-[#dae2fd]" value="Cities">Cities</option>
              <option className="bg-[#131b2e] text-[#dae2fd]" value="Historical">Historical</option>
            </select>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase block font-label-caps">Image URL</label>
              <span className="text-[9px] text-[#bdc8d1]/40 font-semibold uppercase italic">(Optional)</span>
            </div>
            <div className="relative">
              <input 
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-[#dae2fd] placeholder-[#bdc8d1]/30 focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] transition-all"
                id="input-destination-image"
              />
              <ImageIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-[#bdc8d1]/40 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold tracking-wider text-[#bdc8d1] uppercase block font-label-caps">Description</label>
          <textarea 
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell your story and highlight why this destination is on your bucket list..."
            className="w-full bg-[#131b2e]/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-[#dae2fd] placeholder-[#bdc8d1]/30 focus:outline-none focus:ring-1 focus:ring-[#8ed5ff] transition-all resize-none"
            id="textarea-destination-description"
          ></textarea>
        </div>

        {/* Submit */}
        <button 
          type="submit"
          className="w-full py-3.5 bg-[#8ed5ff] text-[#001e2c] font-bold rounded-xl hover:bg-[#8ed5ff]/90 transition-all flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(142,213,255,0.3)] hover:shadow-[0_0_20px_rgba(142,213,255,0.5)] cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          id="btn-save-destination"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Save Destination</span>
        </button>
      </form>
    </div>
  );
}
