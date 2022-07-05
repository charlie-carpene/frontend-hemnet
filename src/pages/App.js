import './App.css';
import { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';
import { getRequest } from '../services/getRequest';

function App() {
  const OMDB_KEY = process.env.REACT_APP_OMDB_KEY;
  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  const searchMovie = () => {
    const data = {
      url: `http://www.omdbapi.com/?apikey=${OMDB_KEY}&`,
      params: {
        s: search,
      }
    }
    getRequest(data);
  };

  return (
    <div className="App">
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
  );
}

export default App;
