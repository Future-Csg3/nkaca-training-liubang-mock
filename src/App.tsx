import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminRoute from './routes/admin/AdminRoute';
import AdminLoginForm from './routes/admin/components/AdminLoginForm';
import HomeRoute from "./routes/home/HomeRoute";
import StudyRoute from "./routes/study/StudyRoute";



import ChapterCreate from './routes/admin/components/ChapterCreate';

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomeRoute} />
          <Route path="/study" Component={StudyRoute} />
          <Route path='/admin' element={<AdminRoute />}>
            <Route index element={<></>} />
            <Route path='/admin/chapter-create' element={<ChapterCreate />} />
          </Route>
          <Route path="/admin/login" Component={AdminLoginForm} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;