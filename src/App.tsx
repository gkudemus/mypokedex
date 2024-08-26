import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { PokemonList } from './components/PokemonList';
import { PokemonDetail } from './components/PokemonDetail';
import { PokemonForm } from './components/PokemonForm';
import { usePokemonContext } from './context/PokemonContext';
import { Pokemon } from './types/Pokemon';

const App: React.FC = () => {
  const { addPokemon, updatePokemon } = usePokemonContext();

  // Placeholder function to handle saving Pokémon
  const handleSavePokemon = (pokemon: Pokemon) => {
    if (pokemon.id === Date.now()) {
      // Assume this ID indicates a new Pokémon
      addPokemon(pokemon);
    } else {
      updatePokemon(pokemon);
    }
  };

  return (
    <Routes>
      {/* Route for the Pokémon list */}
      <Route path="/" element={<PokemonList />} />

      {/* Route for viewing a specific Pokémon's details */}
      <Route path="/pokemon/:id" element={<PokemonDetail />} />

      {/* Route for creating a new Pokémon */}
      <Route
        path="/create"
        element={<PokemonForm isEditing={false} initialPokemon={null} onSave={handleSavePokemon} />}
      />

      {/* Route for editing an existing Pokémon */}
      <Route
        path="/edit/:id"
        element={<PokemonForm isEditing={true} initialPokemon={null} onSave={handleSavePokemon} />}
      />
    </Routes>
  );
};

export default App;
