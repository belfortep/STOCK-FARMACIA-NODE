import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Medicine } from './pages/medicine/Medicine';
import { Medicines } from './pages/medicines/Medicines';
import { Home } from './pages/home/Home';
import { Register } from './pages/register/Register';
import { Login } from './pages/login/Login';
import { CreateMedicine } from './pages/createMedicine/CreateMedicine';



function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/lista' element={<Medicines />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/lista/:id' element={<Medicine />} />
          <Route path='/agregar' element={<CreateMedicine/>}/>
          <Route path='/agregar/:id' element={<CreateMedicine/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
