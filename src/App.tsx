// App.tsx

import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FirstPage from "./pages/first_page/first_page";
import MovieDetails from "./pages/movie/movie";
import MovieContext from './pages/movie/movieContext';
import { KinopoiskDev, MovieQueryBuilder, SPECIAL_VALUE } from "@openmoviedb/kinopoiskdev_client";

const kp = new KinopoiskDev('YOUR_API_KEY');

interface AppProps {}

const App: React.FC<AppProps> = () => {
    const [movies, setMovies] = useState<import("@openmoviedb/kinopoiskdev_client/dist/types").MovieDtoV13[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<import("@openmoviedb/kinopoiskdev_client/dist/types").MovieDtoV13 | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [filterYearFrom, setFilterYearFrom] = useState<number | null>(null);
    const [filterYearTo, setFilterYearTo] = useState<number | null>(null);
    const [filterRatingFrom, setFilterRatingFrom] = useState<number | null>(null);
    const [filterRatingTo, setFilterRatingTo] = useState<number | null>(null);

    const getMovies = async () => {
        const queryBuilder = new MovieQueryBuilder();
        queryBuilder
            .select(['id', 'name', 'rating', 'poster', 'year'])
            .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
            .paginate(page, limit);

        if (filterYearFrom !== null && filterYearTo !== null) {
            queryBuilder.filterRange('year', [filterYearFrom, filterYearTo]);
        }

        if (filterRatingFrom !== null && filterRatingTo !== null) {
            queryBuilder.filterRange('rating.kp', [filterRatingFrom, filterRatingTo]);
        }

        const query = queryBuilder.build();
        const { data, error, message } = await kp.movie.getByFilters(query);

        if (data) {
            const { docs } = data;
            setMovies(docs);
            console.log(docs);
        }

        if (error) console.log(error, message);
    };

    React.useEffect(() => {
        getMovies();
    }, [page, limit, filterYearFrom, filterYearTo, filterRatingFrom, filterRatingTo]);

    return (
        <BrowserRouter>
            <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
                <AppContent movies={movies}  />
            </MovieContext.Provider>
        </BrowserRouter>
    );
}

interface AppContentProps {
    movies: import("@openmoviedb/kinopoiskdev_client/dist/types").MovieDtoV13[];
}

const AppContent: React.FC<AppContentProps> = (props) => {
    const { movies } = props;

    return (
        <div>
            <Routes>
                <Route path={"/"} element={<FirstPage movies={movies} />} />
                {/*<Route path={"/movie"} element={<MovieDetails />} />*/}
            </Routes>
        </div>
    );
};

export default App;
