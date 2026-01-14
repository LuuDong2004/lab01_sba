import { Button } from "react-bootstrap";

const AgentDetail = ({ agent, onBack }) => {
  return (
    <div>
      <h5 className="mb-4">Thông Tin Chi Tiết</h5>

      <p><b>Tên đại lý:</b> {agent.name}</p>
      <p><b>Email:</b> {agent.email}</p>
      <p><b>Địa chỉ:</b> {agent.address}</p>
      <p><b>Trạng thái:</b> {agent.status}</p>
      <p><b>Số dư (đ):</b> {agent.balance.toLocaleString()}</p>
      <p><b>Ngày đăng ký:</b> {agent.registerDate}</p>

      <Button variant="light" onClick={onBack}>
        Quay Lại
      </Button>
    </div>
  );
};

export default AgentDetail;
