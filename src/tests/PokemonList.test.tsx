import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { PokemonList } from '../components/PokemonList';
import { usePokemonContext } from '../context/PokemonContext';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('../context/PokemonContext', () => ({
  usePokemonContext: jest.fn()
}));

const mockPokemons = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Ivysaur' },
  { id: 3, name: 'Venusaur' }
];

describe('PokemonList Component', () => {
  beforeEach(() => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      pokemons: mockPokemons,
      addPokemon: jest.fn(),
      updatePokemon: jest.fn(),
      deletePokemon: jest.fn()
    });
  });

  test('renders without crashing and displays Pokémon', () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <PokemonList />
        </MemoryRouter>
      </ChakraProvider>
    );

    mockPokemons.forEach(pokemon => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    });

    expect(screen.getByPlaceholderText('Search Pokémon...')).toBeInTheDocument();
    expect(screen.getByText('Add Pokémon')).toBeInTheDocument();
  });

  test('filters Pokémon list based on search term', () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <PokemonList />
        </MemoryRouter>
      </ChakraProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search Pokémon...'), {
      target: { value: 'Bulbasaur' }
    });

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.queryByText('Ivysaur')).not.toBeInTheDocument();
    expect(screen.queryByText('Venusaur')).not.toBeInTheDocument();
  });

  test('opens modal for adding a new Pokémon', async () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <PokemonList />
        </MemoryRouter>
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText('Add Pokémon'));

    expect(await screen.findByRole('dialog', { name: /Add Pokémon/i })).toBeInTheDocument();
  });

});
