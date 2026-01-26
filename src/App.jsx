import { useState } from "react";
import LoginForm from "./component/auth/LoginForm.jsx";
import HomeLayout from "./component/layout/HomeLayout.jsx";
import AgentPage from "./component/agents/AgentPage.jsx";
import AddAgentForm from "./component/agents/AddAgentForm.jsx";
import EditAgentForm from "./component/agents/EditAgentForm.jsx";
import { useAuth } from "./auth/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRouter.jsx";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

function HomePage() {
  return (
    <div className="text-center" style={{ paddingTop: '100px' }}>
      <h4>Chào Mừng Bạn Đến Với Hệ Thống Quản Lý Thực Phẩm</h4>
    </div>
  );
}

function AgentPageWrapper() {
  const [selectedAgent, setSelectedAgent] = useState(null);

  if (selectedAgent) {
    return <AgentPage
      selectedAgent={selectedAgent}
      onViewDetail={setSelectedAgent}
      onBackDetail={() => setSelectedAgent(null)}
    />;
  }

  return <AgentPage
    selectedAgent={selectedAgent}
    onViewDetail={setSelectedAgent}
    onBackDetail={() => setSelectedAgent(null)}
  />;
}

function LoginPage() {
  const { isAuthenticated } = useAuth();
  const _navigate = useNavigate();
  const location = useLocation();

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  return <LoginForm />;
}

function AppLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <HomeLayout
      onLogout={handleLogout}
      onListAgent={() => navigate("/food")}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/food" element={<AgentPageWrapper />} />
        <Route path="/food/add" element={<AddAgentForm />} />
        <Route path="/food/edit/:id" element={<EditAgentForm key={location.pathname} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HomeLayout>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
