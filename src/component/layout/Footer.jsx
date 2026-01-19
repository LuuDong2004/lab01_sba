import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="mt-auto border-top bg-light py-3 small">
            <Container fluid>
                <Row>
                    <Col md={6}>
                        <div><strong>@2015, Bản Quyền Thuộc Công Ty Phamacy Inc</strong></div>
                        <div>Địa Chỉ: Khu Công Nghệ Cao Hòa Lạc</div>
                        <div>Liên Hệ: phamacy@com.vn</div>
                    </Col>
                    <Col md={6} className="text-md-end d-flex align-items-end justify-content-md-end">
                        <div>Giới Thiệu | Hỗ Trợ | Nghề Nghiệp</div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
