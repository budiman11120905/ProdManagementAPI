import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import { ProtectedRoute } from './components/ProtectedRoute';

const App: React.FC = () => {
    const handleSubmit = (productData: any) => {
        console.log('Product submitted:', productData);
    };

    return (
        <Router>
            <AuthProvider>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">Product Management</Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="lg" sx={{ mt: 4 }}>
                    <Routes>
                        <Route path="/login" element={<Login />} />

                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<ProductList />} />
                            <Route
                                path="/products/new"
                                element={<ProductForm onSubmit={handleSubmit} />}
                            />
                            <Route
                                path="/products/edit/:id"
                                element={<ProductForm onSubmit={handleSubmit} />}
                            />
                        </Route>
                    </Routes>
                </Container>
            </AuthProvider>
        </Router>
    );
};

export default App;