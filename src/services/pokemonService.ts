import axios from 'axios';
import { Pokemon } from '../types/Pokemon';

// Fetch the list of Pokémon
export const fetchAllPokemon = async (): Promise<Pokemon[]> => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
  const results = response.data.results;

  // Fetch detailed data for each Pokémon
  const pokemons = await Promise.all(
    results.map(async (result: any) => {
      const details = await axios.get(result.url);
      return mapPokemonDetails(details.data);
    })
  );
  return pokemons;
};

// Fetch detailed Pokémon data by ID
export const fetchPokemonDetails = async (id: number): Promise<Pokemon> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return mapPokemonDetails(response.data);
};

// Helper function to map API response to Pokemon type
const mapPokemonDetails = (data: any): Pokemon => {
  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    base_experience: data.base_experience,
    sprites: data.sprites,
    types: data.types.map((type: any) => type.type.name),
    abilities: data.abilities.map((ability: any) => ability.ability.name),
  };
};

export const fetchValidPokemonIds = async (): Promise<number[]> => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000'); // Fetch a large number of Pokémon to cover all cases
    const data = await response.json();
    return data.results.map((pokemon: { url: string }) => {
      const id = parseInt(pokemon.url.split('/').slice(-2, -1)[0], 10);
      return id;
    });
  } catch (error) {
    console.error('Error fetching valid Pokémon IDs:', error);
    return [];
  }
};