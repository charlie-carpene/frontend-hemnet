import './App.css';
import { useState, useEffect } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { getRequest } from '../services/getRequest';
import { Card } from '../components';
import { render } from '@testing-library/react';

function App() {
  const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    showMovies(movies);
  }, [movies]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  const searchMovie = async () => {
    const data = {
      url: `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`,
      params: {
        s: searchValue,
      }
    }
    const response = await getRequest(data)
    setMovies(response.Search);
  };

  const showMovies = () => {
    movies.map(movie => {
      return (<Card data={movie} />)
    })
  };

  return (
    <div className="App">
      <div className="Search">
        <Input 
          onChange={handleInputChange}
          placeholder='Search for a movie'
          htmlSize={20}
          width='auto'
        />
        <Button onClick={(searchMovie)}>
          Search
        </Button>
      </div>
      <div className="Results">
        {
          movies.map(movie => {
            return (<Card key={movie.imdbID} data={movie} />)
          })
        }
      </div>
    </div>
  );
}

export default App;
