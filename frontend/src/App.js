import Layout from "./Components/layout";
import AddRecipe from "./Pages/AddRecipe";
import { Edit } from "./Pages/Edit";
import Login from "./Pages/Login";
import MainMenu from "./Pages/MainMenu";
import Signup from "./Pages/Signup";
import ProtectedRoute from "./Routes/ProtectedRoute";
import "./output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>

      <Routes>
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/menu" element={<MainMenu />} />
                  <Route path="/add" element={<AddRecipe />} />
                  <Route path="/edit" element={<Edit />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
