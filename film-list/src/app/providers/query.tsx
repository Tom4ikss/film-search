import { QueryClient, QueryClientProvider, type InfiniteData } from '@tanstack/react-query';
import { persistQueryClient, type PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import type { ReactNode } from 'react';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 60_1000 * 10,
      staleTime: 60_1000,
      retry: 1,
    },
  },
});

const localPersister = createSyncStoragePersister({
  storage: sessionStorage,
});

const persistOptions: PersistQueryClientOptions = {
  queryClient,
  persister: localPersister,
  maxAge: 24 * 60 * 60 * 1000,
  dehydrateOptions: {
    shouldDehydrateQuery: (query) => query.queryKey[0] === 'movies',
    serializeData: (data) => {

      const d = data as InfiniteData<any>

      if (!d?.pages || d.pages.length <= 3) return d;
      
      const current = [
        { pages: d.pages[d.pages.length-2], pageParams: d.pageParams[d.pageParams.length-2] }, 
        { pages: d.pages[d.pages.length-1], pageParams: d.pageParams[d.pageParams.length-1] },
      ]

      return {
        ...data,
        pages: [...current.map(inf_d => inf_d.pages)],
        pageParams: [...current.map(inf_d => inf_d.pageParams)],
      };
    },
  },
};

persistQueryClient(persistOptions)

export const QueryProvider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);