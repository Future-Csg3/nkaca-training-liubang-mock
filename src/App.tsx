import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeRoute from "./routes/home/HomeRoute";
import StudyLoginForm from './routes/study/components/StudyLoginForm';

import StudyRouter from "./routes/study/StudyRouter";

import AdminRoute from "./routes/admin/AdminRoute";

import ChapterCreate from "./routes/admin/components/ChapterCreate";
import ThemeSetting from "./routes/admin/components/ThemeSetting";

import StudyIndex from "./routes/study/components/StudyIndex";

import AdminLoginForm from "./routes/admin/components/AdminLoginForm";

import Landing, { SelectedChapter } from "./routes/study/components/Landing";

import ThemeCreate from "./routes/admin/components/ThemeCreate";

const App: React.FC = () => {

  // study reuter layout state
  const [selectedChapter, setSelectedChapter] = useState<SelectedChapter | null>(null);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomeRoute} />
          <Route path="/study" element={<StudyRouter props={{ handleChapterSelected: setSelectedChapter }} />} >
            <Route index Component={StudyIndex} />
            <Route path="/study/summary" element={<h1>summary</h1>} />
            <Route path="/study/chapter" element={<Landing props={{ selected: selectedChapter }} />} />
          </Route>
          <Route path="/study/login" Component={StudyLoginForm} />

          <Route path='/admin' element={<AdminRoute />}>
            <Route index element={<></>} />
            <Route path='/admin/chapter-create' element={<ChapterCreate />} />
            <Route path='/admin/theme-create' element={<ThemeCreate />} />
            <Route path='/admin/theme-setting' element={<ThemeSetting />} />
          </Route>
          <Route path="/admin/login" Component={AdminLoginForm} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;