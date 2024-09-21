import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth, Collection, About } from "@/layouts";

function App() {
  return (
    <Routes>
      <Route path="/collections/*" element={<Collection />} />
      <Route path="/explore/*" element={<Dashboard />} />
      <Route path="/about/*" element={<About />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/explore/home" replace />} />
    </Routes>
  );
}

export default App;
