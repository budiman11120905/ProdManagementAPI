export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    createdAt: string | Date;  
}


export const mockProducts: Product[] = [
    {
        id: 1,
        name: "Laptop",
        description: "High performance gaming laptop",
        price: 1200,
        createdAt: new Date()
    },
    {
        id: 2,
        name: "Smartphone",
        description: "Latest model with 128GB storage",
        price: 800,
        createdAt: new Date()
    }
];