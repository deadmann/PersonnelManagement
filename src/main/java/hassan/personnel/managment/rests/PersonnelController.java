package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Person;
import hassan.personnel.managment.models.vm.PersonVm;
import hassan.personnel.managment.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/personnel")
public class PersonnelController {

    @Autowired
    private PersonService personService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private PersonVm get(@PathVariable int id){
        Person person = personService.getPerson(id);
        return person.getViewModel();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<PersonVm> getAll(){
        List<Person> personList = personService.getAll();
        return personList.stream().map(m->m.getViewModel()).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Person save(@RequestBody Person person){
        return personService.save(person);
    }
}
