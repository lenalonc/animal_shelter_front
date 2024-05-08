import logo from "./logo.svg";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Main from "./components/Main";
import "./css/Main.css";
import Footer from "./components/Footer";
import "./css/Owner.css";
import "./css/Pet.css";
import OwnerPage from "./components/owners/OwnerPage";
import OwnerAdd from "./components/owners/OwnerAdd";
import OwnerDetails from "./components/owners/OwnerDetails";
import AdoptionPage from "./components/adoptions/AdoptionPage";
import AdoptionAdd from "./components/adoptions/AdoptionAdd";
import PetPage from "./components/pets/PetPage";
import PetDetails from "./components/pets/PetDetails";
import PetAdd from "./components/pets/PetAdd";
import "./css/Adoption.css";

function App() {
  return (
    <BrowserRouter>
      <div className="Shelter">
        <Navbar />
        <div className="body"></div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="owners" element={<OwnerPage />} />
          <Route path="owners/:id" element={<OwnerDetails />} />
          <Route path="owners/add" element={<OwnerAdd />} />
          <Route path="adoptions" element={<AdoptionPage />} />
          <Route path="adoptions/add" element={<AdoptionAdd />} />
          <Route path="pets" element={<PetPage />} />
          <Route path="pets/:id" element={<PetDetails />} />
          <Route path="pets/add" element={<PetAdd />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
