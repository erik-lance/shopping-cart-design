import React from "react";
import { Container, Divider, Typography } from "@mui/material";

interface ShoppingCartProps {
    children: React.ReactNode;
}

/**
 * A wrapper for cart items.
 * @returns 
 */
const ShoppingCart: React.FC<ShoppingCartProps> = ({ children }) => {
    return (
        <Container className="bg-slate-300 p4">
            <Container className="flex justify-between">
                <Typography variant="h4" component="h1">
                    Shopping Cart
                </Typography>
                <Typography variant="h6" component="h2">
                    Price
                </Typography>
            </Container>

            <Divider />

            {/* Insert Items Here */}
            {children}

            {/* Subtotal float right */}
            <Divider />
            <Container className="flex justify-between">
                <Typography variant="h6" component="h2">

                </Typography>
                <Typography variant="h6" component="h2">
                    Subtotal (0 Items): $0.00
                </Typography>
            </Container>

        </Container>
    );
};

export default ShoppingCart;
