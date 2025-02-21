import './App.css'
import Header from "./components/header/Header"
import Home from "./pages/Home"
import Footer from "./components/footer/Footer"
import FAQPage from "./pages/FAQPage"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./pages/Product"
import Cart from "./pages/Cart"
import Item from "./pages/Item"

function App() {

  return (
    <Router>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:parentId" element={<Product />} />
        <Route path="/category/:parentId/product/:itemId" element={<Item />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    <Footer />
    </Router>
    
  )
}

export default App
