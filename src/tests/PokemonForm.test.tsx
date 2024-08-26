import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PokemonForm } from '../components/PokemonForm';
import { Pokemon } from '../types/Pokemon';
import { fetchPokemonDetails } from '../services/pokemonService';

jest.mock('../services/pokemonService', () => ({
  fetchPokemonDetails: jest.fn()
}));

const mockFetchPokemonDetails = fetchPokemonDetails as jest.Mock;

describe('PokemonForm Component', () => {
  const mockOnSave = jest.fn();

  test('renders without crashing for adding a new Pokémon', () => {
    render(<PokemonForm isEditing={false} initialPokemon={null} onSave={mockOnSave} />);

    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Height:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Weight:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Base Experience:/i)).toBeInTheDocument();
    expect(screen.getByText('Add Pokémon')).toBeInTheDocument();
  });

  test('renders with initial values when editing an existing Pokémon', async () => {
    const initialPokemon: Pokemon = {
      id: 1,
      name: 'Bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      sprites: { front_default: '' },
      types: [],
      abilities: []
    };

    render(<PokemonForm isEditing={true} initialPokemon={initialPokemon} onSave={mockOnSave} />);

    expect(screen.getByLabelText(/Name:/i)).toHaveValue(initialPokemon.name);
    expect(screen.getByLabelText(/Height:/i)).toHaveValue(initialPokemon.height);
    expect(screen.getByLabelText(/Weight:/i)).toHaveValue(initialPokemon.weight);
    expect(screen.getByLabelText(/Base Experience:/i)).toHaveValue(initialPokemon.base_experience);
  });

  test('handles input changes and submits the form', () => {
    render(<PokemonForm isEditing={false} initialPokemon={null} onSave={mockOnSave} />);

    fireEvent.change(screen.getByLabelText(/Name:/i), { target: { value: 'Charmander' } });
    fireEvent.change(screen.getByLabelText(/Height:/i), { target: { value: '6' } });
    fireEvent.change(screen.getByLabelText(/Weight:/i), { target: { value: '85' } });
    fireEvent.change(screen.getByLabelText(/Base Experience:/i), { target: { value: '62' } });

    fireEvent.click(screen.getByText('Add Pokémon'));

    expect(mockOnSave).toHaveBeenCalledWith({
      id: expect.any(Number),
      name: 'Charmander',
      height: '6',
      weight: '85',
      base_experience: '62',
      sprites: { front_default: '' },
      types: [],
      abilities: []
    });
  });

  test('fetches Pokémon details if editing and no initial data', async () => {
    mockFetchPokemonDetails.mockResolvedValue({
      id: 1,
      name: 'Bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      sprites: { front_default: '' },
      types: [],
      abilities: []
    });

    render(<PokemonForm isEditing={true} initialPokemon={null} onSave={mockOnSave} />);
    
    await waitFor(() => {
      expect(screen.getByLabelText(/Name:/i)).toHaveValue('Bulbasaur');
    });
  });
});
