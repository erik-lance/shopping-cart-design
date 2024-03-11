import {
  Container,
  Typography,
  Checkbox,
  FormControlLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Link,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

export interface CartItemObject {
  id: number;
  name: string;
  imageUrl: string;
  description: object;
  details: object;
  price: number;
  quantity: number;
}

export interface CartItemProps {
  id: number;
  name: string;
  imageUrl: string;
  description: object;
  details: object;
  price: number;
  quantity: number;
  handleQuantityChange: (id: number, quantity: number) => void;
}

export default function CartItem(props: CartItemProps) {
  // State to manage quantity
  const [quantity, setQuantity] = useState(props.quantity);
  const [lastQuantity, setLastQuantity] = useState(props.quantity);

  // Handler for when quantity changes
  const handleQuantityChange = (event: SelectChangeEvent<number>) => {
    const newQuantity = Number(event.target.value);
    setQuantity(newQuantity);
    setLastQuantity(quantity);
    props.handleQuantityChange(props.id, newQuantity);
  };

  function toTitleCase(str: string): string {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function truncateTitle(title: string): string {
    const maxLength = 64;
    return title.length <= maxLength
      ? title
      : title.slice(0, maxLength) + "...";
  }

  const restoreQuantity = () => {
    setQuantity(lastQuantity);
    props.handleQuantityChange(props.id, lastQuantity);
  };

  const LinkUndoDelete = () => {
    return (
      <Typography className="removed-text">
        <Link
          component="a"
          underline="hover"
          sx={{ typography: "caption" }}
          className="removed-text-link"
          onClick={restoreQuantity}
        >
          {truncateTitle(props.name)}
        </Link>{" "}
        was removed from Shopping Cart.
      </Typography>
    );
  };

  return (
    <Container className="cart-item-container">
      {quantity > 0 ? (
        <>
          {/* Image container */}
          <Container className="cart-image">
            <Image
              src={`/items/${props.imageUrl}` || "/default-image.jpg"}
              alt={props.name}
              fill
              priority={true}
              onError={(e) => {
                e.currentTarget.src = "/default-image.jpg";
              }}
              style={{
                objectFit: "contain",
              }}
              sizes="(min-width: 66em) 5vw, (min-width: 44em) 11vw, 14rem"
            />
          </Container>
          {/* Content container */}
          <Container className="cart-content-container">
            {/* Item details container */}
            <Container className="cart-item-details">
              {/* Shopping details container */}
              <Container className="cart-shopping-details">
                <Typography
                  variant="body1"
                  component="h2"
                  className="flex text-lg/[23px] !line-clamp-2"
                >
                  {props.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  className="text-[#007600] leading-4"
                >
                  In Stock
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  className="leading-4"
                >
                  <span className="font-bold">FREE Shipping</span> to
                  Philippines.
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      sx={{
                        "& .MuiSvgIcon-root": { fontSize: 13 }, // Adjusts the icon size inside the checkbox
                        marginRight: "-4px",
                      }}
                    />
                  }
                  label="This is a gift"
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "0.75rem" }, // Decreases the font size of the label
                  }}
                  className="-mt-2 -mb-2"
                />
                {Object.entries(props.details).map(([key, value]) => (
                  <Typography variant="caption" className="leading-4" key={key}>
                    <span className="font-bold">{toTitleCase(key)}:</span>{" "}
                    {value}
                  </Typography>
                ))}
              </Container>
              {/* Price container */}
              <Typography variant="body1" component="h2" className="cart-price">
                ${props.price.toFixed(2)}
              </Typography>
            </Container>

            {/* Bottom tools container: Quantity and item links container */}
            <Container className="cart-bottom-tools">
              {/* Quantity */}
              <Select
                value={quantity}
                onChange={handleQuantityChange}
                displayEmpty
                renderValue={(selectValue) => `Qty: ${selectValue}`}
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  "& .MuiSelect-select": {
                    padding: "6px 26px 6px 11px !important",
                  },
                }}
                className="cart-quantity"
              >
                <MenuItem value={0}>0 (Delete)</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10+</MenuItem>
              </Select>

              {/* Item links: Delete, Save for later, Compare, Share */}
              <Link
                component="a"
                href="#"
                underline="hover"
                sx={{ typography: "caption" }}
                className="cart-links"
              >
                Delete
              </Link>

              <Link
                component="a"
                href="#"
                underline="hover"
                sx={{ typography: "caption" }}
                className="cart-links"
              >
                Save for later
              </Link>

              <Link
                component="a"
                href="#"
                underline="hover"
                sx={{ typography: "caption" }}
                className="cart-links"
              >
                Compare with similar items
              </Link>

              <Link
                component="a"
                href="#"
                underline="hover"
                sx={{ typography: "caption" }}
                className="cart-links"
              >
                Share
              </Link>
            </Container>
          </Container>
        </>
      ) : (
        <LinkUndoDelete />
      )}
    </Container>
  );
}
