import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { cartActions } from "../../redux/store/cart";

const Product = ()=>{
    const params = useParams();
    const result = useSelector(state => state.productReducer.products);
    let uuid = localStorage.getItem('shop_uuid');

    const updatedProducts = result.map(prod => ({
            ...prod,   // Spread the existing properties of the product
            sessionId: uuid,  // Add the new property (you can change the value dynamically)
        }));
 
    const product = updatedProducts.filter(prod => prod.id == params.id && prod.sessionId == uuid);

    const dispatch = useDispatch();

    const onAddToCart = ()=>{
        dispatch(cartActions.create(product[0]));
    }; 

    return (
        <>
            <h3>{product && product.length>0 && <div>
                
                    <button>Back to Shop</button>
                    <Link to="/Cart" onClick={onAddToCart}>
                        <button>Add to Cart & View</button>
                    </Link>
                
                <h1>{product[0].name} - remaining stock : {product[0].stockCount}</h1>

                <p>Product Video</p>
                <p>Product Description</p>
                <p>Product Properties</p>
                <button>Back to Shop</button>
                <button>Add to Cart</button>
            </div> }</h3>
        </>
    );
};
export default Product;