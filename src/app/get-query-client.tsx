import { ROUTE_CONFIG } from "@/constants";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

function makeQueryClient(router?: AppRouterInstance) {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        if (Number(error.code) === 401) {
          router?.replace(ROUTE_CONFIG.AUTH.LOGIN);
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        if (Number(error.code) === 401) {
          router?.replace(ROUTE_CONFIG.AUTH.LOGIN);
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient(router: AppRouterInstance) {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient(router);
    return browserQueryClient;
  }
}
