
import { Outlet } from 'react-router-dom';
import PrimarySearchAppBar from './components/NavBar/PrimarySearch';

function App(props) {
  return (
    <>
      <PrimarySearchAppBar/>
      <Outlet />             
    </>
  )
}

export default App
