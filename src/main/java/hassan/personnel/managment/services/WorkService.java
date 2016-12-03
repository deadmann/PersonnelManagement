package hassan.personnel.managment.services;

import hassan.personnel.managment.exceptionalResponses.InvalidDataException;
import hassan.personnel.managment.models.entities.Work;
import hassan.personnel.managment.repositories.WorkRepository;
import hassan.personnel.managment.utility.CalendarHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.GregorianCalendar;
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

    /**
     *
     * @param personId
     * @param startDate Inclusive
     * @param endDate Exclusive
     * @return
     */
    public List<Work> getAllByPersonIdAndDateBetween(int personId, Calendar startDate, Calendar endDate){
        return workRepository.findByPersonIdAndDateGreaterThanEqualAndDateLessThan(personId, startDate, endDate);
    }

    public Work save(Work work) {
        return workRepository.save(work);
    }

    public Iterable<Work> save(Iterable<Work> iterable){
        return workRepository.save(iterable);
    }

    /***
     * Delete Older Data for a person within a month, and save new data
     * @param iterable List of Work To Save
     * @param personId Person Id
     * @param year Persian Year
     * @param month Persian Month
     * @return
     * @throws InvalidDataException
     */
    @Transactional(rollbackFor = {
            InvalidDataException.class,
            Exception.class
    })
    public Iterable<Work> updatePersonMonthWorks(Iterable<Work> iterable, int personId, int year, int month) throws InvalidDataException {
        Stream<Work> stream = StreamSupport.stream(iterable.spliterator(), false);
        if ( stream.anyMatch(w-> w.getPerson().getId() != personId
                || CalendarHelper.toPersian(w.getDate()).get(com.ibm.icu.util.Calendar.YEAR) != year
                || CalendarHelper.toPersian(w.getDate()).get(com.ibm.icu.util.Calendar.MONTH) != month - 1)){ //Month in calendar start from 0 to 11
            throw new InvalidDataException("One of The Provided Works, does not belong to one of the following: choosen 1. person id, 2. year, 3. month");
        }

        com.ibm.icu.util.Calendar pCalStart = CalendarHelper.createPersian(year, month, 1);
        com.ibm.icu.util.Calendar pCalEnd = CalendarHelper.createPersian(year, month, CalendarHelper.daysInPersianMonth(year, month));

        Calendar gCalStart = CalendarHelper.toGregorian(pCalStart);
        Calendar gCalEnd = CalendarHelper.toGregorian(pCalEnd);

        List<Work> workOfMonthToDeleteByPersonId = workRepository.findByPersonIdAndDateGreaterThanEqualAndDateLessThan(personId, gCalStart, gCalEnd);
        workRepository.delete(workOfMonthToDeleteByPersonId);

        return workRepository.save(iterable);
    }

    public Work remove(Long id) {
        Work work = workRepository.findOne(id);
        workRepository.delete(id);
        return work;
    }
}
