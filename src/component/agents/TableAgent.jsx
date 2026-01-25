import { useState } from 'react';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const TableAgent = ({ onViewDetail }) => {

  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const agents = [
    {
      id: 1,
      code: 'DH001',
      type: "Thực Phẩm Chức Năng",
      name: "Thực Phẩm Chức Năng BV Gan",
      uses: "Hỗ trợ bảo vệ gan, tăng cường chức năng gan",
      manufacturer: "Công ty Dược ABC",
    },
    {
      id: 2,
      code: 'DH002',
      type: "",
      name: "Test",
      uses: "",
      manufacturer: "",
    }
  ];

  
  const _formatBalance = (balance) => {
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

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
              {/* <option value={50}>50</option> */}
            </Form.Select>
          </div>
        </Col>
        <Col md={6}>
          <span>Dược Phẩm</span>
        </Col>
        <Col md={4} className="text-end">
          <a href="#" className="text-decoration-none me-3">Previous</a>
          <a href="#" className="text-decoration-none">Next</a>
        </Col>
      </Row>

      {/* Table */}
      <Table bordered hover>
        <thead style={{ backgroundColor: '#e3f2fd' }}>
          <tr>
            <th>STT</th>
            <th>Mã</th>
            <th>Tên</th>
            <th>Loại</th>
            <th>Công Dụng</th>
            <th>Nhà SX</th>
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
                  {agent.code || `DH${String(agent.id).padStart(3, '0')}`}
                </a>
              </td>
              <td>{agent.name}</td>
              <td>{agent.type}</td>
              <td>{agent.uses || agent.congdung || ''}</td>
              <td>{agent.manufacturer || agent.nhasx || ''}</td>
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
              
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Bottom Section */}
      <div className="mt-3">
        <span>Hiển thị từ 0 đến 0 trên 0 dược phẩm (Show from 0 to 0 of 0 phamacies)</span>
      </div>
    </div>
  );
};

export default TableAgent;
