import { Container, Col, Row } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { productActions } from "../../redux/store/product";
import storage from 'redux-persist/lib/storage';
import { cartActions } from "../../redux/store/cart";
import { mainshop } from "../../constants/shop";
import { shopActions } from "../../redux/store/shop";

const Shop = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [products, setProducts] = useState();
    const productState = useSelector(state => state.productReducer.products);

    const purge = ()=>{
        dispatch(cartActions.clear());
        dispatch(shopActions.clear());
        storage.removeItem('persist:cartReducer');
        storage.removeItem('persist:shopReducer');
        console.log("cart and shop purged purged");
    };

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
        }else{
            dispatch(shopActions.create(mainshop));
            fetchProducts(mainshop.id);
        }
    }, [id]);

    useEffect(()=>{
        if(productState){
            setProducts(productState);
        }
    },[productState]);

    return (
        <Container fluid>
            <Row className='rows'>
                <Col className='columns'>
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
                </Col>
            </Row>
        </Container>
    );
};

export default Shop;
