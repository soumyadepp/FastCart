import './App.css';
import Navbar from './features/navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './features/cart/Cart';
import { Toaster } from 'react-hot-toast';
import ProductPage from './features/productPage/ProductPage';
import Homepage from './features/homepage/Homepage';
import React, { useMemo, useState } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const ColorModeContext = React.createContext({toggleColorMode: () => {}});

function App() {
  return (
    <Router>
        <div className="App">
          <Navbar />
          <Toaster />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </div>
    </Router>
  );
}

export default function ToggleColorMode() {
  const [mode,setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    ()=>({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    [],
  );

  const theme = useMemo(
    () => 
    createTheme({
      palette:{
        mode,
      }
    }),
    [mode],
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}


