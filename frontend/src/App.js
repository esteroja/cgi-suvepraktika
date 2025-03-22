import {useEffect, useState} from 'react';
import './App.css';
import SeatingPlan from "./SeatingPlan";

function App() {
    const [flights, setFlights] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState("");
    const [priceStart, setPriceStart] = useState(null);
    const [priceEnd, setPriceEnd] = useState(null);
    const [dateAfter, setDateAfter] = useState("");
    const [timeAfter, setTimeAfter] = useState("");
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [ticketCount, setTicketCount] = useState(1);

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    useEffect(() => {
        fetch("http://localhost:8080/flights")
            .then(response => response.json())
            .then(body => setFlights(body));
    }, []);

    const handleLetterChange = (event) => {
        setSelectedLetter(event.target.value);
    };

    const handleDateChange = (event) => {
        const inputDate = event.target.value;
        const formattedDate = inputDate.split("-").reverse().join("-");
        console.log(formattedDate);
        setDateAfter(event.target.value);
    };

    const handleTimeChange = (event) => {
        setTimeAfter(event.target.value);
    };

    const handleChosenFlight = (flight) => {
        setSelectedFlight(flight);
    };

    useEffect(() => {
        if (selectedLetter) {
            fetch(`http://localhost:8080/flights/destination/${selectedLetter}`)
                .then(response => response.json())
                .then(body => setFlights(body));
        } else {
            fetch("http://localhost:8080/flights")
                .then(response => response.json())
                .then(body => setFlights(body));
        }
    }, [selectedLetter]);

    useEffect(() => {
        if (priceStart && priceEnd) {
            fetch(`http://localhost:8080/flights/price/${priceStart}/${priceEnd}`)
                .then(response => response.json())
                .then(body => setFlights(body));
        } else {
            fetch("http://localhost:8080/flights")
                .then(response => response.json())
                .then(body => setFlights(body));
        }
    }, [priceStart, priceEnd]);

    useEffect(() => {
        if (dateAfter) {
            fetch(`http://localhost:8080/flights/date/${dateAfter}`)
                .then(response => response.json())
                .then(body => setFlights(body));
        } else {
            fetch("http://localhost:8080/flights")
                .then(response => response.json())
                .then(body => setFlights(body));
        }
    }, [dateAfter]);

    useEffect(() => {
        if (timeAfter) {
            fetch(`http://localhost:8080/flights/departure/${timeAfter}`)
                .then(response => response.json())
                .then(body => setFlights(body));
        } else {
            fetch("http://localhost:8080/flights")
                .then(response => response.json())
                .then(body => setFlights(body));
        }
    }, [timeAfter]);

    return (
        <div className="min-h-screen p-6 bg-pink-100">
        <div className="text-3xl font-semibold text-center mb-6">Flights</div>
        <div className="flex justify-center mb-4">
            <label htmlFor="letter" className="mr-2">
                Filter by the first letter of the destination:
            </label>
            <select
                id="letter"
                value={selectedLetter}
                onChange={handleLetterChange}
                className="p-2 border rounded-md"
            >
                <option value="">Choose a letter</option>
                {alphabet.split("").map((letter) => (<option key={letter} value={letter}>
                    {letter.toUpperCase()}
                </option>))}
            </select>
        </div>
        <div className="flex justify-center mb-6">
            <label className="mr-2">Filter by ticket price range:</label>
            <input
                type="number"
                placeholder="Min price"
                min="0"
                step="1"
                value={priceStart}
                onChange={(e) => setPriceStart(Number(e.target.value))}
                className="p-2 border rounded-md mr-2"
            />
            <input
                type="number"
                placeholder="Max price"
                min="0"
                step="1"
                value={priceEnd}
                onChange={(e) => setPriceEnd(Number(e.target.value))}
                className="p-2 border rounded-md"
            />
        </div>
        <div className="flex justify-center mb-6">
            <label className="mr-2">Flights starting from this date:</label>
            <input
                type="date"
                value={dateAfter}
                onChange={handleDateChange}
                className="p-2 border rounded-md"
            />
        </div>
        <div className="flex justify-center mb-6">
            <label className="mr-2">Flights departing after:</label>
            <input
                type="time"
                value={timeAfter}
                onChange={handleTimeChange}
                className="p-2 border rounded-md"
            />
        </div>

        <div>
            <table className="min-w-full table-auto bg-white shadow-md">
                <thead className="bg-pink-300">
                <tr>
                    <th className="p-4 text-left font-semibold">Destination</th>
                    <th className="p-4 text-left font-semibold">Date</th>
                    <th className="p-4 text-left font-semibold">Departure</th>
                    <th className="p-4 text-left font-semibold">Price</th>
                </tr>
                </thead>
                <tbody>
                {flights.map((flight) => (
                    <tr key={flight.id} className="border-b hover:bg-pink-50 cursor-pointer" onClick={() => handleChosenFlight(flight)}>
                        <td className="p-4">{flight.destination}</td>
                        <td className="p-4">{new Date(flight.date).toLocaleDateString("en-GB")}</td>
                        <td className="p-4">{flight.time}</td>
                        <td className="p-4">{flight.price} EUR</td>
                    </tr>))}
                </tbody>
            </table>

            {selectedFlight && (
                <SeatingPlan
                    flight={selectedFlight}
                    ticketCount={ticketCount}
                    setTicketCount={setTicketCount}
                    onClose={() => setSelectedFlight(null)}
                />
            )}
        </div>
    </div>);
}

export default App;
