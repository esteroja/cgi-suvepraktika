import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    fetch("http://localhost:8080/flights")
      .then(response => response.json())
      .then(body => setFlights(body));
  }, []);

  const handleLetterChange = (event) => {
    setSelectedLetter(event.target.value);
  };

  useEffect(() => {
    if (selectedLetter) {
      fetch(`http://localhost:8080/flights/${selectedLetter}`)
        .then(response => response.json())
        .then(body => setFlights(body));
    } else {
      fetch("http://localhost:8080/flights")
        .then(response => response.json())
        .then(body => setFlights(body));
    }
  }, [selectedLetter]);

  return (
    <div className="App">
      <h2>Flights</h2>
      <div>
        <label htmlFor="letter">Filter by first letter of the destination:</label>
        <select id="letter" value={selectedLetter} onChange={handleLetterChange}>
          <option value="">All</option>
          {alphabet.split("").map((letter) => (
            <option key={letter} value={letter}> {letter} </option>
          ))}
        </select>
      </div>

      <table border="2">
        <thead>
          <tr>
            <th>Destination</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.destination}</td>
              <td>{flight.date}</td>
              <td>{flight.time}</td>
              <td>{flight.price} EUR</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
