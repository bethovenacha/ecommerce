import { Link, useParams } from "react-router-dom";
import { Container,Col,Row } from "react-bootstrap";
import NavBar from "../Navbar/Navbar";
import { useSelector } from "react-redux";

const Product = ()=>{
    const params = useParams();
    const result = useSelector(state => state.reduxProducts);
    const product = result.filter(prod => prod.id == params.id);

    return (
        <React.Fragment>
        <Container fluid>
            <Row className='rows'>
                <Col className='columns'>
                    <NavBar/>
                </Col>
            </Row>
     
            <Row className='rows'>
                <Col className='columns'>
                    
                        <h3>{product && product.length>0 && <div>
                            <Link to={`/Cart/${product[0].id}`}>
                                 <button>Back to Shop</button>
                                <button>Add to Cart</button>
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