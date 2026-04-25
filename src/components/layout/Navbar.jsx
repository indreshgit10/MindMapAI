import React from 'react';
import { User, LogOut } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-6 z-20 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <span className="text-white font-bold text-lg leading-none">M</span>
        </div>
        <h1 className="text-xl tracking-tight">
          <span className="font-bold text-white">MindMap </span>
          <span className="font-bold text-violet-400">AI</span>
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Placeholder for future navbar actions (e.g., Settings, Export) */}
      </div>
    </nav>
  );
}
