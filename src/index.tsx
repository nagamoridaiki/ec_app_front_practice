import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainPage from './MainPage'
import DetailPage from './DetailPage'
import CartPage from './CartPage'
import ProductRegistration from './ProductRegistration'
import SignIn from './SignIn'
import Login from './Login'
import MyPage from './MyPage'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <MainPage /> */}
    <MyPage />
  </React.StrictMode>
);

reportWebVitals();
