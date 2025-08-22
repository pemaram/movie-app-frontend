import { useState, useEffect } from "react";
import useAxiosPrivate from "../authentication-hook/useAxiosPrivate";

const useMovieDataUpload = (formData) => {
  const [success, setSuccessValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    if (!formData) return;

    const apiCall = async () => {
      setLoading(true);
      setError(null);
      setSuccessValue(false);

      try {
        const response = await axiosPrivate.post(
          `${import.meta.env.VITE_BACKEND_URL}/web/movies/upsert`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status >= 200 && response.status < 300) {
          setSuccessValue(true);
          localStorage.setItem("userId" , response?.data?.userId)
        } else {
          throw new Error(`Unexpected response status: ${response.status}`);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    apiCall();
  }, [formData, axiosPrivate]);

  return { loading, error, success, setSuccessValue };
};

export default useMovieDataUpload;
