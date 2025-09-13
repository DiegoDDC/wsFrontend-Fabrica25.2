import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ToggleViewButton from '@/components/ToggleViewButton';
import PokemonCard from '@/components/PokemonCard';
import TypeFilter from '@/components/TypeFilter';
import { fetchPokemonList, fetchPokemonById } from '@/utils/api';
import { PokemonDetail, Pokemon } from '@/utils/types';
import { useDebounce } from '@/hooks/useDebounce';

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);
  const [allPokemons, setAllPokemons] = useState<PokemonDetail[]>([]); // Todos os Pokémon
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); // 20 por página

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    async function loadPokemons() {
      try {
        const data = await fetchPokemonList(151, 0);
        
        const details = await Promise.all(
          data.results.map(async (pokemon: Pokemon, index: number) => {
            const pokemonId = pokemon.url.split('/').filter(Boolean).pop() || (index + 1).toString();
            return await fetchPokemonById(pokemonId);
          })
        );
        
        setAllPokemons(details);
        setPokemons(details);
      } catch (error) {
        console.error('Erro ao carregar Pokémon:', error);
      }
    }
    loadPokemons();
  }, []);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setCurrentPage(1); // Reset para primeira página ao filtrar
  };

  const filteredPokemons = allPokemons.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesTypes = selectedTypes.length === 0 || 
      p.types.some(t => selectedTypes.includes(t.type.name));
    return matchesSearch && matchesTypes;
  });

  // Cálculo da paginação
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemons = filteredPokemons.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <TypeFilter 
          selectedTypes={selectedTypes} 
          onTypeToggle={handleTypeToggle} 
        />

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <div className="flex-1">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
          <div className="hidden sm:block">
            <ToggleViewButton
              view={view}
              toggleView={() => setView(view === 'grid' ? 'list' : 'grid')}
            />
          </div>
          <div className="sm:hidden">
            <button
              onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm w-full"
            >
              {view === 'grid' ? '📋 Lista' : '🧩 Grid'}
            </button>
          </div>
        </div>

        <div className={
          view === 'grid' 
            ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'
            : 'flex flex-col gap-2'
        }>
          {currentPokemons.map(p => (
            <PokemonCard key={p.id} pokemon={p} />
          ))}
        </div>

        {/* PAGINAÇÃO ESTILO POKÉDEX */}
        {filteredPokemons.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-bold"
            >
              ⬅️ Anterior
            </button>
            
            <span className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold">
              Página {currentPage} de {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed font-bold"
            >
              Próxima ➡️
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}