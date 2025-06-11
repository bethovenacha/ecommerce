
import { Link, useParams } from 'react-router-dom';
import { useSelector} from 'react-redux';
import useShop from '../../hooks/useShop';
import useProduct from '../../hooks/useProduct';
import { useEffect } from 'react';

const Shop = () => {
    const { shopId } = useParams();
    const products = useSelector(state => state.productReducer.products);

    const {fetchProductsByShopId} = useProduct();
    const {fetchShopByShopId} = useShop();

    useEffect(() => {
        if (shopId) {
            fetchProductsByShopId(shopId);
            fetchShopByShopId(shopId); 
        }
    }, [shopId]);

    if(!shopId){
        return <div>No Shop Found!</div>
    }

    return (products)&&(
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
