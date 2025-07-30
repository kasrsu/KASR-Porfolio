import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook to track mouse position for interactive effects
 */
export const useMousePosition = (
  elementRef?: React.RefObject<HTMLElement>
): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      if (elementRef?.current) {
        // Get position relative to the element
        const rect = elementRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      } else {
        // Get position relative to the viewport
        setMousePosition({
          x: e.clientX,
          y: e.clientY
        });
      }
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [elementRef]);

  return mousePosition;
};
