import { useState, useEffect, useCallback } from 'react';
import { useMovieActors } from '../../hooks/useMovieActors';
import Actor from '../actor/Actor';
import { MovieData } from '../movie/Movie';
import './movieDetail.scss';

interface MovieDetailProps {
  movie: MovieData;
  onClose: () => void;
}

function MovieDetail({ movie, onClose }: MovieDetailProps) {
  const { actors, loading, error, fetchActors } = useMovieActors();
  const [currentPage, setCurrentPage] = useState(1);
  
  useEffect(() => {
    fetchActors(movie.id, currentPage);
  }, [movie.id, currentPage, fetchActors]);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationNumbers = useCallback(() => {
    if (!actors || actors.totalPages <= 1) return null;

    const totalPages = actors.totalPages;
    
    // Create array for page numbers
    let pages = [];
    
    // Always show first page
    pages.push(
      <button 
        key="first" 
        onClick={() => handlePageChange(1)}
        className={currentPage === 1 ? "active" : ""}
      >
        ⏮️ First
      </button>
    );
    
    // Previous page button
    pages.push(
      <button 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ◀️
      </button>
    );
    
    // Calculate page numbers to display (max 3)
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + 2);
    
    // Adjust if we're at the end
    if (endPage - startPage < 2) {
      startPage = Math.max(1, endPage - 2);
    }
    
    // Add ellipsis at start if needed
    if (startPage > 1) {
      pages.push(<span key="ellipsis-start">...</span>);
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    
    // Add ellipsis at end if needed
    if (endPage < totalPages) {
      pages.push(<span key="ellipsis-end">...</span>);
    }
    
    // Next page button
    pages.push(
      <button 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶️
      </button>
    );
    
    // Always show last page
    pages.push(
      <button 
        key="last" 
        onClick={() => handlePageChange(totalPages)}
        className={currentPage === totalPages ? "active" : ""}
      >
        Last ⏭️
      </button>
    );
    
    return pages;
  }, [actors, currentPage, handlePageChange]);
  
  return (
    <div className="movie-detail-overlay" onClick={onClose}>
      <div className="movie-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="movie-detail-header">
          <h2>{movie.primaryTitle}</h2>
          {movie.originalTitle !== movie.primaryTitle && (
            <p className="original-title">{movie.originalTitle}</p>
          )}
          <div className="movie-meta">
            {movie.startYear && <span className="year">{movie.startYear}</span>}
            {movie.runtimeMinutes && <span className="runtime">{movie.runtimeMinutes} min</span>}
          </div>
          
          {movie.genres && (
            <div className="genres">
              {movie.genres.split(',').map((genre, index) => (
                <span key={index} className="genre-tag">{genre.trim()}</span>
              ))}
            </div>
          )}
        </div>
        
        <div className="actors-section">
          <h3>Cast</h3>
          {loading ? (
            <p>Loading actors...</p>
          ) : error ? (
            <p className="error">Error loading actors: {error.message}</p>
          ) : actors && actors.items.length > 0 ? (
            <>
              <div className="actors-grid">
                {actors.items.map((actor) => (
                  <Actor key={actor.nconst} actor={actor} />
                ))}
              </div>
              
              {actors.totalPages > 1 && (
                <div className="pagination">
                  {renderPaginationNumbers()}
                </div>
              )}
            </>
          ) : !loading && (
            <p>No actors found for this movie.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
