import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../auth/useAuth.js";
import "./LoginForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = (event) => {
        event.preventDefault();
        if (userName === 'admin' && password === 'admin') {
            login();
        } else {
            alert('Sai tài khoản hoặc mật khẩu');
        }
    };
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '400px' }} className="shadow-sm border-dark">
                <Card.Body className="p-4">
                    <h3 className="text-center mb-4 ">Đăng Nhập</h3>
                    <Form>
                        <Form.Group className="mb-3 d-flex align-items-center" controlId="formBasicEmail">
                            <Form.Label className="me-2 mb-0" style={{ minWidth: '80px' }}>Tài khoản:</Form.Label>
                            <Form.Control type="text" placeholder="" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-4 d-flex align-items-center" controlId="formBasicPassword">
                            <Form.Label className="me-2 mb-0" style={{ minWidth: '80px' }}>Mật khẩu:</Form.Label>
                            <Form.Control type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <div className="d-grid gap-2 col-6 mx-auto">
                            <Button variant="light" className="border border-dark fw-bold login-btn" onClick={handleLogin} type="button">
                                Đăng Nhập
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;
