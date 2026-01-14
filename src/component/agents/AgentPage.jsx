import SearchAgent from "./SearchAgent";
import TableAgent from "./TableAgent";
import AgentDetail from "./AgentDetail";

const AgentPage = ({ selectedAgent, onViewDetail, onBackDetail }) => {
  if (selectedAgent) {
    return <AgentDetail agent={selectedAgent} onBack={onBackDetail} />;
  }

  return (
    <>
      <SearchAgent />
      <TableAgent onViewDetail={onViewDetail} />
    </>
  );
};

export default AgentPage;
