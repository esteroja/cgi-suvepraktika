package ee.cgi.test.repository;

import ee.cgi.test.entity.FlightEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface FlightRepository extends JpaRepository<FlightEntity, Long> {

    List<FlightEntity> findByDestinationStartsWithOrderByDestinationAsc(String letter);

    List<FlightEntity> findByPriceBetweenOrderByPriceAsc(Float priceStart, Float priceEnd);

    List<FlightEntity> findByDateGreaterThanOrderByDateAsc(LocalDate date);

    List<FlightEntity> findByTimeGreaterThanOrderByTimeAsc(LocalTime time);


}
