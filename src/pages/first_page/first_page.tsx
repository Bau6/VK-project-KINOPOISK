import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieContext from '../movie/movieContext';
import styles from './FirstPage.module.css';

const FirstPage: React.FC<{ movies: import("@openmoviedb/kinopoiskdev_client/dist/types").MovieDtoV13[] }> = ({ movies }) => {    const navigate = useNavigate();
    const [filterYearFrom, setFilterYearFrom] = useState<number | null>(null);
    const [filterYearTo, setFilterYearTo] = useState<number | null>(null);
    const [filterRatingFrom, setFilterRatingFrom] = useState<number | null>(null);
    const [filterRatingTo, setFilterRatingTo] = useState<number | null>(null);

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>, filterType: 'from' | 'to') => {
        const value = parseInt(e.target.value, 10);
        if (isNaN(value)) return;
        if (filterType === 'from') {
            setFilterYearFrom(value);
        } else {
            setFilterYearTo(value);
        }
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>, filterType: 'from' | 'to') => {
        const value = parseFloat(e.target.value);
        if (isNaN(value)) return;
        if (filterType === 'from') {
            setFilterRatingFrom(value);
        } else {
            setFilterRatingTo(value);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Кинопоиск</h1>
            </div>
            <div className={styles.filterContainer}>
                <div>
                    <label htmlFor="filterYearFrom">Год (от):</label>
                    <input
                        type="number"
                        id="filterYearFrom"
                        value={filterYearFrom || ''}
                        onChange={(e) => handleYearChange(e, 'from')}
                    />
                </div>
                <div>
                    <label htmlFor="filterYearTo">Год (до):</label>
                    <input
                        type="number"
                        id="filterYearTo"
                        value={filterYearTo || ''}
                        onChange={(e) => handleYearChange(e, 'to')}
                    />
                </div>
                <div>
                    <label htmlFor="filterRatingFrom">Рейтинг (от):</label>
                    <input
                        type="number"
                        id="filterRatingFrom"
                        value={filterRatingFrom || ''}
                        onChange={(e) => handleRatingChange(e, 'from')}
                    />
                </div>
                <div>
                    <label htmlFor="filterRatingTo">Рейтинг (до):</label>
                    <input
                        type="number"
                        id="filterRatingTo"
                        value={filterRatingTo || ''}
                        onChange={(e) => handleRatingChange(e, 'to')}
                    />
                </div>
            </div>
            <div className={styles.moviesContainer}>
                <div className={styles.movieRow}>
                    {movies.map((movie) => (
                        <MovieContext.Consumer key={movie.id}>
                            {(context) => {
                                if (context) { // Проверяем, что контекст не null
                                    return (
                                        <div
                                            className={styles.movieItem}
                                            onClick={() => {
                                                context.setSelectedMovie(movie);
                                                navigate('/movie');
                                            }}
                                                    >
                                                <div className={styles.movieCard}>
                                                    <img
                                                        className={styles.imgMovies}
                                                        src={movie.poster ? movie.poster.url : ''}
                                                        alt={movie.name ? movie.name : 'Название фильма'}
                                                    />
                                                    <div className={styles.movieInfo}>
                                                        <p>{movie.name}</p>
                                                        <p>{movie.year}</p>
                                                        {movie.rating ? <p>Рейтинг: {movie.rating.kp}</p> : <p>Рейтинг: Неизвестен</p>}
                                                    </div>
                                                </div>
                                        </div>
                                    );
                                } else {
                                    return null; // Или какой-то другой элемент, если контекст null
                                }
                            }}
                        </MovieContext.Consumer>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FirstPage;
