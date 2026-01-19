import { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const SearchAgent = ({ onSearch }) => {
    const [searchData, setSearchData] = useState({
        type: '',
        name: ''
    });
    const navigate = useNavigate();

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
            onSearch(searchData);
        }
    };

    return (
        <div className="mb-4">
            <h5 className="mb-3 text-uppercase">Danh Sách Dược Phẩm</h5>
            <div className="p-3 border rounded shadow-sm bg-white">
                <Form onSubmit={handleSearch}>
                    <Row className="mb-3 align-items-center">
                        <Col md={2} className="text-md-end">
                            <Form.Label className="mb-0">Loại:</Form.Label>
                        </Col>
                        <Col md={4}>
                            <Form.Select
                                name="type"
                                value={searchData.type}
                                onChange={handleChange}
                            >
                                <option value="">Tất cả</option>
                                <option value="Thực Phẩm Chức Năng">Thực Phẩm Chức Năng</option>
                                <option value="Thuốc Kê Theo Đơn">Thuốc Kê Theo Đơn</option>
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
                            onClick={() => navigate('/phamacy/add')}
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