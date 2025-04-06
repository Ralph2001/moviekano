declare namespace TMDB {
    interface Movie {
        id: number
        title: string
        poster_path: string | null
        release_date: string
        vote_average: number
        overview: string
        backdrop_path: string | null
    }
    interface MovieDetails extends Movie {
        budget: number
        genres: Genre[]
        homepage: string
        runtime: number
        tagline: string
        videos: {
            results: Video[]
        }
        status: string
        spoken_languages: Language[]
        production_companies: ProductionCompany[]
        popularity: number
        revenue: number
        vote_count: number
        original_language: string


    }

    interface PaginatedResponse<T> {
        page: number
        results: T[]
        total_pages: number
        total_results: number
    }
}