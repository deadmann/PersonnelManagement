package hassan.personnel.managment.rests;

import com.ibm.icu.util.Calendar;
import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.exceptionalResponses.InvalidDataException;
import hassan.personnel.managment.exceptionalResponses.NotFoundException;
import hassan.personnel.managment.models.dto.WorkPerDayDto;
import hassan.personnel.managment.models.entities.Building;
import hassan.personnel.managment.models.entities.Person;
import hassan.personnel.managment.models.entities.Work;
import hassan.personnel.managment.models.vm.WorkVm;
import hassan.personnel.managment.services.WorkService;
import hassan.personnel.managment.utility.CalendarHelper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/works")
public class WorksController {

    final static Logger LOGGER = Logger.getLogger(WorksController.class);

    private final WorkService workService;

    @Autowired
    public WorksController(WorkService workService) {
        this.workService = workService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private WorkVm get(@PathVariable long id){
        Work work = workService.getWork(id);
        return work.getViewModel();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<WorkVm> getAll(){
        List<Work> workList = workService.getAll();
        return workList.stream().map(Work::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "/by-person-and-month/{personId}/{year}/{month}")
    private List<WorkVm> getAllWorksByPersonAndMonth(@PathVariable int personId, @PathVariable int year, @PathVariable int month) {
        int nextYear = month == 12 ? year + 1 : year;
        int nextMonth = month == 12 ? 1 : month+1;

        Calendar startDate = CalendarHelper.createPersian(year, month, 1);
        Calendar endDate = CalendarHelper.createPersian(nextYear, nextMonth, 1);

        List<Work> workList =
                workService.getAllByPersonIdAndDateBetween(personId,
                        CalendarHelper.toGregorian(startDate),
                        CalendarHelper.toGregorian(endDate));

        return workList.stream().map(Work::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "/work-per-days-by-person-and-month/{personId}/{year}/{month}")
    private ResponseEntity<List<WorkPerDayDto>> getWorkPerDay(@PathVariable int personId, @PathVariable int year, @PathVariable int month) {
        List<WorkVm> works = getAllWorksByPersonAndMonth(personId, year, month);
        List<WorkPerDayDto> workPerDays = new ArrayList<>();
        works.forEach((work)->{
            Calendar pc = CalendarHelper.toPersian(work.getDate());
            workPerDays.add(new WorkPerDayDto(
                    work.getId(),
                    work.getPerson().getId(),
                    pc.get(Calendar.YEAR),
                    pc.get(Calendar.MONTH),
                    pc.get(Calendar.DAY_OF_MONTH),
                    work.getBuilding().getId(),
                    work.getWorkPerDay()
            ));
        });

        return ResponseEntity.ok(workPerDays);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Work save(@RequestBody Work work){
        return workService.save(work);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public WorkVm remove(@PathVariable Long id) throws NotFoundException, ConflictException {
        Work work = null;
        try {
            work = workService.remove(id);
            return work.getViewModel();
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }



    @RequestMapping(value = "/save-work-per-days-clear-person-month/{personId}/{year}/{month}", method = RequestMethod.POST)
    private ResponseEntity save(@RequestBody List<WorkPerDayDto> workPerDays, @PathVariable int personId, @PathVariable int year, @PathVariable int month) throws InvalidDataException {
        //Remove Old Item From Server...

        List<Work> works = workPerDayToWork(workPerDays);

        workService.updatePersonMonthWorks(works, personId, year, month);

        LOGGER.info("New list of work are saved");

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    private List<Work> workPerDayToWork(List<WorkPerDayDto> workPerDays) {
        List<Work> works = new ArrayList<>();
        for (WorkPerDayDto workPerDay: workPerDays) {
            Person person = new Person();
            person.setId(workPerDay.getPersonId());

            Building building = new Building();
            building.setId(workPerDay.getBuildingId());

            Calendar persianDate = CalendarHelper.createPersian(workPerDay.getYear(), workPerDay.getMonth(), workPerDay.getDay());

            Work work = new Work();
            work.setPerson(person);
            work.setBuilding(building);
            work.setDate(CalendarHelper.toGregorian(persianDate));
            work.setWorkPerDay(workPerDay.getWorkingHours());

            works.add(work);
        }
        return works;
    }
}
