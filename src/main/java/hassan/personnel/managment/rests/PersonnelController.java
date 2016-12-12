package hassan.personnel.managment.rests;

import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.exceptionalResponses.InvalidDataException;
import hassan.personnel.managment.exceptionalResponses.NotFoundException;
import hassan.personnel.managment.models.entities.Building;
import hassan.personnel.managment.models.entities.Person;
import hassan.personnel.managment.models.vm.BuildingVm;
import hassan.personnel.managment.models.vm.PersonVm;
import hassan.personnel.managment.services.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
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

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    private PersonVm remove(@PathVariable int id) throws NotFoundException, ConflictException {
        Person person = null;
        try {
            person = personService.remove(id);
            return person.getViewModel();
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    private PersonVm update(@PathVariable int id, @RequestBody Person person) throws ConflictException, NotFoundException, InvalidDataException {
        try {
            if(id != person.getId())
                throw new InvalidDataException("Model id does not match with requested id");

            Person personUpdate = personService.getPerson(person.getId());
            personUpdate.setFirstname(person.getFirstname());
            personUpdate.setLastname(person.getLastname());
            personUpdate.setPosition(person.getPosition());

            personService.update(personUpdate);
            return person.getViewModel();
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }
}
