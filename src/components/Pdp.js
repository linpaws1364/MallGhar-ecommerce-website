const ProductDetails = ({ productDetailspage, handleClick }) => {
    return (
        <div >
            {/* div for showing selected product details and add to cart button  */}
            <div className="container mt-5 text-center">
                <div className="detailing">
                <img src={productDetailspage?.thumbnail}></img>
                <h2 className="mt-2">{productDetailspage?.title.toUpperCase()}</h2>
                <div>{productDetailspage?.description}</div>
                <div>₹ {productDetailspage?.price}</div>
                {productDetailspage && (
                    <button
                        className="adder"
                        onClick={(e) => handleClick(e, productDetailspage)}
                    >
                        ADD TO CART
                    </button>
                )}
                </div>
            </div>
        </div>
    );
};
export default ProductDetails;
