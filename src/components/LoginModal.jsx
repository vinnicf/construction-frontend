// LoginModal.js
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(username, password);
            // Close modal and/or redirect user
        } catch (error) {
            // Handle login error
        }
    };

    useEffect(() => {
        if (isAuth) {
            navigate('/'); // or your desired authenticated route
        }
    }, [isAuth, navigate]);

    // The modal is considered open if the current path is '/login'
    const isOpen = location.pathname === '/login';

    const handleClose = () => {
        navigate(-1); // This will close the modal by navigating back in history
    };



    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Login">
            <div className="modal-body">
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <div className="modal-footer">

                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Login</button>
            </div>
        </Modal>
    );
};

export default LoginModal;