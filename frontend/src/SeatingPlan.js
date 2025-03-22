import {useEffect, useState} from "react";

function SeatingPlan({flight, ticketCount, setTicketCount, onClose}) {
    const seatLayout = [
        "A1", "A2", "A3", "A4",
        "B1", "B2", "B3", "B4",
        "C1", "C2", "C3", "C4",
        "D1", "D2", "D3", "D4"
    ];
    const [occupiedSeats, setOccupiedSeats] = useState([]);
    const [recommendedSeats, setRecommendedSeats] = useState([]);
    const [preferences, setPreferences] = useState({
        window: false,
        legroom: false,
        exitRow: false
    });
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const shuffledSeats = [...seatLayout].sort(() => Math.random() - 0.5);
        setOccupiedSeats(shuffledSeats.slice(0, Math.floor(seatLayout.length * 0.3)));
    }, []);

    useEffect(() => {
        recommendSeats();
    }, [ticketCount, preferences, occupiedSeats]);

    useEffect(() => {
        setSelectedSeats(selectedSeats);
    }, [selectedSeats]);

    const recommendSeats = () => {
        let availableSeats = seatLayout.filter(seat => !occupiedSeats.includes(seat));

        if (preferences.window) {
            availableSeats = availableSeats.filter(seat => seat.endsWith("1") || seat.endsWith("4"));
        }
        if (preferences.legroom) {
            availableSeats = availableSeats.filter(seat => seat.startsWith("A"));
        }
        if (preferences.exitRow) {
            availableSeats = availableSeats.filter(seat => seat.startsWith("C"));
        }

        const chosenSeats = availableSeats.slice(0, ticketCount);
        setRecommendedSeats(chosenSeats);
    };

    const handleChosenSeats = (seat) => {
        if (occupiedSeats.includes(seat)) return;

        setSelectedSeats((prevSeats) => {
            if (prevSeats.includes(seat)) {
                return prevSeats.filter(s => s !== seat);
            } else if (prevSeats.length < ticketCount) {
                return [...prevSeats, seat];
            }
            return prevSeats;
        });
    };


    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div className="bg-pink-100 p-6 rounded-lg shadow-lg w-100">
                <div className="flex justify-between">
                    <div></div>
                    <button className="text-gray-600 hover:text-gray-900 font-bold" onClick={onClose}>X</button>
                </div>
                <div className="text-xl mb-6">Seating plan for {flight.destination}</div>

                <label className="mb-2 mt-4">Number of tickets:</label>
                <input
                    type="number"
                    min="1"
                    max="10"
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Number(e.target.value))}
                    className="w-full p-2 border rounded mb-4"
                />

                <div className="mb-2 mt-4">Seat recommendations</div>
                <div className="flex gap-2 mb-4">
                    <label>
                        <input
                            type="checkbox"
                            checked={preferences.window}
                            onChange={() => setPreferences(prev => ({...prev, window: !prev.window}))}
                        /> Window seat
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={preferences.legroom}
                            onChange={() => setPreferences(prev => ({...prev, legroom: !prev.legroom}))}
                        /> More legroom
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={preferences.exitRow}
                            onChange={() => setPreferences(prev => ({...prev, exitRow: !prev.exitRow}))}
                        /> Close to exit
                    </label>
                </div>

                <div className="mb-2 mt-8">Choose your seats</div>
                <div className="text-pink-400">Recommendations have pink borders</div>
                <div className="text-pink-400 mb-2">To make a selection, click on a seat</div>
                <div className="grid grid-cols-4 gap-3 mb-4">
                    {seatLayout.map((seat) => (
                        <div
                            key={seat}
                            className={`p-2 border rounded text-center w-14
                                ${occupiedSeats.includes(seat) ? "bg-rose-500 cursor-not-allowed" : "bg-emerald-400 cursor-pointer"} 
                                ${recommendedSeats.includes(seat) ? "outline outline-4 outline-pink-400" : ""}
                                ${selectedSeats.includes(seat) ? "bg-fuchsia-400" : ""}`}
                            onClick={() => handleChosenSeats(seat)}
                        >
                            {seat}
                        </div>
                    ))}
                </div>

                <button
                    className="mt-4 px-4 py-2 bg-pink-500 text-white rounded"
                    disabled={recommendedSeats.length < ticketCount}
                    onClick={onClose}
                >
                    Choose tickets
                </button>
            </div>
        </div>
    );
}

export default SeatingPlan;
