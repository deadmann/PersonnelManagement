package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Work;
import hassan.personnel.managment.services.WorkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/works")
public class WorksController {

    @Autowired
    private WorkService workService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private Work get(@PathVariable long id){
        return workService.getWork(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<Work> getAll(){
        return  workService.getAll();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Work save(@RequestBody Work work){
        return workService.save(work);
    }

}
