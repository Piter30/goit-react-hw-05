import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../components/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/movie/day',
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzc3ZDczYTFmMzZjZGI5MWQ3ZTZiMjFmNTM4MzQ0YSIsIm5iZiI6MTczMjczOTkyNy4zNjI0NDgyLCJzdWIiOiI2NzBiOTYzYWIxNWQ5N2IxYTkzYzc0NDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0zaGVhAbY0AREUcZH5iZMZdVkD-n8sYc0BXWRKe4Pkw`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
