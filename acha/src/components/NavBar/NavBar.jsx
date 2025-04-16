import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState } from 'react';

function NavBar(){
    const [isExpanded, setExpanded] = useState(true);

    return(
        <>          
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
                  <Nav.Link href="/Shop">Shop</Nav.Link>
                  <Nav.Link href="/Cart">Cart</Nav.Link>
                  <Nav.Link href="/Account">Account</Nav.Link>
                </Nav>
                <Nav className="justify-content-end flex-grow-1">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/Shop">Shop</Nav.Link>
                  <Nav.Link href="/Social">Social</Nav.Link>
                  <Nav.Link href="/Entertainment">Entertainment</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          
        </Navbar>
        </>
    );
}
export default NavBar;