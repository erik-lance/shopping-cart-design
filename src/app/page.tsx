"use client";

import useHotjar from "@/hooks/useHotjar";
import ShoppingCart from "@/components/Cart";
import CartItem from "@/components/CartItem";
import Checkout from "@/components/Checkout";
import ThemeWrapper from "@/components/ThemeWrapper";
import { Grid } from "@mui/material";
import { useState } from "react";

export default function Home() {
  useHotjar();

  const sampleCartItems = [
    {
      id: 1,
      name: "SAMSUNG 870 EVO SATA III SSD 1TB 2.5” Internal Solid State Drive, Upgrade PC or Laptop Memory and Storage for IT Pros…",
      price: 74.99,
      quantity: 2,
      imageUrl:
        "https://m.media-amazon.com/images/I/911ujeCkGfL._AC_AA180_.jpg", // Add a valid URL
      description: { text: "Compact smart speaker with Alexa." }, // Example description as an object
      details: { capacity: "1TB" },
    },
    {
      id: 2,
      name: "SanDisk 512GB Ultra USB 3.0 Flash Drive - SDCZ48-512G-G46, Black",
      price: 34.99,
      quantity: 1,
      imageUrl:
        "https://m.media-amazon.com/images/I/51Hy3E3GW9L._AC_AA360_.jpg", // Add a valid URL
      description: { text: "Stream in 4K resolution." }, // Example description as an object
      details: { size: "512GB" }, // Example details as an object
    },
    {
      id: 3,
      name: "WisFox 2.4G Wireless Mouse for Laptop, Ergonomic Computer Mouse with USB Receiver and 3 Adjustable Levels, 6 Button C…",
      price: 13.99,
      quantity: 1,
      imageUrl:
        "https://m.media-amazon.com/images/I/714+t9HR4GL._AC_AA360_.jpg", // Add a valid URL
      description: { text: 'Waterproof, 6" High-Resolution Display.' }, // Example description as an object
      details: { color: "Grey" }, // Example details as an object
    },
  ];

  const [quantities, setQuantities] = useState(
    sampleCartItems.reduce(
      (acc, item) => ({ ...acc, [item.id]: item.quantity }),
      {}
    )
  );
  const prices = sampleCartItems.reduce(
    (acc, item) => ({ ...acc, [item.id]: item.price }),
    {}
  );

  <Checkout quantities={quantities} prices={prices} />;
  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities({ ...quantities, [id]: quantity });
  };

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
          <Grid item xs={4}>
            <Checkout quantities={quantities} prices={prices} />
          </Grid>
        </Grid>
      </ThemeWrapper>
    </main>
  );
}
