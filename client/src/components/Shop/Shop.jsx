import { Container,Col,Row } from "react-bootstrap";
import NavBar from "../Navbar/Navbar";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Shop = ()=>{
    const products = useSelector(state => state.reduxProducts);
    
    return(
        <React.Fragment>
            <Container fluid>
                <Row className='rows'>
                    <Col className='columns'>
                        <NavBar/>
                    </Col>
                </Row>
         
                <Row className='rows'>
                    <Col className='columns'>
                        <ul>
                        {products && products.length>0 && products.map((product)=>{
                           return <li key={products.id}>
                            <Link key={products.id} to={`/Product/${product.id}`}>
                                <h4>{product.name}</h4>
                                <img src={`../../src/assets/images/products/${product.image}`} width={250} height={250}/>
                            </Link>
                           </li>
                        })}
                        </ul>
                    </Col>
                </Row>
           </Container>
        </React.Fragment>
         
        
    );
}
export default Shop;