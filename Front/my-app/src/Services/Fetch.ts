import { useEffect, useState } from "react";
import api from "./Api/api";

export default function useFetch<T>(endpoint: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await api.privateApi.get<T>(endpoint);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return {
    loading,
    data,
    error,
  };
}