import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const useRememberSearchParams = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isRestored, setIsRestored] = useState(false);

  useLayoutEffect(() => {
    // Если URL пустой — восстанавливаем параметры из localStorage
    if (searchParams.size !== 0) {
      setIsRestored(true);
      return;
    }

    const raw = localStorage.getItem(`search_${location.pathname}`);

    if (!raw) {
      localStorage.removeItem(`search_${location.pathname}`);
      setIsRestored(true);
      return;
    }

    const parsed = new URLSearchParams(raw);

    setSearchParams(parsed);
    localStorage.removeItem(`search_${location.pathname}`);
  }, [location.pathname, searchParams]);

  useEffect(() => {
    if (location.search !== "" && !isRestored) {
      console.log(location.search);
      setIsRestored(true);
    }
  }, [location.search]);

  useEffect(() => {
    return () => {
      localStorage.setItem(
        `search_${location.pathname}`,
        searchParams.toString(),
      );
    };
  }, [location.pathname, searchParams]);

  return isRestored;
};
