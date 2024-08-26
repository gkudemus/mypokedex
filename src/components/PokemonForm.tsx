// src/components/PokemonForm.tsx

import React, { useState, useEffect } from 'react';
import { Pokemon } from '../types/Pokemon';
import { fetchPokemonDetails } from '../services/pokemonService';

interface PokemonFormProps {
  isEditing: boolean;
  initialPokemon: Pokemon | null;
  onSave: (pokemon: Pokemon) => void;
}

export const PokemonForm: React.FC<PokemonFormProps> = ({ isEditing, initialPokemon, onSave }) => {
  const [pokemon, setPokemon] = useState<Pokemon>({
    id: isEditing && initialPokemon ? initialPokemon.id : Date.now(),
    name: initialPokemon?.name || '',
    height: initialPokemon?.height || 0,
    weight: initialPokemon?.weight || 0,
    base_experience: initialPokemon?.base_experience || 0,
    sprites: initialPokemon?.sprites || { front_default: '' },
    types: initialPokemon?.types || [],
    abilities: initialPokemon?.abilities || [],
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      if (isEditing && !initialPokemon && pokemon.id) {
        try {
          const data = await fetchPokemonDetails(pokemon.id);
          setPokemon(data);
        } catch (error) {
          console.error('Error fetching Pokémon details:', error);
        }
      } else if (initialPokemon) {
        setPokemon(initialPokemon);
      }
    };

    fetchInitialData();
  }, [isEditing, initialPokemon, pokemon.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPokemon(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(pokemon);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={pokemon.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Height:
        <input
          type="number"
          name="height"
          value={pokemon.height}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Weight:
        <input
          type="number"
          name="weight"
          value={pokemon.weight}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Base Experience:
        <input
          type="number"
          name="base_experience"
          value={pokemon.base_experience}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button style={{marginTop: '20px', fontWeight: 'bolder'}} type="submit">{isEditing ? 'Update' : 'Add'} Pokémon</button>
    </form>
  );
};
