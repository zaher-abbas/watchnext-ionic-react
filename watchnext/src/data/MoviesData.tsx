export interface Movie {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    release_date: string;
    genre_ids: number[];
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string | null;
    backdrop_path: string | null;
    video: boolean;
    genre_names: string[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface MoviesResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
    dates: { minimum: string; maximum: string };
}

const language = 'en-US';
const API_TEKON= 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMTg1NDEzZDMyODE2OWRkMWIzZDdhODlkNmRjNjZhMSIsIm5iZiI6MTc1ODU1MTMwMi44NDMwMDAyLCJzdWIiOiI2OGQxNWQwNjU1MmQ2NmJjM2U3YTRiNGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-rHmKaU3Pe92r_aZPD6yCAmA0DZExax8zD8VLoTQAhM';
const TMDB_BASE = "https://api.themoviedb.org/3";
export const TMDB_IMG_BASE = "https://image.tmdb.org/t/p";

export const getUpcomingMovies = async (page: number): Promise<MoviesResponse | null> => {
    const url = `${TMDB_BASE}/movie/upcoming?language=${language}&page=${page}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TEKON}`
        }
    }
    try {
        const res = await fetch(url, options)
        return await res.json();

    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        return null;
    }
};

export const getMoviesGenresList = async (): Promise<Genre[] | null> => {
    const url = `${TMDB_BASE}/genre/movie/list?language=${language}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_TEKON}`
        }
    }
    try {
        const res = await fetch(url, options)
        const data = await res.json();
        return data.genres;
    }
    catch (error) {
        console.error('Error fetching movies genres:', error);
        return null;
    }
}