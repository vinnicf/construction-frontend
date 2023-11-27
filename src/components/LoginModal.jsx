import React, { useContext, useState, useEffect } from 'react';
import Modal from './Budget/Modal';
import AuthContext from '../AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginModal = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuth, login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoginError('');
        try {
            await login(username, password);
        } catch (error) {
            setLoginError('Usuário ou senha incorretos.');
        }
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);

    const isOpen = location.pathname === '/login';
    const handleClose = () => navigate(-1);
    const handleRedirectToRegister = () => window.location.href = 'https://orcamentor.com/usuario/planos';

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Login">
            <form onSubmit={handleLoginSubmit}>
                <div className="modal-body">
                    <div>
                        <label>Usuário:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Senha:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {loginError && <div className="alert alert-danger" role="alert">{loginError}</div>}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleRedirectToRegister}>
                        Não tem uma conta ainda? Cadastre-se
                    </button>
                    <button type="submit" className="btn btn-primary">Entrar</button>
                </div>
            </form>
        </Modal>
    );
};

export default LoginModal;
