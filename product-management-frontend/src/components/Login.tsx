import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TextField, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(credentials, () => {
                navigate('/'); 
            });
        } catch (error) {
            console.error("Login error:", error);
            alert(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default Login;