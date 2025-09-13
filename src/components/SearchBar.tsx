interface Props {
  search: string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: Props) {
  return (
    <div className="flex gap-1">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 bg-white p-2 rounded flex-1 text-sm"
      />
      <button className="bg-blue-500 text-white px-3 py-2 rounded text-sm hidden sm:block">
        Buscar
      </button>
    </div>
  );
}