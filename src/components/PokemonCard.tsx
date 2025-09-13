import { PokemonDetail } from '@/utils/types';
import Link from 'next/link';

interface Props {
  pokemon: PokemonDetail;
}


const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-200 border-gray-400 text-gray-800',
  fire: 'bg-red-500 border-red-700 text-white',
  water: 'bg-blue-500 border-blue-700 text-white',
  electric: 'bg-yellow-400 border-yellow-600 text-black',
  grass: 'bg-green-500 border-green-700 text-white',
  ice: 'bg-cyan-400 border-cyan-600 text-black',
  fighting: 'bg-orange-500 border-orange-700 text-white',
  poison: 'bg-purple-500 border-purple-700 text-white',
  ground: 'bg-amber-500 border-amber-700 text-white',
  flying: 'bg-sky-400 border-sky-600 text-black',
  psychic: 'bg-pink-500 border-pink-700 text-white',
  bug: 'bg-lime-500 border-lime-700 text-white',
  rock: 'bg-stone-500 border-stone-700 text-white',
  ghost: 'bg-violet-500 border-violet-700 text-white',
  dragon: 'bg-indigo-500 border-indigo-700 text-white',
  dark: 'bg-neutral-700 border-neutral-900 text-white',
  steel: 'bg-zinc-400 border-zinc-600 text-black',
  fairy: 'bg-rose-400 border-rose-600 text-black'
};

export default function PokemonCard({ pokemon }: Props) {
  const mainType = pokemon.types[0]?.type.name || 'normal';
  const cardStyle = typeColors[mainType] || 'bg-gray-200 border-gray-400 text-gray-800';

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className={`${cardStyle} border-2 rounded-lg p-2 text-center cursor-pointer 
                      transform hover:scale-110 hover:shadow-2xl hover:z-10
                      transition-all duration-300 ease-out`}>
        {/* Número */}
        <p className="text-xs opacity-90 mb-1">#{String(pokemon.id).padStart(3, '0')}</p>
        
        {/* Imagem */}
        <img
          src={pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-16 h-16 mx-auto drop-shadow-md"
        />
        
        {/* Nome */}
        <h3 className="capitalize text-sm font-bold mt-1">{pokemon.name}</h3>
        
        {/* Tipos */}
        <div className="flex justify-center gap-1 mt-1">
          {pokemon.types.map((t, i) => (
            <span key={i} className="text-xs font-semibold opacity-90">
              {t.type.name}
              {i < pokemon.types.length - 1 && ' | '}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}