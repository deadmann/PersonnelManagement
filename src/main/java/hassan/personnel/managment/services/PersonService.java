package hassan.personnel.managment.services;


import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.exceptionalResponses.InvalidDataException;
import hassan.personnel.managment.exceptionalResponses.NotFoundException;
import hassan.personnel.managment.models.entities.Person;
import hassan.personnel.managment.models.entities.Position;
import hassan.personnel.managment.repositories.PersonRepository;
import hassan.personnel.managment.repositories.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Service
public class PersonService {

    private final PersonRepository personRepository;
    private final PositionRepository positionRepository;

    @Autowired
    public PersonService(PersonRepository personRepository, PositionRepository positionRepository) {
        this.personRepository = personRepository;
        this.positionRepository = positionRepository;
    }

    public Person getPerson(int id) {
        return personRepository.findOne(id);
    }

    public List<Person> getPersonnel(){
        return personRepository.findAll();
    }

    @Transactional(rollbackFor = {Exception.class})
    public Person save(Person person) throws ConflictException, InvalidDataException {
        if(getPerson(person.getId())!=null)
            throw new ConflictException("This Item Already Exists");

        if(person.getPosition()==null)
            throw new InvalidDataException();

        //Make sure position is coming from DB
        Position position = positionRepository.findOne(person.getPosition().getId());
        person.setPosition(position); //Add Position to Person

        return personRepository.save(person);
    }

    public Iterable<Person> save(Iterable<Person> iterable){
        return personRepository.save(iterable);
    }

    @Transactional(rollbackFor = {Exception.class})
    public Person remove(int id) {
        Person person = personRepository.findOne(id);
        Person copy = person.getCopy(true);

        personRepository.delete(id);

        //Breaking Exists Links
        person.getPosition().getPersonnel().remove(person);
        person.setPosition(null);

        person.getWorks().forEach(e->{
            e.setPerson(null);
        });

        return copy;
    }

    @Transactional(rollbackFor = {Exception.class})
    public Person update(Person person) throws ConflictException, NotFoundException {
        try {
            //Make sure position is coming from DB
            Position position = positionRepository.findOne(person.getPosition().getId());
            person.setPosition(position); //Update Position in Person

            Person newPerson = personRepository.save(person);
            //Provide JPA Link
            person.getPosition().getPersonnel().add(person);

            return newPerson;
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }
}
