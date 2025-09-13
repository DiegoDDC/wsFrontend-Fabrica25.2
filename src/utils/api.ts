import { PokemonListResponse, PokemonDetail } from './types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Falha ao buscar lista de Pokémon');
  }
  return response.json();
}

export async function fetchPokemonById(id: string): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!response.ok) {
    throw new Error(`Falha ao buscar Pokémon ${id}`);
  }
  return response.json();
}

export async function fetchPokemonByName(name: string): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`);
  if (!response.ok) {
    throw new Error(`Falha ao buscar Pokémon ${name}`);
  }
  return response.json();
}