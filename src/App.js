import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [apiMovies, setApiMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = useCallback(async () => {
		setError(null);
		setIsLoading(true);
		try {
			const response = await fetch('https://swapi.dev/api/films');
			if (!response.ok) {
				throw new Error('Something went wrong!');
			}

			const data = await response.json();

			const transformMovies = data.results.map((movie) => {
				return {
					id: movie.episode_id,
					title: movie.title,
					openingText: movie.opening_crawl,
					releaseDate: movie.release_date,
				};
			});
			setApiMovies(transformMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	let content = <p> Found no movie</p>;
	if (!isLoading && error) {
		content = <p>{error}</p>;
	} else if (isLoading) {
		content = <p>Loading...</p>;
	} else if (apiMovies.length > 0) {
		content = <MoviesList movies={apiMovies} />;
	}
	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
