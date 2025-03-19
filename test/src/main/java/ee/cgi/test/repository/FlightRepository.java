package ee.cgi.test.repository;

import ee.cgi.test.entity.FlightEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightRepository extends JpaRepository<FlightEntity, Long> {

    List<FlightEntity> findByDestinationStartsWithOrderByDestinationAsc(String letter);
}
