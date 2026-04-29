// useDropdown.ts
import { useCallback, useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggle = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const isOpen = (id: string) => activeId === id;

  const close = useCallback(() => {
    setActiveId(null);
  }, []);

  // Outside click closes this menu. Use capture so this still runs when another
  // dropdown's trigger calls stopPropagation() (bubble never reaches document).
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;

      if (!containerRef.current.contains(e.target as Node)) {
        setActiveId(null);
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, []);

  return { activeId, toggle, isOpen, containerRef, close };
};