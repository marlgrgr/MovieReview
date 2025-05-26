import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import Navbar from './NavBar';
import { get, post } from '../services/api';
import './Home.css';
import { getMovies, loadMovies } from '../services/graphqlService';

const Home = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { showModal } = useModal();
  const socketRef = useRef(null);
  const useGraphql = import.meta.env.VITE_API_USING_GRAPHQL?.toLowerCase?.() === "true";

  const fetchMovies = async () => {
    setLoading(true);
    try {
      if(useGraphql === true){
        const response = await getMovies(page, 10);
        setMovies(response.getMovieDetailsResponseDTO.results);
        setTotalPages(response.getMovieDetailsResponseDTO.totalPages);
      }else{
        const response = await get(`/movie?page=${page}&pageSize=10`);
        setMovies(response.data.results);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error loading movies", error);
    }
    setLoading(false);
  };

  const handleLoadMoviesPost = async () => {
    setLoading(true);
    try {
      if(useGraphql === true){
        const response = await loadMovies();
        if (response.loadMovies === true ){
          showModal("Request to load movies sent successfully", {});
        }
      }else{
        const response = await post('/movie/load', {});
        if (response.status === 202) {
          showModal("Request to load movies sent successfully", {});
        }
      }
    } catch (error) {
      console.error("Error loading movies", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED) {
      const baseURLWs = import.meta.env.VITE_API_BASE_URL_WS;
      socketRef.current = new WebSocket(baseURLWs);
      
      socketRef.current.onopen = function(event) {
      };

      socketRef.current.onmessage = function(event) {
        if(event && event.data === 'NEW_MOVIES_ADDED'){
          fetchMovies();
        }
      };

      socketRef.current.onclose = function(event) {
      };

      socketRef.current.onerror = function(error) {
      };
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <Navbar user={user}/>
      <div className="container-home">
        <h1>Available Movies</h1>
        <button onClick={handleLoadMoviesPost} disabled={loading}>
          {loading ? 'Loading...' : 'Load Movies'}
        </button>
        <div className="movies-list">
          {movies.map((movie, index) => (
            <div key={index} className="movie-card">
              <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w185${movie.posterPath}`} alt={movie.title} />
                <h3>{movie.title}</h3>
              </Link>
              <p>{movie.overview}</p>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span> Page {page} </span>
          <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;