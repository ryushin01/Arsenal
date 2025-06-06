"use client";

import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "@app/AuthProvider";

type TRes = {
  code: string;
  data: any;
  msg: string;
};

function Providers({ children }: React.PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
      mutations: {
        throwOnError: true,
      },
    },
    mutationCache: new MutationCache({
      onError: () => {},
      onSuccess: (data) => {},
    }),
    queryCache: new QueryCache({
      onError: () => {},
      onSuccess: (data) => {},
    }),
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default Providers;
