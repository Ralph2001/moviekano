'use client'
import * as SWR from 'swr'

const useSWR = SWR.default

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const usePopularMovies = (page = 1) => {
    const { data, error, isLoading } = useSWR(
        `/api/movies/popular?page=${page}`,
        fetcher,
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    )
    return {
        movies: data?.results as TMDB.Movie[],
        isLoading,
        isError: error,
        totalPages: data?.total_pages,
        currentPage: data?.page,
    }
}
export const useTopRatedMovies = (page = 1) => {
    const { data, error, isLoading } = useSWR(
        `/api/movies/top-rated?page=${page}`,
        fetcher,
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    )
    return {
        movies: data?.results as TMDB.Movie[],
        isLoading,
        isError: error,
        totalPages: data?.total_pages,
        currentPage: data?.page,
    }
}
export const usePlayingNow = (page = 1) => {
    const { data, error, isLoading } = useSWR(
        `/api/movies/now-playing/?page=${page}`,
        fetcher,
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    )
    return {
        movies: data?.results as TMDB.Movie[],
        isLoading,
        isError: error,
        totalPages: data?.total_pages,
        currentPage: data?.page,
    }
}
export const useMovieId = (page = 1) => {
    const { data, error, isLoading } = useSWR(
        `/api/movies/now-playing/?page=${page}`,
        fetcher,
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    )
    return {
        movies: data?.results as TMDB.Movie[],
        isLoading,
        isError: error,
        totalPages: data?.total_pages,
        currentPage: data?.page,
    }
}

