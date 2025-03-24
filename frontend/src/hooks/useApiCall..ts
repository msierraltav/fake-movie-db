import { useState, useCallback } from 'react';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
    refetch: (query: string, page?: number, pageSize?: number) => Promise<T>;
}

export function useApiCall<T>(): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const refetch = useCallback(async (query: string, page = 1, pageSize = 10) => {
        try {
            setLoading(true);
            setError(null);
            
            const queryParams = new URLSearchParams({
                query: query,
                page: page.toString(),
                pageSize: pageSize.toString()
            });
            
            const response = await fetch(`${apiUrl}/api/movies/search?${queryParams.toString()}`);
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiUrl]);

    return { data, loading, error, refetch };
}