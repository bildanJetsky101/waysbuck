import Home from "./pages/Home";
import MyCart from './pages/Cart'
import {Route, Routes, useNavigate } from "react-router-dom";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";

import { useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
function App() {

  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext)
 
  useEffect(() => {
    // pengalihan halaman jika login berhasil maka akan bernilai true dan akan dialihkan ke halaman utama
    const checkAuth = () => {
    if (state.isLogin === false) {
       navigate('/')
    }
    
};
checkAuth();
},[state])

  return (
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/productDetail/:id' element={<ProductDetail/>}/>
          <Route path='/myCart/' element={<MyCart/>}/>
        </Routes>
  );
}

export default App;
