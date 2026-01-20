
import React from 'react';
import { Tool } from '../types';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  onToolClick: (tool: Tool) => void;
}

const ToolGrid: React.FC<ToolGridProps> = ({ tools, onToolClick }) => {
  if (tools.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-2xl font-bold text-gray-500">😔 No tools found.</p>
        <p className="text-gray-400 mt-2">Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.name} tool={tool} onCardClick={onToolClick} />
      ))}
    </div>
  );
};

export default ToolGrid;
