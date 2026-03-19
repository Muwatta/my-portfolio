// src/hooks/useInView.js
import { useState, useEffect, useRef } from "react";

export const useInView = (threshold = 0.2, triggerOnce = true) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return [ref, isInView];
};

export default useInView;
