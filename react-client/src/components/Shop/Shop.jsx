
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect} from "react";
import { productActions } from "../../redux/store/product";
import { shopActions } from "../../redux/store/shop";

const Shop = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer.products);

    const fetchProducts = async (shopId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/product/shop/?shopId=${shopId}`);
            
            if (res.ok) {
                const data = await res.json();
                if (data) {
                    dispatch(productActions.clear());
                    dispatch(productActions.create(data));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchShop = async (shopId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/shop/?shopId=${shopId}`);
            if (res.ok) {
                const data = await res.json();
                if (data) {
                    dispatch(shopActions.clear());
                    dispatch(shopActions.create(data));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if(id){
            fetchShop(id);
            fetchProducts(id);
        }
    }, [id]);

    return (
            <ul>
                {products && products.length > 0 && products.map((product) => (
                    <li key={product.id}>
                        <Link to={`/Product/${product.id}`}>
                            <h4>{product.name}</h4>
                            <img
                                src={`../../src/assets/images/products/${product.image}`}
                                alt={product.name}
                                width={250}
                                height={250}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
                
    );
};

export default Shop;
