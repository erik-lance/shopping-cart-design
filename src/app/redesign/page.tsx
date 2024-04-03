"use client";

import ShoppingCart from "@/components/Cart";
import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import cart from "@/data/cart.json";
import { CartItemObject } from "@/components/CartItem";

export default function Redesign() {
  const [sampleCartItems, setSampleCartItems] = useState(
    [] as CartItemObject[],
  );
  const [prices, setPrices] = useState({} as { [id: number]: number });
  const [quantities, setQuantities] = useState({} as { [id: number]: number });
  const handleTryAgain = () => {
    // Refresh the page to reset the state
    window.location.reload();
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

  // Shuffled cart items to seven (7) items
  useEffect(() => {
    const randomizedCartItems = cart
      .sort(() => Math.random() - 0.5)
      .slice(0, 7);

    // Randomize Quantities, Quantity is randomized from 1 to 10
    randomizedCartItems.forEach(
      (item) => (item.quantity = Math.floor(Math.random() * 10) + 1),
    );

    const newQuantities = randomizedCartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.quantity }),
      {},
    );

    const newPrices = randomizedCartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.price }),
      {},
    );

    setQuantities(newQuantities);
    setPrices(newPrices);

    // Prepare task (Randomize the quantity of three items from cart in-place)
    // Make sure no indices are repeated
    const randomIndices = new Set<number>();
    while (randomIndices.size < 3) {
      randomIndices.add(Math.floor(Math.random() * 7));
    }

    randomIndices.forEach((index) => {
      let randomQuantity = 0;

      // Ensure that the randomized quantity is different from the original quantity
      do {
        randomQuantity = Math.floor(Math.random() * 10) + 1;
      } while (randomQuantity == randomizedCartItems[index].quantity);

      randomizedCartItems[index].quantity = randomQuantity;
    });

    setSampleCartItems(randomizedCartItems);

    // Update new quantities
    const newQuantitiesWithRandomizedItems = randomizedCartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.quantity }),
      newQuantities,
    );

    setQuantities(newQuantitiesWithRandomizedItems);
  }, []);

  return (
    // remove "bg-[#EAEDED] text-black" when setting up theme
    <main className="flex min-h-screen flex-col items-center justify-between p-10 bg-[#EAEDED] text-black">
      <ThemeWrapper>
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
              containerConfigNum={"0"}
              buttonConfigNum={"1"}
              onCheckout={handleTryAgain}
            />
          </Grid>
        </Grid>
      </ThemeWrapper>
    </main>
  );
}
