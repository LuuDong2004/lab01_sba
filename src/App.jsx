import { useState } from "react";
import LoginForm from "./component/auth/LoginForm.jsx";
import HomeLayout from "./component/layout/HomeLayout.jsx";
import AgentPage from "./component/agents/AgentPage.jsx";
import { useAuth } from "./auth/useAuth.js";

function App() {
  const { isAuthenticated, logout } = useAuth();

  // ===== STATE ĐIỀU HƯỚNG =====
  const [currentView, setCurrentView] = useState("HOME"); // HOME | AGENT
  const [selectedAgent, setSelectedAgent] = useState(null);

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <HomeLayout
      onLogout={logout}
      onListAgent={() => {
        setCurrentView("AGENT");
        setSelectedAgent(null); // reset detail khi quay lại
      }}
    >
      {/* ===== NỘI DUNG CHÍNH ===== */}
      {currentView === "HOME" && (
        <div>
          {/* Trang chủ hiện tại trống đúng theo mockup */}
        </div>
      )}

      {currentView === "AGENT" && (
        <AgentPage
          selectedAgent={selectedAgent}
          onViewDetail={setSelectedAgent}
          onBackDetail={() => setSelectedAgent(null)}
        />
      )}
    </HomeLayout>
  );
}

export default App;
