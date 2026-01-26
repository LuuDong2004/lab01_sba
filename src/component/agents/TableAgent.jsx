import { useState, useEffect } from 'react';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import { foodService } from '../../services/foodService';
import 'bootstrap/dist/css/bootstrap.min.css';

const TableAgent = ({ onViewDetail, searchFilters }) => {

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    fetchFoods();
  }, [searchFilters]);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError(null);
      let foods = [];

      if (searchFilters.name && searchFilters.categoryId) {
        // Tìm kiếm theo cả tên và category
        foods = await foodService.searchByNameAndCategory(
          searchFilters.name,
          searchFilters.categoryId
        );
      } else if (searchFilters.name) {
        // Tìm kiếm theo tên
        foods = await foodService.searchByName(searchFilters.name);
      } else if (searchFilters.categoryId) {
        // Tìm kiếm theo category
        foods = await foodService.searchByCategory(searchFilters.categoryId);
      } else {
        // Lấy tất cả
        foods = await foodService.getAll();
      }

      // Map từ FoodDTO sang format component
      const mappedFoods = foods.map(food => ({
        id: food.id,
        code: food.code,
        name: food.foodName,
        type: food.categoryName || '',
        price: food.price || 0,
        quantity: food.stock || 0,
        expirationDate: food.expiredDate ? new Date(food.expiredDate).toISOString().split('T')[0] : '',
        manufacturer: food.manufacturer || '',
        categoryId: food.categoryId
      }));

      setAgents(mappedFoods);
    } catch (err) {
      console.error('Error fetching foods:', err);
      setError('Không thể tải dữ liệu. Vui lòng thử lại.');
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const _formatBalance = (balance) => {
    if (!balance) return '0';
    return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const emptyRows = Array.from({ length: Math.max(0, itemsPerPage - agents.length) }, (_, i) => i + agents.length + 1);

  if (loading) {
    return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-danger">{error}</div>;
  }

  const startIndex = 0;
  const endIndex = Math.min(agents.length, itemsPerPage);
  const displayedAgents = agents.slice(startIndex, endIndex);

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
          <span>Thực Phẩm</span>
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
            <th>Giá</th>
            <th>Nhà SX</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {displayedAgents.map((agent, index) => (
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
              <td>{_formatBalance(agent.price)}</td>
              <td>{agent.manufacturer || ''}</td>
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
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Bottom Section */}
      <div className="mt-3">
        <span>Hiển thị từ {startIndex + 1} đến {endIndex} trên {agents.length} thực phẩm (Show from {startIndex + 1} to {endIndex} of {agents.length} foods)</span>
      </div>
    </div>
  );
};

export default TableAgent;
