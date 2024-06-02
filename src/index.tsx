import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import ExampleCounter from './page/ExampleCounter';
import ExampleMarkDown from './page/ExampleMarkDown';
import './index.css';
import reportWebVitals from './reportWebVitals';

const URL = process.env.PUBLIC_URL;
const APP_NAME = "nkaca-training-liubang-mock";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/" + APP_NAME} Component={App}>
          <Route index element={<></>} />
          <Route path={"/" + APP_NAME + "/example1"} Component={ExampleCounter} />
          <Route path={"/" + APP_NAME + "/markdown"} Component={ExampleMarkDown} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
