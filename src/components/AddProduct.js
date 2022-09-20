import React, { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addProducts } from "../Redux/addProducts";
import { toast } from "react-toastify";
import "../styles/main.css"

// main function for creating product
const AddProduct = () => {
  const [foodType, setFoodType] = useState();

  const dispatch = useDispatch();

  const paperStyle = {
    padding: "50px 150px",
    width: 500,
    margin: "150px auto",
  };
  const paperStyle1 = {
    marginLeft: "0px",
  };
  const [state, setState] = useState({
    title: "",
    price: "",
    rating: "",
    link: "",
  });
  console.log(`state of product`, state);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // function expression to use stat for product creation and alert 
  const createProduct = () => {
    try {
      dispatch(addProducts(state));
      toast.success(`Product added successfully`);
      setState({
        title: "",
        price: "",
        rating: "",
        link: "",
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Grid>
        <div className="formm">
          {/* Form to add product details */}
          <Paper className="fillup" elevation={10} style={paperStyle}>
            <h2>Add New Product</h2>
            {/* Product Name box */}
            <div className="formmm mt-4">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                style={paperStyle1}
              >
                <h5 className="mt-2">Product Title</h5>
                <TextField
                  className="fields"
                  name="title"
                  value={state.title}
                  onChange={handleChange}
                />
              </Box>
            </div>
            <br />
            {/* Product Price Box  */}
            <div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
                style={paperStyle1}
              >
                <h5 className="mt-2">Product Price (in ₹)</h5>
                <TextField
                  className="fields"
                  name="price"
                  type="number"
                  value={state.price}
                  onChange={handleChange}
                />
              </Box>
            </div>
            <br />

            {/* Product Rating box  */}
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              style={paperStyle1}
            >
              <h5 className="mt-2">Product Rating</h5>
              <TextField
                className="fields"
                name="rating"
                id="outlined-basic"
                type="number"
                value={state.rating}
                onChange={handleChange}
              />
            </Box>

            {/* Product image link box  */}
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              style={paperStyle1}
            >
              <h5 className="mt-2 imager">Product Image (Please provide image link)</h5>
              <TextField
                name="link"
                id="outlined-basic"
                className="fields"
                value={state.link}
                onChange={handleChange}
              />
            </Box>

            <br />
            <br />

            {/* Add Product button  */}
            <button
              className="creator"
              type="Submit"
              value="SignUp"
              onClick={createProduct}
            >
              Add Product
            </button>
          </Paper>
        </div>
      </Grid>
    </>
  );
};
export default AddProduct;
