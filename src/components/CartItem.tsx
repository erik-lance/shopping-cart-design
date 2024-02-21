import { Container, Typography, Checkbox, FormControlLabel, Select, SelectChangeEvent, MenuItem, Link, Divider } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

export interface CartItemProps {
    id: number;
    name: string;
    imageUrl: string;
    description: object;
    details: object;
    price: number;
    quantity: number;
}

export default function CartItem(props: CartItemProps) {
    // State to manage quantity
    const [quantity, setQuantity] = useState(props.quantity);

    // Handler for when quantity changes
    const handleQuantityChange = (event: SelectChangeEvent<number>) => {
        setQuantity(Number(event.target.value));
    };

    function toTitleCase(str: string): string {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return (
        <Container className="flex p-4 pr-0 gap-4">
            <Container className="p-0 relative w-52 h-52">
                <Image 
                    src={props.imageUrl || '/default-image.jpg'}
                    alt={props.name} 
                    fill 
                    loading="lazy" 
                    onError={
                        (e) => {
                            e.currentTarget.src = '/default-image.jpg';
                        }
                    }
                    style={{
                        objectFit: 'contain'
                    }}
                />
            </Container>
            <Container className="p-0">
                <Container className="flex gap-5 p-0">
                    <Container className="p-0 grow flex flex-col gap-1">
                        <Typography variant="body1" component="h2" className="flex text-lg/[23px]">
                            {props.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary" className="text-[#007600] leading-4">
                            In Stock
                        </Typography>
                        <Typography variant="caption" color="textSecondary" className="leading-4">
                            <span className="font-bold">FREE Shipping</span> to Philippines.
                        </Typography>
                        <FormControlLabel
                            control={
                                <Checkbox 
                                    color="primary" 
                                    sx={{ 
                                        '& .MuiSvgIcon-root': { fontSize: 13 }, // Adjusts the icon size inside the checkbox
                                        marginRight: '-4px'
                                    }} 
                                />
                            }
                            label="This is a gift"
                            sx={{
                                '& .MuiFormControlLabel-label': { fontSize: '0.75rem' }, // Decreases the font size of the label
                            }}
                            className="-mt-2 -mb-2"
                        />
                        {Object.entries(props.details).map(([key, value]) => (
                            <Typography variant="caption" className="leading-4" key={key}>
                                <span className="font-bold">{toTitleCase(key)}:</span> {value}
                            </Typography>
                        ))}
                    </Container>
                    <Typography variant="body1" component="h2" className="flex justify-end text-lg/6 font-bold">
                        ${props.price.toFixed(2)}
                    </Typography>
                </Container>

                <Container className="flex items-center gap-2 p-0 mt-2">
                    <Select
                        value={quantity}
                        onChange={handleQuantityChange}
                        displayEmpty
                        renderValue={(selectValue) => `Qty: ${selectValue}`}
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                            padding: '6px 0px 6px 14px'
                        }}
                        className="rounded-[7px] shadow-md text-[13px]"
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
                    <Divider orientation="vertical" flexItem/>

                    <Link component="a" href="#" underline="hover" sx={{typography: 'caption'}} className="text-xs/4 cursor-pointer text-[#007185]">Delete</Link>

                    <Divider orientation="vertical" flexItem/>

                    <Link component="a" href="#" underline="hover" sx={{typography: 'caption'}} className="text-xs/4 cursor-pointer text-[#007185]">Save for later</Link>

                    <Divider orientation="vertical" flexItem />

                    <Link component="a" href="#" underline="hover" sx={{typography: 'caption'}} className="text-xs/4 cursor-pointer text-[#007185]">Compare with similar items</Link>

                    <Divider orientation="vertical" flexItem/>

                    <Link component="a" href="#" underline="hover" sx={{typography: 'caption'}} className="text-xs/4 cursor-pointer text-[#007185]">Share</Link>
                </Container>
            </Container>
        </Container>
    );
}