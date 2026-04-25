import React from 'react';

export default function ConnectionLine({ startX, startY, endX, endY }) {
  return (
    <line
      x1={startX}
      y1={startY}
      x2={endX}
      y2={endY}
      stroke="#8b5cf6" // violet-500
      strokeWidth="3"
      strokeLinecap="round"
      className="transition-all duration-200 opacity-60"
    />
  );
}
