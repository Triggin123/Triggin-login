import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Login from './components/Login';
import './App.css';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route element={<NavBar />}>
            <Route path='/home' element={<Home />} />
            {/* <Route path='/groups' element={<Groups />} />
            <Route path='/users' element={<Users />} />
            <Route path='/questions' element={<Questions />} /> */}
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
