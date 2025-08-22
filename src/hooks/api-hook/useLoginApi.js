import { useState, useEffect } from "react";

const useLoginApi = (object) => {

  const [success, setSuccessValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responsePayload, setResponsePayload] = useState(null)

  useEffect(() => {
    if (!object) return;
    apiCall();
    setSuccessValue(false);
    setError(null);

  }, [object]);

  const apiCall = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(object),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      setSuccessValue(true);
      setResponsePayload(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return { loading, error, success, setSuccessValue, responsePayload };
}

export default useLoginApi