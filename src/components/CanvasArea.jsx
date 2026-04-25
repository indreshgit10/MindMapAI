import React, { forwardRef } from 'react';
import Node from './Node';
import ConnectionLine from './ConnectionLine';

const CanvasArea = forwardRef(({ 
  nodes, 
  connections, 
  onDragNode, 
  onNodeClick, 
  selectedNodeId, 
  connectMode,
  zoom = 1
}, ref) => {
  return (
    <div 
      ref={ref} 
      className="absolute inset-0 bg-[#0B0F19] w-full h-full bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] overflow-hidden"
    >
      <div 
        style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
        className="absolute top-0 left-0 w-full h-full transition-transform duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          {connections.map((conn, index) => {
            const parent = nodes.find(n => n.id === conn.parentId);
            const child = nodes.find(n => n.id === conn.childId);
            
            if (!parent || !child) return null;

            const startX = parent.x + 80;
            const startY = parent.y + 40;
            const endX = child.x + 80;
            const endY = child.y + 40;

            return (
              <ConnectionLine 
                key={`${conn.parentId}-${conn.childId}-${index}`}
                startX={startX} 
                startY={startY} 
                endX={endX} 
                endY={endY} 
              />
            );
          })}
        </svg>

        {nodes.map(node => (
          <Node 
            key={node.id} 
            node={node} 
            onDrag={onDragNode}
            onClick={onNodeClick}
            isSelected={selectedNodeId === node.id}
            connectMode={connectMode}
            zoom={zoom}
          />
        ))}
      </div>
    </div>
  );
});

export default CanvasArea;
