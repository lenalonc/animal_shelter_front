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
import AdoptionDetails from "./components/adoptions/AdoptionDetails";
import Login from "./components/Login";
import "./css/Login.css";
import PetsAdopted from "./components/pets/PetsAdopted";
import { UserContextProvider } from "./components/context/UserContext";
import PetAdoptedDetails from "./components/pets/AdoptedPetDetails";
import LikedPets from "./components/pets/LikedPets";
import Admins from "./components/owners/Admins";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className="Shelter">
          <Navbar />
          <div className="body"></div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/" element={<Main />} />
            <Route path="owners" element={<OwnerPage />} />
            <Route path="owners/:id" element={<OwnerDetails />} />
            <Route path="owners/add" element={<OwnerAdd />} />
            <Route path="admins" element={<Admins />} />
            <Route path="adoptions" element={<AdoptionPage />} />
            <Route path="adoptions/add" element={<AdoptionAdd />} />
            <Route path="adoptions/:id" element={<AdoptionDetails />} />
            <Route path="pets" element={<PetPage />} />
            <Route path="pets/:id" element={<PetDetails />} />
            <Route path="pets/add" element={<PetAdd />} />
            <Route path="pets/adopted" element={<PetsAdopted />} />
            <Route path={"pets/adopted/:id"} element={<PetAdoptedDetails />} />
            <Route path={"pets/liked"} element={<LikedPets />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
