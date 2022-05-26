import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from "./pages/Home";
import ClaimPage from "./pages/Claim";
import HowWork from "./pages/Claim/Howork";
import Navbar from "./component/Layout/Navbar";
import Footer from "./component/Layout/Footer";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      <div style={{ minHeight: "calc(100vh - 157px)", background: "#2C2F36" }}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
          <Route path="/Claim" element={<ClaimPage />}></Route>
          {/* <Route path="/Approve" element={<Approve />}></Route> */}
          <Route path="/How_work" element={<HowWork />}></Route>
        </Routes>
      </div>
      <Footer />
      <ToastContainer style={{ fontSize: '16px' }} theme='dark' />
    </div >
  );
}

export default App;
