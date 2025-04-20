'use client'
import * as SWR from 'swr'

const useSWR = SWR.default

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export const useSimilarTvShow = (page = 1) => {
    const { data, error, isLoading } = useSWR(
        `/api/tv/similar?page=${page}`,
        fetcher,
        {
            revalidateOnFocus: false,
            keepPreviousData: true,
        }
    )
    return {
        similar: data?.results as TMDBTypes.TVSimilar[],
        isLoading,
        isError: error,
        totalPages: data?.total_pages,
        currentPage: data?.page,
    }
}
