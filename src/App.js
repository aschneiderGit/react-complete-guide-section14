import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [apiMovies, setApiMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	async function fetchMoviesHandler() {
		setIsLoading(true);
		const response = await fetch('https://swapi.dev/api/films');
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
		setIsLoading(false);
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{isLoading ? <p>Loading...</p> : <MoviesList movies={apiMovies} />}
			</section>
		</React.Fragment>
	);
}

export default App;
