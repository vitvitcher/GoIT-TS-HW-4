import axios from "axios";
import type { Movie } from "../types/movie";

const url = 'https://api.themoviedb.org/3/search/movie?';
const options = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    }
};


export async function fetchMovies(query: string): Promise<Movie[]> {
    return (await axios.get(url + `&query=${query}`, options)).data.results
}
