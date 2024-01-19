import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Customer from "./Customer"
import Product from "./Product"
// import Login from "./Login"
import Shopping from "./Shopping"
import Home from "./Home"
import Reports from "./Reports"
// import MainPage from "./MainPage"
// import CreateUserForm from "./CreateUserForm"
// import CustomerTable from "./CustomerTable"
import "bootstrap/dist/css/bootstrap.min.css"
import Phone from "./Phone";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Checkout from "./Checkout";





function App() {
  return (
    
    
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MainPage />}></Route> */}
        {/* <Route path="/" element={<CreateUserForm />}></Route> */}
        <Route path="/" element={<Phone/>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/product" element={<Product />}></Route>
        <Route path="/shopping" element={<Shopping />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/reports" element={<Reports />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
