import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function TestimonialsSection() {
  return (
    <section className="px-6 md:px-12 py-16 max-w-7xl mx-auto" id="nomads-section">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[#dae2fd] mb-12 tracking-tight">
        What Our Nomads Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((testimonial, i) => {
          // Highlight the center card (Marcus Thorne) slightly for aesthetic variation, matching original CSS
          const isFeatured = testimonial.name === 'Marcus Thorne';

          return (
            <motion.div 
              key={testimonial.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative backdrop-blur-md rounded-[24px] p-6 border transition-all duration-300 group ${
                isFeatured 
                  ? 'bg-white/[0.08] border-white/20 shadow-2xl scale-[1.02] -translate-y-1' 
                  : 'bg-white/[0.04] border-white/10 shadow-xl'
              }`}
              id={`testimonial-${testimonial.id}`}
            >
              {/* Glassmorphic border glow element */}
              {isFeatured && (
                <div className="absolute inset-0 rounded-[24px] pointer-events-none border border-gradient-glow bg-gradient-to-tr from-[#8ed5ff]/10 via-transparent to-transparent opacity-60"></div>
              )}

              {/* Dynamic Star Ratings */}
              <div className="flex gap-1 text-[#ffc174] mb-4">
                {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                  <Star 
                    key={starIndex} 
                    className="w-4 h-4 fill-[#ffc174] stroke-none animate-pulse" 
                    style={{ animationDelay: `${starIndex * 0.15}s` }}
                  />
                ))}
              </div>

              {/* Quote Quote block */}
              <blockquote className="text-sm md:text-base text-[#bdc8d1] leading-relaxed mb-6 font-normal italic">
                {testimonial.quote}
              </blockquote>

              {/* User Bio */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0 select-none">
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-[#dae2fd] text-xs md:text-sm leading-tight">{testimonial.name}</h4>
                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#bdc8d1]/60 font-label-caps mt-0.5">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
