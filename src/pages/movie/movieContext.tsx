import React from 'react';
import { MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client/dist/types';

interface MovieContextType {
    selectedMovie: MovieDtoV13 | null;
    setSelectedMovie: (movie: MovieDtoV13 | null) => void;
}

const MovieContext = React.createContext<MovieContextType>({
    selectedMovie: null, // Добавьте начальное значение
    setSelectedMovie: () => {}
});

export default MovieContext;

