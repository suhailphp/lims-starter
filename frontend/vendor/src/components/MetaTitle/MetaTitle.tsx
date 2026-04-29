import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface MetaTitleProps {
  routes: any[];
  fallback?: string;
}

const MetaTitle: React.FC<MetaTitleProps> = ({ routes, fallback = 'Dreams AI Agent - Agent Builder Tailwind Admin Template' }) => {
  const location = useLocation();

  // Find matching route with improved path matching
  const findMatchingRoute = (pathname: string) => {
    // First try exact match
    let currentRoute = routes.find(route => route.path === pathname);
    
    // If no exact match, try to find a route that starts with the path
    if (!currentRoute) {
      currentRoute = routes.find(route => {
        // Handle dynamic routes and nested paths
        if (route.path.includes(':')) {
          // For dynamic routes, check if the path structure matches
          const routeSegments = route.path.split('/').filter(Boolean);
          const pathSegments = pathname.split('/').filter(Boolean);
          
          if (routeSegments.length === pathSegments.length) {
            return routeSegments.every((segment: string, index: number) => 
              segment.startsWith(':') || segment === pathSegments[index]
            );
          }
        }
        
        // For nested routes, check if pathname starts with route path
        return pathname.startsWith(route.path) && (route.path === '/' || pathname[route.path.length] === '/' || pathname.length === route.path.length);
      });
    }
    
    return currentRoute;
  };

  const currentRoute = findMatchingRoute(location.pathname);
  const title = currentRoute?.meta_title 
    ? `${currentRoute.meta_title} | Dreams AI Agent - Agent Builder Tailwind Admin Template`
    : fallback;

  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaTitle;
