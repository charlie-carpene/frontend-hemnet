import './App.css';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { getRequest, postRequest } from '../services/requests';
import { Card, Form } from '../components';

function App() {
  const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState({});

  const dataToSearch = (value) => {
    setData({
      ...data,
      ...value,
    });
  };

  const searchMovie = async () => {
    const response = await getRequest({
      url: `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`,
      params: { 
        s: data.s,
        type: data.type,
        y: data.y
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
              category: data.type,
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
        <Form data={dataToSearch} />
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
