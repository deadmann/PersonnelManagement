package hassan.personnel.managment.repositories;

import hassan.personnel.managment.models.entities.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Hassan on 11/17/2016.
 */
@Repository
public interface PersonRepository extends JpaRepository<Person, Integer> {
}
