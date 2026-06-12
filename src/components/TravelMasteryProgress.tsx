import React from 'react';
import { motion } from 'motion/react';
import { Palmtree, Mountain, Scroll, Award, CheckCircle2 } from 'lucide-react';
import { Destination, Challenge } from '../types';

interface TravelMasteryProgressProps {
  destinations: Destination[];
}

export default function TravelMasteryProgress({ destinations }: TravelMasteryProgressProps) {
  const totalCount = destinations.length;
  const visitedCount = destinations.filter((d) => d.visited).length;
  const overallPercent = totalCount > 0 ? Math.round((visitedCount / totalCount) * 100) : 0;

  // Compute category progress lists
  const getCategoryProgress = (cat: string) => {
    const totalInCat = destinations.filter((d) => d.category === cat).length;
    const visitedInCat = destinations.filter((d) => d.category === cat && d.visited).length;
    return {
      percent: totalInCat > 0 ? Math.round((visitedInCat / totalInCat) * 100) : 0,
      total: totalInCat,
      visited: visitedInCat
    };
  };

  const beachStats = getCategoryProgress('Beaches');
  const mountainStats = getCategoryProgress('Mountains');
  const cityStats = getCategoryProgress('Cities');
  const historyStats = getCategoryProgress('Historical');

  // SVG dimensions for Circular gauge
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // Calculate dynamic offset: circumference - (percent / 100) * circumference
  const strokeDashoffset = circumference - (overallPercent / 100) * circumference;

  // Dynamic active challenges logic
  const activeChallenges = [
    {
      id: 'c1',
      title: 'Coast Master',
      requirement: 'Visit 5 Beaches',
      icon: Palmtree,
      colorClass: 'text-[#8ed5ff]',
      bgColorClass: 'bg-[#8ed5ff]/10',
      current: beachStats.visited,
      target: 5,
      completed: beachStats.visited >= 5
    },
    {
      id: 'c2',
      title: 'Peak Seeker',
      requirement: 'Visit 3 Mountains',
      icon: Mountain,
      colorClass: 'text-[#4edea3]',
      bgColorClass: 'bg-[#4edea3]/10',
      current: mountainStats.visited,
      target: 3,
      completed: mountainStats.visited >= 3
    },
    {
      id: 'c3',
      title: 'Historian',
      requirement: '4 Historical Sites',
      icon: Scroll,
      colorClass: 'text-[#ffc174]',
      bgColorClass: 'bg-[#ffc174]/10',
      current: historyStats.visited,
      target: 4,
      completed: historyStats.visited >= 4
    },
    {
      id: 'c4',
      title: 'Grand Nomad',
      requirement: 'Visit 10 Cities',
      icon: Award,
      colorClass: 'text-indigo-300',
      bgColorClass: 'bg-indigo-300/10',
      current: cityStats.visited,
      target: 10,
      completed: cityStats.visited >= 10
    }
  ];

  return (
    <section className="px-6 md:px-12 py-12 bg-[#131b2e]" id="mastery-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center text-[#dae2fd] mb-12">
          Global Travel Mastery
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Overall percentage circle card */}
          <div className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-[24px] p-6 flex flex-col md:flex-row items-center gap-6 shadow-xl relative overflow-hidden group">
            {/* Ambient Background Sphere */}
            <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#8ed5ff]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Circular Gauge */}
            <div className="relative w-48 h-48 shrink-0 select-none">
              <svg className="w-full h-full transform -rotate-90">
                {/* Track circle */}
                <circle 
                  className="text-white/5" 
                  cx="96" 
                  cy="96" 
                  fill="transparent" 
                  r={normalizedRadius} 
                  stroke="currentColor" 
                  strokeWidth={stroke} 
                />
                {/* Dynamic progress circle */}
                <motion.circle 
                  className="text-[#8ed5ff]" 
                  cx="96" 
                  cy="96" 
                  fill="transparent" 
                  r={normalizedRadius} 
                  stroke="currentColor" 
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: strokeDashoffset }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
              </svg>

              {/* Center percentage indicator */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-[#dae2fd] tracking-tight">{overallPercent}%</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#bdc8d1] font-label-caps mt-0.5">TOTAL</span>
              </div>
            </div>

            {/* Horizontal progress segments */}
            <div className="flex-1 space-y-4 w-full">
              <h3 className="text-lg md:text-xl font-bold text-[#dae2fd] mb-1">Category Progress</h3>
              
              <div className="space-y-3.5">
                {/* Beaches */}
                <div>
                  <div className="flex justify-between items-baseline text-[11px] font-semibold text-[#bdc8d1]/90 uppercase font-label-caps mb-1.5">
                    <span className="flex items-center gap-1"><Palmtree className="w-3.5 h-3.5 text-[#8ed5ff]" /> Beaches</span>
                    <span>{beachStats.percent}% ({beachStats.visited}/{beachStats.total})</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${beachStats.percent}%` }}
                      transition={{ duration: 1, delay: 0.1 }}
                      className="h-full bg-[#8ed5ff] rounded-full relative"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]"></span>
                    </motion.div>
                  </div>
                </div>

                {/* Mountains */}
                <div>
                  <div className="flex justify-between items-baseline text-[11px] font-semibold text-[#bdc8d1]/90 uppercase font-label-caps mb-1.5">
                    <span className="flex items-center gap-1"><Mountain className="w-3.5 h-3.5 text-[#4edea3]" /> Mountains</span>
                    <span>{mountainStats.percent}% ({mountainStats.visited}/{mountainStats.total})</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${mountainStats.percent}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-[#4edea3] rounded-full relative"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]"></span>
                    </motion.div>
                  </div>
                </div>

                {/* Cities */}
                <div>
                  <div className="flex justify-between items-baseline text-[11px] font-semibold text-[#bdc8d1]/90 uppercase font-label-caps mb-1.5">
                    <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-[#ffc174]" /> Cities</span>
                    <span>{cityStats.percent}% ({cityStats.visited}/{cityStats.total})</span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${cityStats.percent}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-[#ffc174] rounded-full relative"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]"></span>
                    </motion.div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Active Challenges cards */}
          <div className="space-y-4" id="challenges-section">
            <h3 className="text-xl font-bold text-[#dae2fd] px-1">Active Challenges</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeChallenges.map((challenge, i) => {
                const Icon = challenge.icon;
                return (
                  <motion.div 
                    key={challenge.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`bg-white/[0.04] backdrop-blur-md rounded-[20px] p-5 flex items-center gap-4 border transition-all duration-300 relative group overflow-hidden ${challenge.completed ? 'border-[#4edea3]/40 bg-[#4edea3]/5' : 'border-white/10'}`}
                    id={`challenge-card-${challenge.id}`}
                  >
                    {/* Tick for completion */}
                    {challenge.completed && (
                      <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-[#4edea3]" />
                    )}

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${challenge.bgColorClass}`}>
                      <Icon className={`w-6 h-6 ${challenge.colorClass}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#dae2fd] text-sm md:text-base leading-tight truncate">{challenge.title}</p>
                      <p className="text-[10px] font-bold tracking-wider text-[#bdc8d1]/60 uppercase font-label-caps mt-1">
                        {challenge.requirement}
                      </p>
                      
                      {/* Dynamic Challenge Progress Fraction */}
                      <p className="text-[10px] text-[#bdc8d1] font-semibold mt-1">
                        Progress: <span className="text-[#dae2fd] font-bold">{Math.min(challenge.current, challenge.target)}</span> / {challenge.target}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
