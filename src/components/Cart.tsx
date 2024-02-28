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
    // remove "bg-white" when setting up theme
    <Container className="bg-white p-5">
      <Typography variant="h4" component="h1">
        Shopping Cart
      </Typography>
      {/* remove "text-[#565959]" when setting up theme */}
      <Typography
        variant="body2"
        component="h2"
        className="flex justify-end -mt-2 text-[#565959]"
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

      <Typography
        variant="body1"
        component="h2"
        className="flex justify-end text-lg/6 mt-1"
      >
        Subtotal ({totalQuantity} Items):{" "}
        <span className="font-bold pl-1">${totalPrice.toFixed(2)}</span>
      </Typography>
    </Container>
  );
};

export default ShoppingCart;
