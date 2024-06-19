import React, { useContext } from 'react';
import styles from "./style.module.css";
import MovieContext from '../movie/movieContext';
import { MovieDtoV13 } from '@openmoviedb/kinopoiskdev_client/dist/types';


interface MovieDetailsProps {}
const MovieDetails: React.FC<MovieDetailsProps> = () => {
    const { selectedMovie } = useContext(MovieContext);

    if (!selectedMovie) {
        return <div>Фильм не выбран</div>;
    }

    return (
        <div className={styles.movieDetails}>
            <div className={styles.poster}>
                <img src={selectedMovie.poster ? selectedMovie.poster.url : ""} alt={selectedMovie.name} />
            </div>
            <div className={styles.info}>
                <h2>{selectedMovie.name}</h2>
                <p>{selectedMovie.description}</p>
                <div className={styles.details}>
                    <span>Рейтинг Кинопоиска: {selectedMovie.rating ? selectedMovie.rating.kp: ""}</span>
                    <span>Рейтинг IMDb: {selectedMovie.rating ? selectedMovie.rating.imdb : ""}</span>
                    <span>Рейтинг Кинокритиков: {selectedMovie.rating ? selectedMovie.rating.filmCritics : ""}</span>
                    <span>Год: {selectedMovie.year}</span>
                </div>
                <h3>Жанры:</h3>
                <ul>
                    {selectedMovie.genres ? selectedMovie.genres.map((genre) => (
                        <li key={genre.name}>{genre.name}</li>
                    )): ""}
                </ul>
            </div>
        </div>
    );
}

export default MovieDetails;

