import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Shop from './components/Shop/Shop.jsx';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import PageNotFound from './components/NotFound/ProductNotFound.jsx'
import Product from './components/Product/Product.jsx';
import Cart from './components/Cart/Cart.jsx';
import { Provider } from 'react-redux';
import {store, persistor} from './redux/store/index.js';
import { PersistGate } from 'redux-persist/integration/react';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import PayPal from './components/Paypal/PayPal.jsx';
import Home from './components/home/home.jsx';
import PaypalErrorBoundary from './components/NotFound/PaypalErrorBoundary.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Shared layout with NavBar
    children: [
      { index: true, element: <Home /> }, // Home
      { path: 'Login', element: <Login /> },
      { path: 'Register', element: <Register /> },
      { path: 'ResetPassword', element: <ResetPassword /> },
      { path: 'Shop/:id', element: <Shop /> },
      { path: 'Product/:id', element: <Product /> },
      { path: 'Cart', element: <Cart /> },
      { path: 'PayPal', element: <PayPal />, errorElement:<PaypalErrorBoundary/>},
      { path: '*', element: <PageNotFound /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}/>
        </PersistGate>
      </Provider>
  </StrictMode>,
)
