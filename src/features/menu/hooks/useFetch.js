import { useState, useEffect } from "react";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then((json) => {
        if (active) {
          setData(json);
          setError(null);
        }
      })
      .catch((err) => {
        // If connecting to external API fails (e.g., cold start, offline, CORS, or placeholder URL)
        // gracefully fall back to local menu.json so user interface functions smoothly
        if (url.includes("/api/menu")) {
          fetch("/menu.json")
            .then((r) => r.json())
            .then((fallbackData) => {
              if (active) {
                setData(fallbackData);
                setError(null);
              }
            })
            .catch(() => {
              if (active) setError(err.message);
            });
        } else {
          if (active) setError(err.message);
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [url]);

  return { data, isLoading, error };
}
