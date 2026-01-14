import React from "react";
import { Container, Nav } from "react-bootstrap";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";  
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeLayout = ({ children, onLogout, onListAgent, showSidebar = true }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header onLogout={onLogout} />

            {showSidebar && (
                <div className="bg-light border-bottom">
                    <Container fluid>
                        <Nav variant="underline" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link href="#" active>Trang Chủ</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#" onClick={onListAgent}>Quản Lý Đại Lý</Nav.Link>
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