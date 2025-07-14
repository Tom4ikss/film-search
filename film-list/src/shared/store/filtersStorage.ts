// import type { MoviesFilter } from '@/entities/movie/model/movie'
// import { searchParamsToFilters } from '@/features/filters'
// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'


// interface FiltersStore {
//   filters: MoviesFilter,
//   settedFrom: 'store' | 'params',
//   setFilters: (f: MoviesFilter) => void
//   setFromParams: (p: URLSearchParams) => void
//   patchFilters: <TKey extends keyof MoviesFilter>(key: TKey, value: MoviesFilter[TKey]) => void
//   clearFilters: () => void
//   getFilters: () => MoviesFilter
// }

// export const useFiltersStore = create<FiltersStore>()(
//   persist(
//     (set, get) => ({
//       filters: {},
//       settedFrom: 'store',
//       setFilters: (filters: MoviesFilter) =>
//         set(() => ({
//           filters: filters,
//           settedFrom: 'store',
//         })),

//       setFromParams:  (params: URLSearchParams) => 
//         set(() => ({
//           filters: searchParamsToFilters(params),
//           settedFrom: 'params'
//         })),
//       patchFilters: <TKey extends keyof MoviesFilter>(key: TKey, value: MoviesFilter[TKey]) => 
//         set((state) => ({
//             filters: {
//                 ...state.filters,
//                 [key]: value,
//             },
//             settedFrom: 'store',
//         })),
//       clearFilters: () =>
//         set(() => ({
//             filters: {
                
//             }
//         })),
//       getFilters: () => 
//         get().filters
//     }),
//     {
//       name: 'movies-filter',
//     }
//   )
// )