package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Person;
import hassan.personnel.managment.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/personnel")
public class PersonnelController {

    @Autowired
    private PersonService personService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private Person get(@PathVariable int id){
        return personService.getPerson(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<Person> getAll(){
        return  personService.getAll();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Person save(@RequestBody Person person){
        return personService.save(person);
    }
}
