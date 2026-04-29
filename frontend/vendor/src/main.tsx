import { StrictMode, useEffect } from "react";

import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";

import { store } from "./redux/store";

import { BrowserRouter } from "react-router-dom";

import AllRoutes from "./routes/router";
import LayoutDomSync from "./layout/LayoutDomSync";
import LayoutRouteSync from "./layout/LayoutRouteSync";

import "./assets/icons/@phosphor-icons/web/duotone/style.css";

import "./assets/icons/@phosphor-icons/web/regular/style.css";

import "./assets/icons/@phosphor-icons/web/fill/style.css";

import "./assets/icons/lucide-static/font/lucide.css";

import "./assets/css/style.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./index.css";

import { base_path } from "./environment";

import HSStaticMethods from "preline";

// Preline initialization component
const PrelineInitializer = () => {
  useEffect(() => {
    // Initialize Preline when component mounts
    HSStaticMethods.autoInit();
    
    // Re-initialize Preline when route changes or DOM updates
    const observer = new MutationObserver(() => {
      setTimeout(() => {
        HSStaticMethods.autoInit();
      }, 100);
    });
    
    // Observe the entire document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'data-hs-overlay']
    });
    
    // Cleanup observer on unmount
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return null;
};

createRoot(document.getElementById("root")!).render(

  <StrictMode>

    <Provider store={store}>

      <BrowserRouter basename={base_path}>

        <LayoutRouteSync />
        <LayoutDomSync />
        <AllRoutes />
        <PrelineInitializer />

      </BrowserRouter>

    </Provider>

  </StrictMode>,

);

