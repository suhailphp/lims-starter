import { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectActiveLayout } from "../redux/layoutSlice";
import { applyDocumentLayout, clearDocumentLayout } from "../redux/layoutDom";

/**
 * Applies `data-layout` on `<html>` and layout classes on `<body>` from Redux layout state.
 */
const LayoutDomSync = () => {
  const activeLayout = useAppSelector(selectActiveLayout);

  useEffect(() => {
    if (activeLayout === "default") {
      clearDocumentLayout();
      return;
    }
    applyDocumentLayout(activeLayout);
  }, [activeLayout]);

  return null;
};

export default LayoutDomSync;
