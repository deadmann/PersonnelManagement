package hassan.personnel.managment.rests;

import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.exceptionalResponses.InvalidDataException;
import hassan.personnel.managment.exceptionalResponses.NotFoundException;
import hassan.personnel.managment.models.entities.Person;
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

    private final PersonService personService;

    @Autowired
    public PersonnelController(PersonService personService) {
        this.personService = personService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private PersonVm get(@PathVariable int id){
        Person person = personService.getPerson(id);
        return person.getViewModel();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<PersonVm> getAll(){
        List<Person> personList = personService.getPersonnel();
        return personList.stream().map(Person::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private PersonVm save(@RequestBody Person person) throws ConflictException, InvalidDataException {
        return personService.save(person).getViewModel();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    private PersonVm remove(@PathVariable int id) throws NotFoundException, ConflictException {
        Person person;
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
        if (id != person.getId())
            throw new InvalidDataException("Model id does not match with requested id");

        if (person.getPosition() == null)
            throw new InvalidDataException();

        Person personUpdate = personService.getPerson(person.getId());
        personUpdate.setFirstname(person.getFirstname());
        personUpdate.setLastname(person.getLastname());
        personUpdate.setPosition(person.getPosition());

        return personService.update(personUpdate).getViewModel();
    }
}
