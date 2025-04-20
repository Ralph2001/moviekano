'use client'
import * as SWR from 'swr'

const useSWR = SWR.default

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useWeekTrendingTitles = (page = 1) => {
    const { data, error, isLoading } = useSWR(
        `/api/essentials/trending-week/`,
        fetcher,
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    )
    return {
        titles: data?.results as TMDBTypes.Trending[],
        isLoading,
        isError: error,
        totalPages: data?.total_pages,
        currentPage: data?.page,
    }
}

export const useDayTrendingTitles = (page = 1) => {
    const { data, error, isLoading } = useSWR(
        `/api/essentials/trending-day/`,
        fetcher,
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    )
    return {
        titles: data?.results as TMDBTypes.Trending[],
        isLoading,
        isError: error,
        totalPages: data?.total_pages,
        currentPage: data?.page,
    }
}

