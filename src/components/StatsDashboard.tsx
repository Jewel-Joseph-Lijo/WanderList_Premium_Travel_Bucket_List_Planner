import React from 'react';
import { motion } from 'motion/react';
import { Globe, CheckSquare, Heart, TrendingUp } from 'lucide-react';
import { Destination } from '../types';

interface StatsDashboardProps {
  destinations: Destination[];
}

export default function StatsDashboard({ destinations }: StatsDashboardProps) {
  // Calculated stats based on state
  const totalCount = destinations.length;
  const completedCount = destinations.filter((d) => d.visited).length;
  const wishlistCount = destinations.filter((d) => d.wishlisted).length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Let's mock a subtle trend or compare with a pre-set value
  const vsLastMonthStr = "+5% vs last month";

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: 'easeOut'
      }
    })
  };

  return (
    <section className="px-6 md:px-12 py-10 bg-[#0b1326]" id="statistics-dashboard">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Destinations */}
          <motion.div 
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl overflow-hidden hover:bg-white/[0.08] transition-colors duration-300 group"
            id="stat-card-total"
          >
            {/* Subtle light glow */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#8ed5ff]/10 rounded-full blur-3xl group-hover:bg-[#8ed5ff]/15 transition-all"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <Globe className="text-[#8ed5ff] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[12px] font-semibold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Total</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-[#dae2fd] tracking-tight mb-1">{totalCount}</h3>
              <p className="text-sm text-[#bdc8d1]/80 font-medium">Planned Adventures</p>
            </div>
          </motion.div>

          {/* Visited Places */}
          <motion.div 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl overflow-hidden hover:bg-white/[0.08] transition-colors duration-300 group"
            id="stat-card-visited"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#4edea3]/10 rounded-full blur-3xl group-hover:bg-[#4edea3]/15 transition-all"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <CheckSquare className="text-[#4edea3] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[12px] font-semibold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Completed</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-[#dae2fd] tracking-tight mb-1">{completedCount}</h3>
              <p className="text-sm text-[#bdc8d1]/80 font-medium">Visited Locations</p>
            </div>
          </motion.div>

          {/* Wishlist Places */}
          <motion.div 
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl overflow-hidden hover:bg-white/[0.08] transition-colors duration-300 group"
            id="stat-card-wishlist"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#ffc174]/10 rounded-full blur-3xl group-hover:bg-[#ffc174]/15 transition-all"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <Heart className="text-[#ffc174] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[12px] font-semibold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Pending</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-[#dae2fd] tracking-tight mb-1">{wishlistCount}</h3>
              <p className="text-sm text-[#bdc8d1]/80 font-medium">In Wishlist</p>
            </div>
          </motion.div>

          {/* Completion Rate / Progress */}
          <motion.div 
            custom={3}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="relative bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-[24px] p-6 shadow-2xl overflow-hidden hover:bg-white/[0.08] transition-colors duration-300 group"
            id="stat-card-progress"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-[#8ed5ff]/10 rounded-full blur-3xl group-hover:bg-[#8ed5ff]/15 transition-all"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <TrendingUp className="text-[#8ed5ff] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-[12px] font-semibold tracking-wider text-[#bdc8d1] uppercase font-label-caps">Progress</span>
            </div>
            <div className="flex items-baseline gap-2 relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold text-[#dae2fd] tracking-tight mb-1">{progressPercent}%</h3>
              <span className="text-[#4edea3] text-[10px] uppercase font-bold tracking-wider">{vsLastMonthStr}</span>
            </div>
            
            {/* Actionable horizontal shimmer bar */}
            <div className="w-full h-2 bg-[#171f33] rounded-full mt-3 overflow-hidden relative border border-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full bg-[#4edea3] rounded-full relative"
              >
                {/* Shimmer overlay effect */}
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
