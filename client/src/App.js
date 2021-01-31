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

  return (
    <div className="App">
      <h1>CodeOp's Facebook</h1>
      <h2>Friends List</h2>
      <ul>
        {students &&
          students.map(s => (
            <li key={s.id}>
              {s.firstname} {s.lastname}
            </li>
          ))}
      </ul>
      <form>
        <label>First Name</label>
        <input className="firstname" type="text"></input>
        <label>Last Name</label>
        <input className="lastname" type="text"></input>
        <button type="button">Add Friend</button>
      </form>
    </div>
  );
}
