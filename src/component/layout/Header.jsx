import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const Header = ({ onLogout }) => {
    const { user } = useAuth();
    const username = user?.username || 'Admin';

    return (
        <Navbar bg="light" expand="lg" className="border-bottom">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="mx-auto">
                        <Navbar.Text className="fw-bold fs-5 text-dark">
                            Quản Lý Thực Phẩm
                        </Navbar.Text>
                    </Nav>
                    <Nav>
                        <Navbar.Text className="me-3">
                            Chào <strong>{username}</strong>
                        </Navbar.Text>
                        <Nav.Link onClick={onLogout} className="text-primary p-0 d-flex align-items-center">
                            Đăng xuất
                        </Nav.Link>
                        <div className="w-100"></div>
                        <Navbar.Text className="d-block w-100 text-end" style={{ fontSize: '0.85rem' }}>
                            Ngày: 26/01/2026
                        </Navbar.Text>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
