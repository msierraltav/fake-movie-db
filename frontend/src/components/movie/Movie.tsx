
type MovieProps = {
    movieData : MovieData;
}

type MovieData = {
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

function Movie ({movieData : MovieData} : MovieProps) {
  return (
    <div className="movie">
      <h3>{MovieData.primaryTitle}</h3>
      <p>{MovieData.genres}</p>
      <p>{MovieData.startYear}</p>
    </div>
  )
}  

export default Movie