import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYzc3ZDczYTFmMzZjZGI5MWQ3ZTZiMjFmNTM4MzQ0YSIsIm5iZiI6MTczMjczOTkyNy4zNjI0NDgyLCJzdWIiOiI2NzBiOTYzYWIxNWQ5N2IxYTkzYzc0NDciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.0zaGVhAbY0AREUcZH5iZMZdVkD-n8sYc0BXWRKe4Pkw`,
            },
          }
        );
        setReviews(response.data.results);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <ul className={styles.reviewList}>
      {reviews.map(review => (
        <li key={review.id} className={styles.reviewItem}>
          <p>
            <strong>{review.author}</strong>
          </p>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
