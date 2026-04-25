import React from 'react';
import { Plus, Link as LinkIcon, Mic, Save, Trash2, ZoomIn, ZoomOut, XCircle } from 'lucide-react';

export default function FloatingToolbar({
  onAddNode,
  onToggleConnectMode,
  connectMode,
  onStartVoice,
  onSave,
  onClear,
  onDelete,
  hasSelection,
  zoom,
  onZoomIn,
  onZoomOut
}) {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
      
      {/* Zoom Controls Mini-bar */}
      <div className="flex items-center gap-1 px-2 py-1 bg-[#1e293b]/60 backdrop-blur-md border border-slate-700/50 rounded-full shadow-lg">
        <button onClick={onZoomOut} className="p-1.5 hover:bg-slate-700 rounded-full text-slate-300 transition-colors" title="Zoom Out">
          <ZoomOut size={14} />
        </button>
        <span className="text-xs text-slate-300 w-8 text-center font-medium">{Math.round(zoom * 100)}%</span>
        <button onClick={onZoomIn} className="p-1.5 hover:bg-slate-700 rounded-full text-slate-300 transition-colors" title="Zoom In">
          <ZoomIn size={14} />
        </button>
      </div>

      {/* Main Toolbar */}
      <div className="flex items-center gap-2 px-3 py-3 bg-[#1e293b]/80 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-2xl shadow-black/50">
        
        <button 
          onClick={onAddNode}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-slate-700/50 transition-colors"
          title="Add Node"
        >
          <div className="w-8 h-8 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center">
            <Plus size={18} />
          </div>
          <span className="hidden md:inline">Add Node</span>
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1"></div>

        <button 
          onClick={onToggleConnectMode}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            connectMode 
              ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' 
              : 'text-white hover:bg-slate-700/50'
          }`}
          title="Connect Nodes"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
            connectMode ? 'bg-white/20 text-white' : 'bg-blue-500/20 text-blue-400'
          }`}>
            <LinkIcon size={18} />
          </div>
          <span className="hidden md:inline">{connectMode ? 'Connecting...' : 'Connect'}</span>
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1"></div>

        <button 
          onClick={onStartVoice}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-slate-700/50 transition-colors"
          title="Voice Command"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Mic size={18} />
          </div>
          <span className="hidden md:inline">Voice</span>
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1"></div>

        <button 
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-slate-700/50 transition-colors group"
          title="Save Map"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
            <Save size={18} />
          </div>
          <span className="hidden md:inline">Save</span>
        </button>

        <div className="w-px h-8 bg-slate-700 mx-1"></div>

        {hasSelection ? (
          <button 
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
            title="Delete Selected Node"
          >
            <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center">
              <XCircle size={18} />
            </div>
            <span className="hidden md:inline text-red-400">Delete</span>
          </button>
        ) : (
          <button 
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            title="Clear Canvas"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-700 text-slate-400 flex items-center justify-center group-hover:bg-red-500/20 group-hover:text-red-400 transition-colors">
              <Trash2 size={18} />
            </div>
            <span className="hidden md:inline">Clear</span>
          </button>
        )}

      </div>
    </div>
  );
}
