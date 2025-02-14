import { Navigate, Route, Routes } from 'react-router';
import { Form, Item, List, NotFound } from './page';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/list' replace />} />
      <Route path='/list' element={<List />} />
      <Route path='/item/:id' element={<Item />} />
      <Route path='/form' element={<Form />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
export default App;
