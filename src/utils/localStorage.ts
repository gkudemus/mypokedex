import { Pokemon } from '../types/Pokemon';

const POKEMON_STORAGE_KEY = 'pokemons';

export const loadPokemonsFromLocalStorage = (): Pokemon[] => {
  const stored = localStorage.getItem(POKEMON_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const savePokemonsToLocalStorage = (pokemons: Pokemon[]) => {
  localStorage.setItem(POKEMON_STORAGE_KEY, JSON.stringify(pokemons));
};