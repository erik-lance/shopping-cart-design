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

const Checkout: React.FC<CheckoutProps> = ({ quantities, prices, onCheckout }) => {
  const totalQuantity: number = Object.values(quantities).reduce(
    (total: number, quantity: number) => total + quantity,
    0
  );

  const totalPrice: number = Object.entries(quantities).reduce(
    (total: number, [id, quantity]: [string, number]) =>
      total + quantity * prices[Number(id)],
    0
  );

  return (
    <Container className="bg-white p-4">
      <div className="w-full h-2.5 rounded-full bg-green-200 relative overflow-hidden mb-2">
        <div
          className="h-full bg-green-700 absolute"
          style={{ width: "70%" }}
        />
      </div>

      <div className="flex flex-row mb-5">
        <div className="bg-green-700 rounded-full w-5 h-5 flex items-center justify-center mr-2">
          <CheckIcon className="text-white text-sm" />
        </div>
        <Typography variant="body2" style={{ color: "green" }}>
          Part of your order qualifies for{" "}
          <strong style={{ fontWeight: "bold" }}>FREE Shipping</strong>. See
          each item for details. Details
        </Typography>
      </div>

      <Typography variant="body1" component="h2">
        Subtotal ({totalQuantity} items):{" "}
        <span className="font-bold">${totalPrice.toFixed(2)}</span>
      </Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="This order contains a gift"
        className="mb-4"
      />

      <Button
        variant="contained"
        className="w-full bg-yellow-500 text-black py-2 rounded-none"
        onClick={onCheckout}
      >
        Proceed to checkout
      </Button>
    </Container>
  );
};

export default Checkout;
