import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!pokemonName) return; 
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      setPokemonData(response.data);
    } catch (err) {
      setError('Pokémon não encontrado');
      setPokemonData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Pokédex</h1>
      <input
        type="text"
        placeholder="Pesquisar Pokémon"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      
      {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      
      {pokemonData && (
        <div className="pokemon-details">
          <h2>{pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h2>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="pokemon-image"
          />
          <img
            src={pokemonData.sprites.back_default}
            alt={`${pokemonData.name} - Back`}
            className="pokemon-image"
          />
          <div className="pokemon-info">
            <div><strong>Altura:</strong> {pokemonData.height / 10} m</div>
            <div><strong>Peso:</strong> {pokemonData.weight / 10} kg</div>
            <div><strong>Tipos:</strong> {pokemonData.types.map((type, index) => (
              <span key={index}>{type.type.name}{index < pokemonData.types.length - 1 ? ', ' : ''}</span>
            ))}</div>
            <div><strong>Habilidades:</strong>
              <ul>
                {pokemonData.abilities.map((ability, index) => (
                  <li key={index}>{ability.ability.name}</li>
                ))}
              </ul>
            </div>
            <div><strong>Experiência Base:</strong> {pokemonData.base_experience}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
