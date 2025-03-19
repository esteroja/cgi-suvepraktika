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
    <div className="min-h-screen p-6 bg-pink-100">
        <div className="text-3xl font-semibold text-center mb-6">Flights</div>
            <div className="flex justify-center mb-6">
                <label htmlFor="letter" className="mr-2 font-medium">Filter by the first letter of the destination:</label>
                    <select
                      id="letter"
                      value={selectedLetter}
                      onChange={handleLetterChange}
                      className="p-2 border rounded-md"
                    >
              <option value="">Select a Letter</option>
              {alphabet.split("").map((letter) => (
                <option key={letter} value={letter}>
                  {letter.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <table className="min-w-full table-auto bg-white shadow-md">
              <thead className="bg-pink-300">
                <tr>
                  <th className="p-4 text-left font-semibold">Destination</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                  <th className="p-4 text-left font-semibold">Time</th>
                  <th className="p-4 text-left font-semibold">Price</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.id} className="border-b hover:bg-pink-50">
                    <td className="p-4">{flight.destination}</td>
                    <td className="p-4">{flight.date}</td>
                    <td className="p-4">{flight.time}</td>
                    <td className="p-4">{flight.price} EUR</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  );
}

export default App;
