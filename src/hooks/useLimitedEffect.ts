import { useEffect, useRef } from 'react';

export const useLimitedEffect = (callback: () => void, dependencies: any[], limit: number) => {
  const countRef = useRef(0);

  useEffect(() => {
    if (countRef.current < limit) {
      callback();
      countRef.current += 1;
    }
  }, dependencies);
};