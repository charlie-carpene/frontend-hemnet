import { Box, Image, Text } from '@chakra-ui/react';

const Card = ({ data }) => {
    console.log(data.Title);
    return(
        <Box maxW='10rem' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image boxSize='200px' objectFit='cover' src={data.Poster} alt={data.Title} />
            <Box p='3'>
                <Text textAlign={[ 'center' ]} maxW='10rem'>
                    {data.Title}
                </Text>
                <Text textAlign={[ 'center' ]}>
                    {data.Type}&nbsp;|&nbsp;{data.Year}
                </Text>
            </Box>
        </Box>
    );
};

export default Card;

