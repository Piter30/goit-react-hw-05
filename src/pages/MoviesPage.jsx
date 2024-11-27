import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../components/MovieList';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzc3ZDczYTFmMzZjZGI5MWQ3ZTZiMjFmNTM4MzQ0YSIsIm5iZiI6MTczMjczOTkyNy4zNjI0NDgyLCJzdWIiOiI2NzBiOTYzYWIxNWQ5N2IxYTkzYzc0NDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0zaGVhAbY0AREUcZH5iZMZdVkD-n8sYc0BXWRKe4Pkw`,
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setQuery(form.elements.query.value);
    setSearchParams({ query: form.elements.query.value });
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
