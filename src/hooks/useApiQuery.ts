// src/hooks/useFetch.ts
import { useQuery } from '@tanstack/react-query';

// Hook use for method useQuery (GET)
const useQueryApi = (
    key: (string | undefined)[],
    apiFunction: () => Promise<any>,
    options?: any,
) => {
    return useQuery({
        queryKey: [key],
        queryFn: apiFunction,
        ...options,
    });
};

export default useQueryApi;

