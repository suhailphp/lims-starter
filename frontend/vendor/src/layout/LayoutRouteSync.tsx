import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { resetLayout, setLayout } from "../redux/layoutSlice";
import { Path } from "../routes/path";
import type { AppLayoutMode } from "../redux/layoutDom";

const pathToLayout: Record<string, Exclude<AppLayoutMode, "default">> = {
  [Path.layoutMini]: "mini",
  [Path.layoutHoverview]: "hoverview",
  [Path.layoutHidden]: "hidden",
  [Path.layoutFullwidth]: "full-width",
  [Path.rtl]: "rtl",
  [Path.twoColumn]: "two-column",
};

/**
 * Dispatches layout actions from the current route so navigation updates Redux (and thus the DOM via LayoutDomSync).
 */
const LayoutRouteSync = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const mode = pathToLayout[pathname];
    if (mode) {
      dispatch(setLayout(mode));
    }if(Path.twoColumn){
      document.querySelectorAll(".sidebar-overlay.opened").forEach(el => {
  el.classList.remove("opened");
});
    }
     else {
      dispatch(resetLayout());
    }
    
  }, [dispatch, pathname]);

  return null;
};

export default LayoutRouteSync;
