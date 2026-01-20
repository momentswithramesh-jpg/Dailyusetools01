
import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_TOOLS, CATEGORIES, Category } from './constants';
import { Tool } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ToolGrid from './components/ToolGrid';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import ToolDetailModal from './components/ToolDetailModal';
import AddToolModal from './components/AddToolModal';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isAddToolModalOpen, setAddToolModalOpen] = useState(false);

  const [tools, setTools] = useState<Tool[]>(() => {
    try {
      const storedTools = localStorage.getItem('tools');
      return storedTools ? JSON.parse(storedTools) : INITIAL_TOOLS;
    } catch (error) {
      console.error("Failed to parse tools from localStorage", error);
      return INITIAL_TOOLS;
    }
  });

  useEffect(() => {
    localStorage.setItem('tools', JSON.stringify(tools));
  }, [tools]);

  const filteredTools = useMemo((): Tool[] => {
    return tools.filter(tool => {
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, tools]);

  const handleOpenAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
  };

  const handleCloseToolModal = () => {
    setSelectedTool(null);
  };
  
  const handleAddTool = (newTool: Tool) => {
    setTools(prevTools => [newTool, ...prevTools]);
    setAddToolModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Header 
            onLogin={() => handleOpenAuthModal('login')} 
            onSignup={() => handleOpenAuthModal('signup')}
            onAddToolClick={() => setAddToolModalOpen(true)}
          />
          <main>
            <div className="sticky top-0 z-10 bg-gray-900 bg-opacity-80 backdrop-blur-md py-6 mb-8">
              <div className="max-w-4xl mx-auto space-y-6">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <CategoryFilter
                  categories={CATEGORIES}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </div>
            <ToolGrid tools={filteredTools} onToolClick={handleToolClick} />
          </main>
        </div>
        <Footer />
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        setMode={setAuthMode} 
      />
      {selectedTool && (
        <ToolDetailModal 
          tool={selectedTool}
          onClose={handleCloseToolModal}
        />
      )}
      <AddToolModal
        isOpen={isAddToolModalOpen}
        onClose={() => setAddToolModalOpen(false)}
        onAddTool={handleAddTool}
      />
    </>
  );
};

export default App;
