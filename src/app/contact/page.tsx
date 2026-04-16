'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#1E1B4B] pt-32 pb-24 px-6 md:px-16 flex flex-col font-sans items-center overflow-hidden relative">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] bg-[#7286D3] rounded-full mix-blend-screen filter blur-[100px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] bg-[#E5E0FF] rounded-full mix-blend-screen filter blur-[120px] opacity-10 pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-4xl text-center mb-16 md:mb-24 relative z-10"
      >
        <h4 className="text-[#8EA7E9] text-sm tracking-[0.3em] uppercase mb-4">Inquiries & Love Letters</h4>
        <h1 className="font-serif italic text-6xl md:text-8xl lg:text-[10rem] text-[#E5E0FF] leading-[0.85] tracking-tighter">
          Connect.
        </h1>
      </motion.div>

      {/* Form Container */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl relative z-10"
      >
        <form className="flex flex-col gap-10">
          
          <div className="relative">
            <label className={`absolute left-0 transition-all duration-300 font-serif italic text-[#8EA7E9] ${focused === 'name' ? '-top-6 text-sm opacity-100' : 'top-2 text-xl opacity-60'}`}>
              Your Name
            </label>
            <input 
              type="text" 
              onFocus={() => setFocused('name')}
              onBlur={(e) => !e.target.value && setFocused(null)}
              className="w-full bg-transparent border-b border-[#8EA7E9]/30 py-3 px-0 text-[#E5E0FF] text-xl font-sans font-light focus:outline-none focus:border-[#E5E0FF] transition-colors"
            />
          </div>

          <div className="relative">
            <label className={`absolute left-0 transition-all duration-300 font-serif italic text-[#8EA7E9] ${focused === 'email' ? '-top-6 text-sm opacity-100' : 'top-2 text-xl opacity-60'}`}>
              Email Address
            </label>
            <input 
              type="email" 
              onFocus={() => setFocused('email')}
              onBlur={(e) => !e.target.value && setFocused(null)}
              className="w-full bg-transparent border-b border-[#8EA7E9]/30 py-3 px-0 text-[#E5E0FF] text-xl font-sans font-light focus:outline-none focus:border-[#E5E0FF] transition-colors"
            />
          </div>

          <div className="relative mt-4">
            <label className={`absolute left-0 transition-all duration-300 font-serif italic text-[#8EA7E9] ${focused === 'message' ? '-top-6 text-sm opacity-100' : 'top-2 text-xl opacity-60'}`}>
              What's on your mind?
            </label>
            <textarea 
              rows={4}
              onFocus={() => setFocused('message')}
              onBlur={(e) => !e.target.value && setFocused(null)}
              className="w-full bg-transparent border-b border-[#8EA7E9]/30 py-3 px-0 text-[#E5E0FF] text-xl font-sans font-light focus:outline-none focus:border-[#E5E0FF] transition-colors resize-none"
            />
          </div>

          <motion.button 
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 self-end w-full md:w-auto px-12 py-5 bg-[#E5E0FF] text-[#1E1B4B] uppercase tracking-[0.2em] text-xs font-semibold rounded-full hover:bg-white transition-colors"
          >
            Send Message
          </motion.button>

        </form>
      </motion.div>

    </div>
  );
}
