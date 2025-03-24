import { useState } from 'react';
import MovieDetail from '../movieDetail/MovieDetail';
import './movie.scss';

export type MovieData = {
    id: number;
    tconst: string;
    titleType: string;
    primaryTitle: string;
    originalTitle: string;
    isAdult: boolean;
    startYear: string;
    endYear: string;
    runtimeMinutes: string;
    genres: string;
}

type MovieProps = {
    movieData: MovieData;
}

function Movie({movieData}: MovieProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const handleClick = () => {
    setShowDetails(true);
  };
  
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  
  return (
    <>
      <div className="movie-card" onClick={handleClick}>
        <div className="movie-header">
          <h3>{movieData.primaryTitle}</h3>
          <span className="year">{movieData.startYear}</span>
        </div>
        <div className="movie-content">
          {movieData.genres && (
            <div className="genres">
              {movieData.genres.split(',').map((genre, index) => (
                <span key={index} className="genre-tag">{genre.trim()}</span>
              ))}
            </div>
          )}
          {movieData.runtimeMinutes && (
            <p className="runtime">{movieData.runtimeMinutes} min</p>
          )}
        </div>
      </div>
      
      {showDetails && (
        <MovieDetail movie={movieData} onClose={handleCloseDetails} />
      )}
    </>
  );
}

export default Movie;