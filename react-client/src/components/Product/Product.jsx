import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../redux/store/cart";
import useShop from "../../hooks/useShop.jsx";
import useProduct from "../../hooks/useProduct.jsx";
import { getOrSetUUID } from '../../utilities/session.js';
import { useEffect, useState } from "react";

const Product = () => {
  const uuid = getOrSetUUID();
  const [product,setProduct] = useState();
  const {productId} = useParams();
  const products = useSelector(state => state.productReducer.products);

  const {fetchShopByProductId} = useShop();
  const {fetchProductByProductId} = useProduct();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(productId){
      fetchShopByProductId(productId);
      fetchProductByProductId(productId);
    }
  },[productId]);
  
  useEffect(()=>{
    if(products){
      const filteredProduct = products.find(prod => prod.id === productId && prod.sessionId === uuid);
      setProduct(filteredProduct);
    }
  });
  
  const onAddToCart = () => {
    if (product) {
      dispatch(cartActions.create(product));
    }
  };

   if (!product) return <>Product not found</>;

  return (product) && (<div>
            <button>Back to Shop</button>
            <Link to="/Cart" onClick={onAddToCart}>
                <button>Add to Cart & View</button>
            </Link>

            <h1>{product.name} - remaining stock: {product.stockCount}</h1>
            <p>Product Video</p>
            <p>Product Description</p>
            <p>Product Properties</p>
            <button>Back to Shop</button>
            <button>Add to Cart</button>
            </div>
        )
  
};

export default Product;
