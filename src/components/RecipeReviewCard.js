import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import BasicRating from "./Rating";
import BasicMenu from './Menu';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from "react-router-dom";
import profile from "./profile.png";
import "../styles/main.css";

// main function for each item shown on page 
export default function RecipeReviewCard({ item, handleClick, key, setProductList, productList, handlePdp }) {
    const { title, description, price, thumbnail, rating } = item;

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
        <Card className="items">
            <CardHeader className='item-head'
            // the profile picture shown beside every item 
                avatar={
                    <img id="profile" src={profile} alt=""/>
                }
                // section for item name and rating 
                action={
                    <>
                        <IconButton
                            aria-label="more"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(event) => setAnchorEl(event.currentTarget)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <BasicMenu open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} item={item} productList={productList} setProductList={setProductList} />
                    </>
                }
                title={title}
                subheader={<BasicRating rating={rating} />}
            />
            {/* section for item image  */}
            <Link to={`productDetails`}>
                <CardMedia
                    component="img"
                    height="194"
                    image={thumbnail}
                    alt="Paella dish"
                    onClick={(e) => handlePdp(e, item)}
                />
            </Link>

            {/* section for item price and description */}
            <CardContent>
                <Typography className='title-item'>
                    {'₹' + ' ' + price }
                </Typography>
                <Typography className='title-des'>
                    {description}
                </Typography>
            </CardContent>
            {/* section for add to cart button  */}
            <CardActions sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
                <LoadingButton variant="outlined" sx={{fontFamily: 'Fira Sans', marginTop: "auto", color: "white", borderColor: "#6867AC", backgroundColor:"#6867AC", width:"60%"}} fullWidth className="cart-adder" onClick={(e) => handleClick(e, item)}>
                    ADD TO CART
                </LoadingButton>
            </CardActions>
        </Card>
    );
}
