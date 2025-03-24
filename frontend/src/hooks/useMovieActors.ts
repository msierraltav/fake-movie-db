import { useState, useCallback } from 'react';

export interface Actor {
  id: number;
  nconst: string;
  primaryName: string;
  birthYear: string;
  deathYear: string;
  primaryProfession: string;
  knownForTitles: string;
}

interface ActorsResponse {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  millisecondsTaken: number;
  items: Actor[];
}

interface UseMovieActorsResult {
  actors: ActorsResponse | null;
  loading: boolean;
  error: Error | null;
  fetchActors: (movieId: number, page?: number, pageSize?: number) => Promise<ActorsResponse>;
}

export function useMovieActors(): UseMovieActorsResult {
  const [actors, setActors] = useState<ActorsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const fetchActors = useCallback(async (movieId: number, page = 1, pageSize = 6) => {
    try {
      setLoading(true);
      setError(null);
      
      const queryParams = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString()
      });
      
      const response = await fetch(`${apiUrl}/api/movies/${movieId}/actors?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const result = await response.json();
      setActors(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  return { actors, loading, error, fetchActors };
}
