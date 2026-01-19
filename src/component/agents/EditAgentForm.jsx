import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditAgentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock data - trong thực tế sẽ fetch từ API
  const mockPharmacy = [
    {
      id: 1,
      code: 'DH001',
      name: 'Thực Phẩm Chức Năng BV Gan',
      type: 'Thực Phẩm Chức Năng',
      price: '',
      uses: '',
      usageInstructions: '',
      manufacturer: 'Công ty Dược ABC'
    },
    {
      id: 2,
      code: 'DH002',
      name: 'Test',
      type: '',
      price: '',
      uses: '',
      usageInstructions: '',
      manufacturer: ''
    }
  ];

  const emptyForm = {
    code: '',
    name: '',
    type: '',
    price: '',
    uses: '',
    usageInstructions: '',
    manufacturer: ''
  };

  const [formData, setFormData] = useState(() => {
    const pharmacy = mockPharmacy.find(p => p.id === Number.parseInt(id ?? '', 10));
    if (!pharmacy) return emptyForm;
    return {
      code: pharmacy.code ?? '',
      name: pharmacy.name ?? '',
      type: pharmacy.type ?? '',
      price: pharmacy.price ?? '',
      uses: pharmacy.uses ?? '',
      usageInstructions: pharmacy.usageInstructions ?? '',
      manufacturer: pharmacy.manufacturer ?? ''
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý cập nhật dữ liệu
    console.log('Update pharmacy:', formData);
    alert('Đã cập nhật thông tin dược phẩm thành công!');
    navigate('/phamacy');
  };

  const handleBack = () => {
    navigate('/phamacy');
  };

  return (
    <div>
      <h5 className="mb-4">Sửa Thông Tin Dược Phẩm</h5>
      
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Mã:</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="text"
              name="code"
              value={formData.code}
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
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="<Tên Dược Phẩm>"
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Loại:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Danh sách (Thực Phẩm Chức Năng, Thuốc Kê Theo Đơn)</option>
              <option value="Thực Phẩm Chức Năng">Thực Phẩm Chức Năng</option>
              <option value="Thuốc Kê Theo Đơn">Thuốc Kê Theo Đơn</option>
            </Form.Select>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Giá (đ):</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              min="0"
              required
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
              name="uses"
              value={formData.uses}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Hướng dẫn sử dụng:</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Control
              as="textarea"
              rows={2}
              name="usageInstructions"
              value={formData.usageInstructions}
              onChange={handleChange}
              placeholder="<Hướng dẫn sử dụng>"
              required
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
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="<Nhà Sản Xuất>"
              required
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12} className="d-flex gap-2">
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="secondary" type="button" onClick={handleBack}>
              Quay Lại
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditAgentForm;
