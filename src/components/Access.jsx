import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Access.css';

const Access = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            // Login logic
            const user = users.find(user => user.email === email && user.password === password);
            if (user) {
                setIsAuthenticated(true); // Set authenticated state
                navigate('/dashboard'); // Redirect to Dashboard
            } else {
                alert('Invalid email or password');
            }
        } else {
            // Signup logic
            const existingUser = users.find(user => user.email === email);
            if (!existingUser) {
                setUsers([...users, { email, password }]);
                alert('Signup successful! You can now log in.');
                setIsLogin(true); // Switch to login after successful signup
            } else {
                alert('Email already exists. Please log in.');
            }
        }
    };

    return (
        <div className="access-container">
            <div className="card">
                <h1>{isLogin ? 'Login' : 'Signup'}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
                </form>
                <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Switch to Signup' : 'Switch to Login'}
                </button>
            </div>
        </div>
    );
};

export default Access;
