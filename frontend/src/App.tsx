import './App.css';
import {Route,Routes} from 'react-router-dom'
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
function App() {
  return (
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/' element={<HomePage/>}/>
  <Route path='/signup' element={<SignUp/>}/>
</Routes>
  );
}

export default App;
