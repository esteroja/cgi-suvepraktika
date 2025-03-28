package ee.cgi.test.controller;

import ee.cgi.test.entity.FlightEntity;
import ee.cgi.test.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FlightController {

    @Autowired
    FlightRepository flightRepository;

    @GetMapping("flights")
    public List<FlightEntity> getFlights(){
        return flightRepository.findAll();
    }

    @PostMapping("flights")
    public List<FlightEntity> postFlight(@RequestBody FlightEntity flightEntity){
        flightRepository.save(flightEntity);
        return flightRepository.findAll();
    }

    @GetMapping("flights/destination/{letter}")
    public List<FlightEntity> getFlightsByDestination(@PathVariable String letter) {
        return flightRepository.findByDestinationStartsWithOrderByDestinationAsc(letter.toUpperCase());
    }

    @GetMapping("flights/price/{priceStart}/{priceEnd}")
    public List<FlightEntity> getFligthsByPrice(@PathVariable Float priceStart, @PathVariable Float priceEnd){
        return flightRepository.findByPriceBetweenOrderByPriceAsc(priceStart, priceEnd);
    }

    @GetMapping("flights/date/{dateAfter}")
    public List<FlightEntity> getFlightsAfterDate(@PathVariable String dateAfter){
        return flightRepository.findByDateGreaterThanOrderByDateAsc(LocalDate.parse(dateAfter));
    }

    @GetMapping("flights/departure/{timeAfter}")
    public List<FlightEntity> getFlightsAfterTime(@PathVariable String timeAfter){
        return flightRepository.findByTimeGreaterThanOrderByTimeAsc(LocalTime.parse(timeAfter));
    }



}
