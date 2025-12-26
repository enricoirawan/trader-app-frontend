import DashboardLayout from '@/components/DashboardLayout';
import { pages } from '@/constant';
import { Route, Routes } from 'react-router';
import { PrivateRoute } from './PrivateRoute';

const AppRouter = () => {
  const privatePages = pages.filter((page) => page.isPrivate);
  const publicPages = pages.filter((page) => !page.isPrivate);

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        {publicPages.map((page, index) => (
          <Route
            key={index}
            index={page.path === '/'}
            path={page.path}
            element={page.component}
          />
        ))}
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          {privatePages.map((page, index) => (
            <Route key={index} path={page.path} element={page.component} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
