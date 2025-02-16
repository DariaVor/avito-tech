import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Loader } from './components/shared';
import { ToastContainer } from 'react-toastify';

const List = lazy(() => import('./page/List'));
const Item = lazy(() => import('./page/Item'));
const Form = lazy(() => import('./page/Form'));
const NotFound = lazy(() => import('./page/NotFound'));

const App: React.FC = () => (
  <>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<Navigate to='/list' replace />} />
        <Route path='/list' element={<List />} />
        <Route path='/item/:id' element={<Item />} />
        <Route path='/form/:id?' element={<Form />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
    <ToastContainer position="top-right" autoClose={3000} />
  </>
);

export default App;
