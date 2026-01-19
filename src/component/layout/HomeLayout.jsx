import React from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";  
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeLayout = ({ children, onLogout, showSidebar = true }) => {
    const location = useLocation();

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header onLogout={onLogout} />

            {showSidebar && (
                <div className="bg-light border-bottom">
                    <Container fluid>
                        <Nav variant="underline" activeKey={location.pathname}>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/" end>Trang Chủ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={NavLink} to="/phamacy">Danh Sách Dược Phẩm</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </div>
            )}

            <main className="flex-grow-1 py-4">
                <Container fluid>
                    {children}
                </Container>
            </main>

            <Footer />
        </div>
    );
};
export default HomeLayout;  