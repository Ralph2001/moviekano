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
        original_title: string
        vote_average: number
    }
    interface TrendingDetails extends Movie {
        first_air_date: string | null
        name: string | null
        original_name: string | null
        original_title: string
        media_type: string
        adult: boolean
        original_language: string
        genre_ids: Genre[]
        popularity: number
        video: boolean
        vote_count: number
    }

    interface PaginatedResponse<T> {
        page: number
        results: T[]
        total_pages: number
        total_results: number
    }
}



declare namespace TMDBTypes {
    interface PaginatedResponse<T> {
        page: number
        results: T[]
        total_pages: number
        total_results: number
    }

    interface Genre {
        id: number;
        name: string;
    }

    interface ProductionCompany {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }

    interface ProductionCountry {
        iso_3166_1: string;
        name: string;
    }

    interface Language {
        iso_639_1: string;
        name: string;
    }

    interface Crew {
        adult: boolean;
        gender: number | null;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        credit_id: string;
        department: string;
        job: string;
    }

    interface Video {
        iso_639_1: string;
        iso_3166_1: string;
        name: string;
        key: string;
        site: string;
        size: number;
        type: string;
        official: boolean;
        published_at: string;
        id: string;
    }

    interface Creator {
        id: number;
        credit_id: string;
        name: string;
        gender: number | null;
        profile_path: string | null;
    }

    interface Episode {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: string | null;
        vote_average: number;
        vote_count: number;
    }

    interface Network {
        id: number;
        logo_path: string | null;
        name: string;
        origin_country: string;
    }

    interface Season {
        air_date: string | null;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string | null;
        season_number: number;
    }

    interface Movie {
        adult: boolean;
        backdrop_path: string | null;
        belongs_to_collection: object | null;
        budget: number;
        genres: Genre[];
        homepage: string | null;
        id: number;
        imdb_id: string | null;
        original_language: string;
        original_title: string;
        overview: string | null;
        popularity: number;
        poster_path: string | null;
        production_companies: ProductionCompany[];
        production_countries: ProductionCountry[];
        release_date: string;
        revenue: number;
        runtime: number | null;
        spoken_languages: Language[];
        status: string;
        tagline: string | null;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }

    interface MovieCredits {
        id: number;
        cast: Cast[];
        crew: Crew[];
    }

    interface Cast {
        adult: boolean;
        gender: number | null;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        cast_id: number;
        character: string;
        credit_id: string;
        order: number;
    }

    interface MovieVideos {
        id: number;
        results: Video[];
    }

    /**
     * Popular Movie, TV, People
     */

    interface Trending {
        adult: boolean;
        backdrop_path: string | null;
        id: number;
        title?: string; // Present for movies
        name?: string; // Present for TV shows and people
        original_language: string;
        original_title?: string; // Present for movies
        original_name?: string; // Present for TV shows and people
        overview: string | "";
        poster_path: string | null;
        media_type: string; //Type
        genre_ids: number[];
        popularity: number;
        release_date?: string; // Present for movies
        first_air_date?: string; // Present for TV shows
        video?: boolean; // Present for movies
        vote_average: number;
        vote_count: number;
    }

    /**
     * @TV_INTERFACE
     */
    interface TV {
        backdrop_path: string | null;
        created_by: Creator[];
        episode_run_time: number[];
        first_air_date: string;
        genres: Genre[];
        homepage: string | null;
        id: number;
        in_production: boolean;
        languages: string[];
        last_air_date: string;
        last_episode_to_air: Episode | null;
        name: string;
        networks: Network[];
        next_episode_to_air: Episode | null;
        number_of_episodes: number;
        number_of_seasons: number;
        origin_country: string[];
        original_language: string;
        original_name: string;
        overview: string | null;
        popularity: number;
        poster_path: string | null;
        production_companies: ProductionCompany[];
        production_countries: ProductionCountry[];
        seasons: TVSeasonDetails[];
        spoken_languages: Language[];
        status: string;
        tagline: string | null;
        type: string;
        vote_average: number;
        vote_count: number;
    }
    interface TVSeasonDetails {
        air_date: string | null;
        episode_count: number;
        id: number;
        name: string;
        overview: string | null;
        poster_path: string | null;
        season_number: number;
        vote_average: number;
    }
    interface TVEpisodes {
        air_date: string;
        episode_number: number;
        id: number;
        name: string;
        overview: string;
        production_code: string;
        runtime: number | null;
        season_number: number;
        show_id: number;
        still_path: string | null;
        vote_average: number;
        vote_count: number;
    }
    interface TVSimilar {
        adult: boolean;
        backdrop_path: string | null;
        genre_ids: number[];
        id: number;
        origin_country: string[];
        original_language: string;
        original_name: string;
        overview: string | null;
        popularity: number;
        poster_path: string | null;
        first_air_date: string;
        name: string;
        vote_average: number;
        vote_count: number;
    }
}