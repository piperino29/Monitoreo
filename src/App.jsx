import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Embalaje from "./pages/Embalaje";
import Page from "./pages/404";
import Turbo from "./pages/Turbo";
import Dpf from "./pages/Dpf";
import Vehicular from "./pages/Vehicular";
import AdrianS from "./pages/AdrianS";
import AlvaroR from "./pages/AlvaroR";
import ArielS from "./pages/ArielS";
import JuanR from "./pages/JuanR";
import MiltonR from "./pages/MiltonR";
import PabloZ from "./pages/PabloZ";
import SergioP from "./pages/SergioP";
import Garantia from "./pages/Garantia";
import NavbarNav from "./components/NavBarNav";
import Bombas from "./pages/Bombas"
import Inyectores from "./pages/Inyectores";
function App() {
  return (
    <div className="content p-10 w-100">
      <NavbarNav />
      <Routes>
        <Route 
          path="/" 
          exact 
          element={<Home />} 
          errorElement={<Page />} 
        />
         <Route 
          path="/Bombas" 
          exact 
          element={<Bombas />} 
          errorElement={<Page />} 
        />
         <Route 
          path="/Inyectores" 
          exact 
          element={<Inyectores />} 
          errorElement={<Page />} 
        />
        <Route
          path="/Diesel"
          exact
          element={<Home />}
          errorElement={<Page />}
        />
        <Route
          path="/Embalaje"
          exact
          element={<Embalaje />}
          errorElement={<Page />}
        />
        <Route
          path="/Turbo"
          exact
          element={<Turbo />}
          errorElement={<Page />}
        />

        <Route 
          path="/DPF"
          exact element={<Dpf />} 
          errorElement={<Page />} 
        />
        <Route
          path="/Vehicular"
          exact
          element={<Vehicular />}
          errorElement={<Page />}
        />
         <Route
          path="/AdrianS"
          exact
          element={<AdrianS />}
          errorElement={<Page />}
        />
        <Route
          path="/ArielS"
          exact
          element={<ArielS/>}
          errorElement={<Page />}
        />
        <Route
          path="/AlvaroR"
          exact
          element={<AlvaroR />}
          errorElement={<Page />}
        />
          <Route
          path="/juanR"
          exact
          element={<JuanR />}
          errorElement={<Page />}
        />
          <Route
          path="/MiltonR"
          exact
          element={<MiltonR />}
          errorElement={<Page />}
        />
          <Route
          path="/PabloZ"
          exact
          element={<PabloZ/>}
          errorElement={<Page />}
        />
         <Route
          path="/SergioP"
          exact
          element={<SergioP/>}
          errorElement={<Page />}
        />
        <Route
          path="/Garantia"
          exact
          element={<Garantia />}
          errorElement={<Page />}
        />
        
      </Routes>
    </div>
  );
}

export default App;
