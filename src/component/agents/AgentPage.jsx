import { useState } from "react";
import SearchAgent from "./SearchAgent";
import TableAgent from "./TableAgent";
import AgentDetail from "./AgentDetail";

const AgentPage = ({ selectedAgent, onViewDetail, onBackDetail }) => {
  const [searchFilters, setSearchFilters] = useState({});

  const handleSearch = (filters) => {
    setSearchFilters(filters);
    // TODO: Implement search logic
    console.log('Search filters:', filters);
  };

  if (selectedAgent) {
    return <AgentDetail agent={selectedAgent} onBack={onBackDetail} />;
  }

  return (
    <>
      <SearchAgent onSearch={handleSearch} />
      <TableAgent onViewDetail={onViewDetail} searchFilters={searchFilters} />
    </>
  );
};

export default AgentPage;
