import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../components";
import { LoginScreen, RegisterScreen, HomeScreen, NotFound } from "../screens";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={
          <PrivateRoute>
            <HomeScreen />
          </PrivateRoute>
        } />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;