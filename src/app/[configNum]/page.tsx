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
import cart from "@/data/cart.json";

export default function Home({ params }: { params: { configNum: string } }) {
  const configNum = parseInt(params.configNum);
  let containerConfigNum = "0";
  let buttonConfigNum = "0";

  if (configNum >= 1 && configNum <= 4) {
    containerConfigNum = "0";
    buttonConfigNum = configNum.toString();
  } else if (configNum >= 5 && configNum <= 6) {
    containerConfigNum = configNum.toString();
    buttonConfigNum = "0";
  }

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

  const sampleCartItems = cart;

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
              containerConfigNum={containerConfigNum}
              buttonConfigNum={buttonConfigNum}
              onCheckout={handleCheckout}
            />
          </Grid>
        </Grid>
      </ThemeWrapper>
    </main>
  );
}
