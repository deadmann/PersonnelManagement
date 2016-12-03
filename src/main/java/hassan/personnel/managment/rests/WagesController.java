package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.models.vm.WageVm;
import hassan.personnel.managment.services.WageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/wages")
public class WagesController {

    @Autowired
    private WageService wageService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private WageVm get(@PathVariable int id){
        Wage wage = wageService.getWage(id);
        return wage.getViewModel();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<WageVm> getAll(){
        List<Wage> wageList = wageService.getAll();
        return wageList.stream().map(m->m.getViewModel()).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Wage save(@RequestBody Wage wage){
        return wageService.save(wage);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    private Wage remove(@PathVariable int id){
        return wageService.remove(id);
    }
}
