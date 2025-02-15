import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./Components/Header";
import Marketplace from "./pages/Marketplace";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Marketplace" element={<Marketplace />} />
      </Routes>
    </BrowserRouter>
  );
}
