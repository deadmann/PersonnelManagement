package hassan.personnel.managment.repositories;

import hassan.personnel.managment.models.entities.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    List<Work> findByPersonAndDateBetween(int id, Calendar date1, Calendar date2);
}
