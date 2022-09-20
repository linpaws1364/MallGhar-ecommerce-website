import React, { useState, useEffect } from "react";
import RecipeReviewCard from "./RecipeReviewCard";
import "../styles/main.css";
import axios from "axios";
import PaginationRounded from "./pagination";
import CustomLoader from "./Loader";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";


const Main = ({ handleClick, handlePdp }) => {

  const [allProducts, setAllProducts] = useState();
  const [productList, setProductList] = useState();
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isSorting, setSorting] = useState(false);

  useEffect(() => {
    // axios for fetching api 
    (async function fetchProductList() {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products`
        );
        const slicedProduct = data?.products?.slice(0, 10);

        setAllProducts(data.products);
        setProductList(slicedProduct);

      } catch (error) {
        toast.error(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 4500);
      }
    })();
  }, []);

  // useEffect for page loading and loading success notifications 
  useEffect(() => {
    toast.warning(`Please wait while the page loads up!`)
    setLoading(true);
    const pageChangeProduct = allProducts?.slice(page * 10 - 10, 10 * page);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Success`)
    }, 4500);
    setProductList(pageChangeProduct);
    setSorting(false);
  }, [page]);

  // function to control sorting of items according to price 
  const handleSort = () => {
    setSorting(!isSorting);
    productList?.sort((a, b) => a.price - b.price);
    toast.success(`Sorted Low to High Price!`);
  };

  // function to cancel sorting of items according to price 
  const handleClose = () => {
    setSorting(!isSorting);
    productList?.sort((a, b) => a.id - b.id);
    toast.error(`Default Sort`);
  };

  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        <PaginationRounded setPage={setPage} />
      </div>
      {!isLoading && (
        // div for sorting button and sort closing button
        <div className="mt-2">
          {!isSorting && (
            <button className="sorter" onClick={handleSort}>
              Sort by Price
            </button>
          )}
          {isSorting && (
            <button
              className="btn btn-dark d-flex align-items-center mx-2"
              onClick={handleClose}
            >
              <span className="sorter">Close</span>
              <ClearIcon />
            </button>
          )}
        </div>
      )}
      {/* section for diplaying items after sorting  */}
      <section>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <>
            {productList?.map((item) => (
              <RecipeReviewCard
                key={item.id}
                item={item}
                handleClick={handleClick}
                setProductList={setProductList}
                productList={productList}
                handlePdp={handlePdp}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
};

export default Main;
