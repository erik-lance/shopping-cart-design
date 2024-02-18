import React from "react";
import { Container, Divider, Typography } from "@mui/material";
import { Grid } from "@mui/material";

interface ShoppingCartProps {
    children: React.ReactNode;
}

/**
 * A wrapper for cart items.
 * @returns 
 */
const ShoppingCart: React.FC<ShoppingCartProps> = ({ children }) => {
    return (
        children
    );
};

export default ShoppingCart;
