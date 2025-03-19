import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/flights")
      .then(response => response.json())
      .then(body => {
        setFlights(body);
      })
  }, []);


  return (
    <div className="App">
      <div>
        {flights.map(flight =>
          <div>{flight.id} | {flight.destination} | {flight.date} | {flight.time}  |  {flight.price}
          </div> )}
      </div>
    </div>
  );
}

export default App;