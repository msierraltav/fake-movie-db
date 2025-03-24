import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/search/Search'
import Status from './components/status/Status'

interface MovieItem {
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

export interface MovieResponse {
  currentPage: number;
  items: MovieItem[];
  millisecondsTaken: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

function App() {


  const [movies, setMovies] = useState<MovieResponse>({
    currentPage: 0,
    items: [],
    millisecondsTaken: 0,
    pageSize: 0,
    totalItems: 0,
    totalPages: 0
  });

  useEffect(() => {
    console.log("movies", movies);
  }, [movies])

  return (
    <>
      <header>
        <h1>Fake Movie DB</h1>
        <p> Saarch your favorite movie by : actor, year , genre or title </p>
      </header>
      <section>
        <Search setMovies={setMovies}/>
        {
          movies.millisecondsTaken > 0 && (
            <Status
              currentPage={movies.currentPage}
              totalItems={movies.totalItems}
              totalPages={movies.totalPages}
              pageSize={movies.pageSize}
              millisecondsTaken={movies.millisecondsTaken}
            />
          )
        }
      </section>
    </>
  )
}

export default App
