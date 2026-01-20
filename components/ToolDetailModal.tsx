
import React from 'react';
import { Tool } from '../types';
import { CATEGORY_STYLES } from '../constants';

interface ToolDetailModalProps {
  tool: Tool;
  onClose: () => void;
}

const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM18 13.5l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 18l-1.035.259a3.375 3.375 0 00-2.456 2.456L18 21.75l-.259-1.035a3.375 3.375 0 00-2.456-2.456L14.25 18l1.035-.259a3.375 3.375 0 002.456-2.456L18 13.5z" />
    </svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose }) => {
  const categoryStyle = CATEGORY_STYLES[tool.category];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="tool-detail-title"
    >
      <div
        className="bg-gray-800 rounded-xl p-8 w-full max-w-lg border border-gray-700 shadow-2xl shadow-purple-500/20 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s forwards ease-out; }
        `}</style>
        
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
                <span className="text-5xl">{tool.icon}</span>
                <div>
                    <h2 id="tool-detail-title" className="text-3xl font-bold">{tool.name}</h2>
                     <span className={`px-3 py-1 text-xs font-bold rounded-full text-white ${categoryStyle.color} mt-1 inline-block`}>
                        {tool.category}
                    </span>
                </div>
            </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-3xl leading-none" aria-label="Close modal">&times;</button>
        </div>

        <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed">{tool.description}</p>
            
            <div>
                <h3 className="text-lg font-semibold text-gray-200 mb-2">User Rating</h3>
                <div className="flex items-center">
                    <span className="text-yellow-400 text-2xl">★★★★☆</span>
                    <span className="text-gray-400 ml-2">(4.5 / 5 from 1,234 reviews)</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">*Ratings are for demonstration purposes.</p>
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-200 mb-3 flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-purple-400" />
                    <span>Advanced Features</span>
                </h3>
                <ul className="space-y-2">
                    <li className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">API Access for developers</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Real-time team collaboration</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Advanced analytics & reporting</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">Cross-platform data synchronization</span>
                    </li>
                </ul>
                 <p className="text-xs text-gray-500 mt-3 text-right">*Features are illustrative examples.</p>
            </div>

            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              <span>Visit Website</span>
              <ExternalLinkIcon className="w-5 h-5" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default ToolDetailModal;
