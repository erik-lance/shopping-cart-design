import {
  Container,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface CheckoutProps {
  quantities: { [id: number]: number };
  prices: { [id: number]: number };
  onCheckout: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  quantities,
  prices,
  onCheckout,
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
    // Checkout details container
    <Container className="checkout-container config-0-position">
      {/* Progess bar */}
      <div className="checkout-progress-bar-bg">
        <div className="checkout-progress-bar-top" style={{ width: "70%" }} />
      </div>

      {/* Progress label */}
      <div className="checkout-progress-label">
        <div className="checkout-progress-checkmark">
          <CheckIcon className="checkout-progress-checkmark-svg" />
        </div>
        <Typography variant="body2" style={{ color: "green" }}>
          Part of your order qualifies for{" "}
          <strong style={{ fontWeight: "bold" }}>FREE Shipping</strong>. See
          each item for details. Details
        </Typography>
      </div>

      {/* Checkout subtotal */}
      <Typography variant="body1" component="h2">
        Subtotal ({totalQuantity} items):{" "}
        <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="This order contains a gift"
        className="mb-4"
      />

      {/* Checkout button */}
      <Button
        variant="contained"
        className="checkout-button config-0"
        onClick={onCheckout}
      >
        Proceed to checkout
      </Button>
    </Container>
  );
};

export default Checkout;
