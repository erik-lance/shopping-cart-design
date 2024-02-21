'use client';

import useHotjar from "@/hooks/useHotjar";
import ShoppingCart from "@/components/Cart";
import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Grid } from "@mui/material";

export default function Home() {
    useHotjar();

    const sampleCartItems = [
        { id: 1, name: "Amazon Echo Dot (3rd Gen)", price: 29.99, quantity: 2 },
        { id: 2, name: "Fire TV Stick 4K", price: 49.99, quantity: 1 },
        { id: 3, name: "Kindle Paperwhite", price: 129.99, quantity: 1 },
    ];

    return (
        // remove "bg-[#EAEDED] text-black" when setting up theme
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#EAEDED] text-black">
            <ThemeWrapper>
                <Grid container spacing={2}>
                    {/* Shopping Cart */}
                    <Grid item xs={8}>
                        <ShoppingCart>
                            {sampleCartItems.map((item) => (
                                <CartItem key={item.id} id={item.id} name={item.name} price={item.price} quantity={item.quantity}/>
                            ))}
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
