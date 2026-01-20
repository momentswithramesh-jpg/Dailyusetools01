
import React, { useState } from 'react';
import { Tool } from '../types';
import { CATEGORY_STYLES } from '../constants';

interface ToolCardProps {
  tool: Tool;
  onCardClick: (tool: Tool) => void;
}

const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 4.186m0-4.186c.105.022.213.04.324.057m-3.324-4.243a2.25 2.25 0 113.324 4.243m0 0a2.25 2.25 0 100 4.186m-3.324-4.243a2.25 2.25 0 113.324 4.243" />
    </svg>
);

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);


const ToolCard: React.FC<ToolCardProps> = ({ tool, onCardClick }) => {
  const [isCopied, setIsCopied] = useState(false);
  const categoryStyle = CATEGORY_STYLES[tool.category];

  const handleShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent the modal from opening
    navigator.clipboard.writeText(tool.link).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div
      onClick={() => onCardClick(tool)}
      className="group block h-full cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onCardClick(tool)}
      aria-label={`View details for ${tool.name}`}
    >
      <div className="flex flex-col justify-between h-full bg-gray-800 border border-gray-700 rounded-xl p-6 transition-all duration-300 ease-in-out hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">{tool.icon}</span>
            <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${categoryStyle.color}`}>
              {tool.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-100 mb-2">{tool.name}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{tool.description}</p>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm font-medium">
            <button
                onClick={handleShareClick}
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all duration-300 ${
                    isCopied
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                aria-label={isCopied ? 'Link copied' : 'Share tool link'}
            >
                {isCopied ? <CheckIcon className="w-4 h-4" /> : <ShareIcon className="w-4 h-4" />}
                <span>{isCopied ? 'Copied!' : 'Share'}</span>
            </button>
            <div className="text-gray-500 group-hover:text-purple-400 transition-colors duration-300">
                <span>View Details</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
