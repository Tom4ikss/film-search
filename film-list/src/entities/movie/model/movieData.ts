import { type Movie } from '@/entities/movie/model/movie';
import { MOVIES_PAGE_LIMIT } from '@/shared/config';
import type { InfiniteData } from '@tanstack/react-query';

import type { InfiniteMovies } from '@/shared/api/movies';

export class MoviesData<T extends InfiniteMovies> {

    private data: InfiniteData<T> | undefined;
    private preloadPagesCount: number = 0;

    constructor(data: InfiniteData<T> | undefined) {
        this.data = data
    }

    hasData = (): boolean => this.data ? true : false;

    getMovie = (index: number): Movie | null => {
        if(!this.data) throw new Error('No data')
        const itemIndex = index%50
        const moviePageIndex = Math.trunc( index / 50 ) + 1
        const moviePage = this.data.pages[this.data.pageParams.indexOf(moviePageIndex)]
        if(!moviePage) return null
        return moviePage.items[itemIndex]
    }

    getRealItemsCount = (): number => {
        if(!this.data) throw new Error('No data')
        return this.data.pageParams.length-1 * MOVIES_PAGE_LIMIT + this.data.pages.at(-1)!.items.length //одна страница точно есть число элементов на последней может быть меньше 50
    }

    getPotentialItemsCount = (): number => {
        if(!this.data) throw new Error('No data')
        return (this.getLastPage()+this.preloadPagesCount-1) * MOVIES_PAGE_LIMIT + this.data.pages.at(-1)!.items.length //одна страница точно есть число элементов на последней может быть меньше 50
    }

    getLastPage = (): number => {
        if(!this.data) throw new Error('No data')
        return this.data.pageParams.at(-1) as number
    }

    getMissingPages = (): number[] => {
        if(!this.data) throw new Error('No data')

        const missingPages = []

        for(let i = 1; i < this.getLastPage(); i++) {
            if(!this.data.pageParams.includes(i)) {
                missingPages.push(i)
            }
        }

        return missingPages
    }

    hasGap = () => this.getMissingPages().length !== 0

    getGapStart = (): null | number => {
      const missing = this.getMissingPages();
      if(missing.length === 0) return null;
      return (missing[0]-1) * MOVIES_PAGE_LIMIT;
    }

    getGapEnd = (): null | number => {
      const missing = this.getMissingPages();
      if(missing.length === 0) return null;
      return (missing.at(-1)! * MOVIES_PAGE_LIMIT) - 1;
    }

    getPage = ( index: number ): number => {
      return Math.trunc( index / 50 ) + 1
    }

    preloadNextPage = (fetchPromise: Promise<any>) => {
        if(!this.data) throw new Error('No data')
        this.preloadPagesCount += 1
        fetchPromise.then(() => this.preloadPagesCount -= 1)
    }
}
