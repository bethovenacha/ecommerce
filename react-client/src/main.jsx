import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Shop from './components/Shop/Shop.jsx';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import PageNotFound from './components/NotFound/ProductNotFound.jsx'
import Product from './components/Product/Product.jsx';
import Cart from './components/Cart/Cart.jsx';
import { Provider } from 'react-redux';
import store from './redux/store/index.js';
import NavBar from './components/Navbar/Navbar.jsx';

const router = createBrowserRouter([
  {path:"/",element:<App/>},
  {path:"/Shop",element:<Shop/>},
  {path:"/Product/:id",element:<Product/>},
  {path:"/Cart/:id",element:<Cart/>},
  {path:"*",element:<PageNotFound/>},
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <NavBar/>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
