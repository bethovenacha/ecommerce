import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/Navbar/Navbar"
import { Container, Col,Row } from "react-bootstrap"
function App() {
  return (
    <>
       <Container fluid>
                <Row className='rows'>
                    <Col className='columns'>
                        <NavBar/>
                    </Col>
                </Row>
           </Container>

           <Container fluid>
                <Row className='rows'>
                    <Col className='columns' sm={12}>
                        Body
                    </Col>
                </Row>
           </Container>
    </>
  )
}

export default App
