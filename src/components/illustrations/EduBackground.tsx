import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, BookOpen, GraduationCap, Flame, Star } from 'lucide-react';
import educationVisual from '../../assets/education_visual.png';

export const EduBackground: React.FC = () => {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-1/2 h-full bg-slate-950 overflow-hidden p-12 text-white select-none">
      {/* Background Neon Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-glow-indigo rounded-full animate-blob pointer-events-none opacity-60" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-glow-violet rounded-full animate-blob [animation-delay:4s] pointer-events-none opacity-50" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-glow-cyan rounded-full animate-blob [animation-delay:8s] pointer-events-none opacity-40" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Top Header Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <GraduationCap className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
          Aethera
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold tracking-wider uppercase">
          Platform
        </span>
      </div>

      {/* Immersive Center Graphic */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        {/* Main Artwork Container */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/5 bg-slate-900/40 p-1">
          <img
            src={educationVisual}
            alt="Futuristic Educational Workspace"
            className="w-full h-full object-cover rounded-[22px] opacity-80"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        </div>

        {/* Floating Glassmorphic UI Cards */}
        {/* Card 1: Course completion (Top Right) */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute -top-6 -right-6 glassmorphism p-3 rounded-2xl flex items-center gap-3 shadow-xl max-w-[200px]"
        >
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <BookOpen className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Next Lesson</p>
            <p className="text-xs font-semibold text-white truncate">React Hooks</p>
          </div>
          <div className="ml-auto text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
            94%
          </div>
        </motion.div>

        {/* Card 2: AI Assist message (Bottom Left) */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute -bottom-8 -left-6 glassmorphism p-3.5 rounded-2xl flex flex-col gap-2 shadow-xl max-w-[250px] border border-white/10"
        >
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-400 to-violet-500 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="text-xs font-semibold text-indigo-200">AI Learning Companion</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-300">
            "Your syntax looks correct! Let's execute the compiler to test your API route."
          </p>
        </motion.div>

        {/* Card 3: User Streak metrics (Right Middle) */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute right-[-40px] top-[40%] glassmorphism p-3 rounded-2xl flex items-center gap-3 shadow-xl border border-white/10"
        >
          <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400">
            <Flame className="h-4.5 w-4.5 animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-medium">Coding Streak</p>
            <p className="text-xs font-bold text-white">18 Days 🔥</p>
          </div>
        </motion.div>

        {/* Card 4: Code snippet floating (Left Upper) */}
        <motion.div
          initial={{ opacity: 0, x: -20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="absolute left-[-50px] top-[15%] glassmorphism p-2.5 rounded-xl flex items-center gap-2.5 shadow-xl border border-white/10 text-xs font-mono max-w-[170px]"
        >
          <Code className="h-4 w-4 text-violet-400" />
          <span className="text-slate-300">const app = init()</span>
        </motion.div>
      </div>

      {/* Bottom Description / Branding Footer */}
      <div className="relative z-10 max-w-md">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-snug">
          Learn cutting-edge skills from world-class developers.
        </h2>
        <p className="mt-3 text-slate-400 text-sm leading-relaxed">
          Access immersive coding labs, AI-guided learning tracks, and a global community of builders.
        </p>

        {/* Interactive testimonial carousel indicator or stats */}
        <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
          <div>
            <div className="text-lg font-bold text-white">45k+</div>
            <div className="text-xs text-slate-500 font-medium">Active Students</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-lg font-bold text-white">4.9</div>
            <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
              Rating <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div>
            <div className="text-lg font-bold text-white">99%</div>
            <div className="text-xs text-slate-500 font-medium">Job Placement</div>
          </div>
        </div>
      </div>
    </div>
  );
};
