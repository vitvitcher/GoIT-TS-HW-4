import axios from "axios";
import type { Movie } from "../types/movie";

const url = 'https://api.themoviedb.org/3/search/movie?';
// const options = {
//     headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
//     }
// };

interface FetchedData {
    results: Movie[],
    total_pages: number,
}

export async function fetchMovies(query: string, page: number): Promise<FetchedData> {

    const results: FetchedData = (await axios.get<FetchedData>(url + `&query=${query}`, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
        },
        params: {
            query,
            page
        }
    })).data
    return results
}
