import { Container, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../../auth/AuthContext.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { userService } from "../../services/userService";
import "./LoginForm.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError('');
        
        if (!userName.trim() || !password.trim()) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        try {
            setLoading(true);
            const userData = await userService.login(userName, password);
            
            if (userData) {
                // Lưu thông tin user vào context và localStorage
                login({
                    username: userData.username,
                    role: userData.role,
                    password: userData.password // Lưu để có thể dùng sau nếu cần
                });
                
                const from = location.state?.from?.pathname || "/";
                navigate(from, { replace: true });
            } else {
                setError('Sai tài khoản hoặc mật khẩu');
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response && error.response.status === 404) {
                setError('Sai tài khoản hoặc mật khẩu');
            } else {
                setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <Card style={{ width: '400px' }} className="shadow-sm border-dark">
                <Card.Body className="p-4">
                    <h3 className="text-center mb-4 ">Đăng Nhập</h3>
                    <Form onSubmit={handleLogin}>
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control 
                                type="text" 
                        
                                value={userName} 
                                onChange={(e) => {
                                    setUserName(e.target.value);
                                    setError('');
                                }}
                                disabled={loading}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <Form.Label>Mật khẩu:</Form.Label>
                            <Form.Control 
                                type="password" 
                            
                                value={password} 
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                disabled={loading}
                                required
                            />
                        </Form.Group>

                        <div className="d-grid gap-2 mb-3">
                            <Button 
                                variant="light" 
                                className="border border-primary fw-bold login-btn" 
                                onClick={handleLogin} 
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
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
