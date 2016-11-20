package hassan.personnel.managment.repositories;

import hassan.personnel.managment.models.entities.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Repository
public interface PositionRepository extends JpaRepository<Position, Integer> {

    //@Query("select p from Position p fetch all properties")
    @Query("select p from hassan.personnel.managment.models.entities.Position p left join fetch p.wages")
    List<Position> findAllPositionFetchWage();
}
