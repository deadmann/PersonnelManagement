package hassan.personnel.managment.services;

import hassan.personnel.managment.exceptionalResponses.InvalidDataException;
import hassan.personnel.managment.models.entities.Work;
import hassan.personnel.managment.repositories.WorkRepository;
import hassan.personnel.managment.utility.CalendarHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.List;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

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
        return workRepository.findAll();
    }

    public List<Work> getAllByPersonIdAndDateBetween(int personId, Calendar startDate, Calendar endDate){
        return workRepository.findByPersonIdAndDateBetween(personId, startDate, endDate);
    }

    public Work save(Work work) {
        return workRepository.save(work);
    }

    public Iterable<Work> save(Iterable<Work> iterable){
        return workRepository.save(iterable);
    }

    @Transactional(rollbackFor = new Class<Throwable>[]{InvalidDataException.class, Exception.class})
    public Iterable<Work> updatePersonMonthWorks(Iterable<Work> iterable, int personId, int year, int month) throws InvalidDataException {
        Stream<Work> stream = StreamSupport.stream(iterable.spliterator(), false);
        if ( stream.anyMatch(w-> w.getPerson().getId() != personId
                || CalendarHelper.toPersian(w.getDate()).get(com.ibm.icu.util.Calendar.YEAR) != year
                || CalendarHelper.toPersian(w.getDate()).get(com.ibm.icu.util.Calendar.MONTH) != month){
            throw new InvalidDataException("One of The Provided Works, does not belong to one of the following: choosen 1. person id, 2. year, 3. month");
        }

        return workRepository.save(iterable);
    }

}
