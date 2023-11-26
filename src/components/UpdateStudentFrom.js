import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import ParticlesBg from "particles-bg";
import { useNavigate, useLocation } from 'react-router-dom';

const update = async (id,name, age, address, phonenum) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      const response = await fetch(`http://localhost:8080/v1/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          stud_name: name,
          stud_age: parseInt(age),
          stud_address: address,
          stud_phonenum: phonenum,
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
const UpdateStudentFrom = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const handleTokenCheck = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect ke halaman login jika token tidak ada
      navigate('/', { state: { error: 'not authorized Please Login' } });
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, []);

  // Setel nilai awal formulir menggunakan data dari state lokasi
  useEffect(() => {
    if (state) {
      setName(state.name || "");
      setAge(state.age || "");
      setAddress(state.address || "");
      setPhonenum(state.phonenum || "");
    }
  }, [state]);

  const handleUpdate = async () => {
    const id = state.id
    try {
      const response = await update(id,name, age, address, phonenum);

      if (response.ok) {
        // Add Success
        alert('Data Berhasil DiUpdate');
        navigate('/v1/student');
      } else if (response.status === 400) {
        // Unauthorized, token tidak valid
        alert('Data Gagal DiUpdate,Periksa Kolom Jangan Ada Yang Kosong');
      } else {
        const errorData = await response.json();
        navigate('/', { state: { error: `${errorData.message} Please Login` } });
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <Header />
      <ParticlesBg type="circle" bg={true} />
      <Form
        style={{
          width: '50%',
          backgroundColor:'white',
          margin: 'auto',
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 className="text-center">Update Student Data</h3>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phoneNumber"
            value={phonenum}
            onChange={(e) => setPhonenum(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UpdateStudentFrom;
