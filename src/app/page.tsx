'use client';

import useHotjar from "@/hooks/useHotjar";
import ShoppingCart from "@/components/Cart";
import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Grid } from "@mui/material";

export default function Home() {
    useHotjar();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ThemeWrapper>
                <Grid container spacing={2}>
                    {/* Shopping Cart */}
                    <Grid item xs={8}>
                        <ShoppingCart>
                            {/* Can be replaced with a map of the json data later on */}
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
