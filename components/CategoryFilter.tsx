
import React from 'react';
import { Category, CATEGORY_STYLES } from '../constants';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
  const allCategories: (Category | 'All')[] = ['All', ...categories];

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {allCategories.map((category) => {
        const isActive = selectedCategory === category;
        const style = category !== 'All' ? CATEGORY_STYLES[category] : { color: 'bg-gray-600', icon: '🌍' };
        
        return (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-2
              transition-all duration-200 ease-in-out
              ${isActive
                ? `${style.color} text-white shadow-lg transform scale-105`
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }
            `}
          >
            <span>{style.icon}</span>
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
