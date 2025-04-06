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

    getById: async (id: string) => {
        const { data } = await tmdbClient.get<TMDB.MovieDetails>(`/movie/${id}`)
        return data
    }
}