import { Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  

const SearchAgent = () => {
    return (
        <div className="mb-4">
            <h5 className="mb-3 text-uppercase">Danh sách đại lý</h5>
            <div className="p-3 border rounded shadow-sm bg-white">
                <Row className="mb-3 align-items-center">
                    <Col md={2} className="text-md-end">
                        <Form.Label className="mb-0">Tài khoản:</Form.Label>
                    </Col>
                    <Col md={3}>
                        <Form.Control type="text" />
                    </Col>
                    <Col md={2} className="text-md-end">
                        <Form.Label className="mb-0">Trạng Thái:</Form.Label>
                    </Col>
                    <Col md={3}>
                        <Form.Select>
                            <option>Dropdown</option>
                            <option value="Active">Hoạt động</option>
                            <option value="Inactive">Ngừng hoạt động</option>
                        </Form.Select>
                    </Col>
                    <Col md={2}></Col>
                </Row>
                <Row className="align-items-center">
                    <Col md={2} className="text-md-end">
                        <Form.Label className="mb-0">Tên Đại Lý:</Form.Label>
                    </Col>
                    <Col md={7}>
                        <Form.Control type="text" />
                    </Col>
                    <Col md={3} className="text-end">
                        <Button variant="light" className="border border-dark w-100 fw-bold">Tìm Đại Lý</Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
export default SearchAgent;