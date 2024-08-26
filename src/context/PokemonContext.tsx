// src/context/PokemonContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pokemon } from '../types/Pokemon';
import { loadPokemonsFromLocalStorage, savePokemonsToLocalStorage } from '../utils/localStorage';

interface PokemonContextType {
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  addPokemon: (pokemon: Pokemon) => void;
  updatePokemon: (pokemon: Pokemon) => void;
  deletePokemon: (id: number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    const storedPokemons = loadPokemonsFromLocalStorage();
    if (storedPokemons.length === 0) {
      fetchPokemonsFromAPI();
    } else {
      setPokemons(storedPokemons);
    }
  }, []);

  useEffect(() => {
    savePokemonsToLocalStorage(pokemons);
  }, [pokemons]);

  const fetchPokemonsFromAPI = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
      const data = await response.json();
      const fetchedPokemons: Pokemon[] = data.results.map((item: any, index: number) => ({
        id: index + 1, // Assuming a simple ID for the example
        name: item.name,
        height: 0,
        weight: 0,
        base_experience: 0,
        sprites: { front_default: '' },
        types: [],
        abilities: [],
      }));
      setPokemons(fetchedPokemons);
      savePokemonsToLocalStorage(fetchedPokemons);
    } catch (error) {
      console.error('Failed to fetch Pokémon data:', error);
    }
  };

  const addPokemon = (pokemon: Pokemon) => {
    setPokemons(prevPokemons => [...prevPokemons, pokemon]);
  };

  const updatePokemon = (updatedPokemon: Pokemon) => {
    setPokemons(prevPokemons =>
      prevPokemons.map(pokemon =>
        pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
      )
    );
  };

  const deletePokemon = (id: number) => {
    setPokemons(prevPokemons => prevPokemons.filter(pokemon => pokemon.id !== id));
  };

  return (
    <PokemonContext.Provider value={{ pokemons, setPokemons, addPokemon, updatePokemon, deletePokemon }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};
