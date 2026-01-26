import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { foodService } from '../../services/foodService';
import { categoryService } from '../../services/categoryService';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditAgentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    code: '',
    foodName: '',
    categoryId: '',
    price: '',
    expiredDate: '',
    stock: '',
    manufacturer: ''
  });

  useEffect(() => {
    fetchFoodAndCategories();
  }, [id]);

  const fetchFoodAndCategories = async () => {
    try {
      setLoading(true);
      const [food, cats] = await Promise.all([
        foodService.getById(id),
        categoryService.getAll()
      ]);

      setCategories(cats);

      if (food) {
        setFormData({
          code: food.code ?? '',
          foodName: food.foodName ?? '',
          categoryId: food.categoryId ? String(food.categoryId) : '',
          price: food.price ? String(food.price) : '',
          expiredDate: food.expiredDate ? new Date(food.expiredDate).toISOString().split('T')[0] : '',
          stock: food.stock ? String(food.stock) : '',
          manufacturer: food.manufacturer ?? ''
        });
      }
    } catch (error) {
      console.error('Error fetching food:', error);
      alert('Không thể tải thông tin thực phẩm. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
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

      await foodService.update(id, foodData);
      alert('Đã cập nhật thông tin thực phẩm thành công!');
      navigate('/food');
    } catch (error) {
      console.error('Error updating food:', error);
      alert('Có lỗi xảy ra khi cập nhật thực phẩm. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    navigate('/food');
  };

  if (loading) {
    return <div className="text-center py-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div>
      <h5 className="mb-4">Sửa Thông Tin Thực Phẩm</h5>
      
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
              placeholder="(số nguyên)"
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
              placeholder="<Nhà Sản Xuất>"
              required
            />
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12} className="d-flex gap-2">
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Đang lưu...' : 'Save'}
            </Button>
            <Button variant="secondary" type="button" onClick={handleBack} disabled={saving}>
              Quay Lại
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default EditAgentForm;
