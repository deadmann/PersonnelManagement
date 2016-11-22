package hassan.personnel.managment.services;

import hassan.personnel.managment.models.entities.Work;
import hassan.personnel.managment.repositories.WorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Service
public class WorkService {

    @Autowired
    private WorkRepository workRepository;

    public Work getWork(long id) {
        return workRepository.findOne(id);
    }

    public List<Work> getAll(){
        return (List<Work>) workRepository.findAll();
    }

    public List<Work> getAllByPersonAndDateBetween(int personId, Calendar startDate, Calendar endDate){
        return (List<Work>) workRepository.findByPersonAndDateBetween(personId, startDate, endDate);
    }

    public Work save(Work work) {
        return workRepository.save(work);
    }

    public Iterable<Work> save(Iterable<Work> iterable){
        return workRepository.save(iterable);
    }

}
