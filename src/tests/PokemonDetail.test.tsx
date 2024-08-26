import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { PokemonDetail } from '../components/PokemonDetail'; 

describe('PokemonDetail Component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <PokemonDetail />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});