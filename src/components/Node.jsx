import React, { useRef } from 'react';

export default function Node({ node, onDrag, onClick, isSelected, connectMode, zoom = 1 }) {
  const nodeRef = useRef(null);
  
  const handlePointerDown = (e) => {
    if (connectMode) return;
    
    e.preventDefault();
    e.stopPropagation();

    let startX = e.clientX;
    let startY = e.clientY;

    const handlePointerMove = (moveEvent) => {
      moveEvent.preventDefault();
      
      const deltaX = (moveEvent.clientX - startX) / zoom;
      const deltaY = (moveEvent.clientY - startY) / zoom;
      
      startX = moveEvent.clientX;
      startY = moveEvent.clientY;
      
      onDrag(node.id, deltaX, deltaY);
    };

    const handlePointerUp = () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  };

  return (
    <div
      ref={nodeRef}
      onPointerDown={handlePointerDown}
      onClick={() => onClick(node.id)}
      style={{
        transform: `translate(${node.x}px, ${node.y}px)`,
        position: 'absolute',
        top: 0,
        left: 0,
      }}
      className={`
        bg-[#111827] text-slate-200 border-2 
        ${isSelected 
          ? 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.4)]' 
          : 'border-slate-800 hover:border-slate-600 shadow-xl shadow-black/40'}
        rounded-2xl py-5 px-6 min-w-[160px] min-h-[80px] 
        flex items-center justify-center text-center font-medium tracking-wide
        cursor-move select-none transition-colors duration-200
        ${!connectMode && 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50'} transform-gpu
      `}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-t-xl opacity-80"></div>
      {node.text}
    </div>
  );
}
