import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AgentDetail = ({ agent, onBack }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/phamacy/edit/${agent.id}`);
  };

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
              value={agent.code || `DH${String(agent.id).padStart(3, '0')}` || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Tên:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              value={agent.name || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Loại:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              type="text"
              value={agent.type || ''}
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
              value={agent.price || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Công dụng:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              as="textarea"
              rows={1}
              value={agent.uses || agent.congdung || ''}
              readOnly
              className="bg-light"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Cách sử dụng:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              as="textarea"
              rows={2}
              value={agent.usageInstructions || agent.cachSuDung || ''}
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
              value={agent.manufacturer || agent.nhasx || ''}
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
