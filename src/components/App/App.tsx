import { useEffect, useState } from 'react'
import './App.module.css'
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import { fetchMovies } from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import Pagination from '../Pagination/Pagination';



function App() {
  console.log("App rendered")
  const notify = () => toast.error('No movies found for your request.');


  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movies', query, currentPage],
    queryFn: () => fetchMovies(query, currentPage),
    enabled: query !== '',
    placeholderData: keepPreviousData,
  })

  const totalPages = data?.total_pages ?? 0;
  useEffect(() => {
    if (isSuccess && data.results.length == 0) {
      console.log(data.results)
      notify()
    }
  }, [data, isSuccess])


  const onMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const onModalClose = () => {
    setSelectedMovie(null)
  }
  const handleSearch = async (newQuery: string) => {
    setQuery(newQuery)
    setCurrentPage(1)
  }



  return (
    <>
      <SearchBar onSubmit={handleSearch}></SearchBar>
      <div>
        <Toaster />
      </div>
      {isSuccess && totalPages > 1 && (<Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage} />)}
      {isLoading && <Loader></Loader>}
      {isError && <ErrorMessage ></ErrorMessage>}
      {data && data.results.length > 0 && <MovieGrid onSelect={onMovieSelect} movies={data.results}></MovieGrid>}
      {selectedMovie && <MovieModal onClose={onModalClose} movie={selectedMovie}
      ></MovieModal>}
    </>
  )
}

export default App
