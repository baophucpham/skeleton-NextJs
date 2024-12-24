import axiosClient from "@/api/axios-client";
import apiConfig from "@/constants/apiConfig";
import { injectVariablesToUrl, isEmpty } from "@/utilities";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";

interface UseQueryApiOptions<TData = unknown>
  extends Omit<UseQueryOptions<TData>, "queryKey" | "queryFn"> {
  pathVariables?: Record<string, any>;
  query?: Record<string, any>;
  axiosConfig?: AxiosRequestConfig;
}

function useQueryApi<TData = any>(
  queryKey: string,
  options?: UseQueryApiOptions<TData>
) {
  const { query, pathVariables, axiosConfig, ...option } = options ?? {};
  let url = apiConfig[queryKey].url;

  if (!isEmpty(query)) {
    url = `${url}?${new URLSearchParams(query).toString()}`;
  }

  if (!isEmpty(pathVariables)) {
    url = injectVariablesToUrl(url, pathVariables ?? {});
  }

  return useQuery({
    queryKey: [queryKey, url, JSON.stringify(axiosConfig)],
    queryFn: async (): Promise<TData> =>
      await axiosClient.request({ url, method: "GET", ...axiosConfig }),
    ...option,
  });
}

export default useQueryApi;
