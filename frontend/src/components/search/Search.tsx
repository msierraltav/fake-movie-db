import { useEffect, useState } from "react"
import "./styles.scss"
import type { MovieResponse } from "../../App"
import { useApiCall } from "../../hooks/useApiCall."
import Results from "../results/Results"

type SearchProps = {
  setMovies: (movies: MovieResponse) => void;
}

function Search({setMovies} : SearchProps) {
  const [searchDisabled, setSearchDisabled] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchResults, setSearchResults] = useState<MovieResponse | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const { refetch, data, loading } = useApiCall<MovieResponse>();

  const handleSearch = () => {
    const searchQuery = (document.getElementById("searchInput") as HTMLInputElement)?.value;
    setSearchValue(searchQuery);
    setCurrentPage(1); // Reset to first page on new search
    setHasSearched(true); // Mark that a search has been attempted
  } 

  const handleEnableSearchButton = () => {
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    if(searchInput.value.length > 3){
      setSearchDisabled(false);
    }
    else{
      setSearchDisabled(true);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      setSearching(true);
      refetch(searchValue, currentPage, 9)  // Include currentPage
        .then(data => {
          setMovies(data as MovieResponse);
          setSearchResults(data as MovieResponse);
        })
        .finally(() => {
          setSearching(false);
        });
    }
  }, [searchValue, currentPage, refetch, setMovies]); // Add currentPage as dependency

  return (
    <>
      <div className="search-container">
        {searching? <h2>Searching...</h2> : <h2>Search</h2>}
        <input onChange={handleEnableSearchButton} id="searchInput" type="text" placeholder="Search..." />
        <button onClick={() => (handleSearch())} disabled={searchDisabled}>Search</button>
      </div>
      
      {searchResults && (
        <Results 
          data={searchResults} 
          onPageChange={handlePageChange}
          hasSearched={hasSearched}
        />
      )}
    </>
  )
}

export default Search