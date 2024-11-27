import { useState, useEffect, useRef } from 'react';
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzc3ZDczYTFmMzZjZGI5MWQ3ZTZiMjFmNTM4MzQ0YSIsIm5iZiI6MTczMjczOTkyNy4zNjI0NDgyLCJzdWIiOiI2NzBiOTYzYWIxNWQ5N2IxYTkzYzc0NDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0zaGVhAbY0AREUcZH5iZMZdVkD-n8sYc0BXWRKe4Pkw`,
            },
          }
        );
        setMovieDetails(response.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        Go back
      </Link>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movieDetails && (
        <div className={styles.details}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className={styles.poster}
          />
          <div className={styles.info}>
            <h1>{movieDetails.title}</h1>
            <p>
              <strong>Release date:</strong> {movieDetails.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movieDetails.vote_average} / 10
            </p>
            <p>{movieDetails.overview}</p>
            <nav className={styles.nav}>
              <NavLink
                to="cast"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Cast
              </NavLink>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                Reviews
              </NavLink>
            </nav>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
