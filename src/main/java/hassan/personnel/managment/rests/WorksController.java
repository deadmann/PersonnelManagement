package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Work;
import hassan.personnel.managment.models.vm.WorkVm;
import hassan.personnel.managment.services.WorkService;
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

    @Autowired
    private WorkService workService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private WorkVm get(@PathVariable long id){
        Work work = workService.getWork(id);
        return work.getViewModel();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<WorkVm> getAll(){
        List<Work> workList = workService.getAll();
        return workList.stream().map(m->m.getViewModel()).collect(Collectors.toList());
    }

    @RequestMapping(value = "/by-person-and-month/{personId}/{year}/{month}")
    private List<WorkVm> getAllWorksByPersonAndMonth(@PathVariable int personId, @PathVariable int year, @PathVariable int month){

        personId = 1;
        year = 1395;
        month = 8;



        List<Work> workList = workService.getAllByPersonAndDateBetween(personId, year, month);
        return workList.stream().map(m->m.getViewModel()).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Work save(@RequestBody Work work){
        return workService.save(work);
    }

}
