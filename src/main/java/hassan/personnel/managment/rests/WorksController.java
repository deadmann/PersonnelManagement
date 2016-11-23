package hassan.personnel.managment.rests;

import com.ibm.icu.text.SimpleDateFormat;
import com.ibm.icu.util.Calendar;
import hassan.personnel.managment.models.entities.Work;
import hassan.personnel.managment.models.vm.WorkVm;
import hassan.personnel.managment.services.WorkService;
import hassan.personnel.managment.utility.CalendarHelper;
import org.apache.commons.logging.Log;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        int nextMonth = month == 12 ? 1 : month;

        Calendar startDate = CalendarHelper.createPersian(year, month, 1);
        Calendar endDate = CalendarHelper.createPersian(nextYear, nextMonth, 1);

        List<Work> workList =
                workService.getAllByPersonIdAndDateBetween(personId,
                        CalendarHelper.toGregorian(startDate),
                        CalendarHelper.toGregorian(endDate));

        return workList.stream().map(Work::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Work save(@RequestBody Work work){
        return workService.save(work);
    }

}
