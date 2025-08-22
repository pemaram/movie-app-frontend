import { useEffect, useState } from "react";
import useAxiosPrivate from "../authentication-hook/useAxiosPrivate";
import useAuth from "../authentication-hook/useAuth";

const useMovieDataFetch = () => {
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [movies, setMovies] = useState([]);
  const [page, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const userId = auth?.id || localStorage.getItem("userId")

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLimit(10);
  };

  useEffect(() => {
    apiCall();
  }, [page]);

  const apiCall = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.get(
        `${import.meta.env.VITE_BACKEND_URL}/web/movies/paginated?page=${page}&limit=${limit}&userId=${userId}`
      );
      setMovies(response?.data);
    } catch (error) {
      setError(error.message || "Something Went Wrong!")
    } finally {
      setLoading(false);
    }
  };


  return {
    movies, loading, page, handlePageChange, limit, error
  }
};

export default useMovieDataFetch