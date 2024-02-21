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
        // remove "bg-white" when setting up theme
        <Container className="bg-white p-5">
            <Typography variant="h4" component="h1">
                Shopping Cart
            </Typography>
            {/* remove "text-[#565959]" when setting up theme */}
            <Typography variant="body2" component="h2" className="flex justify-end -mt-2 text-[#565959]">
                Price
            </Typography>

            {React.Children.count(children) > 0 ? (
                React.Children.map(children, (child) => (
                    <>
                        <Divider />
                        {child}
                    </>
                ))
            ) : (
                <>
                    <Divider />
                    <Typography variant="body1" component="div" className="flex justify-center items-center">
                        No items in cart
                    </Typography>
                </>
            )}

            <Divider />

            <Typography variant="body1" component="h2" className="flex justify-end text-lg leading-6">
                Subtotal (0 Items):  <span className="font-bold pl-1">$0.00</span>
            </Typography>

        </Container>
    );
};

export default ShoppingCart;
