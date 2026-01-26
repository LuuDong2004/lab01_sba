import { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { categoryService } from '../../services/categoryService';

const SearchAgent = ({ onSearch }) => {
    const [searchData, setSearchData] = useState({
        categoryId: '',
        name: ''
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const data = await categoryService.getAll();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            // Map searchData với categoryId
            const filters = {
                name: searchData.name || '',
                categoryId: searchData.categoryId ? Number(searchData.categoryId) : null
            };
            onSearch(filters);
        }
    };

    return (
        <div className="mb-4">
            <h5 className="mb-3 text-uppercase">Danh Sách Thực Phẩm</h5>
            <div className="p-3 border rounded shadow-sm bg-white">
                <Form onSubmit={handleSearch}>
                    <Row className="mb-3 align-items-center">
                        <Col md={2} className="text-md-end">
                            <Form.Label className="mb-0">Loại:</Form.Label>
                        </Col>
                        <Col md={4}>
                            <Form.Select
                                name="categoryId"
                                value={searchData.categoryId}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                <option value="">Tất cả</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.categoryName}
                                    </option>
                                ))}
                            </Form.Select>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={2} className="text-md-end">
                            <Form.Label className="mb-0">Tên:</Form.Label>
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                type="text"
                                name="name"
                                value={searchData.name}
                                onChange={handleChange}
                                placeholder=""
                            />
                        </Col>
                        <Col md={2} className="text-end">
                            <Button variant="primary" type="submit">
                                Tìm
                            </Button>
                        </Col>
                        <Col md={2}> 
                         <Button
                            variant="primary"
                            onClick={() => navigate('/food/add')}
                            className="me-2"
                        >
                            Thêm Mới
                        </Button>
                        </Col>

                    </Row>
                </Form>
            </div>
        </div>
    );
};
export default SearchAgent;