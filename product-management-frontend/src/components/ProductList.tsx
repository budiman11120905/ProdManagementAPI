import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../services/api';
import { Product } from '../models/Product';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const data = await getProducts();
            setProducts(data);
            setError(null);
        } catch (error: any) {
            console.error("Error loading products:", error);
            setError("Failed to load products");

            if (error.response?.status === 401) {
                alert('Session expired. Please login again.');
                logout();
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteProduct(id);
            await loadProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
            setError("Failed to delete product");

            if ((error as any).response?.status === 401) {
                logout();
                navigate('/login');
            }
        }
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <CircularProgress />
            </div>
        );
    }

    if (error) {
        return <Alert severity="error" sx={{ margin: '1rem' }}>{error}</Alert>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>{product.id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.description}</TableCell>
                            <TableCell>Rp.{product.price.toFixed(2)}</TableCell>
                            <TableCell>
                                <IconButton color="primary" onClick={() => { }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="error" onClick={() => handleDelete(product.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductList;