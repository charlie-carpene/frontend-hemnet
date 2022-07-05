import './App.css';
import { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { getRequest, postRequest } from '../services/requests';
import { Card } from '../components';

function App() {
  const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;
  const [searchValue, setSearchValue] = useState('');
  const [movies, setMovies] = useState([]);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
  };

  const searchMovie = async () => {
    const response = await getRequest({
      url: `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`,
      params: {
        s: searchValue,
      }
    })

    setMovies(response.Search);

    response.Search.forEach(movie =>
      postRequest({
        url: 'http://localhost:3000/movies?', 
        params: {
          movie: {
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
          }
        }
      })
    )
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
