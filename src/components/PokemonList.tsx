import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext } from '../context/PokemonContext';
import { Pokemon } from '../types/Pokemon';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Flex,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Text
} from '@chakra-ui/react';
import { PokemonForm } from './PokemonForm';

export const PokemonList: React.FC = () => {
  const { pokemons, addPokemon, updatePokemon, deletePokemon } = usePokemonContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const navigate = useNavigate(); // Hook to handle navigation

  const handleViewDetails = (pokemon: Pokemon) => {
    navigate(`/pokemon/${pokemon.id}`); // Redirect to Pokémon details page
  };

  const handleAddPokemon = () => {
    setSelectedPokemon(null);
    setFormMode('add');
    onOpen();
  };

  const handleEditPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setFormMode('edit');
    onOpen();
  };

  const handleSavePokemon = (pokemon: Pokemon) => {
    if (formMode === 'add') {
      addPokemon(pokemon);
    } else if (formMode === 'edit') {
      updatePokemon(pokemon);
    }
    onClose();
  };

  const handleDeletePokemon = (id: number) => {
    deletePokemon(id);
  };

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPokemon = currentPage * 10;
  const indexOfFirstPokemon = indexOfLastPokemon - 10;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (!pokemons.length) return <Spinner size="xl" />;

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center">
      <Box mb={4} w="full" maxW="1200px">
        <Text fontSize='4xl'>POKEDEX</Text>
        <Flex justify="space-between" mb={4}>
          <Input
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            width="50%"
            mr={4}
          />
          <Button colorScheme="red" onClick={handleAddPokemon}>
            Add Pokémon
          </Button>
        </Flex>
        <Table variant="simple" textAlign="center">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentPokemons.map((pokemon, index) => (
              <Tr key={pokemon.id}>
                <Td>{indexOfFirstPokemon + index + 1}</Td>
                <Td>{pokemon.name}</Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="red"
                    mr={2}
                    onClick={() => handleEditPokemon(pokemon)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    mr={2}
                    onClick={() => handleViewDetails(pokemon)}
                  >
                    Details
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    mr={2}
                    onClick={() => handleDeletePokemon(pokemon.id)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex justify="center" mt={4}>
          {Array.from({ length: Math.ceil(filteredPokemons.length / 10) }).map((_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              colorScheme={currentPage === index + 1 ? 'red' : 'gray'}
              mx={1}
            >
              {index + 1}
            </Button>
          ))}
        </Flex>
      </Box>

      {/* Modal for adding/editing Pokémon */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{formMode === 'edit' ? 'Edit Pokémon' : 'Add Pokémon'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <PokemonForm
              isEditing={formMode === 'edit'}
              initialPokemon={selectedPokemon}
              onSave={handleSavePokemon}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
