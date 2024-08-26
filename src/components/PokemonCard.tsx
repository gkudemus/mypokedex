// src/components/PokemonCard.tsx

import React from 'react';
import { Card, CardBody, CardFooter, Image, Stack, Text } from '@chakra-ui/react';
import { Pokemon } from '../types/Pokemon';

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <Card maxW="sm" borderWidth="1px" borderRadius="md" overflow="hidden">
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        borderRadius="md"
        boxSize="200px"
      />
      <CardBody>
        <Stack spacing="3">
          <Text fontSize="xl" fontWeight="bold">{pokemon.name}</Text>
          <Text color="gray.600">Types: {pokemon.types.join(', ')}</Text>
          <Text color="gray.600">Abilities: {pokemon.abilities.join(', ')}</Text>
        </Stack>
      </CardBody>
      <CardFooter>
        {/* Add your buttons here */}
      </CardFooter>
    </Card>
  );
};
