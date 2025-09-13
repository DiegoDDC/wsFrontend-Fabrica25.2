import { useState } from 'react';

const allTypes = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

interface Props {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

export default function TypeFilter({ selectedTypes, onTypeToggle }: Props) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="font-bold mb-2">Filtrar por Tipo:</h3>
      <div className="flex flex-wrap gap-2">
        {allTypes.map(type => (
          <button
            key={type}
            onClick={() => onTypeToggle(type)}
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
              selectedTypes.includes(type)
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
}