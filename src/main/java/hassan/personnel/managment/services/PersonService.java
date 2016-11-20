package hassan.personnel.managment.services;


import hassan.personnel.managment.models.entities.Person;
import hassan.personnel.managment.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Service
public class PersonService {

    @Autowired
    private PersonRepository personRepository;

    public Person getPerson(int id) {
        return personRepository.findOne(id);
    }

    public List<Person> getAll(){
        return (List<Person>) personRepository.findAll();
    }

    public Person save(Person person) {
        return personRepository.save(person);
    }

    public Iterable<Person> save(Iterable<Person> iterable){
        return personRepository.save(iterable);
    }


}
