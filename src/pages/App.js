import './App.css';
import { useState } from 'react';
import { Input, Button } from '@chakra-ui/react';

function App() {
  const [search, setSearch] = useState('');

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  return (
    <div className="App">
      <Input 
        onChange={handleInputChange}
        placeholder='Search for a movie'
        htmlSize={20}
        width='auto'
      />
      <Button>
        Search
      </Button>
    </div>
  );
}

export default App;
