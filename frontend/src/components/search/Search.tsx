import { useEffect, useState } from "react"
import "./styles.scss"
import type { MovieResponse } from "../../App"


type SearchProps = {
  setMovies: (movies: MovieResponse) => void;
}

function Search({setMovies} : SearchProps) {

  const [searchDisabled, setSearchDisabled] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searching, setSearching] = useState<boolean>(false);

  const handleSearch = () => {
    const searchQuery = (document.getElementById("searchInput") as HTMLInputElement)?.value;
    setSearchValue(searchQuery);
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

  useEffect(() => {
    console.log("searching..." , searchValue);
    const apiUrl = import.meta.env.VITE_API_URL;

    const apiQuery = `${apiUrl}/api/movies/search?query=${searchValue}&page=1&pageSize=10`;

    console.log("apiUrl", apiQuery);
    const doSearch = async() => {
      setSearchDisabled(true);
      setSearching(true);

      await fetch(apiQuery).then((response) => {
        return response.json();
      }).then((response) => {
        setMovies(response);
      })
      .finally(() => {
        setSearchDisabled(false);
        setSearching(false);
      });
    }

    doSearch();

  },[searchValue])

  return (
    <>
      {
        searching? <h2>Searching...</h2> : <h2>Search</h2>
      }
      <input onChange={handleEnableSearchButton} id="searchInput" type="text" placeholder="Search..." />
      <button onClick={() => (handleSearch())} disabled={searchDisabled}>Search</button>
    </>
  )
}

export default Search