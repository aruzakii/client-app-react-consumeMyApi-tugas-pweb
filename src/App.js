import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Students from './components/Students';
import Login from './components/Login';
import { BrowserRouter, Route, Routes, Router, Switch } from 'react-router-dom';
import AddStudentForm from './components/AddStudentForm';
import UpdateStudentFrom from './components/UpdateStudentFrom';
import Register from './components/Register';






function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/register' element={<Register />}/>
      <Route exact path="/" element={<Login />} />
      <Route  path="/v1/student" element={<Students />} />
      <Route  path="/v1/student/add" element={<AddStudentForm />} />
      <Route path='/v1/student/update' element={<UpdateStudentFrom/>}/>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App;
