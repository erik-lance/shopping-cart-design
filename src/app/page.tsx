import ShoppingCart from "@/components/Cart";
import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Container, Divider, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import Image from "next/image";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ThemeWrapper>
                <Grid container spacing={2}>
                    {/* Shopping Cart */}
                    <Grid item xs={8}>
                        <ShoppingCart>
                            <CartItem id={1} name="Item 1"></CartItem>
                        </ShoppingCart>
                    </Grid>

                    {/* Checkout Button */}
                    <Grid item xs={4}>
                        <Checkout />
                    </Grid>
                </Grid>
            </ThemeWrapper>
        </main>
    );
}
