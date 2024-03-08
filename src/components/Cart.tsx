import React from "react";
import { Container, Divider, Typography } from "@mui/material";

interface ShoppingCartProps {
  children: React.ReactNode;
  quantities: { [id: number]: number };
  prices: { [id: number]: number };
}

/**
 * A wrapper for cart items.
 * @returns
 */
const ShoppingCart: React.FC<ShoppingCartProps> = ({
  children,
  quantities,
  prices,
}) => {
  const totalQuantity: number = Object.values(quantities).reduce(
    (total: number, quantity: number) => total + quantity,
    0,
  );

  const totalPrice: number = Object.entries(quantities).reduce(
    (total: number, [id, quantity]: [string, number]) =>
      total + quantity * prices[Number(id)],
    0,
  );

  return (
    // Cart items container
    <Container className="shopping-cart-container">
      <Typography variant="h4" component="h1">
        Shopping Cart
      </Typography>
      {/* Price */}
      <Typography
        variant="body2"
        component="h2"
        className="shopping-cart-price"
      >
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
          <Typography
            variant="body1"
            component="div"
            className="flex justify-center items-center"
          >
            No items in cart
          </Typography>
        </>
      )}

      <Divider />

      {/* Subtotal */}
      <Typography
        variant="body1"
        component="h2"
        className="shopping-cart-subtotal"
      >
        Subtotal ({totalQuantity} Items):{" "}
        <span className="shopping-cart-subtotal-price">
          ${totalPrice.toFixed(2)}
        </span>
      </Typography>
    </Container>
  );
};

export default ShoppingCart;
