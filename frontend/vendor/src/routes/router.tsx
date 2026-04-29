import { Route, Routes } from "react-router-dom";
import PublicLayout from "../layout/publicLayout";
import { aitoolRoutes, authRoutes, layoutPagesRoutes, publicRoutes } from "./router.link";
import AuthLayout from "../layout/authLayout";
import AitoolLayout from "../layout/aitoolLayout";
import MetaTitle from "../components/MetaTitle";
import LayoutPages from "../layout/layoutPages";

const AllRoutes = () => {
  // Combine all routes into a single array for MetaTitle
  const allRoutes = [...publicRoutes, ...authRoutes, ...aitoolRoutes];

  return (
    <>
      <MetaTitle routes={allRoutes} />
      <Routes>
        <Route element={<PublicLayout />}>
          {publicRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>

        <Route element={<AuthLayout />}>
          {authRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route element={<AitoolLayout />}>
          {aitoolRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
        <Route element={<LayoutPages />}>
          {layoutPagesRoutes.map((route, idx) => (
            <Route path={route.path} element={route.element} key={idx} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
