import axios from 'axios'


const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: process.env.TMDB_API_KEY,
    },
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add interceptors for error handling
tmdbClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject({
            status: error.response?.status || 500,
            message: error.response?.data?.status_message || 'API request failed',
        })
    }
)






export const moviesApi = {
    getById: async (id: number) => {
        const { data } = await tmdbClient.get<TMDBTypes.Movie>(`/movie/${id}`)
        return data
    },
    getMovieVideos: async (id: number) => {
        const { data } = await tmdbClient.get<TMDBTypes.PaginatedResponse<TMDBTypes.Video>>(`/movie/${id}/videos`)
        return data.results
    },
    getMovieSimilar: async (id: number) => {
        const { data } = await tmdbClient.get<TMDBTypes.PaginatedResponse<TMDBTypes.Movie>>(`/movie/${id}/similar`)
        return data.results

    },
    getMovieCredits: async (id: number) => {
        const { data } = await tmdbClient.get<TMDBTypes.MovieCredits>(`/movie/${id}/credits`)
        return data

    },
    getPopular: async (page = 1) => {
        const { data } = await tmdbClient.get<TMDB.PaginatedResponse<TMDB.Movie>>(
            '/movie/popular?language=en-US',
            { params: { page } }
        )
        return data
    },
    getTopRated: async (page = 1) => {
        const { data } = await tmdbClient.get<TMDB.PaginatedResponse<TMDB.Movie>>(
            '/movie/top_rated?language=en-US',
            { params: { page } }
        )
        return data
    },
    nowPlaying: async (page = 1) => {
        const { data } = await tmdbClient.get<TMDB.PaginatedResponse<TMDB.Movie>>(
            '/movie/now_playing?language=en-US',
            { params: { page } }
        )
        return data
    },

}

export const tvApi = {
    getById: async (id: number) => {
        const { data } = await tmdbClient.get<TMDBTypes.TV>(`/tv/${id}`)
        return data
    },
    getSimilarTvShow: async (id: number) => {
        const { data } = await tmdbClient.get<TMDB.PaginatedResponse<TMDBTypes.TVSimilar>>(`/tv/${id}/similar`)
        return data.results
    },
    getTvSeasonDetails: async (id: number, season_number: number) => {
        const { data } = await tmdbClient.get<TMDBTypes.TVSeasonDetails>(`/tv/${id}/season/${season_number}`)
        return data
    }
}

export const essentialApi = {
    getTrendingWeek: async (page = 1) => {
        const { data } = await tmdbClient.get<TMDBTypes.Trending>(
            '/trending/all/week?language=en-US',
        )
        return data
    },
    getTrendingDay: async (page = 1) => {
        const { data } = await tmdbClient.get<TMDBTypes.Trending>(
            '/trending/all/day?language=en-US',
        )
        return data
    },
}