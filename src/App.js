import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Users from './components/Users';
import Buyers from './components/Buyers';
import Sellers from './components/Sellers';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Products from './components/Products';
import Catalogue from './components/Catalogue';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Industry from './components/Industry';
import Category from './components/Category';
import SubCategory from './components/SubCategory';
import Orders from './components/Orders';
import OrderDetails from './components/OrderDetails';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<NavBar />}>
            <Route path='/home' element={<Home />} />
            <Route path='/users' element={<Users />} />
            <Route path='/buyers' element={<Buyers />} />
            <Route path='/sellers' element={<Sellers />} />
            <Route path='/products' element={<Products />} />
            <Route path='/catalogue' element={<Catalogue />} />
            <Route path='/product/details/:productId' element={<ProductDetails />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/industries' element={<Industry />} />
            <Route path='/categories' element={<Category />} />
            <Route path='/subcategories' element={<SubCategory />} />
            <Route path='/orders/:orderId' element={<OrderDetails />} />
            <Route path='/orders' element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </ThemeProvider>
  );
}

export default App;
