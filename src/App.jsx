import React, { useState, useRef, useCallback } from 'react';
import { domToPng } from 'modern-screenshot';
import Navbar from './components/layout/Navbar';
import FloatingToolbar from './components/controls/FloatingToolbar';
import CanvasArea from './components/CanvasArea';
import { useVoiceRecognition } from './hooks/useVoiceRecognition';

function App() {
  const [nodes, setNodes] = useState([]);
  const [connections, setConnections] = useState([]);
  const [connectMode, setConnectMode] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [zoom, setZoom] = useState(1);
  
  const canvasRef = useRef(null);

  const getCenterOffset = () => {
    if (!canvasRef.current) return { x: 200, y: 200 };
    const rect = canvasRef.current.getBoundingClientRect();
    const offset = nodes.length * 20;
    // Adjust placement based on current zoom so it doesn't spawn off-screen
    return {
      x: (rect.width / 2 - 80 + offset) / zoom,
      y: (rect.height / 2 - 40 + offset) / zoom,
    };
  };

  const addNode = useCallback((text) => {
    const { x, y } = getCenterOffset();
    const newNode = {
      id: Date.now().toString() + Math.random().toString(36).substring(7),
      text,
      x,
      y,
    };
    setNodes(prev => [...prev, newNode]);
  }, [nodes.length, zoom]);

  const handleManualAddNode = () => {
    const userText = prompt("Enter your idea:");
    if (userText && userText.trim() !== "") {
      addNode(userText.trim());
    }
  };

  const { startVoiceRecognition } = useVoiceRecognition(addNode);

  const handleToggleConnectMode = () => {
    setConnectMode(prev => !prev);
    // Don't deselect here, as we might want to connect the currently selected node
  };

  const handleNodeClick = (nodeId) => {
    if (!connectMode) {
      setSelectedNodeId(nodeId === selectedNodeId ? null : nodeId);
      return;
    }

    if (!selectedNodeId) {
      setSelectedNodeId(nodeId);
    } else if (selectedNodeId !== nodeId) {
      const exists = connections.find(
        c => (c.parentId === selectedNodeId && c.childId === nodeId) ||
             (c.parentId === nodeId && c.childId === selectedNodeId)
      );

      if (!exists) {
        setConnections(prev => [...prev, { parentId: selectedNodeId, childId: nodeId }]);
      }
      setSelectedNodeId(null);
    }
  };

  const handleDragNode = (id, deltaX, deltaY) => {
    setNodes(prev => prev.map(n => 
      n.id === id ? { ...n, x: n.x + deltaX, y: n.y + deltaY } : n
    ));
  };

  const handleClearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the canvas? This cannot be undone.")) {
      setNodes([]);
      setConnections([]);
      setSelectedNodeId(null);
      setZoom(1);
    }
  };

  const handleDeleteNode = () => {
    if (!selectedNodeId) return;
    setNodes(prev => prev.filter(n => n.id !== selectedNodeId));
    setConnections(prev => prev.filter(c => c.parentId !== selectedNodeId && c.childId !== selectedNodeId));
    setSelectedNodeId(null);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.1, 2));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.1, 0.5));

  const handleSave = () => {
    const rootEl = document.getElementById('app-root');
    if (!rootEl) {
      alert("App root not found.");
      return;
    }
    
    domToPng(rootEl, { 
      backgroundColor: '#0a0f1c',
      scale: 2
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "mindmap.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Error generating image:", err);
        alert("Failed to save the image. " + err.message);
      });
  };

  return (
    <div id="app-root" className="flex flex-col h-screen w-full bg-[#0a0f1c] text-slate-100 font-sans overflow-hidden">
      <Navbar />
      
      <div className="relative flex-1 w-full overflow-hidden">
        <CanvasArea 
          ref={canvasRef}
          nodes={nodes}
          connections={connections}
          onDragNode={handleDragNode}
          onNodeClick={handleNodeClick}
          selectedNodeId={selectedNodeId}
          connectMode={connectMode}
          zoom={zoom}
        />
        
        <FloatingToolbar 
          onAddNode={handleManualAddNode}
          onToggleConnectMode={handleToggleConnectMode}
          connectMode={connectMode}
          onStartVoice={startVoiceRecognition}
          onSave={handleSave}
          onClear={handleClearCanvas}
          onDelete={handleDeleteNode}
          hasSelection={!!selectedNodeId}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </div>
    </div>
  );
}

export default App;
