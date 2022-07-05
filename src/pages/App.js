import './App.css';
import { useState, useEffect } from 'react';
import { Input, Button, FormControl, FormLabel, Select, Form } from '@chakra-ui/react';
import { getRequest, postRequest } from '../services/requests';
import { Card } from '../components';

function App() {
  const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;
  const [searchValue, setSearchValue] = useState('');
  const [yearValue, setYearValue] = useState(null);
  const [typeValue, setTypeValue] = useState(null);
  const [movieCategories, setMovieCategories] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRequest({
        url: 'http://localhost:3000/categories'
      });
      setMovieCategories(response);
    }
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSelectChange = (event) => {
    setTypeValue(event.target.value);
  };

  const handleYearChange = (event) => {
    setYearValue(event.target.value);
  };

  const searchMovie = async () => {
    const response = await getRequest({
      url: `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`,
      params: { 
        s: searchValue,
        type: typeValue,
        y: yearValue
      }
    })

    if (response.Response === "True") {
      setMovies(response.Search);

      response.Search.forEach(movie =>
        postRequest({
          url: 'http://localhost:3000/movies?', 
          params: {
            movie: {
              title: movie.Title,
              category: typeValue,
              year: movie.Year,
              poster: movie.Poster,
            }
          }
        })
      )
    } else if (response.Response === "False" ) {
      alert(response.Error);
    }
  };

  return (
    <div className="App">
      <div className="Search">
        <FormControl>
          <FormLabel htmlFor='Title'>Title</FormLabel>
          <Input 
            onChange={handleSearchChange}
            placeholder='Search for a movie'
            htmlSize={20}
            width='auto'
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='Year'>Year</FormLabel>
          <Input 
            onChange={handleYearChange}
            placeholder='Search for a movie'
            htmlSize={20}
            width='auto'
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='Category'>Category</FormLabel>
          <Select 
            id='category' 
            placeholder='Choose a movie category'
            onChange={handleSelectChange}
          >
            {
              movieCategories.map(category => {
                return <option key={category.name} value={category.name} >{category.name}</option>
              })
            }
          </Select>
        </FormControl>
        <Button 
          onClick={(searchMovie)}
          type='submit'
        >
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
