import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Top from './pages/Top'
import DetailPage from './pages/ec/detailPage/DetailPage'
import CartPage from './pages/ec/cartPage/CartPage'
import ProductRegistration from './pages/ec/productRegistrationPage/ProductRegistration'
import SignIn from './pages/users/signInPage/SignIn'
import Login from './pages/users/loginPage/Login'
import MyPage from './pages/users/myPage/MyPage'
import reportWebVitals from './reportWebVitals';
import { ProductProvider } from './contexts/productContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProductProvider>
      <Top />
    </ProductProvider>
  </React.StrictMode>
);

reportWebVitals();
