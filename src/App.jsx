import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonDetail from './pages/PokemonDetail'
import PrivateRoutes from './components/PrivateRoutes'

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>

          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:pokemonId" element={<PokemonDetail />} />

        </Route>
      </Routes>
    </main>
  )
}

export default App
