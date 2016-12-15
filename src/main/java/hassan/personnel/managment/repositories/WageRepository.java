package hassan.personnel.managment.repositories;

import hassan.personnel.managment.models.entities.Wage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Repository
public interface WageRepository extends JpaRepository<Wage, Integer> {
    List<Wage> findByPositionId(int id);
}
