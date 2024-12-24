import {
  MutationFunction,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";
import axiosClient from "@/api/axios-client";
import apiConfig from "@/constants/apiConfig";
import { injectVariablesToUrl } from "@/utilities";

type ApiKey = keyof typeof apiConfig;

interface UseQueryApiOptions<TData, TError>
  extends Omit<UseMutationOptions<TData, TError>, "mutationFn"> {
  pathVariables?: Record<string, any>;
}

function useMutationApi<TData = unknown, TError = unknown>(
  queryKey: ApiKey,
  options?: UseQueryApiOptions<TData, TError>
) {
  const { pathVariables: defaultPathVariables, ...option } = options ?? {};
  let url = apiConfig[queryKey].url;

  const requestOption = {
    ...apiConfig[queryKey].options,
  };

  // @ts-ignore
  const mutationFn: MutationFunction<TData, Record<string, any>> = (
    payload: Record<string, any>
  ) => {
    const { pathVariables: payloadVariables, ...payloadRest } = payload;
    const pathVariables = payloadVariables || defaultPathVariables;
    const apiPath = pathVariables
      ? injectVariablesToUrl(url, pathVariables)
      : url;

    return axiosClient.request({
      ...requestOption,
      url: apiPath,
      data: payloadRest,
    });
  };

  // @ts-ignore
  return useMutation<TData, TError, Record<string, any>>({
    mutationFn,
    ...option,
  });
}

export default useMutationApi;
