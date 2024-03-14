"use client";

import useHotjar from "@/hooks/useHotjar";
import ShoppingCart from "@/components/Cart";
import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import StartDialog from "@/components/StartDialog";
import EndDialog from "@/components/EndDialog";
import Timer from "@/components/Timer";
import cart from "@/data/cart.json";
import { CartItemObject } from "@/components/CartItem";
import { useParams } from "next/navigation";

export default function Home() {
  const configNum: string = useParams().configNum[0];
  const [containerConfigNum, setContainerConfigNum] = useState("0");
  const [buttonConfigNum, setButtonConfigNum] = useState("0");

  useEffect(() => {
    const num = parseInt(configNum);
    if (num >= 1 && num <= 4) {
      setContainerConfigNum("0");
      setButtonConfigNum(num.toString());
    } else if (num >= 5 && num <= 6) {
      setContainerConfigNum(num.toString());
      setButtonConfigNum("0");
    }
  }, [configNum]);

  useHotjar();

  const [nickname, setNickname] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [startDialogOpen, setStartDialogOpen] = useState(true);
  const [endDialogOpen, setEndDialogOpen] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [sampleCartItems, setSampleCartItems] = useState(
    [] as CartItemObject[],
  );
  const [prices, setPrices] = useState({} as { [id: number]: number });
  const [quantities, setQuantities] = useState({} as { [id: number]: number });
  const [goalQuantities, setGoalQuantities] = useState(
    {} as { [id: number]: number },
  );
  const [goalItems, setGoalItems] = useState([] as CartItemObject[]);

  const handleStart = () => {
    const start = new Date();
    setStartTime(start);
    setStartDialogOpen(false);
  };

  const handleTryAgain = () => {
    // Refresh the page to reset the state
    window.location.reload();
  };

  const handleCheckout = () => {
    setEndDialogOpen(true);
    if (startTime) {
      setTimeElapsed((new Date().getTime() - startTime.getTime()) / 1000);
    }
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

    // Set goal quantities to be a deep copy of the randomized quantities
    const newGoalQuantities = JSON.parse(JSON.stringify(newQuantities));
    setGoalQuantities(newGoalQuantities);

    // Set goal items to be a deep copy of the randomized items
    const newGoalItems = JSON.parse(JSON.stringify(randomizedCartItems));
    setGoalItems(newGoalItems);

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
        <StartDialog
          open={startDialogOpen}
          onStart={handleStart}
          goalItems={goalItems}
          setNickname={setNickname}
        />
        <EndDialog
          open={endDialogOpen}
          timeElapsed={timeElapsed}
          onTryAgain={() => handleTryAgain()}
          incorrectItemsCount={calculateIncorrectItemsCount(
            goalQuantities,
            quantities,
          )}
          nickname={nickname}
          configNum={configNum.toString()}
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

function calculateIncorrectItemsCount(
  quantities: { [id: number]: number },
  goalQuantities: { [id: number]: number },
) {
  return Object.entries(goalQuantities).reduce((count, [id, goalQuantity]) => {
    const currentQuantity = quantities[Number(id)] || 0;
    return count + (currentQuantity !== goalQuantity ? 1 : 0);
  }, 0);
}
