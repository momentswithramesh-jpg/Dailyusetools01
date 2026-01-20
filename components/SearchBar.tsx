
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);


const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <SearchIcon className="h-5 w-5 text-gray-500" />
    </div>
    <input
      type="text"
      placeholder="Search for a tool..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition duration-200"
    />
  </div>
);

export default SearchBar;
