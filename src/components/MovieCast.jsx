import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';
const placeholderImage = 'https://via.placeholder.com/150?text=No+Image';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzc3ZDczYTFmMzZjZGI5MWQ3ZTZiMjFmNTM4MzQ0YSIsIm5iZiI6MTczMjczOTkyNy4zNjI0NDgyLCJzdWIiOiI2NzBiOTYzYWIxNWQ5N2IxYTkzYzc0NDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0zaGVhAbY0AREUcZH5iZMZdVkD-n8sYc0BXWRKe4Pkw`,
            },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch cast information.');
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul className={styles.castList}>
      {cast.map(actor => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : placeholderImage
            }
            alt={actor.name}
            className={styles.actorPhoto}
          />
          <p>{actor.name}</p>
          <p>as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
