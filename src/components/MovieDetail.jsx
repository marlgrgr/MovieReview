import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { get, post } from '../services/api';
import { useModal } from '../context/ModalContext';
import Navbar from './NavBar';
import './MovieDetail.css';

const MovieDetail = ({user}) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [review, setReview] = useState('');
  const [score, setScore] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const { showModal } = useModal();

  const fetchMovieDetail = async () => {
    setLoading(true);
    try {
      const response = await get(`/movie/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error("Error loading movie details", error);
    }
    setLoading(false);
  };

  const fetchReviews = async (page = 1) => {
    try {
      const response = await get(`/movieReview/movie/${id}?page=${page}&pageSize=5`);
      setReviews(response.data.results);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error loading reviews", error);
    }
  };

  const handleSubmitReview = async () => {
    try {
      await post(`/movieReview`, {
        movieId: id,
        review,
        score,
      });
      showModal('Review sent successfully!',{});
      setReview('');
      setScore(0);
      fetchReviews(); 
    } catch (error) {
      console.error("Error sending review", error);
    }
  };

  const renderStars = () => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={`star ${value <= score ? 'filled' : ''}`}
            onClick={() => setScore(score === value ? 0 : value)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchReviews();
  }, [id]);

  if (loading || !movie) return <p>Cargando...</p>;

  return (
    <div>
      <Navbar user={user}/>
      <div className="movie-detail-container">
        <h2>{movie.title}</h2>
        <img src={`https://image.tmdb.org/t/p/w300${movie.posterPath}`} alt={movie.title} />
        <p>{movie.overview}</p>

        <h3>Leave your review</h3>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
        />
        <div>
        <label>Score:</label>
        {renderStars()}
        </div>
        <button onClick={handleSubmitReview}>Send review</button>

        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>There is not review yet.</p>
        ) : (
          <ul>
            {reviews.map((r, index) => (
              <li key={index}>
                <strong>Score:</strong> {r.score} <br />
                {r.review}
              </li>
            ))}
          </ul>
        )}

        <div className="pagination">
          <button onClick={() => fetchReviews(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          <span> Page {currentPage} </span>
          <button onClick={() => fetchReviews(currentPage + 1)} disabled={currentPage >= totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
