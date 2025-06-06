import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';
import { Container, Col,Row } from "react-bootstrap";
import {useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

function NavBar(){
    const [isExpanded, setExpanded] = useState(true);
    const shopId = import.meta.env.VITE_MAINSHOP_ID;
    const shop = useSelector(state => state.shopReducer.shop?.[0]);
    
    return(
        <>
          <Container fluid>
            <Row className='rows'>
              <Row className='columns'>
                <Navbar sticky="top" key={isExpanded} expand={isExpanded}>
                  <Navbar.Brand href="/">Urban Grit</Navbar.Brand>
                  <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${isExpanded}`} />
                  <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${isExpanded}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${isExpanded}`}
                    placement="start"
                  >
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${isExpanded}`}>
                        Offcanvas
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Nav className="justify-content-start flex-grow-1">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link as={Link} to={`/Shop/${(shop)? shop.id: shopId}`}>Shop</Nav.Link>
                        <Nav.Link href="/Cart">Cart</Nav.Link>
                        <Nav.Link href="/Account">Account</Nav.Link>
                      </Nav>
                      <Nav className="justify-content-end flex-grow-1">
                      
                        <Nav.Link href="/Register">Register</Nav.Link>
                        <Nav.Link href="/Login">Login</Nav.Link>
                      </Nav>
                    </Offcanvas.Body>
                  </Navbar.Offcanvas>
              </Navbar>
              </Row>
            </Row>
          </Container>        
            
        </>
    );
}
export default NavBar;