import { Container, Button, FormControlLabel, Checkbox, Typography } from "@mui/material";

export default function Checkout() {
    return (
        <Container className="bg-white p-4">
            <Typography variant="body1" component="h2" className="mb-4">
                Subtotal (2 items): <span className="font-bold">$82.78</span>
            </Typography>
            <FormControlLabel
                control={<Checkbox />}
                label="This order contains a gift"
                className="mb-4"
            />
            <Button
                variant="contained"
                className="w-full bg-yellow-500 text-black py-2 rounded-none"
            >
                Proceed to checkout
            </Button>
        </Container>
    );
}