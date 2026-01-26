import { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { foodService } from "../../services/foodService";

const AgentDetail = ({ agent, onBack }) => {
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (agent && agent.id) {
      fetchFoodDetail();
    } else if (agent) {
      // Nếu agent đã có đầy đủ thông tin từ list
      setFood({
        ...agent,
        name: agent.name || agent.foodName,
        type: agent.type || agent.categoryName,
        price: agent.price || 0,
        quantity: agent.quantity || agent.stock || 0,
        expirationDate: agent.expirationDate || agent.expiredDate,
        manufacturer: agent.manufacturer || ''
      });
      setLoading(false);
    }
  }, [agent]);

  const fetchFoodDetail = async () => {
    try {
      setLoading(true);
      const foodData = await foodService.getById(agent.id);
      setFood({
        id: foodData.id,
        code: foodData.code,
        name: foodData.foodName,
        type: foodData.categoryName || '',
        price: foodData.price || 0,
        quantity: foodData.stock || 0,
        expirationDate: foodData.expiredDate ? new Date(foodData.expiredDate).toISOString().split('T')[0] : '',
        manufacturer: foodData.manufacturer || ''
      });
    } catch (error) {
      console.error('Error fetching food detail:', error);
      alert('Không thể tải thông tin chi tiết. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/food/edit/${food?.id || agent?.id}`);
  };

  if (loading) {
    return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  }

  if (!food) {
    return <div className="text-center py-4">Không tìm thấy thông tin thực phẩm.</div>;
  }

  return (
    <div>
      <h5 className="mb-4">Thông Tin Chi Tiết</h5>

      <Form>
        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Mã:</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
               value={food.code || ''}
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Tên:</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              value={food.name || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Loại:</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              value={food.type || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Giá (đ):</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              value={food.price ? food.price.toLocaleString('vi-VN') : ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Ngày hết hạn:</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              value={food.expirationDate || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Số lượng (kg):</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              value={food.quantity || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Nhà Sản Xuất:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              value={food.manufacturer || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12} className="d-flex gap-2">
            <Button variant="secondary" type="button" onClick={onBack}>
              Quay Lại
            </Button>
            <Button variant="primary" type="button" onClick={handleEdit}>
              Sửa
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AgentDetail;
