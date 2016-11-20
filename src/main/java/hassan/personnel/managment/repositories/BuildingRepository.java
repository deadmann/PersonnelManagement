package hassan.personnel.managment.repositories;

import hassan.personnel.managment.models.entities.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Hassan on 11/16/2016.
 */
@Repository
public interface BuildingRepository extends JpaRepository<Building, Integer> { //extends CrudRepository<Building, Integer> {

}
