import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hashKey } from '@tanstack/query-core';
import stableStringify from 'fast-json-stable-stringify';

interface ScrollMeta {
  page: number;
  offset: number;
}

// лучше не смотреть сюда )
export const useScrollPersist = <
  TRef extends { scrollTo: (offset: number) => void },
>(
  props: object,
  prefix = 'movies',
) => {

  const makeHash = (p: object) => hashKey([p]);

  const hash = useMemo(() => makeHash(props), [stableStringify(props)]);
  const dataKey = `${prefix}_${hash}`;
  const ptrKey  = `${prefix}_current`;

useEffect(() => {
  const prevHash = sessionStorage.getItem(ptrKey);
  if (prevHash && prevHash !== hash) {
    sessionStorage.removeItem(`${prefix}_${prevHash}`);
  }
  sessionStorage.setItem(ptrKey, hash);
  setScroll(null);
}, [hash, ptrKey, prefix]);

  const save = useCallback(
    debounce((meta: ScrollMeta) => {
      sessionStorage.setItem(dataKey, JSON.stringify(meta));
    }, 200),
    [dataKey],
  );

  const restore = (): ScrollMeta => {
    try {
      return JSON.parse(sessionStorage.getItem(dataKey) ?? 'null') ?? {
        page: 1,
        offset: 0,
      };
    } catch {
      return { page: 1, offset: 0 };
    }
  };

  const clear = () => {
    sessionStorage.removeItem(dataKey);
    sessionStorage.removeItem(ptrKey);
  };

  const [scroll, setScroll] = useState<number | null>(null);
  const listRef = useRef<TRef>(null);

useEffect(() => {
  if (scroll === null) {
    const { offset } = restore();
    setScroll(offset);
  }
}, [dataKey, scroll]);

  useEffect(() => {
    if (scroll !== null && listRef.current) listRef.current.scrollTo(scroll);
  }, [scroll]);

  useEffect(() => () => save.flush?.(), [save]);

  return { listRef, save, restore, clear };
};
