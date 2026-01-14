import { useState } from 'react';
import { Row, Col, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TableAgent = ({ onViewDetail }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const agents = [
    {
      id: 1,
      email: "thanhhv@gmail.com",
      name: "Nguyen Van Thanh",
      address: "Số 35, Xuân Đỉnh, HN",
      status: "Mới",
      registerDate: "20-01-2015",
      balance: 33000,
    },
    {
      id: 2,
      email: "donglv@gmail.com",
      name: "Luu Van Dong",
      address: "Hoa Lac, HN",
      status: "Mới",
      registerDate: "14-01-2026",
      balance: 83000,
    }
  ];

  // Format balance with dots (e.g., 33000 -> 33.000)
  const formatBalance = (balance) => {
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Create empty rows to fill the table
  const emptyRows = Array.from({ length: itemsPerPage - agents.length }, (_, i) => i + agents.length + 1);

  return (
    <div>
      {/* Top Section */}
      <Row className="mb-3 align-items-center">
        <Col md={2}>
          <div className="d-flex align-items-center">
            <span className="me-2">Hiển thị:</span>
            <Form.Select 
              style={{ width: 'auto' }} 
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Form.Select>
          </div>
        </Col>
        <Col md={8}>
          <span>Đại Lý</span>
        </Col>
        <Col md={2} className="text-end">
          <a href="#" className="text-decoration-none me-3">Previous</a>
          <a href="#" className="text-decoration-none">Next</a>
        </Col>
      </Row>

      {/* Table */}
      <Table bordered hover>
        <thead style={{ backgroundColor: '#e3f2fd' }}>
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Tên Đại Lý</th>
            <th>Địa Chỉ</th>
            <th>Trạng Thái</th>
            <th>Ngày Đăng Ký</th>
            <th>Số Dư Tài Khoản</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <tr key={agent.id} style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
              <td>{index + 1}</td>
              <td>
                <a 
                  href="#" 
                  className="text-primary text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    onViewDetail(agent);
                  }}
                >
                  {agent.email}
                </a>
              </td>
              <td>{agent.name}</td>
              <td>{agent.address}</td>
              <td>{agent.status}</td>
              <td>{agent.registerDate}</td>
              <td>{formatBalance(agent.balance)}</td>
              <td>
                <a 
                  href="#" 
                  className="text-primary text-decoration-none"
                  onClick={(e) => {
                    e.preventDefault();
                    onViewDetail(agent);
                  }}
                >
                  Xem Chi Tiết
                </a>
              </td>
            </tr>
          ))}
          {emptyRows.map((rowNum) => (
            <tr key={rowNum} style={{ backgroundColor: rowNum % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
              <td>{rowNum}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Bottom Section */}
      <div className="mt-3">
        <span>Hiển thị từ 0 đến 0 trên 0 đại lý (Show from 0 to 0 of 0 agents)</span>
      </div>
    </div>
  );
};

export default TableAgent;
