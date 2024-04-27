import { BrowserRouter, Routes, Route } from 'react-router-dom';

import StudyRoute from "./routes/study/StudyRoute";
import AdminRoute from './routes/admin/AdminRoute';
import HomeRoute from "./routes/home/HomeRoute";
import AdminLoginForm from './routes/admin/components/AdminLoginForm';

const App: React.FC = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomeRoute} />
          <Route path="/study" Component={StudyRoute} />
          <Route path="/admin" Component={AdminRoute} />
          <Route path="/admin/login" Component={AdminLoginForm} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;