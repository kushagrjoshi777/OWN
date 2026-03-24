'use client';

import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <div className="bg-creamWhite min-h-screen pt-24">
      <section className="bg-warmBlack py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(#C9A96E 1px, transparent 1px), linear-gradient(90deg, #C9A96E 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="font-serif text-[clamp(3rem,7vw,6rem)] text-creamWhite relative z-10">
          Get In Touch
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-creamWhite/50 font-sans text-sm mt-4 relative z-10">
          We'd love to hear from you.
        </motion.p>
      </section>

      <section className="py-24 px-6 max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-6">
          {[
            { label: 'Your Name', type: 'text', placeholder: 'Riya Sharma' },
            { label: 'Email', type: 'email', placeholder: 'hello@example.com' },
            { label: 'Subject', type: 'text', placeholder: 'I have a question about...' },
          ].map((field) => (
            <div key={field.label} className="flex flex-col gap-2">
              <label className="font-sans text-xs tracking-[0.2em] uppercase text-warmBlack/50 font-semibold">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="w-full border border-warmBlack/20 bg-transparent px-4 py-3 font-sans text-sm text-warmBlack placeholder:text-warmBlack/30 focus:outline-none focus:border-mainCharacter transition-colors"
              />
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label className="font-sans text-xs tracking-[0.2em] uppercase text-warmBlack/50 font-semibold">Message</label>
            <textarea
              rows={5}
              placeholder="Your message..."
              className="w-full border border-warmBlack/20 bg-transparent px-4 py-3 font-sans text-sm text-warmBlack placeholder:text-warmBlack/30 focus:outline-none focus:border-mainCharacter transition-colors resize-none"
            />
          </div>
          <button className="bg-warmBlack text-creamWhite font-sans text-xs tracking-[0.2em] uppercase py-4 font-semibold hover:bg-warmBlack/80 transition-colors">
            Send Message
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-16 pt-12 border-t border-warmBlack/10 text-center">
          <p className="font-sans text-sm text-warmBlack/50 mb-2">Or reach us directly</p>
          <a href="mailto:hello@ownbodycare.in" className="font-serif text-mainCharacter text-lg hover:underline">hello@ownbodycare.in</a>
          <p className="font-sans text-xs text-warmBlack/30 mt-6 tracking-widest uppercase">Follow @ownbodycare on Instagram</p>
        </motion.div>
      </section>
    </div>
  );
}
