"use client";

import useHotjar from "@/hooks/useHotjar";
import ShoppingCart from "@/components/Cart";
import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Grid } from "@mui/material";
import { useState } from "react";
import StartDialog from "@/components/StartDialog";
import EndDialog from "@/components/EndDialog";
import Timer from "@/components/Timer";
// import cart.json
import cart from "@/data/cart.json";

export default function Home() {
  useHotjar();

  const [startTime, setStartTime] = useState<Date | null>(null);
  const [startDialogOpen, setStartDialogOpen] = useState(true);
  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  const handleStart = () => {
    const start = new Date();
    setStartTime(start);
    setStartDialogOpen(false);
  };

  const handleTryAgain = () => {
    const start = new Date();
    setStartTime(start);
    setTimeElapsed(0);
    setEndDialogOpen(false);
  };

  const handleCheckout = () => {
    setEndDialogOpen(true);
    if (startTime) {
      setTimeElapsed((new Date().getTime() - startTime.getTime()) / 1000);
    }
  };

  const sampleCartItems = cart.sort(() => Math.random() - 0.5).slice(0, 5);

  const [quantities, setQuantities] = useState(
    sampleCartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.quantity }),
      {},
    ),
  );
  const prices = sampleCartItems.reduce(
    (acc, item) => ({ ...acc, [item.id]: item.price }),
    {},
  );

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  return (
    // remove "bg-[#EAEDED] text-black" when setting up theme
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-[#EAEDED] text-black">
      <ThemeWrapper>
        <StartDialog open={startDialogOpen} onStart={handleStart} />
        <EndDialog
          open={endDialogOpen}
          timeElapsed={timeElapsed}
          onTryAgain={() => handleTryAgain()}
        />
        <Timer start={startTime} onCheckout={handleCheckout} />
        <Grid container spacing={2}>
          {/* Shopping Cart */}
          <Grid item xs={8}>
            <ShoppingCart quantities={quantities} prices={prices}>
              {sampleCartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  imageUrl={item.imageUrl}
                  description={item.description}
                  details={item.details}
                  handleQuantityChange={handleQuantityChange}
                />
              ))}
            </ShoppingCart>
          </Grid>

          {/* Checkout Button */}
          <Grid item xs={4} container direction="row">
            <Checkout
              quantities={quantities}
              prices={prices}
              onCheckout={handleCheckout}
              containerConfigNum={"0"}
            />
          </Grid>
        </Grid>
      </ThemeWrapper>
    </main>
  );
}
