import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';

import './index.css';

import DashboardLayout from './components/DashboardLayout';
import { pages } from './constant';

document.documentElement.classList.add('dark');
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          {pages.map((page, index) => (
            <Route
              key={index}
              index={page.path === '/'}
              path={page.path}
              element={page.component}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
