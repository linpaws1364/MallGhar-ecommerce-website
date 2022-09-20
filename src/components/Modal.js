import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import BasicRating from "./Rating";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/main.css";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal({
    isModalOpened,
    setModalOpened,
    updatedValue,
    setUpdatedValue,
    productList,
    setProductList,
    item,
    setAnchorEl
}) {
    // function to execute changes to product details 
    const handleChange = (e) => {
        e.preventDefault();
        setUpdatedValue({
            ...updatedValue,
            [e.target.name]: e.target.value,
        });
    };

    // function to save the changes made to product details 
    const handleSave = async (e, item) => {
        let payload = {
            title: updatedValue.title,
            description: updatedValue.description,
            price: updatedValue.price,
            rating: updatedValue.rating,
        };
        // using axios to fetch product id from dummyjson api
        const { data } = await axios.put(
            `https://dummyjson.com/products/${item.id}`,
            payload
        );
        setProductList(() => {
            let newUpdatedProduct = [];
            productList?.map((i) => {
                if (i.id !== item.id) {
                    newUpdatedProduct.push(i);
                } else {
                    newUpdatedProduct.push(data);
                }
            });
            return newUpdatedProduct;
        });
        setModalOpened(false);
        setAnchorEl(null)
        toast.success(`Edited successfully!`);
    };


    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isModalOpened}
                onClose={() => setModalOpened(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isModalOpened}>
                    {/* box for updating product details  */}
                    <Box sx={style} className="editor">
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Please Edit Product Details Here
                        </Typography>
                        {/* section to update product name  */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <>
                                <div>Update Title</div>
                                <input
                                    className="placer"
                                    type="text"
                                    value={updatedValue.title}
                                    onChange={handleChange}
                                    name="title"
                                    placeholder="Title"
                                />
                            </>
                        </Typography>
                        {/* section to update product description  */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <>
                                <div>Update Description</div>
                                <input
                                    className="placer"
                                    type="text"
                                    value={updatedValue.description}
                                    onChange={handleChange}
                                    name="Description"
                                    placeholder="Description"
                                />
                            </>
                        </Typography>
                        {/* section to update product price  */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <>
                                <div>Update Price</div>
                                <input
                                    className="placer"
                                    type="number"
                                    value={updatedValue.price}
                                    onChange={handleChange}
                                    name="price"
                                />
                            </>
                        </Typography>
                        {/* section to update product rating  */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <>
                                <div>Update Rating</div>
                                <BasicRating
                                    rating={updatedValue.rating}
                                    isEditing={isModalOpened}
                                    setUpdatedValue={setUpdatedValue}
                                    updatedValue={updatedValue}
                                />
                            </>
                        </Typography>

                        {/* section containing save and cancel buttons */}
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            <div className="d-flex">
                                <button
                                    className="btn btn-success"
                                    onClick={(e) => handleSave(e, item)}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn btn-danger mx-3"
                                    onClick={() => { setModalOpened(false); toast.error(`Cancelled Editing`); setAnchorEl(null) }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
