import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useEffect, useState } from "react";
import TransitionsModal from "./Modal";
import { toast } from "react-toastify";

export default function BasicMenu({
    open,
    anchorEl,
    setAnchorEl,
    item,
    productList,
    setProductList,
}) {
    const { title, description, price, thumbnail, rating } = item;

    const [isEditing, setEditing] = useState(false);
    const [isModalOpened, setModalOpened] = useState(false);
    console.log(`isModalOpened`, isModalOpened);
    const [updatedValue, setUpdatedValue] = useState({
        title: "",
        description: "",
        price: "",
        rating: "",
    });

    // function to control editing of item details 
    const handleEdit = (e, item) => {
        setEditing(!isEditing);
        setUpdatedValue({
            ...updatedValue,
            title: item.title,
            description: item.description,
            price: item.price,
            rating: item.rating,
        });
    };

    // function to delete item 
    const handleDelete = (e, item) => {
        const newProductList = productList.filter((p) => p.id !== item.id);
        setProductList(newProductList);
        toast.warn(`Deleted successfully!`);
    };
    return (
        <div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {/* div for the Edit button and delete button */}
                <div className="d-flex flex-column">
                    <MenuItem
                        className="menur"
                        onClick={(e) => {
                            handleEdit(e, item);
                            setModalOpened(true);
                        }}
                    >
                        Edit{" "}
                        <span className="mx-2 d-flex align-items-center">
                            <EditIcon sx={{ fontSize: 16 }} />
                        </span>
                    </MenuItem>
                    {/* object for fetching product details when edit is clicked  */}
                    {isModalOpened && (
                        <TransitionsModal
                            item={item}
                            isModalOpened={isModalOpened}
                            setModalOpened={setModalOpened}
                            updatedValue={updatedValue}
                            setUpdatedValue={setUpdatedValue}
                            productList={productList}
                            setProductList={setProductList}
                            setAnchorEl={setAnchorEl}
                        />
                    )}
                    <MenuItem className="menur" onClick={(e) => { handleDelete(e, item); setAnchorEl(null) }}>
                        Delete{" "}
                        <span className="mx-2 d-flex align-items-center">
                            <DeleteForeverIcon sx={{ fontSize: 16 }} />
                        </span>
                    </MenuItem>
                </div>
            </Menu>
        </div>
    );
}
