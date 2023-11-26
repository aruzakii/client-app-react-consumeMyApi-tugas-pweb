import { useEffect, useState} from "react"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DeleteButton from "./DeleteButton";
import { useNavigate } from 'react-router-dom';
import {Fade}from "react-awesome-reveal";
import Slide from "react-awesome-reveal"
import './style.css'
import ParticlesBg from "particles-bg";
import Header from "./Header";

const Students = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
   

    const fetchData = async () => {
      try {
       const token = localStorage.getItem("token");
       console.log("Token:", token);
   
       const response = await fetch("http://localhost:8080/v1/student", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });
   
       if (!response.ok) {
          const errorData = await response.json();
          navigate('/', { state: { error: `${errorData.message} Please Login` } });
          localStorage.removeItem("token");
          
       }
   
       const data = await response.json();
       setStudents(data.data);
      } catch (error) {

        console.error("Fetch error:", error);
        // navigate('/', { state: { error: `${error}` } });
      }
    };

    
   
    useEffect(() => {
       fetchData();
    }, []);

    const handleAddStudentClick = () => {
      // Navigasi ke halaman form
      navigate("/v1/student/add");
  };
  
function CardStud(props){
  const handleUpdateStudClick = ()=>{
    navigate('/v1/student/update', {
      state: {
        id: props.id,
        name: props.name,
        age: props.age,
        address: props.address,
        phonenum: props.phonenum
      }
    });
    
  }
    return (
        <Card className="mb-4" style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>
             <ul>
                <li>Age: {props.age}</li>
                <li>Address: {props.address}</li>
                <li>Phone Number: {props.phonenum}</li>
             </ul>
            </Card.Text>
            <Button variant="primary" onClick={handleUpdateStudClick}>Edit</Button>
         <DeleteButton id={props.id} />
          </Card.Body>
        </Card>
      );
}

  
return (
  <div className="full-height  content-container" >
      <Header/>
    <div className="container mt-4">
    <ParticlesBg type="circle" bg={true} /> 
   <Fade duration={3000}>
    <Button variant="primary"  onClick={handleAddStudentClick} >Add Student</Button>
    </Fade>
        <div className="row mt-4">
        {students.map((siswa)=>  {
            return (
                <div className="col-3">
                   <Slide left duration={1300}>
                <CardStud id={siswa.stud_id} 
                name={siswa.stud_name}
                age={siswa.stud_age} 
                address={siswa.stud_address}
                phonenum={siswa.stud_phonenum} />
                </Slide >
                </div>
            )
        })}
        </div>
       
    </div>
    </div>
)
}




export default Students;