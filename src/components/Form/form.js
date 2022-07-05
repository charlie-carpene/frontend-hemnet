import './form.css';
import { useState, useEffect } from 'react';
import { getRequest } from '../../services/requests';
import { Input, FormControl, FormLabel, Select } from '@chakra-ui/react';


const Form = ({data}) => {
    const [movieCategories, setMovieCategories] = useState([]);

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
        data({s: event.target.value});
      };
    
    const handleSelectChange = (event) => {
        data({type: event.target.value});
    };
    
    const handleYearChange = (event) => {
        data({y: event.target.value});
    };
    
    return (
        <div className="form">
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
        </div>
    );
}

export default Form;