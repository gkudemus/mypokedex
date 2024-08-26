// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { PokemonProvider } from './context/PokemonContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <PokemonProvider>
      <Router>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Router>
    </PokemonProvider>
  </React.StrictMode>
);
