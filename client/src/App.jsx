// eslint-disable-next-line no-unused-vars
import { Home, AccessoriesPage, Cart, LaptopsPage, ProductDetailsPage } from "./components/Main";
import { ProductPage } from "./components/ProductPage";
import { SignIn } from "./components/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <Router>
      {/* Background */}
      <div className="overflow-x-hidden antialiased">
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div></div>

        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/laptops" element={<LaptopsPage />}></Route>
          <Route path="/accessories" element={<AccessoriesPage />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/product-page/:productId" element={<ProductDetailsPage />}></Route>
        </Routes>
      </div>
    </Router>




  )
}