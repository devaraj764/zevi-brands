import React, { createContext } from 'react';
import './styles/App.scss'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import { ProductsProvider } from './contexts/ProductContext';
import ProductsPage from './pages/ProductsPage';

export const ProductsContext = createContext({})

const App: React.FC = () => {
  return (
    <ProductsProvider>
      <Routes>
        <Route path='/' Component={LandingPage} />
        <Route path='/products' Component={ProductsPage} />
      </Routes>
    </ProductsProvider>
  )
}

export default App;