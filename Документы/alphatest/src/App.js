import React, {useEffect, useState} from 'react';
import './App.css';
import CharacterPage from './features/characters/CharactersPage';
import SearchFilter from './components/SearchFilter/SearchFilter';
import FavoritesList from './features/favorites/FavoritesList';
import { useSelector } from 'react-redux';

function App() {
  const favorites = useSelector(state => state.favorites.list)
  const [isFavorite,setIsFavorite] = useState(false)
  const [isEmpty,setIsEmpty] = useState(true)
  useEffect(() => {
    setIsEmpty(favorites.length == 0)
  },[favorites])

  return (
    <div className="App">
      <button disabled={isEmpty && !isFavorite}
        onClick={() => setIsFavorite(!isFavorite)}>
        {isFavorite? 'Return to main' : 'Show favorite'}
      </button>
      {isFavorite ?
        <div>
          <FavoritesList list={favorites}/>
        </div>
        :
        <div className='App'>
          <SearchFilter/>
          <CharacterPage/>
        </div>
      }
    </div>
  );
}

export default App;