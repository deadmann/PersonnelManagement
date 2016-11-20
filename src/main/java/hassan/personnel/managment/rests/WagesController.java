package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.services.WageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/wages")
public class WagesController {

    @Autowired
    private WageService wageService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private Wage get(@PathVariable int id){
        return wageService.getWage(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<Wage> getAll(){
        return  wageService.getAll();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Wage save(@RequestBody Wage wage){
        return wageService.save(wage);
    }
}
