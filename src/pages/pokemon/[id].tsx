import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchPokemonById } from '@/utils/api';
import { PokemonDetail } from '@/utils/types';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function PokemonDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const { favoriteIds, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;
    async function loadPokemon() {
      const data = await fetchPokemonById(id as string);
      setPokemon(data);
    }
    loadPokemon();
  }, [id]);

  if (!pokemon) return <p>Carregando...</p>;

  const isFavorite = favoriteIds.includes(pokemon.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 text-center">
        <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
        <p>#{String(pokemon.id).padStart(3, '0')}</p>
        <img
          src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40 h-40 mx-auto"
        />
        <p>Tipos: {pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p>Peso: {(pokemon.weight / 10).toFixed(1)} kg</p>
        <p>Experiência base: {pokemon.base_experience}</p>
        <button
          onClick={() => toggleFavorite(pokemon.id)}
          className={`mt-4 px-4 py-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
        >
          {isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        </button>
      </main>
      <Footer />
    </div>
  );
}
