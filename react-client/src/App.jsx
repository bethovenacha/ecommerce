import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Col,Row } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';

function App(props) {
  return (
    <>
           <Container fluid>
                <Row className='rows'>
                    <Col className='columns' sm={12}>
                        <NavBar />
                        <Outlet />
                    </Col>
                </Row>
           </Container>
    </>
  )
}

export default App
