package ee.cgi.test.repository;

import ee.cgi.test.entity.FlightEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<FlightEntity, Long> {
}
