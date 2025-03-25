import React, { useState } from 'react';
import { Product } from '../models/Product';
import { TextField, Button, Stack, Box } from '@mui/material';

interface ProductFormProps {
    product?: Product;
    onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit }) => {
    const [formData, setFormData] = useState<Product>(product || {
        id: 0,
        name: '',
        description: '',
        price: 0,
        createdAt: new Date()
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) : value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Stack spacing={2}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                />
                <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    inputProps={{ step: "0.01" }}
                    fullWidth
                />
                <Button type="submit" variant="contained" color="primary">
                    {product ? 'Update' : 'Create'} Product
                </Button>
            </Stack>
        </Box>
    );
};

export default ProductForm;