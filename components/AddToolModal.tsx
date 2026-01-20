
import React, { useState } from 'react';
import { Tool } from '../types';
import { Category, CATEGORIES } from '../constants';

interface AddToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTool: (tool: Tool) => void;
}

const AddToolModal: React.FC<AddToolModalProps> = ({ isOpen, onClose, onAddTool }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [icon, setIcon] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !link || !category || !icon) {
      alert("Please fill out all fields.");
      return;
    }
    // Simple URL validation
    try {
        new URL(link);
    } catch (_) {
        alert("Please enter a valid URL (e.g., https://example.com).");
        return;
    }

    onAddTool({ name, description, link, category, icon });
    // Reset form for next time
    setName('');
    setDescription('');
    setLink('');
    setCategory(CATEGORIES[0]);
    setIcon('');
  };
  
  const inputStyle = "w-full bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors";

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-tool-modal-title"
    >
      <div 
        className="bg-gray-800 rounded-lg p-8 w-full max-w-md border border-gray-700 shadow-2xl shadow-purple-500/20 transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-fade-in-up { animation: fade-in-up 0.3s forwards ease-out; }
        `}</style>
        <div className="flex justify-between items-center mb-6">
          <h2 id="add-tool-modal-title" className="text-2xl font-bold">Add a New Tool</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white text-2xl leading-none" aria-label="Close modal">&times;</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="tool-name">Tool Name</label>
            <input id="tool-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputStyle} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="tool-description">Description</label>
            <textarea id="tool-description" value={description} onChange={(e) => setDescription(e.target.value)} className={inputStyle} rows={3} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="tool-link">Website URL</label>
            <input id="tool-link" type="url" value={link} onChange={(e) => setLink(e.target.value)} className={inputStyle} placeholder="https://example.com" required />
          </div>
          <div className="flex gap-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="tool-category">Category</label>
              <select id="tool-category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className={inputStyle} required>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2" htmlFor="tool-icon">Icon (Emoji)</label>
              <input id="tool-icon" type="text" value={icon} onChange={(e) => setIcon(e.target.value)} className={`${inputStyle} w-20 text-center`} maxLength={2} required />
            </div>
          </div>
          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-200 mt-6">
            Add Tool
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToolModal;
