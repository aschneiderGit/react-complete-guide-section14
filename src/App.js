import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [apiMovies, setApiMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function fetchMoviesHandler() {
		setError(null);
		setIsLoading(true);
		try {
			const response = await fetch('https://swapi.dev/api/film');
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
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!isLoading && error && <p>{error}</p>}
				{isLoading && <p>Loading...</p>}
				{!isLoading && <MoviesList movies={apiMovies} />}
			</section>
		</React.Fragment>
	);
}

export default App;
