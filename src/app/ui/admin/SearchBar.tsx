interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  clearSearch: () => void;
  loading: boolean;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleKeyDown,
  clearSearch,
  loading
}: SearchBarProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
        />
        <button 
          onClick={handleSearch}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-6 rounded-lg transition cursor-pointer"
        >
          Buscar
        </button>
        <button 
          onClick={clearSearch}
          disabled={loading}
          className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 disabled:dark:bg-zinc-800 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg transition cursor-pointer"
        >
          Limpiar
        </button>
      </div>
    </div>
  );
}