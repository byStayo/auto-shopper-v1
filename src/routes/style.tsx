import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { 
  Sparkles, 
  ArrowLeft, 
  RefreshCw, 
  Save, 
  Heart, 
  Share2 
} from 'lucide-react'

export const Route = createFileRoute('/style')({ component: Style })

type ViewState = 'builder' | 'match' | 'ideas'

const SPRING_STANDARD = { mass: 0.8, stiffness: 200, damping: 20 }
const SPRING_INTERACT = { mass: 1, tension: 120, friction: 14 }

const CATEGORIES: Record<ViewState, string[]> = {
  builder: ["All", "Casual", "Work", "Night Out", "Travel"],
  match: ["All", "Streetwear", "Monochrome", "Layered", "Date Night"],
  ideas: ["All", "Casual", "Date Night", "Work", "Gym"]
}

function Style() {
  const [view, setView] = useState<ViewState>('builder')
  const [activeTab, setActiveTab] = useState("All")
  const [selectedOutfit, setSelectedOutfit] = useState(0)

  const handleBack = () => {
    if (view === 'match' || view === 'ideas') setView('builder')
  }

  const renderHeader = () => {
    switch (view) {
      case 'builder':
        return (
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h1 className="text-2xl font-medium text-white tracking-tight">AI outfit builder</h1>
            <button className="p-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-xl">
              <Sparkles className="w-5 h-5 text-white" />
            </button>
          </div>
        )
      case 'match':
        return (
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="p-1">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-2xl font-medium text-white tracking-tight">Match this piece</h1>
            </div>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        )
      case 'ideas':
        return (
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <div className="flex items-center gap-4">
              <button onClick={handleBack} className="p-1">
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-2xl font-medium text-white tracking-tight">Outfit ideas</h1>
            </div>
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-y-auto overflow-x-hidden">
      {/* Header */}
      {renderHeader()}

      {/* Filter Pills */}
      <div className="flex overflow-x-auto gap-3 px-6 py-2 no-scrollbar">
        {CATEGORIES[view].map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            transition={SPRING_INTERACT}
            onClick={() => setActiveTab(cat)}
            className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors border ${
              activeTab === cat 
                ? "bg-[#A8C57B] border-[#A8C57B] text-black" 
                : "bg-white/10 border-white/10 text-white"
            }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Main Content Area */}
      <main className="flex gap-4 px-6 mt-6 h-[60vh]">
        {/* Large Central Card */}
        <div className="relative flex-1 rounded-[32px] overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
          <motion.img
            key={`${view}-${selectedOutfit}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={SPRING_STANDARD}
            src={`https://picsum.photos/seed/${view}${selectedOutfit}/800/1200`}
            className="w-full h-full object-cover"
          />
          
          {/* Glassmorphic Overlay Tag */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/10 backdrop-blur-[20px] border border-white/20 p-4 rounded-2xl">
            <p className="text-xs text-center font-medium">
              {view === 'builder' ? "Using your black hoodie + closet data" : "Built around your black hoodie"}
            </p>
          </div>

          {/* Action Panel for Ideas View */}
          {view === 'ideas' && (
            <div className="absolute bottom-6 right-4 flex flex-col gap-3">
               <button className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Sidebar strip */}
        <div className="w-20 flex flex-col gap-3 overflow-y-auto no-scrollbar">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              transition={SPRING_INTERACT}
              onClick={() => {
                setSelectedOutfit(i)
                if (view === 'builder') setView('match')
                else if (view === 'match' && i === 4) setView('ideas')
              }}
              className={`relative flex-shrink-0 w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 ${
                selectedOutfit === i ? "border-[#A8C57B]" : "border-transparent"
              }`}
            >
              <img 
                src={`https://picsum.photos/seed/${view}${i}/200/300`} 
                className="w-full h-full object-cover opacity-80"
              />
            </motion.button>
          ))}
        </div>
      </main>

      {/* Footer Buttons for Builder/Match */}
      {view !== 'ideas' && (
        <div className="flex gap-4 px-6 mt-8">
          <motion.button
            whileTap={{ scale: 0.98 }}
            transition={SPRING_INTERACT}
            className="flex-1 py-4 rounded-2xl border border-white/20 bg-white/5 font-medium flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Regenerate
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.98 }}
            transition={SPRING_INTERACT}
            className="flex-1 py-4 rounded-2xl bg-white text-black font-semibold flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Save outfit
          </motion.button>
        </div>
      )}
    </div>
  )
}
