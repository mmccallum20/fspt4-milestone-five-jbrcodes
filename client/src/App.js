import React, { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  let [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch("/students")
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(error => {
        console.log(error);
      });
  };

  function handleChange(event) {
    switch (event.target.name) {
      case "firstname":
        setFirstname(event.target.value);
        break;
      case "lastname":
        setLastname(event.target.value);
        break;
      default:
        break;
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    setFirstname(firstname);
    setLastname(lastname);
  }

  return (
    <div className="App">
      <h1>CodeOp's Facebook</h1>
      <h2>Friends List</h2>
      <ul>
        {students &&
          students.map(s => (
            <li key={s.id}>
              {s.firstname} {s.lastname}
              <button>Delete</button>
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input className="firstname" type="text" onChange={handleChange} />
        <label>Last Name</label>
        <input className="lastname" type="text" onChange={handleChange} />
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
}
