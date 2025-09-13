import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useFavorites } from '@/contexts/FavoritesContext';
import { fetchPokemonById } from '@/utils/api';
import { PokemonDetail } from '@/utils/types';

export default function Favorites() {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [pokemons, setPokemons] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    async function loadFavorites() {
      const details = await Promise.all(
        favoriteIds.map(id => fetchPokemonById(id.toString()))
      );
      setPokemons(details);
    }
    loadFavorites();
  }, [favoriteIds]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <h2 className="text-xl font-bold mb-4">Pokémons Favoritos</h2>
        {pokemons.length === 0 ? (
          <p>Nenhum Pokémon favoritado ainda.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pokemons.map(p => (
              <div key={p.id} className="bg-white border-2 border-gray-300 rounded-lg p-2 text-center">
                <img
                  src={p.sprites.other?.['official-artwork']?.front_default || p.sprites.front_default}
                  alt={p.name}
                  className="w-16 h-16 mx-auto"
                />
                <h3 className="capitalize text-sm font-medium mt-1">{p.name}</h3>
                <p className="text-xs text-gray-500">#{String(p.id).padStart(3, '0')}</p>
                
                {/* BOTÃO PARA REMOVER DOS FAVORITOS */}
                <button
                  onClick={() => toggleFavorite(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs mt-2 hover:bg-red-600"
                >
                  ❌ Remover
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}