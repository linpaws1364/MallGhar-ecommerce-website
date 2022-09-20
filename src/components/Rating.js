import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { useState, useEffect } from "react";

// main function for controlling rating shown on pages 
export default function BasicRating({ rating, isEditing, setUpdatedValue, updatedValue }) {
    const [value, setValue] = useState(rating);

    return (
        <Box
            sx={{
                "& > legend": { mt: 2 },
            }}
        >{isEditing ?
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    setUpdatedValue({
                        ...updatedValue,
                        rating: newValue,
                    })
                }}
            /> :
            <Rating name="half-rating-read" value={value} precision={0.5} readOnly />
            }
        </Box>
    );
}
