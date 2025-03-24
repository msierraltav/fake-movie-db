import { useCallback } from "react";
import Movie from "../movie/Movie";
import "./styles.scss";
import type { MovieData } from "../movie/Movie";

interface ResultsProps {
  data: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    millisecondsTaken: number;
    items: MovieData[];
  } | null;
  onPageChange: (page: number) => void;
  hasSearched: boolean;
}

const Results = ({ data, onPageChange, hasSearched }: ResultsProps) => {
  const renderPaginationNumbers = useCallback(() => {
    if (!data || data.totalPages <= 1) return null;

    const currentPage = data.currentPage;
    const totalPages = data.totalPages;
    
    // Create array for page numbers
    let pages = [];
    
    // Always show first page
    pages.push(
      <button 
        key="first" 
        onClick={() => onPageChange(1)}
        className={currentPage === 1 ? "active" : ""}
      >
        ⏮️ First
      </button>
    );
    
    // Previous page button
    pages.push(
      <button 
        key="prev" 
        onClick={() => onPageChange(currentPage - 1)}
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
          onClick={() => onPageChange(i)}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ▶️
      </button>
    );
    
    // Always show last page
    pages.push(
      <button 
        key="last" 
        onClick={() => onPageChange(totalPages)}
        className={currentPage === totalPages ? "active" : ""}
      >
        Last ⏭️
      </button>
    );
    
    return pages;
  }, [data, onPageChange]);

  return (
    <div className="results">
      {data && data.items.length > 0 ? (
        <>
          <div className="stats">
            <p>Found {data.totalItems} results in {data.millisecondsTaken}ms • Page {data.currentPage} of {data.totalPages}</p>
          </div>
          
          <div className="movies-grid">
            {data.items.map((movie) => (
              <Movie key={movie.tconst} movieData={movie} />
            ))}
          </div>
          
          <div className="pagination">
            {renderPaginationNumbers()}
          </div>
        </>
      ) : hasSearched ? (
        <div className="no-results">
          <p>No results found. Try a different search term.</p>
        </div>
      ) : null}
    </div>
  );
};

export default Results;