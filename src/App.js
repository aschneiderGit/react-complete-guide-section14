import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [apiMovies, setApiMovies] = useState([]);

	async function fetchMoviesHandler() {
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
	}

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				<MoviesList movies={apiMovies} />
			</section>
		</React.Fragment>
	);
}

export default App;
