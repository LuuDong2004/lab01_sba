import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { foodService } from '../../services/foodService';
import { categoryService } from '../../services/categoryService';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddAgentForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: '',
    foodName: '',
    categoryId: '',
    price: '',
    expiredDate: '',
    stock: '',
    manufacturer: ''
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [codeError, setCodeError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
      
      // Tự động chọn category đầu tiên nếu có
      if (data && data.length > 0 && !formData.categoryId) {
        setFormData(prev => ({
          ...prev,
          categoryId: String(data[0].id)
        }));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error khi user thay đổi mã
    if (name === 'code') {
      setCodeError('');
    }
  };

  const checkCodeExists = async (code) => {
    if (!code || !code.trim()) {
      return false;
    }
    
    try {
      const foods = await foodService.getAll();
      return foods.some(food => food.code && food.code.trim().toLowerCase() === code.trim().toLowerCase());
    } catch (error) {
      console.error('Error checking code:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCodeError('');
    
    // Validate mã không được rỗng
    if (!formData.code || !formData.code.trim()) {
      setCodeError('Mã sản phẩm không được để trống');
      return;
    }
    
    // Kiểm tra mã có trùng không
    const codeExists = await checkCodeExists(formData.code);
    if (codeExists) {
      setCodeError('Mã sản phẩm đã tồn tại');
      return; // Dừng lại, không submit và giữ nguyên form
    }

    try {
      setLoading(true);
      // Map formData sang format API
      const foodData = {
        code: formData.code,
        foodName: formData.foodName,
        categoryId: Number(formData.categoryId),
        price: Number(formData.price) || 0,
        stock: Number(formData.stock) || 0,
        expiredDate: formData.expiredDate ? new Date(formData.expiredDate).toISOString() : null,
        manufacturer: formData.manufacturer
      };

      await foodService.create(foodData);
      alert('Đã lưu thông tin thực phẩm thành công!');
      navigate('/food');
    } catch (error) {
      console.error('Error creating food:', error);
      // Kiểm tra xem có phải lỗi trùng mã từ backend không
      if (error.response) {
        const status = error.response.status;
        const errorMessage = error.response.data?.message || error.response.data || '';
        const errorString = typeof errorMessage === 'string' ? errorMessage.toLowerCase() : JSON.stringify(errorMessage).toLowerCase();
        
        if (status === 400 || status === 409) {
          // Kiểm tra các từ khóa liên quan đến mã trùng
          if (errorString.includes('code') || 
              errorString.includes('mã') || 
              errorString.includes('tồn tại') ||
              errorString.includes('duplicate') ||
              errorString.includes('exists') ||
              errorString.includes('already')) {
            setCodeError('Mã sản phẩm đã tồn tại');
            return; // Giữ nguyên form, không navigate
          }
        }
      }
      
      // Các lỗi khác
      alert('Có lỗi xảy ra khi lưu thực phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/food');
  };

  return (
    <div>
      <h5 className="mb-4">Thêm Mới Thực Phẩm</h5>
      
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
              onChange={handleChange}
              isInvalid={!!codeError}
              required
            />
            {codeError && (
              <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                {codeError}
              </Form.Control.Feedback>
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Tên:</Form.Label>
          </Col>
          <Col md={3}>
            <Form.Control
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              placeholder="<Tên Thực Phẩm>"
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Loại:</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              {/* <option value=""></option> */}
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
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
            <Form.Label className="fw-bold">Ngày hết hạn:</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="date"
              name="expiredDate"
              value={formData.expiredDate}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={2}>
            <Form.Label className="fw-bold">Số lượng (kg):</Form.Label>
          </Col>
          <Col md={2}>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              step="1"
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
              required
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12} className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Save'}
            </Button>
            <Button variant="secondary" type="button" onClick={handleBack} disabled={loading}>
              Quay Lại
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddAgentForm;
