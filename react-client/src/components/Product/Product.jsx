import { Link, useParams } from "react-router-dom";
import { Container,Col,Row } from "react-bootstrap";
import { useSelector, useDispatch} from "react-redux";
import { cartActions } from "../../redux/store/cart";

const Product = ()=>{
    const params = useParams();
    const result = useSelector(state => state.productReducer.products);
    const product = result.filter(prod => prod.id == params.id);
    const dispatch = useDispatch();

    return (
        <React.Fragment>
        <Container fluid>     
            <Row className='rows'>
                <Col className='columns'>
                    
                        <h3>{product && product.length>0 && <div>
                            
                                <button>Back to Shop</button>
                                <Link to="/Cart" onClick={() => dispatch(cartActions.create(product[0]))}>
                                    <button>Add to Cart & View</button>
                                </Link>
                           
                            <h1>{product[0].name} - remaining stock : {product[0].stockCount}</h1>

                            <p>Product Video</p>
                            <p>Product Description</p>
                            <p>Product Properties</p>
                            <button>Back to Shop</button>
                            <button>Add to Cart</button>
                        </div> }</h3>
                        
                        
                </Col>
            </Row>
       </Container>
    </React.Fragment>
    );
};
export default Product;