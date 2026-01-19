import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (event) => {
        event.preventDefault();
        if (userName === 'admin' && password === 'admin') {
            login({ username: userName, password: password });
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
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
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="" value={userName} onChange={(e) => setUserName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu:</Form.Label>
                            <Form.Control type="password" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <div className="d-grid gap-2 mb-3">
                            <Button variant="light" className="border border-primary fw-bold login-btn" onClick={handleLogin} type="button">
                                Đăng Nhập
                            </Button>
                        </div>
                        
                        <div className="text-center">
                            <span>Bạn quên mật khẩu? </span>
                            <a href="#" className="text-primary text-decoration-underline">Khôi phục</a>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default LoginPage;
