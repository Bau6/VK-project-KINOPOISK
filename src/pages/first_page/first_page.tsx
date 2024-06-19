import React, { Component } from 'react';
import { KinopoiskDev, MovieQueryBuilder, SPECIAL_VALUE, Filter, MovieFields } from '@openmoviedb/kinopoiskdev_client';
import styles from "./style.module.css";
const kp = new KinopoiskDev('CE2XJQ3-GBTM15V-GFQ02EB-S3W58Z6');

class First_page extends Component {
    state = {
        movies: [{id: 0, name: "test", year:2000, rating: {filmCritics:1, imdb:1, kp:1}, poster: {previewUrl: "" , url: "" }}],
        page: 1,
        limit: 50
    };

    async componentDidMount() {
        await this.getMovies();
    }

    getMovies = async () => {
        const queryBuilder = new MovieQueryBuilder();
        const query = queryBuilder
            .select(['id', 'name', 'rating', 'poster', 'year'])
            .filterRange('year', [2020, 2023])
            .filterRange('rating.kp', [7.5, 10])
            .filterExact('poster.url', SPECIAL_VALUE.NOT_NULL)
            .filterExact('countries.name', 'США')
            .filterExact('countries.name', 'Россия')
            .paginate(this.state.page, this.state.limit)
            .build();

        const {data, error, message} = await kp.movie.getByFilters(query);

        if (data) {
            const {docs} = data;
            this.setState({movies: docs});
            console.log(docs);
        }
        if (error) console.log(error, message);
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Кинопоиск</h1>
                </div>
                <div className={styles.moviesContainer}>
                    <div className={styles.movieRow}> {/* Используем grid для movieRow */}
                        {this.state.movies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className={styles.movieItem}
                            >
                                <div className={styles.movieCard}>
                                    <img className={styles.imgMovies} src={movie.poster.url} alt={movie.name}/>
                                    <div className={styles.movieInfo}>
                                        <p>{movie.name}</p>
                                        <p>{movie.year}</p>
                                        <p>Рейтинг Кинопоиска: {movie.rating.kp}</p>
                                        <p>Рейтинг IMDb: {movie.rating.imdb}</p>
                                        <p>Рейтинг Кинокритиков: {movie.rating.filmCritics}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default First_page;