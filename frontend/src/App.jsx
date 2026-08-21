import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage";
import StampMyWork from "./Pages/StampMyWork";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Certificate from "./Pages/Certificate";
import Uploads from "./Pages/Uploads";
import Activity from "./Pages/Activity";
import Settings from "./Pages/Settings";

import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          {/* Landing Page */}
          <Route
            path="/"
            element={<LandingPage />}
          />

          {/* Stamp My Work Introduction */}
          <Route
            path="/stamp-my-work"
            element={<StampMyWork />}
          />

          {/* Login / Signup / Forgot Password */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* User Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Upload Page */}
          <Route
            path="/uploads"
            element={<Uploads />}
          />

          {/* Certificate Page */}
          <Route
            path="/certificate"
            element={<Certificate />}
          />

          {/* Activity Page */}
          <Route
            path="/activity"
            element={<Activity />}
          />

          {/* Settings Page */}
          <Route
            path="/settings"
            element={<Settings />}
          />

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;