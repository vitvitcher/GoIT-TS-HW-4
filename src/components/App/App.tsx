import { useState } from 'react'
import './App.module.css'
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';



function App() {
  console.log("App rendered")
  const notify = () => toast.error('No movies found for your request.');

  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0])


  const onMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
    setModalOpen(true)
  }

  const onModalClose = () => {
    setModalOpen(false)
  }
  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true)
      const fetchedMovies: Movie[] = await fetchMovies(query)
      if (fetchedMovies.length == 0) {
        notify()
      } else {
        setMovies(fetchedMovies)
      }


      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsError(true)
    }
    finally {
      setIsLoading(false)
    }


  }

  return (
    <>
      <SearchBar onSearch={handleSearch}></SearchBar>

      <div>
        <Toaster />
      </div>
      {isLoading && <Loader></Loader>}
      {isError && <ErrorMessage ></ErrorMessage>}
      {movies.length > 0 && <MovieGrid onSelect={onMovieSelect} movies={movies}></MovieGrid>}
      {modalOpen && <MovieModal onClose={onModalClose} movie={selectedMovie}
      ></MovieModal>}
    </>
  )
}

export default App
