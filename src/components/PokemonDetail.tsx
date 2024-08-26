// src/components/PokemonDetail.tsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Pokemon } from '../types/Pokemon';
import { fetchPokemonDetails, fetchValidPokemonIds } from '../services/pokemonService';

export const PokemonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemon = async () => {
      if (id) {
        try {
          const pokemonId = parseInt(id, 10);

          // Fetch valid Pokémon IDs
          const ids = await fetchValidPokemonIds();

          // Check if the ID is valid
          if (ids.includes(pokemonId)) {
            // Fetch Pokémon details from API
            const data = await fetchPokemonDetails(pokemonId);
            setPokemon(data);
          } else {
            // Fetch local storage data if ID is not valid
            const localData = JSON.parse(localStorage.getItem('pokemons') || '[]');
            const localPokemon = localData.find((p: Pokemon) => p.id === pokemonId);
            setPokemon(localPokemon || null);
          }
        } catch (error) {
          console.error('Error fetching Pokémon details:', error);
        }
      }
    };

    fetchPokemon();
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  const { name, sprites, types = [], abilities = [], base_experience, height, weight } = pokemon;

  return (
    <div>
      <button style={{marginBottom: '20px', fontWeight: 'bolder'}} onClick={() => navigate('/')}>Back to Homepage</button>
      <h1>{name}</h1>
      <img src={sprites?.front_default || ''} alt={name} />
      <p>Types: {types.map(type => type.type?.name || 'Unknown').join(', ')}</p>
      <p>Abilities: {abilities.map(ability => ability.ability?.name || 'Unknown').join(', ')}</p>
      <p>Base Experience: {base_experience}</p>
      <p>Height: {height} decimetres</p>
      <p>Weight: {weight} hectograms</p>
    </div>
  );
};
