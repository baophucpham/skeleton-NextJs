import { useMutation } from '@tanstack/react-query';

// Hook use for method mutation (POST, PUT, DELETE)
const useMutationApi = (apiFunction: () => Promise<any>, options?: any) => {
    return useMutation({
        mutationFn: apiFunction,
        ...options,
    });
};

export default useMutationApi;